import React, { useState, useEffect } from 'react';
import { getUserActivityType } from '../services/api';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../styles/components/userActivityType.css';
/**
* Composant userActivityType
* Affiche un graphique radar présentant les différents types d'activités de l'utilisateur.
*/
function userActivityType({ userId }) {
  const [activityTypeData, setActivityTypeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données 
    const fetchActivityTypeData = async () => {
      try {
        // Appel à l'API pour récupérer les données
        const data = await getUserActivityType(userId);
        if (data) {
          // Ordre spécifique des types d'activités
          const orderedTypes = [
            "Intensité",
            "Vitesse", 
            "Force", 
            "Endurance", 
            "Énergie", 
            "Cardio"
          ];
          // Création du mapping entre ID et types d'activités grâce à la fonction translateActivityType(activityType)
          const kindMap = {};
          for (const [key, value] of Object.entries(data.kind)) {
            kindMap[key] = translateActivityType(value);
          }
          // Reorganisation du tableau des data pour respecter l'ordre souhaité
          const formattedData = orderedTypes.map(type => {
            const kindId = Object.keys(kindMap).find(key => kindMap[key] === type);
            const dataItem = data.data.find(item => item.kind === parseInt(kindId));
            return {
              // Si on a trouvé une valeur, on l'utilise, sinon on met 0
              value: dataItem ? dataItem.value : 0,
              activityType: type
            };
          });
          
          setActivityTypeData(formattedData);
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

  // Fonction de traduction des types d'activités en français
  const translateActivityType = (activityType) => {
    switch(activityType.toLowerCase()) {
      case 'cardio':
        return 'Cardio';
      case 'energy':
        return 'Énergie';
      case 'endurance':
        return 'Endurance';
      case 'strength':
        return 'Force';
      case 'speed':
        return 'Vitesse';
      case 'intensity':
        return 'Intensité';
      default:
        return activityType;
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!activityTypeData) return <div className="error">Aucune donnée disponible</div>;

  return (
    <div className="activity-type-chart">
      {/* Graphique radar Intensité / Vitesse / Force / Endurance / Énergie / Cardio */}
      <ResponsiveContainer width="100%" height={263}>
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={activityTypeData}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis 
            dataKey="activityType" 
            tick={{ fontSize: 12, fill: 'white' }} 
            axisLine={false}
            tickLine={false}
          />
          <Radar 
            name="Performance" 
            dataKey="value" 
            fill="#FF0101" 
            fillOpacity={0.7} 
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default userActivityType;