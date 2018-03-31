// Run these endpoint tests while the server is running.
// I created some test data by using the UI.

const test = require('ava');
const sinon = require('sinon');
const axios = require('axios');
const async = require('asyncawait/async');
const wait = require('asyncawait/await');
const offeringSpec = require('./spec/_offering.spec');
const investmentSpec = require('./spec/_investment.spec');
const { Offering } = require('../backend/models/offering');

const {
    EXCHANGE_RATE_URL,
    CREATE_INVESTMENT_URL,
    GET_INVESTMENTS_URL,
    GET_SUPPORTED_CURRENCIES_URL,
    UPDATE_INVESTMENT_REQUEST_URL,
    CREATE_OFFERING_URL,
    GET_OFFERING_BY_NAME_URL
} = require('../frontend/app/api');

let sandbox;

test.beforeEach(t => {
    sandbox = sinon.sandbox.create();
});

test.afterEach(t => {
    sandbox.restore();
});

test('Waitlists an investment request if request exceeds maxUSD', async(t => {
    try {
        wait(axios.post(CREATE_OFFERING_URL, offeringSpec.testOffering));
    }
    catch (e) {
        'already exists';
    }
    const response = wait(axios.post(CREATE_INVESTMENT_URL, investmentSpec.waitListedTestInvestment));
    t.true(response.data.investmentStatus === 'waitListed');
}));

test('Gives awaitingResponse status to investment and increases offering.currentUSD and offering.currentInvestors if request does not exceed maxUSD/maxInvestors', async(t => {
    try {
        wait(axios.post(CREATE_OFFERING_URL, offeringSpec.testOffering));
    }
    catch (e) {
        'already exists';
    }

    const prevOfferingResponse = wait(axios.get(GET_OFFERING_BY_NAME_URL, {params: { name: offeringSpec.testOffering.name } }));
    const createInvestmentResponse = wait(axios.post(CREATE_INVESTMENT_URL, investmentSpec.awaitingResponseTestInvestment));
    const updatedOfferingResponse = wait(axios.get(GET_OFFERING_BY_NAME_URL, { params: { name: offeringSpec.testOffering.name } }));

    t.true(createInvestmentResponse.data.investmentStatus === 'awaitingResponse');
    t.true(prevOfferingResponse.data.offering.currentUSD < updatedOfferingResponse.data.offering.currentUSD);
    t.true(prevOfferingResponse.data.offering.currentInvestors < updatedOfferingResponse.data.offering.currentInvestors);
}));