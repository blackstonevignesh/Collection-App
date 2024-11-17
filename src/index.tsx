import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure you have this file for global styles
import App from './App.tsx'; // Ensure App.tsx exists in the same directory
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to measure performance in your app, pass a function to log results
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
