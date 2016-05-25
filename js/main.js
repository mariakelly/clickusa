// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var ClickUSAMain = require('./components/ClickUSAMain.jsx');
var $ = require('jquery');

import { Provider } from 'react-redux';
import { createStore } from 'redux';

ReactDOM.render(
  <ClickUSAMain
    id='clickusa-display'
    mapData={parseMapData('clickusa-display')}
    mapLegend={legends['clickusa-display']}
    onStateAdded={null}
    onStateRemoved={null}
    hoverEnabled={true}
    compareEnabled={true}>
  </ClickUSAMain>,
  document.getElementById('clickusa-map')
);