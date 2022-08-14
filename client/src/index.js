import React from 'react';
import ReactDOM from 'react-dom/client';
import { ActionCableProvider } from 'react-actioncable-provider';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActionCableProvider url='ws://localhost:3000/cable'>
      <App />
    </ActionCableProvider>
  </React.StrictMode>
);
