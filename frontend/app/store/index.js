const thunk = require('redux-thunk');
const {createStore, compose, applyMiddleware} = require('redux');
const reducer = require('../reducers');
const logger = require('redux-logger');

const defaultState = {};
exports.configureStore = (initialState=defaultState) => {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk.default, logger.logger)
  ));
  return store;
};