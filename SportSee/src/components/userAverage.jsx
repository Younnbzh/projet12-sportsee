import React, { useState, useEffect } from 'react';
import { getUserAverage } from '../services/api';
import '../styles/components/userAverage.css';

function userAverage({ userId }) {
  const [averageData, setAverageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageData = async () => {
      try {
        const data = await getUserAverage(userId);
        if (data) {
          setAverageData(data);
        } else {
          setError('Utilisateur non trouvé');
        }
      } 
      catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } 
    };
    fetchAverageData();
  }, [userId]);

  if (error) return <div className="error">{error}</div>;
  if (!averageData) return <div className="error">Aucune donnée disponible</div>;
  
  return (
    console.log('averageData:', averageData)
  );
}

export default userAverage;