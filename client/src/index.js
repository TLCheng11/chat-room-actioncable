import React from 'react';
import ReactDOM from 'react-dom/client';
import { createContext } from 'react'

import './index.css';
import App from './App';
import actionCable from 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable') // change to whatever port your server uses
export const ActionCableContext = createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActionCableContext.Provider value={CableApp.cable}>
      <App />
    </ActionCableContext.Provider>
  </React.StrictMode>
);
