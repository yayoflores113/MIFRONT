// testAnalyzer.js - Sistema de análisis MEJORADO con MÁS LÓGICA

// Base de datos de universidades de Yucatán
export const YUCATAN_UNIVERSITIES = [
  {
    id: 1,
    name: "Universidad Autónoma de Yucatán (UADY)",
    location: "Mérida, Yucatán",
    type: "Pública",
    logo: "/universities/uady.png",
    website: "https://www.uady.mx",
  },
  {
    id: 2,
    name: "Universidad Modelo",
    location: "Mérida, Yucatán",
    type: "Privada",
    logo: "/universities/modelo.png",
    website: "https://www.modelo.edu.mx",
  },
  {
    id: 3,
    name: "Universidad Anáhuac Mayab",
    location: "Mérida, Yucatán",
    type: "Privada",
    logo: "/universities/anahuac.png",
    website: "https://www.anahuac.mx/mayab",
  },
  {
    id: 4,
    name: "Universidad Marista de Mérida",
    location: "Mérida, Yucatán",
    type: "Privada",
    logo: "/universities/marista.png",
    website: "https://www.marista.edu.mx",
  },
  {
    id: 5,
    name: "Universidad Tecnológica Metropolitana",
    location: "Mérida, Yucatán",
    type: "Pública",
    logo: "/universities/utm.png",
    website: "https://www.utmetropolitana.edu.mx",
  },
];

