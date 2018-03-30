const async = require('asyncawait/async');
const await = require('asyncawait/await');
const { Offering } = require('../models/offering');

// add validations later

exports.getOfferings = async(function(req, res, next) {
    const offerings = await(Offering.find().sort({ name: 1 }));
    res.json({ offerings });
});

exports.createOffering = async(function(req, res, next) {
    const { name, maxInvestors, maxUSD } = req.body;
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