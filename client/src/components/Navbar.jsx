import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
          <Link to="/favorites" className="nav-link">
            <span className="heart-icon">♥</span>
            Preferiti
          </Link>
          <Link to="/new-recipe" className="btn-primary">
            <span className="plus-icon">+</span>
            Nuova Ricetta
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
