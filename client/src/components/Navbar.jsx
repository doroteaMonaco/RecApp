import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se c'è un utente loggato nel localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Errore nel parsing dei dati utente:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Chiamata al backend per logout (opzionale)
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }

    // Rimuovi dati dal localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);

    // Redirect alla home
    navigate('/');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍽️</span>
          RecApp
        </Link>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Cerca ricette, ingredienti..."
            className="search-input"
          />
        </div>

        <div className="navbar-actions">
          {user ? (
            // Utente loggato
            <>
              <Link to="/favorites" className="nav-link">
                <span className="heart-icon">♥</span>
                Preferiti
              </Link>
              <Link to="/new-recipe" className="btn-primary">
                <span className="plus-icon">+</span>
                Nuova Ricetta
              </Link>

              {/* Menu utente */}
              <div className="user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="user-menu-button"
                >
                  <img
                    src={user.avatar || '/api/placeholder/32/32'}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <span className="user-name">{user.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <img
                        src={user.avatar || '/api/placeholder/32/32'}
                        alt={user.name}
                        className="user-avatar-large"
                      />
                      <div className="user-details">
                        <div className="user-name-large">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button onClick={() => navigate('/profile')} className="dropdown-item">
                      Il mio profilo
                    </button>
                    <button onClick={() => navigate('/my-recipes')} className="dropdown-item">
                      Le mie ricette
                    </button>
                    <button onClick={() => navigate('/settings')} className="dropdown-item">
                      Impostazioni
                    </button>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Utente non loggato
            <>
              <Link to="/login" className="nav-link">
                Accedi
              </Link>
              <Link to="/signup" className="btn-primary">
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay per chiudere il menu quando si clicca fuori */}
      {showUserMenu && (
        <div
          className="menu-overlay"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
