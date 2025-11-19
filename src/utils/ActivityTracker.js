// ActivityTracker.js - Sistema de tracking sin backend

class ActivityTracker {
  constructor() {
    this.STORAGE_KEY = 'user_activity_data';
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialData = {
        exercises_completed: 0,
        courses_started: [],
        courses_completed: [],
        courses_progress: {},
        daily_activities: {},
        exercises_history: [], // ✅ Historial detallado de ejercicios
        total_time_spent: 0,
        streak_data: {
          current: 0,
          best: 0,
          last_activity: null,
        },
        session_start: new Date().toISOString(),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
      console.log('✅ Storage inicializado');
    } else {
      // ✅ Migrar datos antiguos si no tienen exercises_history
      const data = this.getData();
      if (!data.exercises_history) {
        data.exercises_history = [];
        this.saveData(data);
        console.log('✅ Datos migrados: exercises_history agregado');
      }
    }
  }

  getData() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  saveData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // ==========================================
  // EJERCICIOS - CON DETALLES COMPLETOS
  // ==========================================
  
  trackExerciseCompleted(exerciseId, timeSpent = 5, isCorrect = true, difficulty = 3, attempts = 1) {
    const data = this.getData();
    data.exercises_completed += 1;
    data.total_time_spent += timeSpent;
    
    // ✅ Guardar ejercicio en historial con todos los detalles
    const exerciseRecord = {
      id: exerciseId,
      date: new Date().toISOString(),
      dateStr: new Date().toISOString().split('T')[0],
      timeSpent: timeSpent, // en minutos
      isCorrect: isCorrect,
      difficulty: difficulty, // 1-5
      attempts: attempts, // número de intentos
      timestamp: Date.now()
    };
    
    // Asegurar que existe el array
    if (!data.exercises_history) {
      data.exercises_history = [];
    }
    data.exercises_history.push(exerciseRecord);
    
    // Registrar actividad del día
    const today = new Date().toISOString().split('T')[0];
    if (!data.daily_activities[today]) {
      data.daily_activities[today] = {
        exercises: 0,
        time_spent: 0,
        courses_viewed: [],
      };
    }
    data.daily_activities[today].exercises += 1;
    data.daily_activities[today].time_spent += timeSpent;
    
    // Actualizar racha
    this.updateStreak(data);
    
    this.saveData(data);
    console.log('✅ Ejercicio completado:', exerciseRecord);
    console.log('🔥 Racha actual:', data.streak_data.current, 'días');
    
    return {
      success: true,
      message: '✅ Ejercicio registrado correctamente',
      streak: data.streak_data.current
    };
  }

  // ✅ Obtener ejercicios de los últimos N días
  getRecentExercises(days = 7) {
    const data = this.getData();
    if (!data.exercises_history) {
      console.warn('⚠️ No hay historial de ejercicios');
      return [];
    }
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return data.exercises_history.filter(ex => {
      return new Date(ex.date) >= cutoffDate;
    });
  }

  // ✅ Obtener estadísticas de ejercicios por día
  getExerciseStatsByDay(days = 7) {
    const recentExercises = this.getRecentExercises(days);
    const statsByDay = {};
    
    // Inicializar últimos N días
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      statsByDay[dateStr] = {
        date: dateStr,
        dayName: date.toLocaleDateString('es-MX', { weekday: 'short' }),
        exercises: [],
        totalTime: 0,
        avgDifficulty: 0,
        correctCount: 0,
        incorrectCount: 0,
        totalAttempts: 0,
      };
    }
    
    // Agrupar ejercicios por día
    recentExercises.forEach(ex => {
      const dayData = statsByDay[ex.dateStr];
      if (dayData) {
        dayData.exercises.push(ex);
        dayData.totalTime += ex.timeSpent || 0;
        dayData.totalAttempts += ex.attempts || 0;
        if (ex.isCorrect) {
          dayData.correctCount++;
        } else {
          dayData.incorrectCount++;
        }
      }
    });
    
