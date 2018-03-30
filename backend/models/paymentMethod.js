const mongoose = require('mongoose');
const Config = require('../config');
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
    denomination: {
        type: String
    }
});

exports.PaymentMethod = mongoose.model('paymentmethod', paymentMethodSchema);