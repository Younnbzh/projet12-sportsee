import React from 'react';
import '../../styles/components/navigation/VerticalNav.css';

function VerticalNav() {
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
      <div className="copyright">Copyright, SportSee 2025</div>
    </nav>
  );
}

export default VerticalNav;