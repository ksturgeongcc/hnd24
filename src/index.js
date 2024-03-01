// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
      
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
};

// Check if React 18 features are supported
if (ReactDOM.createRoot) {
  renderApp();
} else {
  console.error('Error: React 18 features are not supported in this environment.');
}
