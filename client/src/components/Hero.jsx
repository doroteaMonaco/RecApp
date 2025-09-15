import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Condividi la tua{' '}
          <span className="highlight">passione culinaria</span>
        </h1>
        <p className="hero-subtitle">
          Scopri ricette fit autentiche, condividi i tuoi segreti in cucina e connettiti con chef 
          appassionati da tutta Italia.
        </p>
        <div className="hero-actions">
          <button className="btn-explore">Esplora Ricette</button>
          <button className="btn-community">Unisciti alla Community</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
