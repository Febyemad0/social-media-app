import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import UserContextProvider from './Context/UserContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </UserContextProvider>

)
