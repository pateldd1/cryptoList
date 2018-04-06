import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './assets/css/App.css';

export default class App extends Component {

  goTo = (route) => {
    this.props.history.replace(`/${route}`)
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">MiniCoinList</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.goTo('admin')}
            >
              Admin
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.goTo('list')}
            >
              Offering List
            </Button>            
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

