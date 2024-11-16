import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssFiles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './AuthContext';
import ScrollProvider from './ScrollContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScrollProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ScrollProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
