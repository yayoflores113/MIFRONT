import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategoryStatsChart = ({ data }) => {
  // Formatear datos para Recharts
  const chartData = data.map(item => ({
    name: item.career,
    'Tiempo (horas)': Math.round(item.total_time / 60),
    'Cursos': item.courses_count,
    'Completados': item.completed,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #ccc',
              borderRadius: '8px' 
            }}
          />
          <Legend />
          <Bar dataKey="Tiempo (horas)" fill="#2CBFF0" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Cursos" fill="#8884d8" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Completados" fill="#82ca9d" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryStatsChart;