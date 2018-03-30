import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';
import InvestmentActions from '../actions/investmentActions';
import OfferingActions from '../actions/offeringActions';
import CreateOffering from './CreateOffering';
import moment from 'moment';

const investmentStatuses = {
    AWAITING_RESPONSE: 'awaitingResponse',
    WAITLISTED: 'waitListed',
    REJECTED: 'rejected',
    APPROVED: 'approved'
}

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newOfferingName: ''
        }
    }

    componentDidMount() {
        this.props.getInvestments();
    }

    renderApproveButton(investmentId, investmentStatus) {
        if (investmentStatus === investmentStatuses.WAITLISTED || investmentStatus === investmentStatuses.AWAITING_RESPONSE) {
            return (
                <Button bsStyle='primary'
                    onClick={() => this.props.updateInvestmentRequest(investmentId, 'accept')}
                >
                    Approve!
                </Button>
            )
        }
        return null;
    }

    renderRejectButton(investmentId, investmentStatus) {
        if (investmentStatus === investmentStatuses.WAITLISTED || investmentStatus === investmentStatuses.AWAITING_RESPONSE) {
            return (
                <Button bsStyle='primary'
                    onClick={() => this.props.updateInvestmentRequest(investmentId, 'reject')}
                >
                    Reject!
                </Button>
            )
        }
        return null;
    }

    render() {
        const {
            investments,
            isFetchingInvestments
        } = this.props

        if (isFetchingInvestments) {
            return (
                <div>GETTING INVESTMENT REQUESTS...</div>
            );
        }

        return (
            <div>
                <CreateOffering createOffering={this.props.createOffering} />
                <h1>Investment Requests</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Offering Name</th>
                            <th>Investor Name</th>
                            <th>Denomination</th>
                            <th>Denomination Amount</th>
                            <th>Exchange Rate Per Usd</th>
                            <th>Amount in USD</th>
                            <th>Created At</th>
                            <th>Investment Status</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map((investment, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{investment.offeringName}</td>
                                    <td>{investment.investorName}</td>
                                    <td>{investment.denomination}</td>
                                    <td>{investment.amount}</td>
                                    <td>{investment.USDPerDenomination}</td>
                                    <td>{investment.amountInUSD}</td>
                                    <td>{moment(investment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{investment.investmentStatus}</td>
                                    <td>
                                        {this.renderApproveButton(investment._id, investment.investmentStatus)}
                                    </td>
                                    <td>
                                        {this.renderRejectButton(investment._id, investment.investmentStatus)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.investment
}

const mapDispatchToProps = dispatch => ({
    getInvestments: () => {
        dispatch(InvestmentActions.getInvestments())
    },
    updateInvestmentRequest: (investmentId, action) => {
        dispatch(InvestmentActions.updateInvestmentRequest(investmentId, action))
    },
    createOffering: (name, maxInvestors, maxUSD) => {
        dispatch(OfferingActions.createOffering(name, maxInvestors, maxUSD))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);