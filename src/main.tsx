import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Entry Point:
 * This is where the React application is mounted into the DOM.
 * 'ReactDOM.createRoot' initializes the app inside the 'root' div 
 * from the index.html file.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  /**
   * React.StrictMode:
   * A development-only tool that checks for potential problems in your app.
   * It helps identify things like unsafe lifecycles or unexpected side effects.
   */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
