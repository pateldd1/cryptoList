import InvestmentActions from '../actions/investmentActions';

const defaultState = {
  isFetchingInvestments: false,
  investments: []
};

module.exports = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case InvestmentActions.GET_INVESTMENTS:
      return {
        ...state,
        isFetchingInvestments: true
      }
    case InvestmentActions.RECEIVE_INVESTMENTS:
      return {
        ...state,
        isFetchingInvestments: false,
        investments: action.payload.investments
      }
    default:
      return state;
  }
};
