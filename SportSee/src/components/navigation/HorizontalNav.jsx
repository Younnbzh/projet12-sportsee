import React from 'react';
import '/src/styles/components/navigation/HorizontalNav.css';

function HorizontalNav() {
  return (
    <nav className="horizontal-nav">
      <div className="logo">
        <img src="/logo.svg" alt="SportSee Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Profil</a></li>
        <li><a href="#">Réglage</a></li>
        <li><a href="#">Communauté</a></li>
      </ul>
    </nav>
  );
}

export default HorizontalNav;