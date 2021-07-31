import 'core-js';
import 'regenerator-runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import './main.scss';

import App from 'components/App';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'));
