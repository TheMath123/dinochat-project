import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import { MessagesProvide } from './contexts/MessagesContext';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MessagesProvide>
      <Home />
    </MessagesProvide>
  </React.StrictMode>,
);
