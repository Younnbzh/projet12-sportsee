import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/error404.css';
import logoSportSee from '/logo.svg'; 

function error404() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={logoSportSee} alt="SportSee Logo" className="not-found-logo" />
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oups! La page que vous demandez n'existe pas.</p>
        <Link to="/" className="not-found-link">
          Retourner sur la page d'accueil
        </Link>
      </div>
    </div>
  );
}

export default error404;