import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RoomContextProvider from './pages/room/context/RoomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </React.StrictMode>
);

