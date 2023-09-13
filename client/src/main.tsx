import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
//import './index.css';
import CustomerContextProvider from './context/CustomerContext.tsx';
import CartContextProvider from './context/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </CustomerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
