const async = require('asyncawait/async');
const await = require('asyncawait/await');
const Redis = require('../services/redis');
const Lock = require('../services/lock');
const { Investment, investmentStatuses } = require('../models/investment');
const { Offering } = require('../models/offering');
const { PaymentMethod } = require('../models/paymentMethod');
const _ = require ('lodash');

// Explanation for locking:
// A race condition could occur where two investors tried to read the offering and they both 'canInvest' based on function below, meaning they are both not waitlisted
// and that they are both with investmentStatus 'awaitingResponse.' When an admin goes to approve or reject investment requests, the admin would be unable to differentiate
// which request came after the other since they would both be 'awaitingResponse.' This would lead the admin to have to reject an investment request that had a message telling
// the user that they're investment is 'awaitingResponse' and not 'waitListed', which would make them angry. We are reading from the offering and writing to the investment, so 
// we should lock this thread using the offering name as the lock key, so investment on this offering name acquires the lock and further investments on this offering name cannot 
// occur until the lock is released (max of 5 seconds) for redis-lock. This will not be too costly for this application because the number of times this could possibly occur is very low
// for this application and because this thread is only locked on an offering name basis (the lock key). This would ensure that the investment status that goes back to the user is correct
// and that an admin would know for sure which investments are waitlisted or not.

function canInvest(offering, amountInUSD) {
    return (offering.currentUSD + amountInUSD <= offering.maxUSD && offering.currentInvestors + 1 <= offering.maxInvestors);
}

const createInvestmentTransaction = async(function (investorName, offeringName, denomination, amount, USDPerDenomination) {

    const unlockInvestmentsOnOffering = await(Lock.lock(Lock.LOCK_PREFIX.OFFERING_NAME, offeringName));
    try {
        const amountInUSD = USDPerDenomination * amount;

        const createdAt = Date.now();
        const offering = await(Offering.findOne({ name: offeringName }));

        let investmentStatus = investmentStatuses.AWAITING_RESPONSE;

        if (canInvest(offering, amountInUSD)) {
            offering.currentUSD += amountInUSD;
            offering.currentInvestors += 1;
        }
        else {
            investmentStatus = investmentStatuses.WAITLISTED;
        }

        const investment = new Investment({
            investorName,
            offeringName,
            denomination,
            amount,
            USDPerDenomination,
            amountInUSD,
            createdAt,
            investmentStatus
        });

        await(offering.save())
        await(investment.save())

        return investmentStatus;
    }
    finally {
        unlockInvestmentsOnOffering();
    }

});

exports.getInvestments = async(function (req, res, next) {
    const investments = await(Investment.find().sort({ offeringName: 1 }));
    res.json({ investments });
});

// hacker might try to do a scripting attack and increase the USDPerDenomination on this exposed endpoint
// My Solution is to cache the exchange rate into Redis for any (coin + investor) combo and then use this cached value
// as a means of 'locking them into a price.' This method could be used for any coin. Random number between 8000-18000 
// for bitcoin simulates a get request to coinCap or some other API that actually gets this exchange rate.
// acquire a lock with the key being the offeringName to lock only creating investments on this offering
exports.getExchangeRate = async(function(req, res, next) {
    const { denomination, investorName } = req.query;

    // pretend the following is a GET request to coinCap for usd per coin denomination
    const USDPerDenomination = _.random(8000, 18000);

    const cacheKey = `${investorName}-${denomination}`;
    const exchangeRateExpiryTimeInSeconds = 10 * 60;

    await (Redis.setInCache(cacheKey, USDPerDenomination, exchangeRateExpiryTimeInSeconds));
    res.json({ USDPerDenomination });
});

exports.createInvestment = async(function (req, res, next) {
    const { investorName, offeringName, amount, denomination } = req.body;
    const cacheKey = `${investorName}-${denomination}`;

    let USDPerDenomination = 1;

    if (denomination !== 'USD') {
        USDPerDenomination = await(Redis.getFromTheCache(cacheKey));
        if (!USDPerDenomination) {
            return res.status(422).json({ error: 'Exchange Rate Changed!! Please refresh page and try again.' });
        }
    }

    const investmentStatus = await(createInvestmentTransaction(investorName, offeringName, denomination, amount, USDPerDenomination));
    res.json({ investmentStatus });
});

exports.getSupportedCurrencies = async(function (req, res, next) {
    const paymentMethods = await(PaymentMethod.find());
    res.json({ paymentMethods });
});