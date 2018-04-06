const { API_URL } = require('../config');

// investments API
exports.EXCHANGE_RATE_URL = `${API_URL}/getExchangeRate`;
exports.CREATE_INVESTMENT_URL = `${API_URL}/createInvestment`;
exports.GET_INVESTMENTS_URL = `${API_URL}/getInvestments`;
exports.GET_SUPPORTED_CURRENCIES_URL = `${API_URL}/getSupportedCurrencies`;

// offerings API
exports.GET_OFFERINGS_URL = `${API_URL}/getOfferings`;
exports.GET_OFFERING_BY_NAME_URL = `${API_URL}/getOfferingByName`;
exports.CREATE_OFFERING_URL = `${API_URL}/createOffering`;
exports.UPDATE_MAX_USD_URL = `${API_URL}/updateMaxUSD`;
exports.UPDATE_MAX_INVESTORS_URL = `${API_URL}/updateMaxInvestors`;

// admin API
exports.UPDATE_INVESTMENT_REQUEST_URL = `${API_URL}/updateInvestmentRequest`;