// Carreras con ÁREAS MEJORADAS Y MÁS LÓGICAS
export const YUCATAN_CAREERS = [
  // TECNOLOGÍA E INGENIERÍA
  {
    id: 1,
    name: "Ingeniería en Software",
    university: "UADY",
    universityId: 1,
    areas: ["tecnologia", "matematicas"],
    keywords: ["programar", "computadoras", "software", "apps", "desarrollo"],
    description: "Desarrollo de software y sistemas",
    duration: "4 años",
  },
  {
    id: 2,
    name: "Ingeniería Civil",
    university: "UADY",
    universityId: 1,
    areas: ["matematicas", "construccion"],
    keywords: ["construir", "edificios", "puentes", "infraestructura"],
    description: "Diseño y construcción de infraestructura",
    duration: "5 años",
  },
  {
    id: 3,
    name: "Ingeniería Industrial",
    university: "UADY",
    universityId: 1,
    areas: ["matematicas", "administracion"],
    keywords: ["procesos", "optimizar", "producción", "eficiencia"],
    description: "Optimización de procesos industriales",
    duration: "4 años",
  },
  {
    id: 4,
    name: "Ingeniería Mecatrónica",
    university: "Universidad Modelo",
    universityId: 2,
    areas: ["tecnologia", "matematicas"],
    keywords: ["robots", "automatización", "mecánica", "electrónica"],
    description: "Sistemas mecatrónicos y robótica",
    duration: "4 años",
  },

  // SALUD
  {
    id: 5,
    name: "Medicina",
    university: "UADY",
    universityId: 1,
    areas: ["salud", "ciencias"],
    keywords: ["curar", "pacientes", "hospital", "doctor", "medicina"],
    description: "Ciencias médicas y atención a la salud",
    duration: "6 años",
  },
  {
    id: 6,
    name: "Enfermería",
    university: "UADY",
    universityId: 1,
    areas: ["salud", "social"],
    keywords: ["cuidar", "enfermería", "pacientes", "hospital"],
    description: "Cuidado y atención enfermera",
    duration: "4 años",
  },
  {
    id: 7,
    name: "Nutrición",
    university: "Universidad Modelo",
    universityId: 2,
    areas: ["salud", "ciencias"],
    keywords: ["alimentos", "dieta", "nutrición", "salud"],
    description: "Ciencias de la nutrición",
    duration: "4 años",
  },
  {
    id: 8,
    name: "Psicología",
    university: "UADY",
    universityId: 1,
    areas: ["salud", "social"],
    keywords: ["mente", "emociones", "conducta", "ayudar", "terapia"],
    description: "Estudio de la mente y comportamiento",
    duration: "4 años",
  },

  // NEGOCIOS Y ADMINISTRACIÓN
  {
    id: 9,
    name: "Administración de Empresas",
    university: "UADY",
    universityId: 1,
    areas: ["administracion", "social"],
    keywords: ["negocios", "empresas", "administrar", "gerencia"],
    description: "Gestión empresarial",
    duration: "4 años",
  },
  {
    id: 10,
    name: "Contaduría Pública",
    university: "Universidad Modelo",
    universityId: 2,
    areas: ["administracion", "matematicas"],
    keywords: ["contabilidad", "finanzas", "impuestos", "números"],
    description: "Contabilidad y finanzas",
    duration: "4 años",
  },
  {
    id: 11,
    name: "Mercadotecnia",
    university: "Universidad Anáhuac Mayab",
    universityId: 3,
    areas: ["administracion", "creativo"],
    keywords: ["marketing", "ventas", "publicidad", "marcas"],
    description: "Marketing y estrategias comerciales",
    duration: "4 años",
  },

  // DISEÑO Y ARTE
  {
    id: 12,
    name: "Diseño Gráfico",
    university: "Universidad Modelo",
    universityId: 2,
    areas: ["creativo", "tecnologia"],
    keywords: ["diseño", "arte", "gráfico", "creatividad"],
    description: "Diseño visual y comunicación gráfica",
    duration: "4 años",
  },
  {
    id: 13,
    name: "Arquitectura",
    university: "UADY",
    universityId: 1,
    areas: ["construccion", "creativo"],
    keywords: ["arquitectura", "diseño", "edificios", "espacios"],
    description: "Diseño arquitectónico",
    duration: "5 años",
  },
  {
    id: 14,
    name: "Diseño de Interiores",
    university: "Universidad Modelo",
    universityId: 2,
    areas: ["creativo", "construccion"],
    keywords: ["espacios", "decoración", "interiores", "diseño"],
    description: "Diseño de espacios interiores",
    duration: "4 años",
  },

  // CIENCIAS SOCIALES Y HUMANIDADES
  {
    id: 15,
    name: "Derecho",
    university: "UADY",
    universityId: 1,
    areas: ["legal", "social"],
    keywords: ["leyes", "justicia", "derecho", "abogado"],
    description: "Ciencias jurídicas",
    duration: "5 años",
  },
  {
    id: 16,
    name: "Comunicación",
    university: "Universidad Anáhuac Mayab",
    universityId: 3,
    areas: ["social", "creativo"],
    keywords: ["comunicación", "medios", "periodismo", "redes"],
    description: "Comunicación y medios",
    duration: "4 años",
  },
  {
    id: 17,
    name: "Educación",
    university: "UADY",
    universityId: 1,
    areas: ["social", "salud"],
    keywords: ["enseñar", "educación", "maestro", "niños"],
    description: "Ciencias de la educación",
    duration: "4 años",
  },

  // CIENCIAS EXACTAS
  {
    id: 18,
    name: "Matemáticas",
    university: "UADY",
    universityId: 1,
    areas: ["matematicas", "ciencias"],
    keywords: ["números", "cálculo", "álgebra", "análisis"],
    description: "Matemáticas puras y aplicadas",
    duration: "4 años",
  },
  {
    id: 19,
    name: "Química",
    university: "UADY",
    universityId: 1,
    areas: ["ciencias", "matematicas"],
    keywords: ["sustancias", "reacciones", "laboratorio", "experimentos"],
    description: "Ciencias químicas",
    duration: "4 años",
  },
  {
    id: 20,
    name: "Biología",
    university: "UADY",
    universityId: 1,
    areas: ["ciencias", "salud"],
    keywords: ["seres vivos", "naturaleza", "animales", "plantas"],
    description: "Ciencias biológicas",
    duration: "4 años",
  },

  // TURISMO Y GASTRONOMÍA
  {
    id: 21,
    name: "Turismo",
    university: "Universidad Tecnológica Metropolitana",
    universityId: 5,
    areas: ["administracion", "social"],
    keywords: ["viajes", "turismo", "hoteles", "cultura"],
    description: "Gestión turística",
    duration: "4 años",
  },
  {
    id: 22,
    name: "Gastronomía",
    university: "Universidad Modelo",
    universityId: 2,
    areas: ["creativo", "salud"],
    keywords: ["cocinar", "chef", "alimentos", "restaurantes"],
    description: "Artes culinarias",
    duration: "4 años",
  },
];

