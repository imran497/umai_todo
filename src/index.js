import React from 'react'
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';

import reduxStore from './common/ReduxStore';

import AppContainer from './containers/AppContainer';

import './index.scss';

ReactDOM.render(
  <Provider store={reduxStore}>
    <AppContainer/>
  </Provider>,
  document.getElementById('root')
)
