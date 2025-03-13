import React, { useState, useEffect } from 'react';
import { getUserActivity } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/components/userActivity.css';

function userActivity({ userId }) {
  const [activityData, setActivityData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserActivity(userId);
        if (data) {
          const formattedData = data.sessions.map((session, index) => ({
            day: index + 1,
            kilogram: session.kilogram,
            calories: session.calories
          }));
          setActivityData(formattedData);
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

  // tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="kg">{`${payload[0].value}kg`}</p>
          <p className="cal">{`${payload[1].value}Kcal`}</p>
        </div>
      );
    }
    return null;
  };

  if (error) return <div className="error">{error}</div>;
  if (!activityData) return <div className="error">Aucune donnée disponible</div>;
  return (
    <div className="activity-chart">
      <div className="chart-header">
        <h3 className="chart-title">Activité quotidienne</h3>
        <div className="legend-container">
          <div className="legend-item">
            <div className="legend-dot black"></div>
            <span>Poids (kg)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot red"></div>
            <span>Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={activityData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontalPoints={[20, 140]} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={{ stroke: '#DEDEDE' }}
            tick={{ fill: '#9B9EAC' }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#8884d8"
            hide
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#8884d8"
            domain={['dataMin - 2', 'dataMax + 1']}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9B9EAC' }}
            tickCount={3}
            tickFormatter={(value) => Math.round(value)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.5, fill: '#C4C4C4' }} />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default userActivity;