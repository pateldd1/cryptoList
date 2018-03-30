const mongoose = require('mongoose');
const Config = require('../config');
const Schema = mongoose.Schema;

exports.investmentStatuses = {
    AWAITING_RESPONSE: 'awaitingResponse',
    WAITLISTED: 'waitListed',
    REJECTED: 'rejected',
    APPROVED: 'approved'
}

exports.investmentActions = {
    ACCEPT: 'accept',
    REJECT: 'reject'
}

const investmentSchema = new Schema({
    investorName: {
        type: String,
        required: 'Investor Name is Required',
    },
    offeringName: {
        type: String,
        required: 'Offering Name is required'
    },
    amount: {
        type: Number,
    },
    denomination: {
        type: String,
    },
    USDPerDenomination: {
        type: Number
    },
    amountInUSD: {
        type: Number
    },
    createdAt: {
        type: Number,
    },
    investmentStatus: {
        type: String,
        default: exports.investmentStatuses.AWAITING_RESPONSE
    }
});

exports.Investment = mongoose.model('investment', investmentSchema);