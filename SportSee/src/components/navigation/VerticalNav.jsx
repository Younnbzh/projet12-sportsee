import React from 'react';
import '../../styles/components/navigation/VerticalNav.css';
/**
* Composant VerticalNav
* Barre de navigation verticale
*/
function VerticalNav() {
  // année courante
  const currentYear = new Date().getFullYear();
  return (
    <nav className="vertical-nav">
      <div className="nav-icons">
        <a href="#" className="icon-link">
          <div className="nav-icon cat1"></div>
        </a>
        <a href="#" className="icon-link">
          <div className="nav-icon cat2"></div>
        </a>
        <a href="#" className="icon-link">
          <div className="nav-icon cat3"></div>
        </a>
        <a href="#" className="icon-link">
          <div className="nav-icon cat4"></div>
        </a>
      </div>
      <div className="copyright">Copyright, SportSee {currentYear}</div>
    </nav>
  );
}

export default VerticalNav;