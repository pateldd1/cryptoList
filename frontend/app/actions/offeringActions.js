import {
    GET_OFFERINGS_URL,
    CREATE_OFFERING_URL,
    UPDATE_MAX_USD_URL,
    UPDATE_MAX_INVESTORS_URL
} from '../api';

import axios from 'axios';


export default class OfferingActions {
    static GET_OFFERINGS = 'OfferingActions/GET_OFFERINGS';
    static RECEIVE_OFFERINGS = 'OfferingActions/RECEIVE_OFFERINGS';

    static getOfferings() {
        return dispatch => {
            // Dispatch is to announce to redux state that something has happened
            dispatch({
                type: OfferingActions.GET_OFFERINGS
            });

            axios.get(GET_OFFERINGS_URL, {})
                .then(res => {
                    dispatch({
                        type: OfferingActions.RECEIVE_OFFERINGS,
                        payload: {
                            offerings: res.data.offerings
                        }
                    })
                })
                .catch(err => {
                    alert(err.response.data.error);
                })
        }
    }

    static createOffering(name, maxInvestors, maxUSD) {
        return function(dispatch) {
            axios.post(CREATE_OFFERING_URL, { name, maxInvestors, maxUSD })
                .then(res => {
                    dispatch(OfferingActions.getOfferings());
                    alert(res.data.message);
                })
                .catch(err => {
                    alert(err.response.data.error);
                })
        }
    }

    static updateMaxUSD(offeringId, updatedMaxUSD) {
        axios.post(UPDATE_MAX_USD_URL, { updatedMaxUSD })
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }

    static updateMaxInvestors(offeringId, updatedMaxInvestors) {
        axios.post(UPDATE_MAX_INVESTORS_URL, { updatedMaxInvestors })
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }

}