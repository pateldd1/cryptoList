const { testOffering } = require('./_offering.spec');

exports.waitListedTestInvestment = { 
    investorName: 'Devansh1', 
    offeringName: testOffering.name, 
    amount: 100000000000, 
    denomination: 'USD' 
}

exports.awaitingResponseTestInvestment = { 
    investorName: 'Devansh1', 
    offeringName: testOffering.name, 
    amount: 100, 
    denomination: 'USD' 
}
