import jsPDF from 'jspdf';

// Contenido educativo completo según el tema
const getCourseContent = (courseTitle, courseDescription) => {
  const titleLower = (courseTitle || "").toLowerCase();
  
  // ==================== PROGRAMACIÓN ====================
  if (titleLower.includes("programación") || titleLower.includes("código") || titleLower.includes("code") || titleLower.includes("python") || titleLower.includes("javascript")) {
    return {
      tema: "Programación",
      introduccion: "La programación es el proceso de diseñar, codificar, depurar y mantener el código fuente de programas de computadora. Este curso te llevará desde los conceptos fundamentales hasta la implementación de proyectos complejos, desarrollando tu pensamiento lógico y habilidades de resolución de problemas.",
      objetivos: [
        "Dominar los fundamentos de la programación y el pensamiento algorítmico",
        "Escribir código limpio, eficiente y mantenible siguiendo las mejores prácticas",
        "Desarrollar aplicaciones funcionales utilizando estructuras de datos apropiadas",
        "Comprender y aplicar los principios de la programación orientada a objetos",
        "Implementar pruebas unitarias y debugging efectivo en tus proyectos"
      ],
      prerequisitos: [
        "Conocimientos básicos de uso de computadora",
        "Lógica matemática básica",
        "Capacidad de pensamiento analítico",
        "Motivación para resolver problemas"
      ],
      modulos: [
        {
          titulo: "Módulo 1: Fundamentos de Programación",
          duracion: "20 horas",
          descripcion: "Aprende las bases esenciales que todo programador debe conocer.",
          temas: [
            {
              nombre: "1.1 Introducción a la Programación",
              contenido: [
                "• ¿Qué es la programación? Historia y evolución",
                "• Lenguajes de programación: compilados vs interpretados",
                "• Paradigmas de programación: imperativa, declarativa, funcional",
                "• Entornos de desarrollo (IDEs) y herramientas básicas",
                "• Tu primer programa: Hello World y análisis del código"
              ]
            },
            {
              nombre: "1.2 Variables y Tipos de Datos",
              contenido: [
                "• Variables: declaración, inicialización y asignación",
                "• Tipos primitivos: enteros, flotantes, booleanos, caracteres",
                "• Strings y manipulación de cadenas de texto",
                "• Constantes y su importancia en el código",
                "• Conversión entre tipos de datos (casting)",
                "• Buenas prácticas en nomenclatura de variables"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 1: Calculadora Básica",
              descripcion: "Crea una calculadora que realice operaciones básicas.",
              pasos: [
                "1. Solicita dos números al usuario",
                "2. Muestra un menú con las operaciones disponibles",
                "3. Realiza la operación seleccionada",
                "4. Maneja errores (como división por cero)"
              ],
              solucionEsperada: "Un programa interactivo que funcione correctamente y maneje errores."
            }
          ]
        },
        {
          titulo: "Módulo 2: Estructuras de Datos",
          duracion: "25 horas",
          descripcion: "Domina las estructuras fundamentales para organizar información.",
          temas: [
            {
              nombre: "2.1 Arrays y Listas",
              contenido: [
                "• Declaración e inicialización de arrays",
                "• Acceso a elementos por índice",
                "• Recorrido de arrays con bucles",
                "• Arrays multidimensionales (matrices)",
                "• Operaciones comunes: buscar, insertar, eliminar"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 2: Sistema de Gestión",
              descripcion: "Desarrolla un sistema para administrar información.",
              pasos: [
                "1. Crea estructura para almacenar datos",
                "2. Implementa funciones CRUD",
                "3. Genera reportes estadísticos"
              ],
              solucionEsperada: "Sistema funcional con operaciones completas."
            }
          ]
        },
        {
          titulo: "Módulo 3: Programación Orientada a Objetos",
          duracion: "30 horas",
          descripcion: "Aprende el paradigma más usado en la industria.",
          temas: [
            {
              nombre: "3.1 Clases y Objetos",
              contenido: [
                "• ¿Qué es un objeto? Propiedades y métodos",
                "• Definición de clases: blueprint de objetos",
                "• Constructor: inicialización de objetos",
                "• Instanciación: crear objetos desde clases"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 3: Sistema Bancario",
              descripcion: "Diseña un sistema de cuentas usando POO.",
              pasos: [
                "1. Crea clase Cuenta con propiedades básicas",
                "2. Implementa métodos de transacciones",
                "3. Crea subclases especializadas"
              ],
              solucionEsperada: "Sistema con jerarquía de clases correcta."
            }
          ]
        },
        {
          titulo: "Módulo 4: Mejores Prácticas",
          duracion: "20 horas",
          descripcion: "Conviértete en un programador profesional.",
          temas: [
            {
              nombre: "4.1 Clean Code",
              contenido: [
                "• Nombres significativos de variables",
                "• Funciones pequeñas y con una sola responsabilidad",
                "• Evitar código duplicado (DRY principle)",
                "• Comentarios útiles vs innecesarios",
                "• Refactorización continua"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 4: Proyecto Final",
              descripcion: "Desarrolla una aplicación completa.",
              pasos: [
                "1. Elige un proyecto ambicioso",
                "2. Diseña la arquitectura",
                "3. Implementa con mejores prácticas",
                "4. Documenta completamente"
              ],
              solucionEsperada: "Aplicación funcional y bien documentada."
            }
          ]
        }
      ],
      proyectoFinal: {
        titulo: "Proyecto Capstone: Sistema Completo",
        descripcion: "Desarrolla un proyecto que demuestre todas tus habilidades.",
        requisitos: [
          "• Aplicación funcional con interfaz de usuario",
          "• Uso de estructuras de datos apropiadas",
          "• Implementación de POO",
          "• Código limpio y documentado",
          "• Pruebas unitarias",
          "• Control de versiones con Git"
        ],
        sugerenciasDeProyectos: [
          "1. Sistema de gestión de biblioteca",
          "2. Aplicación de finanzas personales",
          "3. Juego completo (ajedrez, sudoku)",
          "4. Sistema de reservas",
          "5. Red social básica",
          "6. E-commerce simple"
        ],
        criteriosEvaluacion: [
          "• Funcionalidad completa (30%)",
          "• Calidad del código (25%)",
          "• Diseño de arquitectura (20%)",
          "• Testing (15%)",
          "• Documentación (10%)"
        ]
      },
      recursos: [
        "📚 Libros Recomendados:",
        "  • 'Clean Code' - Robert C. Martin",
        "  • 'Design Patterns' - Gang of Four",
        "",
        "🌐 Sitios Web:",
        "  • MDN Web Docs",
        "  • Stack Overflow",
        "  • GitHub",
        "",
        "🎓 Plataformas de Práctica:",
        "  • LeetCode",
        "  • HackerRank",
        "  • Codewars"
      ],
      consejosFinal: [
        "✓ Practica DIARIAMENTE",
        "✓ Lee código de otros",
        "✓ Construye proyectos reales",
        "✓ Participa en comunidades",
        "✓ No memorices, entiende",
        "✓ Debuggea con paciencia",
        "✓ Mantente actualizado",
        "✓ Contribuye a open source"
      ]
    };
  }
  
  // ==================== INTELIGENCIA ARTIFICIAL ====================
  if (titleLower.includes("ia") || titleLower.includes("inteligencia") || titleLower.includes("machine") || titleLower.includes("neural")) {
    return {
      tema: "Inteligencia Artificial y Machine Learning",
      introduccion: "La Inteligencia Artificial está revolucionando todas las industrias. Este curso te proporcionará una comprensión profunda de los algoritmos de Machine Learning y Deep Learning.",
      objetivos: [
        "Comprender los fundamentos teóricos del ML y Deep Learning",
        "Implementar algoritmos de ML desde cero",
        "Entrenar y evaluar modelos de clasificación y regresión",
        "Diseñar redes neuronales para diferentes tareas",
        "Aplicar técnicas de optimización y regularización"
      ],
      prerequisitos: [
        "Programación en Python (nivel intermedio)",
        "Matemáticas: álgebra lineal básica",
        "Estadística y probabilidad fundamental",
        "Conocimientos básicos de cálculo"
      ],
      modulos: [
        {
          titulo: "Módulo 1: Introducción a la IA",
          duracion: "15 horas",
          descripcion: "Fundamentos conceptuales y matemáticos.",
          temas: [
            {
              nombre: "1.1 Fundamentos de IA",
              contenido: [
                "• Historia de la IA: de Turing a ChatGPT",
                "• IA débil vs IA fuerte (AGI)",
                "• Machine Learning vs Deep Learning",
                "• Tipos de aprendizaje: supervisado, no supervisado",
                "• Aplicaciones actuales de la IA"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 1: Análisis de Datos",
              descripcion: "Analiza un dataset usando Pandas.",
              pasos: [
                "1. Carga el dataset",
                "2. Explora estadísticas descriptivas",
                "3. Visualiza distribuciones",
                "4. Identifica correlaciones"
              ],
              solucionEsperada: "Notebook con análisis completo."
            }
          ]
        },
        {
          titulo: "Módulo 2: ML Supervisado",
          duracion: "30 horas",
          descripcion: "Algoritmos de clasificación y regresión.",
          temas: [
            {
              nombre: "2.1 Regresión Lineal",
              contenido: [
                "• Concepto y formulación matemática",
                "• Función de costo (MSE)",
                "• Gradient Descent",
                "• Regularización: Ridge y Lasso",
                "• Métricas de evaluación"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 2: Predicción de Precios",
              descripcion: "Construye un modelo de regresión.",
              pasos: [
                "1. Preprocesa datos",
                "2. Divide en train/test",
                "3. Entrena modelo",
                "4. Evalúa resultados"
              ],
              solucionEsperada: "Modelo con R² > 0.8."
            }
          ]
        },
        {
          titulo: "Módulo 3: ML No Supervisado",
          duracion: "20 horas",
          descripcion: "Descubrimiento de patrones.",
          temas: [
            {
              nombre: "3.1 K-Means Clustering",
              contenido: [
                "• Algoritmo de clustering",
                "• Inicialización de centroides",
                "• Elbow method para elegir K",
                "• Silhouette score",
                "• Casos de uso"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 3: Segmentación",
              descripcion: "Agrupa clientes por patrones.",
              pasos: [
                "1. Normaliza características",
                "2. Aplica K-Means",
                "3. Determina K óptimo",
                "4. Visualiza clusters"
              ],
              solucionEsperada: "Segmentación clara con insights."
            }
          ]
        },
        {
          titulo: "Módulo 4: Deep Learning",
          duracion: "35 horas",
          descripcion: "Redes neuronales modernas.",
          temas: [
            {
              nombre: "4.1 Redes Neuronales",
              contenido: [
                "• Perceptrón: neurona artificial",
                "• Arquitectura de capas",
                "• Funciones de activación",
                "• Forward y backpropagation",
                "• Optimizadores: SGD, Adam"
              ]
            }
          ],
          ejerciciosPracticos: [
            {
              titulo: "Ejercicio 4: Clasificador CNN",
              descripcion: "Construye una CNN para imágenes.",
              pasos: [
                "1. Diseña arquitectura CNN",
                "2. Implementa data augmentation",
                "3. Entrena el modelo",
                "4. Evalúa con métricas"
              ],
              solucionEsperada: "CNN con accuracy > 75%."
            }
          ]
        }
      ],
      proyectoFinal: {
        titulo: "Proyecto: Sistema de IA Completo",
        descripcion: "Desarrolla una solución de IA end-to-end.",
        requisitos: [
          "• Dataset real con 1000+ muestras",
          "• Análisis exploratorio completo",
          "• Pipeline de preprocesamiento",
          "• 3+ modelos comparados",
          "• Optimización de hiperparámetros",
          "• Visualizaciones profesionales"
        ],
        sugerenciasDeProyectos: [
          "1. Detección de fraude",
          "2. Clasificador de imágenes médicas",
          "3. Sistema de recomendación",
          "4. Predictor de churn",
          "5. Análisis de sentimiento",
          "6. Detección de fake news"
        ],
        criteriosEvaluacion: [
          "• Funcionalidad (30%)",
          "• Calidad técnica (25%)",
          "• Innovación (20%)",
          "• Documentación (15%)",
          "• Presentación (10%)"
        ]
      },
      recursos: [
        "📚 Libros Esenciales:",
        "  • 'Deep Learning' - Ian Goodfellow",
        "  • 'Hands-On Machine Learning' - Aurélien Géron",
        "",
        "🎓 Cursos Online:",
        "  • Andrew Ng - Machine Learning",
        "  • Fast.ai - Deep Learning",
        "",
        "🛠️ Herramientas:",
        "  • TensorFlow / Keras",
        "  • PyTorch",
        "  • Scikit-learn",
        "  • Google Colab"
      ],
      consejosFinal: [
        "✓ Comienza con proyectos simples",
        "✓ Entiende las matemáticas",
        "✓ Lee papers de investigación",
        "✓ Participa en Kaggle",
        "✓ Reproduce papers importantes",
        "✓ Mantente actualizado",
        "✓ Comprende cuándo usar qué algoritmo",
        "✓ La calidad de datos es clave"
      ]
    };
  }

  // ==================== CONTENIDO GENÉRICO ====================
  return {
    tema: "Curso Profesional Completo",
    introduccion: courseDescription || "Este curso integral te proporcionará conocimientos profundos y habilidades prácticas en el área.",
    objetivos: [
      "Adquirir dominio completo de los fundamentos",
      "Desarrollar habilidades técnicas aplicables",
      "Construir un portfolio profesional",
      "Aplicar mejores prácticas de la industria",
      "Resolver problemas complejos efectivamente"
    ],
    prerequisitos: [
      "Conocimientos básicos del área",
      "Motivación para aprender",
      "Computadora con internet",
      "Práctica regular (2+ horas diarias)"
    ],
    modulos: [
      {
        titulo: "Módulo 1: Fundamentos",
        duracion: "15 horas",
        descripcion: "Bases sólidas del tema.",
        temas: [
          {
            nombre: "1.1 Introducción",
            contenido: [
              "• Historia y contexto",
              "• Conceptos básicos",
              "• Herramientas esenciales",
              "• Mejores prácticas",
              "• Casos de uso"
            ]
          }
        ],
        ejerciciosPracticos: [
          {
            titulo: "Ejercicio 1: Proyecto Inicial",
            descripcion: "Aplica conceptos básicos.",
            pasos: [
              "1. Configura entorno",
              "2. Implementa conceptos",
              "3. Documenta proceso"
            ],
            solucionEsperada: "Proyecto funcional básico."
          }
        ]
      },
      {
        titulo: "Módulo 2: Técnicas Intermedias",
        duracion: "20 horas",
        descripcion: "Profundización práctica.",
        temas: [
          {
            nombre: "2.1 Herramientas",
            contenido: [
              "• Frameworks principales",
              "• Flujos de trabajo",
              "• Debugging",
              "• Optimización",
              "• Testing"
            ]
          }
        ],
        ejerciciosPracticos: [
          {
            titulo: "Ejercicio 2: Proyecto Intermedio",
            descripcion: "Desarrolla proyecto complejo.",
            pasos: [
              "1. Define requisitos",
              "2. Diseña arquitectura",
              "3. Implementa funcionalidades"
            ],
            solucionEsperada: "Proyecto con buenas prácticas."
          }
        ]
      },
      {
        titulo: "Módulo 3: Aplicaciones Reales",
        duracion: "25 horas",
        descripcion: "Casos de uso profesionales.",
        temas: [
          {
            nombre: "3.1 Proyectos Reales",
            contenido: [
              "• Análisis de casos exitosos",
              "• Patrones de solución",
              "• Arquitecturas escalables",
              "• Performance",
              "• Seguridad"
            ]
          }
        ],
        ejerciciosPracticos: [
          {
            titulo: "Ejercicio 3: Proyecto Real",
            descripcion: "Resuelve problema real.",
            pasos: [
              "1. Investiga problema",
              "2. Diseña soluciones",
              "3. Implementa mejor opción"
            ],
            solucionEsperada: "Solución profesional completa."
          }
        ]
      },
      {
        titulo: "Módulo 4: Nivel Avanzado",
        duracion: "30 horas",
        descripcion: "Especialización profesional.",
        temas: [
          {
            nombre: "4.1 Técnicas Avanzadas",
            contenido: [
              "• Tópicos especializados",
              "• Innovaciones recientes",
              "• Herramientas cutting-edge",
              "• Tendencias futuras",
              "• Portfolio profesional"
            ]
          }
        ],
        ejerciciosPracticos: [
          {
            titulo: "Ejercicio 4: Proyecto Capstone",
            descripcion: "Proyecto final integrador.",
            pasos: [
              "1. Propone proyecto ambicioso",
              "2. Planifica desarrollo",
              "3. Implementa profesionalmente",
              "4. Presenta resultados"
            ],
            solucionEsperada: "Proyecto para portfolio profesional."
          }
        ]
      }
    ],
    proyectoFinal: {
      titulo: "Proyecto Final Integrador",
      descripcion: "Demuestra dominio completo del tema.",
      requisitos: [
        "• Aplicación completa funcional",
        "• Código de calidad profesional",
        "• Documentación exhaustiva",
        "• Testing completo",
        "• Buenas prácticas",
        "• Repository público"
      ],
      sugerenciasDeProyectos: [
        "1. Sistema de gestión específico",
        "2. Aplicación web completa",
        "3. Herramienta de automatización",
        "4. Dashboard analítico",
        "5. API REST documentada"
      ],
      criteriosEvaluacion: [
        "• Funcionalidad (30%)",
        "• Calidad técnica (25%)",
        "• Innovación (20%)",
        "• Documentación (15%)",
        "• Presentación (10%)"
      ]
    },
    recursos: [
      "📚 Recursos de Aprendizaje:",
      "  • Documentación oficial",
      "  • Libros recomendados",
      "  • Cursos complementarios",
      "",
      "🌐 Comunidades:",
      "  • Foros especializados",
      "  • Grupos en redes sociales",
      "",
      "🛠️ Herramientas:",
      "  • Software esencial",
      "  • Extensiones útiles"
    ],
    consejosFinal: [
      "✓ Practica diariamente",
      "✓ Construye proyectos reales",
      "✓ Participa en comunidades",
      "✓ Mantente actualizado",
      "✓ No temas cometer errores",
      "✓ Documenta tu progreso",
      "✓ Busca feedback",
      "✓ Nunca dejes de aprender"
    ]
  };
};

// Función principal para generar el PDF
export const generateCoursePDF = (course) => {
  try {
    console.log('📄 Generando PDF completo para:', course.title);
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    const content = getCourseContent(course.title, course.description);

    const checkPageBreak = (spaceNeeded = 20) => {
      if (yPosition + spaceNeeded > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    const addText = (text, fontSize = 10, isBold = false, color = [50, 50, 50]) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach(line => {
        checkPageBreak();
        doc.text(line, margin, yPosition);
        yPosition += fontSize * 0.5;
      });
    };

    // PORTADA
    doc.setFillColor(44, 191, 240);
    doc.rect(0, 0, pageWidth, 100, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(course.title, contentWidth - 20);
    let titleY = 40;
    titleLines.forEach(line => {
      doc.text(line, pageWidth / 2, titleY, { align: 'center' });
      titleY += 10;
    });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(content.tema, pageWidth / 2, titleY + 10, { align: 'center' });

    yPosition = 120;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    const infoText = `Duracion estimada: ${course.hours || '50-100'} horas | Nivel: ${course.difficulty || 'Intermedio'}`;
    doc.text(infoText, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    doc.setDrawColor(44, 191, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // TABLA DE CONTENIDOS
    doc.setTextColor(44, 191, 240);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Tabla de Contenidos', margin, yPosition);
    yPosition += 10;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    content.modulos.forEach((modulo, idx) => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${modulo.titulo}`, margin + 5, yPosition);
      yPosition += 6;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`   ${modulo.descripcion}`, margin + 5, yPosition);
      doc.setTextColor(50, 50, 50);
      yPosition += 8;
    });

    // INTRODUCCIÓN
    doc.addPage();
    yPosition = margin;
    doc.setTextColor(44, 191, 240);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Introduccion al Curso', margin, yPosition);
    yPosition += 12;
    addText(content.introduccion, 11);
    yPosition += 8;

    // OBJETIVOS
    checkPageBreak(30);
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
    doc.setTextColor(44, 191, 240);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Objetivos del Curso', margin, yPosition + 4);
    yPosition += 15;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    content.objetivos.forEach(obj => {
      checkPageBreak();
      addText(obj, 10);
      yPosition += 3;
    });
    yPosition += 10;

    // PREREQUISITOS
    checkPageBreak(25);
    doc.setFillColor(255, 250, 240);
    doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
    doc.setTextColor(255, 140, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Prerequisitos', margin, yPosition + 4);
    yPosition += 15;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    content.prerequisitos.forEach(pre => {
      checkPageBreak();
      addText(pre, 10);
      yPosition += 3;
    });
    yPosition += 15;

    // MÓDULOS DETALLADOS
    content.modulos.forEach((modulo) => {
      doc.addPage();
      yPosition = margin;
      doc.setFillColor(44, 191, 240);
      doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 15, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(modulo.titulo, margin, yPosition + 6);
      yPosition += 20;
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text(`Duracion: ${modulo.duracion}`, margin, yPosition);
      yPosition += 8;
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      addText(modulo.descripcion, 10);
      yPosition += 10;

      modulo.temas.forEach((tema) => {
        checkPageBreak(30);
        doc.setFillColor(230, 245, 255);
        doc.roundedRect(margin, yPosition, contentWidth, 8, 2, 2, 'F');
        doc.setTextColor(0, 100, 180);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(tema.nombre, margin + 3, yPosition + 5);
        yPosition += 12;
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        tema.contenido.forEach((item) => {
          checkPageBreak();
          const lines = doc.splitTextToSize(item, contentWidth - 10);
          lines.forEach(line => {
           doc.text(line, margin + 5, yPosition);
            yPosition += 5;
          });
        });
        yPosition += 5;
      });

      // Ejercicios Prácticos
      if (modulo.ejerciciosPracticos && modulo.ejerciciosPracticos.length > 0) {
        yPosition += 5;
        checkPageBreak(40);
        doc.setFillColor(255, 248, 220);
        doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
        doc.setTextColor(218, 165, 32);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Ejercicios Practicos - ${modulo.titulo}`, margin, yPosition + 4);
        yPosition += 15;

        modulo.ejerciciosPracticos.forEach((ejercicio) => {
          checkPageBreak(35);
          doc.setTextColor(44, 191, 240);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          addText(ejercicio.titulo, 11, true, [44, 191, 240]);
          yPosition += 2;
          doc.setTextColor(50, 50, 50);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          addText(ejercicio.descripcion, 10);
          yPosition += 5;
          doc.setFont('helvetica', 'bold');
          doc.text('Pasos:', margin + 5, yPosition);
          yPosition += 5;
          doc.setFont('helvetica', 'normal');
          ejercicio.pasos.forEach(paso => {
            checkPageBreak();
            addText(paso, 9);
            yPosition += 2;
          });
          yPosition += 5;
          if (ejercicio.solucionEsperada) {
            doc.setFont('helvetica', 'bold');
            doc.text('Solucion esperada:', margin + 5, yPosition);
            yPosition += 5;
            doc.setFont('helvetica', 'normal');
            addText(ejercicio.solucionEsperada, 9);
            yPosition += 8;
          }
        });
      }
    });

    // PROYECTO FINAL
    if (content.proyectoFinal) {
      doc.addPage();
      yPosition = margin;
      doc.setFillColor(255, 215, 0);
      doc.rect(0, yPosition - 5, pageWidth, 20, 'F');
      doc.setTextColor(139, 69, 19);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('PROYECTO FINAL', pageWidth / 2, yPosition + 8, { align: 'center' });
      yPosition += 25;
      doc.setTextColor(44, 191, 240);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      addText(content.proyectoFinal.titulo, 16, true, [44, 191, 240]);
      yPosition += 8;
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      addText(content.proyectoFinal.descripcion, 11);
      yPosition += 12;

      // Requisitos
      doc.setFillColor(240, 255, 240);
      doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
      doc.setTextColor(34, 139, 34);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Requisitos del Proyecto', margin, yPosition + 4);
      yPosition += 15;
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      content.proyectoFinal.requisitos.forEach(req => {
        checkPageBreak();
        addText(req, 10);
        yPosition += 3;
      });
      yPosition += 12;

      // Sugerencias
      if (content.proyectoFinal.sugerenciasDeProyectos) {
        checkPageBreak(30);
        doc.setFillColor(255, 245, 238);
        doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
        doc.setTextColor(255, 140, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Ideas de Proyectos', margin, yPosition + 4);
        yPosition += 15;
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        content.proyectoFinal.sugerenciasDeProyectos.forEach(sugerencia => {
          checkPageBreak();
          addText(sugerencia, 10);
          yPosition += 3;
        });
        yPosition += 12;
      }

      // Criterios
      if (content.proyectoFinal.criteriosEvaluacion) {
        checkPageBreak(25);
        doc.setFillColor(248, 248, 255);
        doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
        doc.setTextColor(75, 0, 130);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Criterios de Evaluacion', margin, yPosition + 4);
        yPosition += 15;
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        content.proyectoFinal.criteriosEvaluacion.forEach(criterio => {
          checkPageBreak();
          addText(criterio, 10);
          yPosition += 3;
        });
      }
    }

    // RECURSOS
    doc.addPage();
    yPosition = margin;
    doc.setFillColor(44, 191, 240);
    doc.rect(0, yPosition - 5, pageWidth, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Recursos Adicionales', margin, yPosition + 6);
    yPosition += 20;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    content.recursos.forEach((recurso) => {
      checkPageBreak();
      if (recurso.includes('📚') || recurso.includes('🌐') || recurso.includes('🛠️') || 
          recurso.includes('📊') || recurso.includes('🎓') || recurso.includes('🎥')) {
        yPosition += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(44, 191, 240);
      } else if (recurso.trim() === '') {
        yPosition += 3;
        return;
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
      }
      doc.text(recurso, margin, yPosition);
      yPosition += 6;
    });

    // CONSEJOS
    yPosition += 10;
    checkPageBreak(40);
    doc.setFillColor(255, 250, 205);
    doc.roundedRect(margin - 5, yPosition - 5, contentWidth + 10, 12, 2, 2, 'F');
    doc.setTextColor(184, 134, 11);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Consejos para el Exito', margin, yPosition + 4);
    yPosition += 15;
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    content.consejosFinal.forEach((consejo) => {
      checkPageBreak();
      addText(consejo, 10);
      yPosition += 4;
    });

    // NOTAS
    doc.addPage();
    yPosition = margin;
    doc.setTextColor(44, 191, 240);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Espacio para Notas', margin, yPosition);
    yPosition += 10;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    for (let i = 0; i < 35; i++) {
      checkPageBreak(10);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 7;
    }

    // PÁGINA FINAL
    doc.addPage();
    yPosition = pageHeight / 2 - 50;
    doc.setFillColor(44, 191, 240);
    doc.rect(0, yPosition - 20, pageWidth, 100, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Felicitaciones!', pageWidth / 2, yPosition + 10, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Has completado el material del curso', pageWidth / 2, yPosition + 25, { align: 'center' });
    doc.text('Ahora es momento de poner en practica', pageWidth / 2, yPosition + 35, { align: 'center' });
    doc.text('todo lo que has aprendido', pageWidth / 2, yPosition + 45, { align: 'center' });
    yPosition += 70;
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255, 0.7);
    doc.text('Continua aprendiendo y construyendo proyectos increibles', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    doc.setFontSize(8);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-MX')}`, pageWidth / 2, yPosition, { align: 'center' });

    // Generar y descargar
    const fileName = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_curso_completo.pdf`;
    doc.save(fileName);
    console.log('✅ PDF completo generado exitosamente:', fileName);
    console.log(`📄 Total de páginas: ${doc.internal.getNumberOfPages()}`);
    return true;
    
  } catch (error) {
    console.error('❌ Error generando PDF:', error);
    alert('Error al generar el PDF. Por favor intenta de nuevo.');
    return false;
  }
};

export default generateCoursePDF;