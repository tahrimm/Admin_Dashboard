import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://admin-dashboard-backend-1sc0.onrender.com/api/users');
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  // Extract impact values and calculate distribution
  const calculateImpactDistribution = () => {
    const impactCounts = {};
    data.forEach(item => {
      const impact = item.impact;
      impactCounts[impact] = (impactCounts[impact] || 0) + 1;
    });
    return Object.entries(impactCounts).map(([impact, count]) => ({
      impact: parseInt(impact),
      count: count
    }));
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const impactDistribution = calculateImpactDistribution();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // you can add more colors if needed

  if (loading) {
    return <div><br /> Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={impactDistribution}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="count"
        >
          {impactDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