    // Calcular promedios
    Object.values(statsByDay).forEach(day => {
      if (day.exercises.length > 0) {
        const totalDifficulty = day.exercises.reduce((sum, ex) => sum + (ex.difficulty || 0), 0);
        day.avgDifficulty = totalDifficulty / day.exercises.length;
      }
    });
    
    return Object.values(statsByDay);
  }

  // ==========================================
  // CURSOS
  // ==========================================
  
  trackCourseViewed(courseId, courseName, timeSpent = 10) {
    const data = this.getData();
    
    // Agregar a cursos iniciados si es nuevo
    if (!data.courses_started.includes(courseId)) {
      data.courses_started.push(courseId);
    }
    
    // Inicializar progreso si no existe
    if (!data.courses_progress[courseId]) {
      data.courses_progress[courseId] = {
        name: courseName,
        progress: 0,
        time_spent: 0,
        started_at: new Date().toISOString(),
        last_viewed: new Date().toISOString(),
      };
    }
    
    // Actualizar tiempo
    data.courses_progress[courseId].time_spent += timeSpent;
    data.courses_progress[courseId].last_viewed = new Date().toISOString();
    data.total_time_spent += timeSpent;
    
    // Registrar actividad del día
    const today = new Date().toISOString().split('T')[0];
    if (!data.daily_activities[today]) {
      data.daily_activities[today] = {
        exercises: 0,
        time_spent: 0,
        courses_viewed: [],
      };
    }
    if (!data.daily_activities[today].courses_viewed.includes(courseId)) {
      data.daily_activities[today].courses_viewed.push(courseId);
    }
    data.daily_activities[today].time_spent += timeSpent;
    
    this.updateStreak(data);
    this.saveData(data);
    console.log('✅ Curso visto:', { courseId, courseName, timeSpent });
  }

  trackCourseProgress(courseId, progressPercentage) {
    const data = this.getData();
    
    if (data.courses_progress[courseId]) {
      data.courses_progress[courseId].progress = progressPercentage;
      
      // Marcar como completado si llega a 100%
      if (progressPercentage >= 100 && !data.courses_completed.includes(courseId)) {
        data.courses_completed.push(courseId);
        console.log('🎉 ¡Curso completado!', courseId);
      }
      
      this.saveData(data);
    }
  }

  // ==========================================
  // RACHA (STREAK) - ✅ CORREGIDO
  // ==========================================
  
  updateStreak(data) {
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = data.streak_data.last_activity;
    
    if (!lastActivity) {
      // Primera actividad
      data.streak_data.current = 1;
      data.streak_data.last_activity = today;
      
      if (data.streak_data.current > data.streak_data.best) {
        data.streak_data.best = data.streak_data.current;
      }
      
      console.log('🔥 Primera actividad - Racha iniciada:', data.streak_data.current);
      return;
    }
    
    // ✅ Agregar T00:00:00 para evitar problemas de zona horaria
    const lastDate = new Date(lastActivity + 'T00:00:00');
    const todayDate = new Date(today + 'T00:00:00');
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    console.log('🔥 Calculando racha:', {
      today,
      lastActivity,
      diffDays,
      currentStreak: data.streak_data.current
    });
    
    if (diffDays === 0) {
      // ✅ Mismo día - no cambiar la racha
      console.log('📅 Actividad en el mismo día, racha se mantiene:', data.streak_data.current);
    } else if (diffDays === 1) {
      // ✅ Día consecutivo - aumentar racha
      data.streak_data.current += 1;
      data.streak_data.last_activity = today;
      console.log('🔥 ¡Racha aumentada!:', data.streak_data.current);
    } else if (diffDays > 1) {
      // ❌ Perdió la racha - reiniciar
      console.log('💔 Racha perdida. Reiniciando...');
      data.streak_data.current = 1;
      data.streak_data.last_activity = today;
    }
    
    // Actualizar mejor racha
    if (data.streak_data.current > data.streak_data.best) {
      data.streak_data.best = data.streak_data.current;
      console.log('🏆 ¡Nueva mejor racha!:', data.streak_data.best);
    }
  }

  // ==========================================
  // TIEMPO EN LA APP
  // ==========================================
  
  startSession() {
    sessionStorage.setItem('session_start', new Date().toISOString());
    console.log('⏱️ Sesión iniciada');
  }

  endSession() {
    const sessionStart = sessionStorage.getItem('session_start');
    if (sessionStart) {
      const start = new Date(sessionStart);
      const end = new Date();
      const minutesSpent = Math.floor((end - start) / 1000 / 60);
      
      if (minutesSpent > 0) {
        const data = this.getData();
        data.total_time_spent += minutesSpent;
        
        const today = new Date().toISOString().split('T')[0];
        if (!data.daily_activities[today]) {
          data.daily_activities[today] = {
            exercises: 0,
            time_spent: 0,
            courses_viewed: [],
          };
        }
        data.daily_activities[today].time_spent += minutesSpent;
        
        this.saveData(data);
        console.log('⏱️ Sesión terminada:', minutesSpent, 'minutos');
      }
      
      sessionStorage.removeItem('session_start');
    }
  }

  // ==========================================
  // OBTENER ESTADÍSTICAS
  // ==========================================
  
  getStats() {
    const data = this.getData();
    
    return {
      exercises_completed: data.exercises_completed || 0,
      courses_completed: data.courses_completed.length || 0,
      courses_in_progress: (data.courses_started.length || 0) - (data.courses_completed.length || 0),
      total_time_spent: data.total_time_spent || 0,
      total_hours: ((data.total_time_spent || 0) / 60).toFixed(1),
      current_streak: data.streak_data.current || 0,
      best_streak: data.streak_data.best || 0,
    };
  }

  getHeatmapData() {
    const data = this.getData();
    const heatmapData = [];
    
    // Generar últimos 365 días para el heatmap (1 año completo)
    for (let i = 364; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const activity = data.daily_activities[dateStr];
      const count = activity 
        ? (activity.exercises || 0)
        : 0;
      
      heatmapData.push({
        date: dateStr,
        count: count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4,
        time_spent: activity?.time_spent || 0,
      });
    }
    
    return heatmapData;
  }

  getCoursesProgress() {
    const data = this.getData();
    const courses = [];
    
    Object.entries(data.courses_progress || {}).forEach(([courseId, course]) => {
      // Solo mostrar cursos no completados
      if (course.progress >= 100) return;
      
      const daysActive = Math.floor(
        (new Date() - new Date(course.started_at)) / (1000 * 60 * 60 * 24)
      ) || 1;
      
      const progressRate = course.progress / daysActive;
      const remainingDays = progressRate > 0 
        ? Math.ceil((100 - course.progress) / progressRate) 
        : null;
      
      const estimatedCompletion = remainingDays 
        ? new Date(Date.now() + remainingDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : null;
      
      courses.push({
        course_id: courseId,
        course_name: course.name || 'Curso sin nombre',
        course_slug: courseId.toLowerCase().replace(/\s+/g, '-'),
        course_image: `https://via.placeholder.com/80x80?text=${(course.name || 'C').charAt(0)}`,
        progress_percentage: course.progress || 0,
        time_spent: course.time_spent || 0,
        time_spent_hours: Math.round((course.time_spent || 0) / 60),
        started_at: course.started_at,
        last_viewed: course.last_viewed,
        completed_at: null,
        is_completed: false,
        estimated_completion: estimatedCompletion,
      });
    });
    
    return courses;
  }

  // ==========================================
  // UTILIDADES
  // ==========================================
  
  // Obtener resumen de actividad
  getActivitySummary() {
    const data = this.getData();
    const today = new Date().toISOString().split('T')[0];
    const todayActivity = data.daily_activities[today] || {
      exercises: 0,
      time_spent: 0,
      courses_viewed: []
    };
    
    return {
      today: {
        exercises: todayActivity.exercises,
        time_spent: todayActivity.time_spent,
        courses_viewed: todayActivity.courses_viewed.length
      },
      total: {
        exercises: data.exercises_completed,
        time_spent: data.total_time_spent,
        courses_started: data.courses_started.length,
        courses_completed: data.courses_completed.length
      },
      streak: {
        current: data.streak_data.current,
        best: data.streak_data.best
      }
    };
  }

  // Verificar si hay actividad hoy
  hasActivityToday() {
    const data = this.getData();
    const today = new Date().toISOString().split('T')[0];
    const todayActivity = data.daily_activities[today];
    
    if (!todayActivity) return false;
    
    return todayActivity.exercises > 0 || 
           todayActivity.courses_viewed.length > 0 ||
           todayActivity.time_spent > 0;
  }

  // Obtener estadísticas de ejercicios
  getExerciseStats() {
    const data = this.getData();
    if (!data.exercises_history || data.exercises_history.length === 0) {
      return {
        total: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        avgDifficulty: 0,
        avgTime: 0
      };
    }
    
    const correct = data.exercises_history.filter(ex => ex.isCorrect).length;
    const incorrect = data.exercises_history.length - correct;
    const accuracy = (correct / data.exercises_history.length) * 100;
    
    const totalDifficulty = data.exercises_history.reduce((sum, ex) => sum + (ex.difficulty || 0), 0);
    const avgDifficulty = totalDifficulty / data.exercises_history.length;
    
    const totalTime = data.exercises_history.reduce((sum, ex) => sum + (ex.timeSpent || 0), 0);
    const avgTime = totalTime / data.exercises_history.length;
    
    return {
      total: data.exercises_history.length,
      correct: correct,
      incorrect: incorrect,
      accuracy: accuracy.toFixed(1),
      avgDifficulty: avgDifficulty.toFixed(1),
      avgTime: avgTime.toFixed(1)
    };
  }

  // ==========================================
  // RESETEAR DATOS (para pruebas)
  // ==========================================
  
  reset() {
    localStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem('session_start');
    this.initializeStorage();
    console.log('🔄 Datos reseteados completamente');
    return true;
  }

  // Exportar datos (para backup)
  exportData() {
    const data = this.getData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    console.log('✅ Datos exportados');
  }

  // Importar datos (desde backup)
  importData(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      // Validar estructura básica
      if (!data.exercises_completed && data.exercises_completed !== 0) {
        throw new Error('Datos inválidos: falta exercises_completed');
      }
      
      // Asegurar que existen todas las propiedades necesarias
      if (!data.exercises_history) data.exercises_history = [];
      if (!data.courses_started) data.courses_started = [];
      if (!data.courses_completed) data.courses_completed = [];
      if (!data.courses_progress) data.courses_progress = {};
      if (!data.daily_activities) data.daily_activities = {};
      if (!data.streak_data) data.streak_data = { current: 0, best: 0, last_activity: null };
      
      this.saveData(data);
      console.log('✅ Datos importados correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error al importar datos:', error);
      return false;
    }
  }

  // Debug: Ver todos los datos
  debug() {
    const data = this.getData();
    console.group('🔍 ActivityTracker Debug');
    console.log('📊 Stats:', this.getStats());
    console.log('📅 Recent Exercises (7 días):', this.getRecentExercises(7));
    console.log('📈 Exercise Stats by Day:', this.getExerciseStatsByDay(7));
    console.log('🎯 Activity Summary:', this.getActivitySummary());
    console.log('📚 Courses Progress:', this.getCoursesProgress());
    console.log('🔥 Streak Data:', data.streak_data);
    console.log('🗓️ Daily Activities:', data.daily_activities);
    console.log('🗄️ Raw Data:', data);
    console.groupEnd();
  }
}

// Exportar instancia única
const activityTracker = new ActivityTracker();

// Hacer disponible en ventana para debugging
if (typeof window !== 'undefined') {
  window.activityTracker = activityTracker;
  console.log('🔧 ActivityTracker disponible en window.activityTracker');
  console.log('💡 Comandos útiles:');
  console.log('   - activityTracker.debug() → Ver todos los datos');
  console.log('   - activityTracker.getStats() → Ver estadísticas');
  console.log('   - activityTracker.reset() → Resetear datos');
  console.log('   - activityTracker.exportData() → Exportar backup');
}

export default activityTracker;