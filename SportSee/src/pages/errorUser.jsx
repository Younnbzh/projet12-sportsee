import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/errorUser.css';
import logoSportSee from '/logo.svg'; 

function errorUser() {
  return (
    <div className="user-not-found-container">
      <div className="user-not-found-content">
        <img src={logoSportSee} alt="SportSee Logo" className="user-not-found-logo" />
        <h1 className="user-not-found-title">Utilisateur non trouvé</h1>
        <p className="user-not-found-message">
          Cet utilisateur n'existe pas.
        </p>
        <Link to="/" className="user-not-found-link">
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default errorUser;