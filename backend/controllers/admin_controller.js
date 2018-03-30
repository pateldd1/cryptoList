const async = require('asyncawait/async');
const await = require('asyncawait/await');
const { Investment, investmentStatuses, investmentActions } = require('../models/investment');
const { Offering } = require('../models/offering');

const adminActionMap = {};
adminActionMap[investmentActions.ACCEPT] = {};
adminActionMap[investmentActions.REJECT] = {};

adminActionMap[investmentActions.ACCEPT][investmentStatuses.WAITLISTED] = async(function (investment) {
    const offeringName = investment.offeringName;
    const offering = await(Offering.findOne({ name: offeringName }));

    if (offering.currentUSD + investment.amountInUSD > offering.maxUSD) {
        return { success: false, message: `Accepting this investment request will exceed the offering's Max USD of ${offering.maxUSD}` };
    }

    await(Investment.update({ _id: investment._id }, { investmentStatus: investmentStatuses.APPROVED }));
    await(Offering.findOneAndUpdate({ name: offeringName }, { '$inc': { currentUSD: investment.amountInUSD } }));

    return { success: true, message: 'waitlisted investment request accepted!' };
});

adminActionMap[investmentActions.ACCEPT][investmentStatuses.AWAITING_RESPONSE] = async(function (investment) {
    await(Investment.update({ _id: investment._id }, { investmentStatus: investmentStatuses.APPROVED }));
    // 'Do Nothing since offering.currentUSD was already increased when investment request was created'
    return { success: true, message: 'investment request accepted!' };
});

adminActionMap[investmentActions.REJECT][investmentStatuses.WAITLISTED] = async(function (investment) {
    await(Investment.update({ _id: investment._id }, { investmentStatus: investmentStatuses.REJECTED }));
    // 'Do Nothing because waitlisted investment request does nothing to change the offering';
    return { success: true, message: 'investment request rejected!' };
});

adminActionMap[investmentActions.REJECT][investmentStatuses.AWAITING_RESPONSE] = async(function (investment) {
    const offeringName = investment.offeringName;

    await(Investment.update({ _id: investment._id }, { investmentStatus: investmentStatuses.REJECTED }));
    const offering = await(Offering.findOneAndUpdate({ name: offeringName }, { '$inc': { currentUSD: -investment.amountInUSD } }));

    return { success: true, message: 'investment request rejected!' };
});


exports.updateInvestmentRequest = async(function (req, res, next) {
    const { investmentId, action } = req.body;
    const investment = await(Investment.findOne({ _id: investmentId }));
    const status = investment.investmentStatus;
    

    if (status === investmentStatuses.APPROVED || status === investmentStatuses.REJECTED) {
        return res.status(422).json({ error: 'Investment has already been approved or rejected! Cannot perform action.' });
    }

    const investmentUpdate = await(adminActionMap[action][status](investment));

    if (!investmentUpdate.success) {
        return res.status(422).json({ error: investmentUpdate.message });
    }

    res.json({ message: investmentUpdate.message })
});