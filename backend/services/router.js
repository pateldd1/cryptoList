let router = require('express').Router();
const InvestmentController = require('../controllers/investments_controller');
const OfferingController = require('../controllers/offerings_controller');
const AdminController = require('../controllers/admin_controller');

// Investments API
router.route('/getExchangeRate')
    .get(InvestmentController.getExchangeRate);
router.route('/getInvestments')
    .get(InvestmentController.getInvestments);
router.route('/getSupportedCurrencies')
    .get(InvestmentController.getSupportedCurrencies);
router.route('/createInvestment')
    .post(InvestmentController.createInvestment);

// Offerings API
router.route('/getOfferings')
    .get(OfferingController.getOfferings);
router.route('/createOffering')
    .post(OfferingController.createOffering);
router.route('/updateMaxUSD')
    .post(OfferingController.updateMaxUSD);
router.route('/updateMaxInvestors')
    .post(OfferingController.updateMaxInvestors);

// Admin API
router.route('/updateInvestmentRequest')
    .post(AdminController.updateInvestmentRequest);

module.exports = router;
