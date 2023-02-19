import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App
      contentServiceUrl={import.meta.env.VITE_CONTENT_SERVICE_URL}
    />
  </React.StrictMode>,
);
