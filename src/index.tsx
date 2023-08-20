import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { registerSW } from 'virtual:pwa-register'

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("Needs refresh");
    updateSW();
  },
  onOfflineReady() {
    console.log("Offline ready");
  },
})