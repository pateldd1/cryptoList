const async = require('asyncawait/async');
const await = require('asyncawait/await');
const { Offering } = require('../models/offering');
const Util = require('../util');

// add validations later

exports.getOfferings = async(function(req, res, next) {
    const offerings = await(Offering.find().sort({ name: 1 }));
    res.json({ offerings });
});

exports.getOfferingByName = async(function(req, res, next) {
    const offering = await(Offering.findOne({ name: req.query.name }));
    res.json({ offering });
})

exports.createOffering = async(function(req, res, next) {
    const { name, maxInvestors, maxUSD } = req.body;

    if (!Util.isNumber(maxInvestors) || !Util.isNumber(maxUSD) || parseFloat(maxInvestors) <= 0 || parseFloat(maxUSD) <= 0) {
        return res.status(422).json({ error: 'maxInvestors or maxUSD entered cannot be negative and must be numerical!' })
    }

    const createdAt = Date.now();
    const offering = new Offering({
        name,
        maxInvestors,
        maxUSD,
        createdAt
    });
    offering.save(function (err) {
        if (err) { return next(err); }
        res.json({ message: 'offering saved!' });
    });
});

exports.updateMaxUSD = async(function(req, res, next) {
    const { offeringId, updatedMaxUSD } = req.body;

    await(Offering.update({ _id: offeringId }, { maxUSD: updatedMaxUSD }));
    res.json({ message: 'offering maxUSD updated!' });
});

exports.updateMaxInvestors = async(function(req, res, next) {
    const { offeringId, updatedMaxInvestors } = req.body;

    await(Offering.update({ _id: offeringId }, { maxInvestors: updatedMaxInvestors }));
    res.json({ message: 'offering maxInvestors updated!' });
});