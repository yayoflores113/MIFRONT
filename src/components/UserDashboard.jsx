import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Progress, Button, Chip, Avatar, Divider } from '@heroui/react';
import { 
  FireIcon, 
  AcademicCapIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ChartBarIcon,
  TrophyIcon,
  ArrowPathIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  BookOpenIcon,
  CodeBracketIcon,
  BeakerIcon,
  CpuChipIcon,
  PaintBrushIcon,
  CalendarDaysIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityHeatmap from './ActivityHeatmap';
import activityTracker from '../utils/ActivityTracker';

// Iconos para categorías de cursos
const COURSE_ICONS = {
  'JavaScript': CodeBracketIcon,
  'Python': CpuChipIcon,
  'React': RocketLaunchIcon,
  'Design': PaintBrushIcon,
  'Data Science': BeakerIcon,
  'default': BookOpenIcon
};

const getCourseIcon = (courseName) => {
  const name = courseName || '';
  if (name.includes('JavaScript') || name.includes('JS')) return CodeBracketIcon;
  if (name.includes('Python')) return CpuChipIcon;
  if (name.includes('React')) return RocketLaunchIcon;
  if (name.includes('Design') || name.includes('UI/UX')) return PaintBrushIcon;
  if (name.includes('Data') || name.includes('ML')) return BeakerIcon;
  return BookOpenIcon;
};

// ✅ Componente de gráfica DINÁMICA de ejercicios con ANIMACIÓN
const ExerciseActivityChart = ({ refreshKey }) => {
  const [exerciseStats, setExerciseStats] = useState([]);
  const [recentExercises, setRecentExercises] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Cargar datos dinámicamente
    setIsAnimating(true);
    
    setTimeout(() => {
      const stats = activityTracker.getExerciseStatsByDay(7);
      const exercises = activityTracker.getRecentExercises(7);
      
      setExerciseStats(stats);
      setRecentExercises(exercises);
      setIsAnimating(false);
    }, 300);
  }, [refreshKey]);

  // Calcular máximos para escalas
  const maxTime = Math.max(...exerciseStats.map(d => d.totalTime), 1);

  const totalCorrect = recentExercises.filter(ex => ex.isCorrect).length;
  const totalIncorrect = recentExercises.filter(ex => ex.isCorrect === false).length;
  const avgDifficulty = recentExercises.length > 0 
    ? (recentExercises.reduce((sum, ex) => sum + (ex.difficulty || 3), 0) / recentExercises.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">
      {/* Gráfico: Tiempo de resolución por día */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-blue-600" />
          Tiempo de Resolución (minutos por día)
        </h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {exerciseStats.map((day, index) => (
            <motion.div
              key={`${day.date}-${refreshKey}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              {day.totalTime > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-xs font-semibold text-gray-600"
                >
                  {day.totalTime}m
                </motion.div>
              )}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.2,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg relative group cursor-pointer origin-bottom"
                style={{ 
                  height: `${(day.totalTime / maxTime) * 120}px`,
                  minHeight: day.totalTime > 0 ? '8px' : '0px'
                }}
              >
                {day.totalTime > 0 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {day.exercises.length} ejercicio(s)<br/>
                    {day.totalTime} min total
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-xs font-medium text-gray-500 capitalize"
              >
                {day.dayName}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Gráfico: Dificultad promedio por día */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <TrophyIcon className="w-5 h-5 text-purple-600" />
          Dificultad Promedio (1-5 estrellas)
        </h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {exerciseStats.map((day, index) => {
            const difficultyHeight = day.avgDifficulty > 0 ? (day.avgDifficulty / 5) * 100 : 0;
            const difficultyColor = day.avgDifficulty <= 2 
              ? 'from-green-400 to-green-600' 
              : day.avgDifficulty <= 3.5 
              ? 'from-yellow-400 to-yellow-600' 
              : 'from-red-400 to-red-600';
            
            return (
              <motion.div
                key={`${day.date}-diff-${refreshKey}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5
                }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {day.avgDifficulty > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-xs font-semibold text-gray-600"
                  >
                    {day.avgDifficulty.toFixed(1)}⭐
                  </motion.div>
                )}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ 
                    delay: index * 0.1 + 0.2,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className={`w-full bg-gradient-to-t ${difficultyColor} rounded-t-lg relative group cursor-pointer origin-bottom`}
                  style={{ 
                    height: `${difficultyHeight}px`,
                    minHeight: day.avgDifficulty > 0 ? '6px' : '0px'
                  }}
                >
                  {day.avgDifficulty > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      Dificultad: {day.avgDifficulty.toFixed(1)}/5
                    </div>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="text-xs font-medium text-gray-500 capitalize"
                >
                  {day.dayName}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* Gráfico: Intentos (aciertos vs fallos) */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5 text-green-600" />
          Correctos vs Incorrectos por día
        </h3>
        <div className="space-y-3">
          {exerciseStats.map((day, index) => {
            const total = day.correctCount + day.incorrectCount;
            const correctPercent = total > 0 ? (day.correctCount / total) * 100 : 0;
            const incorrectPercent = total > 0 ? (day.incorrectCount / total) * 100 : 0;
            
            if (total === 0) return null;
            
            return (
              <motion.div
                key={`${day.date}-results-${refreshKey}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5
                }}
                className="flex items-center gap-3"
              >
                <div className="w-16 text-xs font-medium text-gray-600 capitalize">
                  {day.dayName}
                </div>
                <div className="flex-1 flex h-8 rounded-lg overflow-hidden shadow-sm">
                  {day.correctCount > 0 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${correctPercent}%` }}
                      transition={{ 
                        delay: index * 0.1 + 0.2, 
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                      className="bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold group relative"
                    >
                      {day.correctCount > 0 && (
                        <span className="hidden group-hover:inline absolute bg-gray-900 px-2 py-1 rounded -top-8 z-10">
                          {day.correctCount} correcto(s)
                        </span>
                      )}
                      ✓ {day.correctCount}
                    </motion.div>
                  )}
                  {day.incorrectCount > 0 && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${incorrectPercent}%` }}
                      transition={{ 
                        delay: index * 0.1 + 0.3, 
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                      className="bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold group relative"
                    >
                      {day.incorrectCount > 0 && (
                        <span className="hidden group-hover:inline absolute bg-gray-900 px-2 py-1 rounded -top-8 z-10">
                          {day.incorrectCount} incorrecto(s)
                        </span>
                      )}
                      ✗ {day.incorrectCount}
                    </motion.div>
                  )}
                </div>
                <div className="w-12 text-xs text-gray-500 text-right">
                  {total} total
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Estadísticas rápidas MEJORADAS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-green-700 mb-1"
          >
            {totalCorrect}
          </motion.div>
          <div className="text-xs text-green-600 font-medium">✓ Correctos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-3xl font-bold text-red-700 mb-1"
          >
            {totalIncorrect}
          </motion.div>
          <div className="text-xs text-red-600 font-medium">✗ Incorrectos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-3xl font-bold text-purple-700 mb-1"
          >
            {avgDifficulty}⭐
          </motion.div>
          <div className="text-xs text-purple-600 font-medium">Dificultad Avg</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-3xl font-bold text-blue-700 mb-1"
          >
            {totalCorrect + totalIncorrect}
          </motion.div>
          <div className="text-xs text-blue-600 font-medium">Total Ejercicios</div>
        </motion.div>
      </div>
    </div>
  );
};

// ✅ Componente de gráfica de tiempo de estudio DINÁMICA con ANIMACIÓN
const StudyTimeChart = ({ refreshKey }) => {
  const [last7Days, setLast7Days] = useState([]);

  useEffect(() => {
    const dailyData = activityTracker.getData()?.daily_activities || {};
    
    // Preparar datos de los últimos 7 días
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = dailyData[dateStr] || { time_spent: 0 };
      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString('es-MX', { weekday: 'short' }),
        timeSpent: dayData.time_spent
      });
    }
    
    setLast7Days(days);
  }, [refreshKey]);

  const maxTime = Math.max(...last7Days.map(d => d.timeSpent), 1);

  return (
    <div className="space-y-6">
      {/* Gráfico de tiempo estudiado */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-blue-600" />
          Tiempo Estudiado (minutos)
        </h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {last7Days.map((day, index) => (
            <motion.div
              key={`${day.date}-time-${refreshKey}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5
              }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-xs font-semibold text-gray-600"
              >
                {day.timeSpent > 0 ? `${day.timeSpent}m` : ''}
              </motion.div>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.2,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg origin-bottom"
                style={{ 
                  height: `${(day.timeSpent / maxTime) * 100}px`,
                  minHeight: day.timeSpent > 0 ? '6px' : '0px'
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-xs font-medium text-gray-500 capitalize"
              >
                {day.dayName}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-2xl font-bold text-green-700"
          >
            {last7Days.reduce((sum, d) => sum + d.timeSpent, 0)}
          </motion.div>
          <div className="text-xs text-green-600 font-medium">Minutos Totales</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl font-bold text-blue-700"
          >
            {Math.round(last7Days.reduce((sum, d) => sum + d.timeSpent, 0) / 7)}
          </motion.div>
          <div className="text-xs text-blue-600 font-medium">Promedio/Día</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-2xl font-bold text-purple-700"
          >
            {last7Days.filter(d => d.timeSpent > 0).length}
          </motion.div>
          <div className="text-xs text-purple-600 font-medium">Días Activos</div>
        </motion.div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [coursesProgress, setCoursesProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    activityTracker.startSession();
    loadDashboardData();
    
    // ✅ NUEVO: Escuchar cuando se completa un ejercicio
    const handleExerciseCompleted = (event) => {
      console.log('🎉 Dashboard detectó ejercicio completado:', event.detail);
      
      // Mostrar confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Mostrar notificación
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
      
      // Recargar datos del dashboard
      setTimeout(() => {
        loadDashboardData();
        setRefreshKey(prev => prev + 1);
      }, 500);
    };
    
    window.addEventListener('exerciseCompleted', handleExerciseCompleted);
    
    return () => {
      activityTracker.endSession();
      window.removeEventListener('exerciseCompleted', handleExerciseCompleted);
    };
  }, []);

  const loadDashboardData = () => {
    setLoading(true);
    
    setTimeout(() => {
      const stats = activityTracker.getStats();
      const heatmap = activityTracker.getHeatmapData();
      const courses = activityTracker.getCoursesProgress();
      
      setOverview(stats);
      setHeatmapData(heatmap);
      setCoursesProgress(courses);
      setLoading(false);
      
      console.log('📊 Dashboard actualizado:', { 
        stats, 
        ejerciciosHoy: stats.exercises_completed,
        racha: stats.current_streak 
      });
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#2CBFF0] border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-700 font-medium"
          >
            Cargando tu progreso...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const hasData = overview && (
    overview.exercises_completed > 0 || 
    overview.courses_in_progress > 0 ||
    overview.courses_completed > 0
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: Math.random() * window.innerWidth,
                  opacity: 1 
                }}
                animate={{ 
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: ['#2CBFF0', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'][i % 5]
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ NUEVO: Notificación de ejercicio completado */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
          >
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-2 border-white shadow-2xl">
              <CardBody className="py-3 px-6">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                  <div className="text-white">
                    <p className="font-bold">¡Dashboard actualizado!</p>
                    <p className="text-xs text-white/90">Tu progreso se ha guardado</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header con animación - MEJORADO */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <SparklesIcon className="w-10 h-10 text-yellow-500" />
                ¡Hola! Hora de Revisar tus Avances
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium mt-2">
                Cada quien avanza a su propio ritmo - Lo importante es seguir aprendiendo 🌱
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 flex items-center gap-2 text-sm"
              >
                <LightBulbIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-500">
                  Tu progreso se actualiza automáticamente mientras aprendes
                </span>
                <Button 
                  size="sm" 
                  variant="flat" 
                  onClick={() => {
                    loadDashboardData();
                    setRefreshKey(prev => prev + 1);
                  }}
                  startContent={<ArrowPathIcon className="w-4 h-4" />}
                  className="ml-2"
                >
                  Actualizar
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mensaje si no hay datos - MEJORADO SIN DEMO */}
        {!hasData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 border-0 shadow-2xl overflow-hidden">
              <CardBody className="text-center py-16 relative">
                {/* Decoración de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                </div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <RocketLaunchIcon className="w-24 h-24 text-white mx-auto mb-6 drop-shadow-lg" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Tu Aventura de Aprendizaje Comienza Aquí
                </h3>
                <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                  Aún no tienes actividad registrada, pero no te preocupes...
                </p>
                <p className="text-white font-semibold text-xl mb-8 max-w-xl mx-auto">
                  "El mejor momento para empezar fue ayer. El segundo mejor momento es ahora." 🌟
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-indigo-600 font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                    as="a"
                    href="/courses"
                    startContent={<BookOpenIcon className="w-5 h-5" />}
                  >
                    Explorar Cursos
                  </Button>
                  <Button 
                    size="lg"
                    variant="bordered"
                    className="border-2 border-white text-white font-bold hover:bg-white/10 transition-all"
                    as="a"
                    href="/tests"
                    startContent={<AcademicCapIcon className="w-5 h-5" />}
                  >
                    Hacer un Test
                  </Button>
                </div>

                {/* Pequeña nota motivacional */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 max-w-md mx-auto"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/90 text-sm">
                      💡 <strong>Consejo:</strong> Tu progreso se irá llenando automáticamente conforme uses la plataforma. 
                      ¡No necesitas hacer nada especial, solo aprende!
                    </p>
                  </div>
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>
        )}

        {/* Stats Cards - ANIMADOS */}
        {hasData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StatCard
                  icon={<AcademicCapIcon className="w-8 h-8" />}
                  title="Cursos Completados"
                  value={overview?.courses_completed || 0}
                  subtitle={`${overview?.courses_in_progress || 0} en progreso`}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                  delay={0.1}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatCard
                  icon={<ClockIcon className="w-8 h-8" />}
                  title="Tiempo Total"
                  value={`${overview?.total_hours || 0}h`}
                  subtitle={`${overview?.total_time_spent || 0} minutos aprendiendo`}
                  color="bg-gradient-to-br from-purple-500 to-purple-600"
                  delay={0.2}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <StatCard
                  icon={<CheckCircleIcon className="w-8 h-8" />}
                  title="Ejercicios Resueltos"
                  value={overview?.exercises_completed || 0}
                  subtitle="¡Sigue así, campeón! 💪"
                  color="bg-gradient-to-br from-green-500 to-green-600"
                  delay={0.3}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <StatCard
                  icon={<FireIcon className="w-8 h-8" />}
                  title="Racha Actual"
                  value={`${overview?.current_streak || 0} días`}
                  subtitle={`Récord: ${overview?.best_streak || 0} días 🏆`}
                  color="bg-gradient-to-br from-orange-500 to-red-600"
                  delay={0.4}
                />
              </motion.div>
            </div>

            {/* Activity Heatmap - FILA COMPLETA */}
            {heatmapData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="shadow-xl hover:shadow-2xl transition-all border border-gray-200">
                  <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                        <CalendarDaysIcon className="w-6 h-6 text-[#2CBFF0]" />
                        Calendario de Actividad
                      </h2>
                      <Chip 
                        size="sm" 
                        variant="flat"
                        className="bg-blue-100 text-blue-700 font-semibold"
                      >
                        {heatmapData.filter(d => d.count > 0).length} días activos
                      </Chip>
                    </div>
                  </CardHeader>
                  <CardBody className="px-6 pb-6">
                    <ActivityHeatmap data={heatmapData} />
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Gráfica de Ejercicios - FILA COMPLETA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all border border-gray-200">
                <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-green-50 to-teal-50">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                    <ChartPieIcon className="w-6 h-6 text-green-600" />
                    Análisis de Ejercicios
                  </h2>
                </CardHeader>
                <CardBody className="px-6 pb-6">
                  <ExerciseActivityChart refreshKey={refreshKey} />
                </CardBody>
              </Card>
            </motion.div>

            {/* Gráfica de Tiempo de Estudio - FILA COMPLETA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all border border-gray-200">
                <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                    <ClockIcon className="w-6 h-6 text-purple-600" />
                    Tiempo de Estudio
                  </h2>
                </CardHeader>
                <CardBody className="px-6 pb-6">
                  <StudyTimeChart refreshKey={refreshKey} />
                </CardBody>
              </Card>
            </motion.div>

            {/* Cursos en Progreso - MEJORADO */}
            {coursesProgress.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="shadow-xl border border-gray-200">
                  <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-indigo-50 to-blue-50">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                        <BookOpenIcon className="w-6 h-6 text-indigo-600" />
                        Mis Cursos en Progreso
                      </h2>
                      <Chip 
                        size="lg" 
                        variant="flat"
                        className="bg-indigo-100 text-indigo-700 font-bold"
                      >
                        {coursesProgress.length} {coursesProgress.length === 1 ? 'curso' : 'cursos'}
                      </Chip>
                    </div>
                  </CardHeader>
                  <CardBody className="px-6 pb-6">
                    <div className="space-y-4">
                      {coursesProgress.map((course, index) => (
                        <CourseProgressCard 
                          key={course.course_id} 
                          course={course}
                          index={index}
                          onUpdateProgress={(progress) => {
                            activityTracker.trackCourseProgress(course.course_id, progress);
                            if (progress >= 100) {
                              setShowConfetti(true);
                              setTimeout(() => setShowConfetti(false), 3000);
                            }
                            loadDashboardData();
                          }}
                        />
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// StatCard con animación mejorada
const StatCard = ({ icon, title, value, subtitle, color, delay }) => (
  <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden group">
    <CardBody className="p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: delay,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        className={`${color} text-white rounded-xl p-4 mb-4 inline-flex shadow-lg group-hover:shadow-xl transition-shadow`}
      >
        {icon}
      </motion.div>
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="text-4xl font-extrabold text-gray-900 mb-1"
      >
        {value}
      </motion.p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </CardBody>
  </Card>
);

// CourseProgressCard MEJORADO con icono
const CourseProgressCard = ({ course, index, onUpdateProgress }) => {
  const IconComponent = getCourseIcon(course.course_name);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-white"
    >
      <div className="flex items-start gap-4">
        {/* Avatar con icono dinámico */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar
            icon={<IconComponent className="w-6 h-6" />}
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 text-white flex-shrink-0"
          />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
            {course.course_name}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Chip 
              size="sm" 
              variant="flat"
              startContent={<ClockIcon className="w-3 h-3" />}
              className="bg-blue-50 text-blue-700"
            >
              {course.time_spent_hours}h estudiadas
            </Chip>
            
            {course.estimated_completion && !course.is_completed && (
              <Chip 
                size="sm" 
                variant="flat"
                className="bg-purple-50 text-purple-700"
              >
                📅 {new Date(course.estimated_completion).toLocaleDateString('es-MX', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Chip>
            )}
            
            {course.is_completed && (
              <Chip 
                size="sm" 
                variant="flat"
                startContent={<CheckCircleIcon className="w-3 h-3" />}
                className="bg-green-50 text-green-700 font-semibold"
              >
                Completado
              </Chip>
            )}
          </div>
          
          <div className="mb-3">
            <Progress
              value={course.progress_percentage}
              color={course.is_completed ? 'success' : 'primary'}
              size="md"
              className="mb-2"
              classNames={{
                indicator: "bg-gradient-to-r from-blue-500 to-indigo-600"
              }}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-700">
                {course.progress_percentage}% completado
              </span>
              
              {!course.is_completed && (
                <Button 
                  size="sm" 
                  variant="flat"
                  color="primary"
                  onClick={() => {
                    const newProgress = Math.min(course.progress_percentage + 10, 100);
                    onUpdateProgress(newProgress);
                  }}
                  className="font-semibold"
                >
                  +10% progreso
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
