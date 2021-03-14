import App from '../shared/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createClientStore } from '../shared/store';
import { Provider } from 'react-redux';

// console.log(document.getElementById('root'));

ReactDOM.render(
  <Provider store={createClientStore()}>
    <Router>
      <App></App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
