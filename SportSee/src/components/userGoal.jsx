import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/api';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import '../styles/components/userGoal.css';

function userGoal({ userId }) {
  const [goalData, setGoalData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await getUserData(userId);
        if (data) {
          // correction des données pour accepter score ou todayScore
          const score = data.score || data.todayScore;
          const formattedData = [
            {
              name: 'Score',
              value: score * 100,
              fill: '#FF0000'
            }
          ];
          setGoalData(formattedData);
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
    <div className="goal-chart">
      <h3 className="goal-title">Score</h3>
      <div className="background-circle"></div>
      <div className="score-container">
        <div className="score-value">
          <span className="score-percentage">{goalData[0].value}%</span>
          <span className="score-text">de votre<br />objectif</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="80%" 
          barSize={10} 
          data={goalData} 
          startAngle={210} 
          endAngle={-150}
        >
          <PolarAngleAxis 
            type="number" 
            domain={[0, 100]} 
            angleAxisId={0} 
            tick={false} 
          />
          <RadialBar
            background={false}
            clockWise
            dataKey="value"
            cornerRadius={10}
            fill="#FF0000"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default userGoal;