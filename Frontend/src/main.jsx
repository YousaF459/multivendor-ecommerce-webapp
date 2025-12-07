import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './Store/store.js';
import {AuthProvider} from '../src/ContextStore/UserAuth'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './global.css'
import { CartProvider } from "./Views/Plugin/Context"


createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <CartProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
    </CartProvider>
  </Provider>
)