// ÁREAS DE INTERÉS CON MUCHAS MÁS KEYWORDS (MEJORADO)
export const INTEREST_AREAS = {
  tecnologia: {
    name: "Tecnología",
    keywords: [
      // Programación
      "programar", "programación", "codigo", "código", "software", "app", "aplicacion", "aplicación",
      "desarrollo", "desarrollar", "web", "sistema", "sistemas", "base de datos", "datos",
      // Computación
      "computadora", "computadoras", "computacion", "computación", "informatica", "informática",
      "digital", "internet", "tecnologia", "tecnología", "tech",
      // Específicos
      "python", "java", "javascript", "react", "html", "css",
      "algoritmo", "algoritmos", "videojuegos", "videojuego", "gaming",
      "robot", "robots", "robotica", "robótica",
      "inteligencia artificial", "ia", "ai", "machine learning",
      "automatizacion", "automatización", "ciberseguridad"
    ],
  },
  matematicas: {
    name: "Matemáticas",
    keywords: [
      // Matemáticas básicas
      "matematicas", "matemáticas", "numeros", "números", "numero", "número",
      "calculo", "cálculo", "algebra", "álgebra", "geometria", "geometría",
      "ecuaciones", "ecuacion", "ecuación", "formula", "fórmula",
      // Lógica
      "logica", "lógica", "razonamiento", "analizar", "análisis",
      "resolver", "solucion", "solución", "problemas", "problema",
      "pensar", "razonar", "deducir",
      // Específicos
      "estadistica", "estadística", "probabilidad",
      "fisica", "física", "exacto", "exacta", "preciso", "precision"
    ],
  },
  salud: {
    name: "Salud",
    keywords: [
      // Medicina
      "medicina", "medico", "médico", "doctor", "doctora",
      "curar", "sanar", "hospital", "clinica", "clínica",
      "paciente", "pacientes", "enfermo", "enfermedad",
      // Cuidado
      "salud", "cuidar", "atender", "ayudar", "bienestar", "vida", "saludable",
      "enfermeria", "enfermería", "enfermero", "enfermera",
      // Específicos
      "nutricion", "nutrición", "alimentacion", "alimentación",
      "dieta", "comida", "alimento", "ejercicio",
      "terapia", "rehabilitacion", "cirugia", "operacion",
      "farmacia", "medicamento", "tratamiento", "cuerpo", "anatomia"
    ],
  },
  creativo: {
    name: "Creatividad",
    keywords: [
      // Diseño
      "diseño", "diseno", "diseñar", "creatividad", "creativo", "creativa",
      "arte", "artistico", "artístico", "grafico", "gráfico",
      "visual", "imagen", "imagenes", "imágenes",
      // Creación
      "crear", "creacion", "creación", "inventar", "innovar",
      "imaginar", "dibujar", "dibujo", "pintar", "pintura",
      "ilustrar", "ilustracion", "ilustración",
      // Específicos
      "photoshop", "ilustrador", "digital", "3d",
      "animacion", "animación", "video",
      "color", "colores", "forma", "estetica", "estética",
      "bonito", "hermoso", "bello", "moda", "ropa", "estilo"
    ],
  },
  social: {
    name: "Social",
    keywords: [
      // Interacción social
      "gente", "personas", "persona", "social", "sociedad",
      "comunidad", "grupo", "equipo",
      "hablar", "comunicar", "comunicacion", "comunicación",
      "conversar", "dialogo", "diálogo",
      // Ayuda
      "ayudar", "ayuda", "servir", "apoyar", "apoyo",
      "colaborar", "solidario", "empatia", "empático",
      "compasion", "compasión", "humanitario",
      // Específicos
      "enseñar", "educar", "educacion", "educación",
      "profesor", "maestro", "maestra",
      "niños", "niño", "jovenes", "jóvenes",
      "familia", "trabajo social", "voluntario"
    ],
  },
  ciencias: {
    name: "Ciencias",
    keywords: [
      // Investigación
      "investigar", "investigacion", "investigación",
      "ciencia", "ciencias", "cientifico", "científico",
      "experimento", "experimentos", "laboratorio", "lab",
      "prueba", "hipotesis", "hipótesis",
      // Ciencias naturales
      "biologia", "biología", "quimica", "química",
      "organismo", "celula", "célula", "atomo", "átomo",
      "molecula", "molécula", "reaccion", "reacción",
      // Investigación
      "descubrir", "descubrimiento", "estudiar",
      "analizar", "observar", "observacion",
      "microscopio", "naturaleza", "planeta", "espacio",
      "medioambiente", "ecologia", "ecología", "ambiental"
    ],
  },
  administracion: {
    name: "Administración",
    keywords: [
      // Negocios
      "negocio", "negocios", "empresa", "empresas",
      "empresarial", "emprender", "emprendedor",
      "comercio", "vender", "venta", "ventas",
      "cliente", "clientes", "producto", "productos",
      // Administración
      "administrar", "administracion", "administración",
      "gerente", "jefe", "dirigir", "lider", "líder",
      "organizacion", "organización", "planear",
      "planificar", "estrategia", "estrategias",
      // Finanzas
      "dinero", "finanzas", "financiero", "contabilidad",
      "contador", "economia", "economía", "inversion",
      "banco", "impuesto", "impuestos",
      // Marketing
      "marketing", "publicidad", "marca", "mercado", "mercadotecnia"
    ],
  },
  construccion: {
    name: "Construcción",
    keywords: [
      // Arquitectura
      "arquitectura", "arquitecto", "edificio", "edificios",
      "casa", "casas", "construccion", "construcción",
      "construir", "diseñar", "plano", "planos",
      "proyecto", "estructura", "estructuras",
      // Construcción
      "obra", "obras", "material", "materiales",
      "cemento", "concreto", "acero", "metal",
      "herramienta", "maquinaria",
      "ingeniero", "ingenieria", "ingeniería",
      // Espacios
      "espacio", "espacios", "interior", "interiores",
      "decoracion", "decoración", "mueble", "muebles",
      "urbano", "ciudad", "puente", "carretera"
    ],
  },
  legal: {
    name: "Derecho",
    keywords: [
      // Derecho
      "derecho", "ley", "leyes", "legal",
      "abogado", "abogada", "justicia", "justo", "justa",
      "tribunal", "juez", "jueza", "corte", "juzgado",
      "juridico", "jurídico",
      // Actividades legales
      "defender", "defensa", "acusar", "demanda", "demandar",
      "contrato", "contratos", "constitucion", "constitución",
      "codigo", "código", "norma", "reglamento",
      // Áreas
      "penal", "civil", "laboral", "fiscal",
      "derechos humanos", "delito", "crimen"
    ],
  },
};

