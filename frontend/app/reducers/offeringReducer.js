import OfferingActions from '../actions/offeringActions';

const defaultState = {
    offerings: [],
    isFetchingOfferings: false
};

module.exports = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case OfferingActions.GET_OFFERINGS:
      return {
        ...state,
        isFetchingOfferings: true
      }
    case OfferingActions.RECEIVE_OFFERINGS:
      return {
        ...state,
        isFetchingOfferings: false,
        offerings: action.payload.offerings
      }
    default:
      return state;
  }
};
