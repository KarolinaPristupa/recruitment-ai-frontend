import './index.scss';
import App from './App';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import React from 'react';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
