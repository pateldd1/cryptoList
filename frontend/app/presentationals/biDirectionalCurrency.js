import React from 'react'
import { Form, FormGroup, Col, Button, FormControl, ControlLabel } from 'react-bootstrap'


export default class BiDirectionalCurrency extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usdAmount: '',
            otherDenominationAmount: ''
        }
        this.handleUSDTextChange = this.handleUSDTextChange.bind(this);
        this.handleDenominationTextChange = this.handleDenominationTextChange.bind(this);
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.denomination !== 'USD') {

            if (prevState.usdAmount !== this.state.usdAmount) {
                this.setState({
                    otherDenominationAmount: ((parseFloat(this.state.usdAmount) / parseFloat(this.props.USDPerDenomination)) || '').toString()
                });
            }
            else if (prevState.otherDenominationAmount !== this.state.otherDenominationAmount) {
                this.setState({
                    usdAmount: ((parseFloat(this.state.otherDenominationAmount) * parseFloat(this.props.USDPerDenomination)) || '').toString()
                });
            }

        }
    }

    handleUSDTextChange(event) {
        this.setState({ usdAmount: event.target.value });
    }

    handleDenominationTextChange(event) {
        this.setState({ otherDenominationAmount: event.target.value });
    }

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                { this.props.denomination !== 'USD' ? <h4>Exchange Rate: {this.props.USDPerDenomination} USD Per {this.props.denomination}</h4> : null }
                <h4>Paying In {this.props.denomination}</h4>
                <form>
                    <FormGroup controlId="formControlsText">
                        <ControlLabel>USD</ControlLabel>
                        <FormControl
                            onChange={this.handleUSDTextChange}
                            type="text"
                            placeholder={'Enter USD Amount'}
                            value={this.state.usdAmount}
                        />
                    </FormGroup>
                    {
                        (this.props.denomination !== 'USD') && (
                            <FormGroup controlId="formControlsText">
                                <ControlLabel>{this.props.denomination}</ControlLabel>
                                <FormControl
                                    onChange={this.handleDenominationTextChange}
                                    type="text"
                                    placeholder={`Enter ${this.props.denomination} Amount`}
                                    value={this.state.otherDenominationAmount}
                                />
                            </FormGroup>
                        )
                    }
                    <Button
                        onClick={() => {
                            this.props.denomination === 'USD' ? this.props.setAmount(this.state.usdAmount) : this.props.setAmount(this.state.otherDenominationAmount)
                        }}
                        bsStyle="primary">Set Amount!
                    </Button>
                </form>
            </div>
        )
    }
}