import {
    EXCHANGE_RATE_URL,
    CREATE_INVESTMENT_URL,
    GET_INVESTMENTS_URL,
    GET_SUPPORTED_CURRENCIES_URL,
    UPDATE_INVESTMENT_REQUEST_URL
} from '../api';

import axios from 'axios';


export default class InvestmentActions {
    static CREATE_INVESTMENT_SUCCESS = 'InvestmentActions/CREATE_INVESTMENT_SUCCESS';
    static GET_INVESTMENTS = 'InvestmentActions/GET_INVESTMENTS';
    static RECEIVE_INVESTMENTS = 'InvestmentActions/RECEIVE_INVESTMENTS';
    
    static getInvestments() {
        return dispatch => {
            dispatch({
                type: InvestmentActions.GET_INVESTMENTS
            })

            axios.get(GET_INVESTMENTS_URL, {})
                .then(res => {
                    dispatch({
                        type: InvestmentActions.RECEIVE_INVESTMENTS,
                        payload: {
                            investments: res.data.investments
                        }
                    });
                })
                .catch(err => {
                    alert(err.response.data.error);
                })
        }
    }

    static getExchangeRate(denomination, investorName, setExchangeRate) {
        axios.get(EXCHANGE_RATE_URL, { params: { denomination, investorName }})
            .then(res => {
                setExchangeRate(res.data.USDPerDenomination);
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }

    static createInvestment(investorName, offeringName, amount, denomination) {
        axios.post(CREATE_INVESTMENT_URL, { investorName, offeringName, amount, denomination })
            .then(res => {
                const investmentStatus = res.data.investmentStatus; 
                if (investmentStatus === 'waitListed') {
                    alert('Your investment request was waitlisted and probably will not be successful!');
                }
                else {
                    alert('Your investment is awaiting response from creator of this offering!');
                }
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }
    // setSupportedCurrencies is a function that sets the state of Invest component
    static getSupportedCurrencies(setSupportedCurrencies) {
        axios.get(GET_SUPPORTED_CURRENCIES_URL, {})
            .then(res => {
                setSupportedCurrencies(res.data.paymentMethods);
            })
            .catch(err => {
                alert(err.response.data.error);
            })
    }

    static updateInvestmentRequest(investmentId, action) {
        return function(dispatch) {
            axios.post(UPDATE_INVESTMENT_REQUEST_URL, { investmentId, action })
                .then(res => {
                    dispatch(InvestmentActions.getInvestments());
                    alert(res.data.message);
                })
                .catch(err => {
                    console.log(err.response)
                    alert(err.response.data.error);
                })
        }
    }

}