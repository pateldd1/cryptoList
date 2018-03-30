import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-with-styles';
import 'react-dates/initialize';

import { configureStore } from './store'
import Root from './root'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

  ReactDOM.render(<Root store={store} />, root);
});
