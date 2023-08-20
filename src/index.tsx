import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { registerSW } from 'virtual:pwa-register'

ReactDOM.render(<App />, document.getElementById('root'));

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("Needs refresh");
    updateSW();
  },
  onOfflineReady() {
    console.log("Offline ready");
  },
})