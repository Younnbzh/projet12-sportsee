import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserData } from './services/api';
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
  // État pour suivre si l'utilisateur existe
  const [userExists, setUserExists] = useState(true);

  // Vérifie si l'utilisateur existe
  useEffect(() => {
    const checkUser = async () => {
      const userData = await getUserData(userId);
      if (!userData) {
        setUserExists(false);
      }
    };

    checkUser();
  }, [userId]);

  // Redirige vers la page erreur si l'utilisateur n'existe pas
  if (!userExists) {
    return <Navigate to="/error-user" />;
  }
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