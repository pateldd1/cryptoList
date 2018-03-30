import React, { Component } from 'react';
import { Table, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';
import Util from '../utils/util';

export default class CreateOffering extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            maxUSD: '',
            maxInvestors: ''
        };
        this.createOffering = this.createOffering.bind(this);
    }

    createOffering() {
        const {
            name,
            maxUSD,
            maxInvestors
        } = this.state;
        
        if (name && maxUSD && maxInvestors && Util.isNumber(maxUSD) && Util.isNumber(maxInvestors)) {
            this.props.createOffering(name, parseInt(maxInvestors), parseFloat(maxUSD))
        } 
        else {
            alert('cannot create offering as is!');
        }
    }

    handleOfferingChange = (event) => {
        this.setState({ name: event.target.value })
    }

    handleMaxUSDChange = (event) => {
        this.setState({ maxUSD: event.target.value })
    }

    handleMaxInvestorsChange = (event) => {
        this.setState({ maxInvestors: event.target.value })
    }

    getValidationState(val) {
        if (val === '') {
            return null;
        }
        else if (Util.isNumber(val)) {
            return 'success';
        }
        else {
            return 'error';
        }
    }

    render() {
        return (
            <div>
                <h2>CREATE OFFERING</h2>
                <form>
                    <FormGroup
                        controlId='formBasicText'
                        
                    >
                        <ControlLabel>Offering Name</ControlLabel>
                        <FormControl
                            onChange={this.handleOfferingChange}
                            type="text"
                            placeholder={'UNIVERSAL HAVE FUN TOKEN (UHFT)'}
                            value={this.state.newOfferingName}
                        />
                    </FormGroup>
                    <FormGroup
                        controlId='formBasicText'
                        validationState={this.getValidationState(this.state.maxUSD)}
                    >
                        <ControlLabel>Maximum USD</ControlLabel>
                        <FormControl
                            onChange={this.handleMaxUSDChange}
                            type="text"
                            placeholder={'10000000'}
                            value={this.state.newOfferingName}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on numeric input</HelpBlock>
                    </FormGroup>
                    <FormGroup
                        controlId='formBasicText'
                        validationState={this.getValidationState(this.state.maxInvestors)}
                    >
                        <ControlLabel>Maximum Investors</ControlLabel>
                        <FormControl
                            onChange={this.handleMaxInvestorsChange}
                            type="text"
                            placeholder={'25'}
                            value={this.state.maxInvestors}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on numeric input</HelpBlock>
                    </FormGroup>
                </form>
                <Button
                    onClick={this.createOffering}
                    bsStyle="primary">
                    CREATE!
                </Button>
            </div>
        )
    }
}