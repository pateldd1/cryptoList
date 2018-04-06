import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import InvestmentActions from '../actions/investmentActions';
import DropDownInput from '../presentationals/dropDownInput';
import BiDirectionalCurrency from '../presentationals/biDirectionalCurrency';
import TextEntryInput from '../presentationals/textEntryInput';
import Util from '../utils/util';

export default class Investment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDenomination: null,
            USDPerDenomination: null,
            amount: 0,
            supportedCurrencies: [],
            investorName: '',

        }

        this.offeringName = this.props.location.state.offeringName;

        this.setSupportedCurrencies = this.setSupportedCurrencies.bind(this);
        this.selectDenomination = this.selectDenomination.bind(this);
        this.setExchangeRate = this.setExchangeRate.bind(this);
        this.setAmount = this.setAmount.bind(this);
        this.setInvestorName = this.setInvestorName.bind(this);
    }

    componentDidMount() {
        InvestmentActions.getSupportedCurrencies(this.setSupportedCurrencies);
    }

    setSupportedCurrencies(paymentMethods) {
        this.setState({
            supportedCurrencies: paymentMethods.map((method) => method.denomination)
        });
    }

    setExchangeRate(usdPerDenomination) {
        this.setState({
            USDPerDenomination: usdPerDenomination
        });
    }

    setAmount(amount) {
        this.setState({
            amount: amount
        });
    }

    setInvestorName(name) {
        this.setState({
            investorName: name
        });
    }

    selectDenomination(denomination) {
        if (this.state.investorName) {
            this.setState({ selectedDenomination: denomination });

            if (denomination === 'USD') {
                this.setExchangeRate(1);
                return;
            }
            
            InvestmentActions.getExchangeRate(denomination, this.state.investorName, this.setExchangeRate);
        }
    }

    renderDenominationsDropdown() {
        if (this.state.investorName) {
            return (
                <DropDownInput 
                    dropDownTitle="Select Denomination" 
                    selections={this.state.supportedCurrencies} 
                    makeSelection={this.selectDenomination} 
                />
            )
        }
        return null;
    }

    renderBiDirectionalCurrency() {
        if (this.state.selectedDenomination && this.state.USDPerDenomination) {
            return (
                <BiDirectionalCurrency 
                    USDPerDenomination={this.state.USDPerDenomination} 
                    title="Input Amount" 
                    denomination={this.state.selectedDenomination} 
                    setAmount={this.setAmount} 
                />
            )
        }
        return null;
    }

    renderSubmitButton() {
        if (this.state.investorName && this.offeringName && this.state.amount && Util.isNumber(this.state.amount) && this.state.selectedDenomination ) {
            return (
                <Button
                    onClick={() => InvestmentActions.createInvestment(this.state.investorName, this.offeringName, parseFloat(this.state.amount), this.state.selectedDenomination)}
                    bsStyle="success"
                >
                    Invest {this.state.amount} {this.state.selectedDenomination}!
                </Button>
            )    
        }
        return null;
    }

    render() {
        return (
            <div>
                <h1>{this.offeringName}</h1>
                <TextEntryInput title="Your Name" placeholder="Bob Jones" buttonTitle="Input Name" setValue={this.setInvestorName} />
                {this.renderDenominationsDropdown()}
                {this.renderBiDirectionalCurrency()}
                <br></br>
                <br></br>
                {this.renderSubmitButton()}
            </div>
        )
    }
}