/**
 * Analiza las respuestas del usuario y cuenta sus áreas de interés
 * MEJORADO: Más sensible a keywords
 */
export function analyzeAnswers(answers) {
  const areaScores = {};

  // Inicializar scores
  Object.keys(INTEREST_AREAS).forEach((area) => {
    areaScores[area] = 0;
  });

  // Analizar cada respuesta
  Object.values(answers).forEach((answer) => {
    if (!answer) return;

    const answerText = (answer.text || "").toLowerCase();

    // Contar coincidencias con keywords de cada área
    Object.entries(INTEREST_AREAS).forEach(([area, data]) => {
      data.keywords.forEach((keyword) => {
        if (answerText.includes(keyword.toLowerCase())) {
          areaScores[area] += 1;
        }
      });
    });
  });

  console.log("🔍 Análisis de áreas:", areaScores);
  return areaScores;
}

/**
 * Calcula el match entre las respuestas del usuario y una carrera
 * MEJORADO: Peso aumentado de 10 a 15 puntos
 */
function calculateCareerMatch(career, areaScores) {
  let score = 0;

  // Puntaje por áreas de interés (15 puntos por keyword match)
  career.areas.forEach((area) => {
    score += (areaScores[area] || 0) * 15;
  });

  return score;
}

/**
 * Obtiene las carreras recomendadas basándose en las respuestas
 * MEJORADO: SIEMPRE devuelve 5 carreras, NUNCA undefined
 */
export function getRecommendedCareers(answers, limit = 5) {
  const areaScores = analyzeAnswers(answers);
  
  // Calcular match con todas las carreras
  const careerMatches = YUCATAN_CAREERS.map((career) => ({
    ...career,
    matchScore: calculateCareerMatch(career, areaScores),
  }));

  // Ordenar por score descendente
  careerMatches.sort((a, b) => b.matchScore - a.matchScore);

  // Tomar las mejores carreras
  let topCareers = careerMatches.slice(0, limit);

  // GARANTIZAR que siempre haya exactamente 'limit' carreras
  while (topCareers.length < limit && YUCATAN_CAREERS.length > topCareers.length) {
    const missing = limit - topCareers.length;
    const fallbackCareers = YUCATAN_CAREERS.slice(topCareers.length, topCareers.length + missing);
    topCareers = [...topCareers, ...fallbackCareers.map(c => ({ ...c, matchScore: 0 }))];
  }

  // Formatear nombres con universidad - SIEMPRE válidos
  const formattedCareers = topCareers.map((c) => {
    if (!c || !c.name) {
      return "Carrera disponible (UADY)"; // Fallback extremo
    }
    return c.name.includes("(") ? c.name : `${c.name} (${c.university || "UADY"})`;
  });

  console.log("🎓 Top carreras:", formattedCareers);
  return formattedCareers;
}

/**
 * Obtiene las universidades recomendadas
 * MEJORADO: SIEMPRE devuelve universidades válidas
 */
export function getRecommendedUniversities(recommendedCareers) {
  const universityNames = new Set();

  recommendedCareers.forEach((career) => {
    if (!career || typeof career !== 'string') return;
    
    // Extraer nombre de universidad del formato "Carrera (Universidad)"
    const match = career.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      universityNames.add(match[1]);
    }
  });

  const universities = Array.from(universityNames);
  
  // Si no hay universidades, devolver las principales
  if (universities.length === 0) {
    return [
      "Universidad Autónoma de Yucatán (UADY)",
      "Universidad Modelo"
    ];
  }

  console.log("🏛️ Universidades:", universities);
  return universities;
}

/**
 * Genera un resumen del análisis
 */
export function generateAnalysisSummary(answers) {
  const areaScores = analyzeAnswers(answers);
  
  // Obtener top 3 áreas
  const sortedAreas = Object.entries(areaScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .filter(([, score]) => score > 0)
    .map(([area]) => INTEREST_AREAS[area]?.name || area);

  return {
    topAreas: sortedAreas,
    totalAnswers: Object.keys(answers).length,
    areaScores,
  };
}