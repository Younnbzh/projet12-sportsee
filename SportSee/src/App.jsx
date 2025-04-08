import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import HorizontalNav from './components/Navigation/HorizontalNav';
import VerticalNav from './components/navigation/VerticalNav';
import UserProfile from './components/UserProfile';
import UserActivity from './components/UserActivity';
import UserAverage from './components/UserAverage';
import UserGoal from './components/UserGoal';
import UserActivityType from './components/UserActivityType';
import UserKeyData from './components/UserKeyData';

import './styles/main.css';

function App() {
  // Récupére id user dans l'url
  const { id } = useParams();
  // par défaut si aucun trouvé
  const userId = id || 12;
  return (
<div className="app">
      <HorizontalNav />
      <div className="main-container">
        <VerticalNav />
        <main className="content">
          <UserProfile userId={userId} />
          <div className="dashboard-container">
            <div className="charts-container">
              <div className="activity-container">
                <UserActivity userId={userId} />
              </div>
              <div className="small-charts-container">
                <UserAverage userId={userId} />
                <UserActivityType userId={userId} />
                <UserGoal userId={userId} />
              </div>
            </div>
            <div className="key-data-section">
              <UserKeyData userId={userId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;