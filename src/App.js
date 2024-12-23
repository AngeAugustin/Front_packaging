import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connexion from './Pages/Connexion';
import { AuthProvider } from './Pages/AuthContext';
import Inscription from './Pages/Inscription';
import Ventes from './Pages/Ventes';
import Vendre from './Pages/Vendre';
import Stocks from './Pages/Stocks';
import Stocker from './Pages/Stocker';
import Clients from './Pages/Clients';
import Stats from './Pages/Stats';
import Produits from './Pages/Produits';
import Notifications from './Pages/Notifications';
import Init from './Pages/Init';
import Layout from './Layout'; 
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques, sans Layout */}
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Inscription />} />

          {/* Routes protégées avec Layout */}
          <Route path="/" element={<Layout />}>
          <Route index element={<Ventes />} />
            <Route path="Ventes" element={<Ventes />} />
            <Route path="Vendre" element={<Vendre />} />
            <Route path="Stocks" element={<Stocks />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="Stocker" element={<Stocker />} />
            <Route path="Clients" element={<Clients />} />
            <Route path="Stats" element={<Stats />} />
            <Route path="Produits" element={<Produits />} />
            <Route path="Init" element={<Init />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
