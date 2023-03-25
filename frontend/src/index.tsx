import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ModalProvider from 'components/Modal/ModalProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
);
