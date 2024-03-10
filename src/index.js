import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';
import 'bootstrap/dist/css/bootstrap.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <FavoritesProvider>
          <App />
      </FavoritesProvider>
    </Router>
  </React.StrictMode>
);