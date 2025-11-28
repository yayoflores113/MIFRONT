import React from 'react';
import { Tooltip } from '@heroui/react';

const ActivityHeatmap = ({ data }) => {
  // Generar todos los días del último año
  const generateYearDays = () => {
    const days = [];
    const today = new Date();
    const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    for (let d = new Date(yearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d).toISOString().split('T')[0]);
    }
    
    return days;
  };

  const allDays = generateYearDays();
  
  // Crear mapa de actividad
  const activityMap = {};
  data.forEach(item => {
    activityMap[item.date] = item;
  });

  // Colores según nivel de actividad (tipo GitHub)
  const getColor = (level) => {
    const colors = {
      0: 'bg-gray-100',
      1: 'bg-green-200',
      2: 'bg-green-400',
      3: 'bg-green-600',
      4: 'bg-green-800',
    };
    return colors[level] || colors[0];
  };

  // Agrupar días por semanas
  const weeks = [];
  let week = [];
  
  allDays.forEach((day, index) => {
    week.push(day);
    
    if (week.length === 7 || index === allDays.length - 1) {
      weeks.push([...week]);
      week = [];
    }
  });

  return (
    <div className="overflow-x-auto pb-4">
      <div className="inline-flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => {
              const activity = activityMap[day] || { count: 0, level: 0, time_spent: 0 };
              
              return (
                <Tooltip
                  key={day}
                  content={
                    <div className="p-2">
                      <p className="font-semibold">{new Date(day).toLocaleDateString()}</p>
                      <p>{activity.count} actividades</p>
                      <p>{activity.time_spent} minutos</p>
                    </div>
                  }
                >
                  <div
                    className={`w-3 h-3 rounded-sm ${getColor(activity.level)} hover:ring-2 hover:ring-[#2CBFF0] cursor-pointer transition-all`}
                  />
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Leyenda */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
        <span>Menos</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span>Más</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;