import React from 'react';
import HorizontalNav from './components/Navigation/HorizontalNav';
import VerticalNav from './components/navigation/VerticalNav';
import UserProfile from './components/userProfile';
import UserActivity from './components/userActivity';
import UserAverage from './components/userAverage';
import UserGoal from './components/userGoal';
import UserActivityType from './components/userActivityType';
import UserKeyData from './components/userKeyData';

import './styles/main.css';

function App() {
  const userId = 18;
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