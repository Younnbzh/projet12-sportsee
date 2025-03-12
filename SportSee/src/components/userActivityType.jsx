import React, { useState, useEffect } from 'react';
import { getUserActivityType } from '../services/api';
import '../styles/components/userActivityType.css';

function userActivityType({ userId }) {
  const [activityTypeData, setActivityTypeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityTypeData = async () => {
      try {
        const data = await getUserActivityType(userId);
        if (data) {
          setActivityTypeData(data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } 
      catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } 
    };
    fetchActivityTypeData();
  }, [userId]);

  if (error) return <div className="error">{error}</div>;
  if (!activityTypeData) return <div className="error">Aucune donnée disponible</div>;
  
  return (
    console.log('activityTypeData:', activityTypeData)
  );
}

export default userActivityType;