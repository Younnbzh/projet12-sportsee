import React, { useState, useEffect } from 'react';
import { getUserAverage } from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import '../styles/components/userAverage.css';
/**
* Composant userAverage
* Affiche un graphique représentant la durée moyenne des sessions d'entraînement
*/
function userAverage({ userId }) {
  const [averageData, setAverageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données 
    const fetchAverageData = async () => {
      try {
        // Appel à l'API pour récupérer les données
        const data = await getUserAverage(userId);
        if (data) {
          // Formatage des données pour le graphique avec conversion des jours en lettres avec getDayLabel(day)
          const formattedData = data.sessions.map(session => ({
            day: getDayLabel(session.day),
            sessionLength: session.sessionLength
          }));
          setAverageData(formattedData);
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

  // Conversion (1-7) en (L,M,M,J,V,S,D)
  const getDayLabel = (day) => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return days[day - 1];
  };
  // personnalisation de l'infobulle au survol 
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="average-tooltip">
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };
  // Effet d'assombrissement lors du survol avec un rectangle avec une opacité de 0.15 (a droite du point du cursor x={points[0].x})
  const CustomCursor = ({ points }) => {
    return (
      <Rectangle
        fill="rgba(0, 0, 0, 0.15)"
        x={points[0].x}
        width={500}
        height={300}
      />
    );
  };

  if (error) return <div className="error">{error}</div>;
  if (!averageData) return <div className="error">Aucune donnée disponible</div>;

  return (
    <div className="average-chart">
      <h3 className="average-title">Durée moyenne des sessions</h3>
      {/* Graphique Axe X jours de la semaine / axe Y durée */}
      <ResponsiveContainer>
        <LineChart
          data={averageData}
          margin={{ top: 40, right: 10, left: 10, bottom: 10 }}
        >
           {/* Dégradé de la ligne du graphique (blanc opa 0.4 à blanc opa 1) */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            hide={true}
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "rgba(255, 255, 255, 0.6)",
              strokeWidth: 2,
              fill: "white"
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default userAverage;