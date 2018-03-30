const mongoose = require('mongoose');
const { Offering } = require('../models/offering');
const { Investment } = require('../models/investment');
const { PaymentMethod } = require('../models/paymentMethod');
const Promise = require('bluebird');
const Config = require('../configs/config');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.MONGO_URL);
}
else if (process.env.NODE_ENV === "seed-production") {
    mongoose.connect(Config.MONGO_URL);
}
else {
    mongoose.connect('mongodb://localhost/miniCoinList');
}

mongoose.connection.once('connected', () => {
    mongoose.connection.db.collection("offerings").createIndex({ name: 1 }, { background: true });
    mongoose.connection.db.collection("investments").createIndex({ investorName: 1 }, { background: true });
    mongoose.connection.db.collection("investments").createIndex({ offeringName: 1 }, { background: true });
    mongoose.connection.db.createCollection("paymentmethods");
});

const offering = new Offering;
offering.save(function (err) {

});
const investment = new Investment;
investment.save(function (err) {

});

const supportedCurrencies = ['USD', 'BTC'];

Promise.each(supportedCurrencies, (currency) => {
    const paymentMethod = new PaymentMethod({ denomination: currency });
    return paymentMethod.save(function(err) {
        if (err) {
            return err;
        }
        console.log(`${currency} saved!`);
        return true;
    })
});