import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import OfferingActions from '../actions/offeringActions';
import moment from 'moment';

class OfferingList extends Component {

  componentDidMount() {
      this.props.getOfferings();
  }

  render () {
    const {
      offerings,
      isFetchingOfferings
    } = this.props

    if (isFetchingOfferings) {
      return (
        <div>GETTING INVESTMENT OFFERINGS...</div>
      );
    }
    
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Max USD Investment</th>
            <th>Current USD Investment</th>
            <th>Max Investors</th>
            <th>Current Investors</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {offerings.map((offering, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{offering.name}</td>
                <td>{offering.maxUSD}</td>
                <td>{offering.currentUSD}</td>
                <td>{offering.maxInvestors}</td>
                <td>{offering.currentInvestors}</td>
                <td>{moment(offering.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>
                  <Button bsStyle='primary' 
                    onClick={
                    () => {
                    this.props.history.replace({
                      state: { offeringName: offering.name },
                      pathname: '/invest'})}
                    }
                  >
                    Invest!
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return state.offering
}

const mapDispatchToProps = dispatch => ({
  getOfferings: () => {
    dispatch(OfferingActions.getOfferings())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OfferingList);