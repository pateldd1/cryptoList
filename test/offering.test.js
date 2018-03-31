// Run these endpoint tests while the server is running.
// I created some test data by using the UI.

const test = require('ava');
const sinon = require('sinon');
const axios = require('axios');
const async = require('asyncawait/async');
const wait = require('asyncawait/await');
const offeringSpec = require('./spec/_offering.spec');
const investmentSpec = require('./spec/_investment.spec');

const {
    GET_OFFERINGS_URL,
    CREATE_OFFERING_URL,
    UPDATE_MAX_USD_URL,
    UPDATE_MAX_INVESTORS_URL
} = require('../frontend/app/api');

let sandbox;

test.beforeEach(t => {
    sandbox = sinon.sandbox.create();
});

test.afterEach(t => {
    sandbox.restore();
});

test('Test OfferingController.getOfferings returns an array', async(t => {
    const response = wait(axios.get(GET_OFFERINGS_URL, {}));
    t.true(response.data.offerings.constructor === Array);
}));

test('Test OfferingController.getOfferings returns an array where currentUSD <= maxUSD and currentInvestors <= maxInvestors', async(t => {
    const response = wait(axios.get(GET_OFFERINGS_URL, {}));
    response.data.offerings.forEach((offering) => {
        t.true(offering.currentUSD <= offering.maxUSD); 
        t.true(offering.currentInvestors <= offering.maxInvestors); 
    })
}));

test('No duplicate offering names', async(t => {
    try {
        wait(axios.post(CREATE_OFFERING_URL, offeringSpec.testOffering));
    } 
    catch (e) {
        'already exists';
    }
    try {
        wait(axios.post(CREATE_OFFERING_URL, offeringSpec.testOffering));
    } 
    catch (e) {
        return t.pass();
    }
    t.fail();
}));