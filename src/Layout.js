import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './Pages/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBoxes,
  faUsers,
  faFileAlt,
  faSignOutAlt,
  faUserCircle,
  faBell, // Ajout de l'icône pour Notifications
} from '@fortawesome/free-solid-svg-icons';

const Layout = () => {

  const { Email_user } = useAuth();
  const { Username } = useAuth();
  return (
    <div className="dashboard-container">
      {/* Barre supérieure */}
      <header className="top-bar">
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <div className="user-details">
            <span className="user-name">{Username}</span>
            <span className="user-email">{Email_user}</span>
          </div>
        </div>
      </header>

      {/* Barre latérale */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ marginBottom: '10px' }}>
          <img
            src="https://i.postimg.cc/rFCP5vjM/SKY-P.png"
            alt="Logo"
            className="sidebar-image"
            style={{ width: '100px', height: '100px', marginBottom: '5px' }}
          />
        </div>
        <nav>
          <ul>
            <li>
              {Username === 'Admin' && (
                <NavLink
                  to="/produits"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
                  Produits
                </NavLink>
              )}
            </li>
            <li>
              {Username === 'Admin' && (
                <NavLink
                  to="/notifications"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <FontAwesomeIcon icon={faBell} className="menu-icon" />
                  Notifications
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/ventes"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
                Ventes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stocks"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faBoxes} className="menu-icon" />
                Stocks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clients"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faUsers} className="menu-icon" />
                Clients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stats"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faFileAlt} className="menu-icon" />
                Rapports
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Lien Déconnexion */}
        <div className="logout-section">
          <a href="/connexion" className="logout-link">
            <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
            Déconnexion
          </a>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
 