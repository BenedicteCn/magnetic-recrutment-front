import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextWrapper } from './context/auth.context.jsx';
import { SearchContextWrapper } from './context/search.context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <SearchContextWrapper>
          <App />
        </SearchContextWrapper>
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
