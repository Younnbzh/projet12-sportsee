import React, { useState, useEffect } from 'react';
import { getUserAverage } from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import '../styles/components/userAverage.css';

function userAverage({ userId }) {
  const [averageData, setAverageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageData = async () => {
      try {
        const data = await getUserAverage(userId);
        if (data) {
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

  // formattage
  const getDayLabel = (day) => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return days[day - 1];
  };
  // tooltip
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
  // effet survol
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
      <ResponsiveContainer>
        <LineChart
          data={averageData}
          margin={{ top: 40, right: 10, left: 10, bottom: 10 }}
        >
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