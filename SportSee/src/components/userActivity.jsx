import React, { useState, useEffect } from 'react';
import { getUserActivity } from '../services/api';
import '../styles/components/userActivity.css';

function userActivity({ userId }) {
  const [activityData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserActivity(userId);
        if (data) {
          setUserData(data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } 
      catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } 
    };
    fetchUserData();
  }, [userId]);

  if (error) return <div className="error">{error}</div>;
  if (!activityData) return <div className="error">Aucune donnée disponible</div>;
  return (
    console.log(activityData)
  );
}

export default userActivity;