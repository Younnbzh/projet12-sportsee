import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/api';
import '../styles/components/userKeyData.css';
import calorieIcon from '/energy.svg';
import proteinIcon from '/chicken.svg';
import carbIcon from '/apple.svg';
import fatIcon from '/cheeseburger.svg';

/**
 * Composant NutritionCard 
 * Affiche une carte d'information nutritionnelle
 */
function NutritionCard({ icon, bgClass, value, unit, label, formatValue }) {
  // Si une fonction de formatage est fournie, l'utiliser, sinon afficher la valeur telle quelle
  const displayValue = formatValue ? formatValue(value) : value;
  
  return (
    <div className="key-data-card">
      <div className={`key-data-icon-container ${bgClass}`}>
        <img src={icon} alt={label} className="key-data-icon" />
      </div>
      <div className="key-data-info">
        <p className="key-data-value">{displayValue}{unit}</p>
        <p className="key-data-label">{label}</p>
      </div>
    </div>
  );
}

/**
* Composant userKeyData
* Affiche les données nutritionnelles (calories, protéines, glucides, lipides)
*/
function UserKeyData({ userId }) {
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

  // Définition des cartes 
  const nutritionCards = [
    {
      icon: calorieIcon,
      bgClass: 'calorie-bg',
      value: keyData.calorieCount,
      unit: 'kCal',
      label: 'Calories',
      formatValue: formatCalories
    },
    {
      icon: proteinIcon,
      bgClass: 'protein-bg',
      value: keyData.proteinCount,
      unit: 'g',
      label: 'Protéines'
    },
    {
      icon: carbIcon,
      bgClass: 'carb-bg',
      value: keyData.carbohydrateCount,
      unit: 'g',
      label: 'Glucides'
    },
    {
      icon: fatIcon,
      bgClass: 'fat-bg',
      value: keyData.lipidCount,
      unit: 'g',
      label: 'Lipides'
    }
  ];

  return (
    <div className="key-data-container">
      {nutritionCards.map((card, index) => (
        <NutritionCard
          key={index}
          icon={card.icon}
          bgClass={card.bgClass}
          value={card.value}
          unit={card.unit}
          label={card.label}
          formatValue={card.formatValue}
        />
      ))}
    </div>
  );
}
export default UserKeyData;