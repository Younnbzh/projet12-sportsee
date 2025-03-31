import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/api';
import '../styles/components/userKeyData.css';
import calorieIcon from '/energy.svg';
import proteinIcon from '/chicken.svg';
import carbIcon from '/apple.svg';
import fatIcon from '/cheeseburger.svg';
/**
* Composant userKeyData
* Affiche les données nutritionnelles (calories, protéines, glucides, lipides)
*/
function userKeyData({ userId }) {
  const [keyData, setKeyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données 
    const fetchKeyData = async () => {
      try {
        // Appel à l'API pour récupérer les données
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

  // Formatage des calories ajoute une virgule au milliers
  const formatCalories = (calories) => {
    return calories.toLocaleString('en-US');
  };

  if (error) return <div className="error">{error}</div>;
  if (!keyData) return <div className="error">Aucune donnée disponible</div>;

  return (
    <div className="key-data-container">
      {/* calories */}
      <div className="key-data-card">
        <div className="key-data-icon-container calorie-bg">
          <img src={calorieIcon} alt="Calories" className="key-data-icon" />
        </div>
        <div className="key-data-info">
          <p className="key-data-value">{formatCalories(keyData.calorieCount)}kCal</p>
          <p className="key-data-label">Calories</p>
        </div>
      </div>
      {/* protéines */}
      <div className="key-data-card">
        <div className="key-data-icon-container protein-bg">
          <img src={proteinIcon} alt="Protéines" className="key-data-icon" />
        </div>
        <div className="key-data-info">
          <p className="key-data-value">{keyData.proteinCount}g</p>
          <p className="key-data-label">Protéines</p>
        </div>
      </div>
      {/* glucides */}
      <div className="key-data-card">
        <div className="key-data-icon-container carb-bg">
          <img src={carbIcon} alt="Glucides" className="key-data-icon" />
        </div>
        <div className="key-data-info">
          <p className="key-data-value">{keyData.carbohydrateCount}g</p>
          <p className="key-data-label">Glucides</p>
        </div>
      </div>
      {/* lipides */}
      <div className="key-data-card">
        <div className="key-data-icon-container fat-bg">
          <img src={fatIcon} alt="Lipides" className="key-data-icon" />
        </div>
        <div className="key-data-info">
          <p className="key-data-value">{keyData.lipidCount}g</p>
          <p className="key-data-label">Lipides</p>
        </div>
      </div>
    </div>
  );
}

export default userKeyData;