const mongoose = require('mongoose');
const Config = require('../config');
const Schema = mongoose.Schema;

function validateUnique() {
    return 'Offering Name Must Be Unique!';
}

const offeringSchema = new Schema({
    name: {
        type: String,
        required: 'Offering Name is required!',
        unique: true,
        validate: [validateUnique]
    },
    maxInvestors: {
        type: Number
    },
    maxUSD: {
        type: Number,
    },
    currentUSD: {
        type: Number,
        default: 0
    },
    currentInvestors: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Number
    }
});

exports.Offering = mongoose.model('offering', offeringSchema);