import React, { useState, useEffect } from 'react';
import { getUserInfos } from '../services/api';
import '../styles/components/userInfos.css';

function userInfos({ userId }) {
  const [infosData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserInfos(userId);
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
  if (!infosData) return <div className="error">Aucune donnée disponible</div>;
  return (
    console.log('infosData' + infosData)
  );
}
export default userInfos;