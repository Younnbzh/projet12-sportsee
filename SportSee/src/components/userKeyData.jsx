import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/api';
import '../styles/components/userKeyData.css';

function userKeyData({ userId }) {
  const [keyData, setKeyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeyData = async () => {
      try {
        const data = await getUserData(userId);
        if (data && data.keyData) {
          setKeyData(data.keyData);
        } else {
          setError('Utilisateur non trouvé');
        }
      } 
      catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } 
    };
    fetchKeyData();
  }, [userId]);

  if (error) return <div className="error">{error}</div>;
  if (!keyData) return <div className="error">Aucune donnée disponible</div>;
  
  return (
    console.log('keyData:', keyData)
  );
}

export default userKeyData;