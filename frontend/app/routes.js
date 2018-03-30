import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Admin from './components/Admin';
import OfferingList from './components/offeringList';
import Invest from './components/Invest';
import history from './history';

export default () => {
  return (
      <Router history={history}>
        <div>
          <Route
            path="/"
            render={(props) => <App {...props} />} />
          <Route
            path="/admin"
            render={(props) => <Admin {...props} />} />
          <Route
            path="/list"
            render={(props) => <OfferingList {...props} />} />
          <Route
            path="/invest"
            render={(props) => <Invest {...props} />} />
        </div>
      </Router>
  );
}
