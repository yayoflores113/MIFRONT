import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CoursesProgressChart = ({ data = [] }) => {
  // Si no hay datos, mostrar un mensaje
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Progreso por Curso</h3>
        <p className="text-gray-500 text-center py-8">No hay datos de progreso disponibles</p>
      </div>
    );
  }

  // Formatear datos para el gráfico
  const chartData = data.map(course => ({
    name: course.course_title || course.name || 'Sin nombre',
    progreso: course.progress || 0,
    completados: course.completed_lessons || 0,
    total: course.total_lessons || 0,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Progreso por Curso</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm text-gray-600">
                      Progreso: {data.progreso}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Lecciones: {data.completados}/{data.total}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar 
            dataKey="progreso" 
            fill="#3b82f6" 
            name="Progreso (%)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Tabla resumen */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Curso
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Progreso
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Lecciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((course, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {course.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${course.progreso}%` }}
                      />
                    </div>
                    <span className="font-medium">{course.progreso}%</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {course.completados}/{course.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesProgressChart;