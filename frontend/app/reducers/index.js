import { combineReducers } from 'redux';
import offeringReducer from './offeringReducer';
import investmentReducer from './investmentReducer';

module.exports = combineReducers({
  offering: offeringReducer,
  investment: investmentReducer
});
