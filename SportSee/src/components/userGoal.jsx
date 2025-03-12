import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/api';
import '../styles/components/userGoal.css';

function userGoal({ userId }) {
  const [goalData, setGoalData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await getUserData(userId);
        if (data) {
          setGoalData(data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } 
      catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } 
    };
    fetchGoalData();
  }, [userId]);

  if (error) return <div className="error">{error}</div>;
  if (!goalData) return <div className="error">Aucune donnée disponible</div>;
  
  return (
    console.log('goalData:', goalData)
  );
}

export default userGoal;