import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  SparklesIcon,
  MapPinIcon,
  CodeBracketIcon,
  PencilSquareIcon,
  BriefcaseIcon,
  HomeModernIcon,
  HeartIcon,
  LightBulbIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const TestResults = ({ careers = [], courses = [], universities = [] }) => {
  // Validar y limpiar datos
  const validCareers = (careers || []).filter(c => c && typeof c === 'string' && c !== 'undefined');
  const validCourses = (courses || []).filter(c => c && typeof c === 'string' && c !== 'undefined');
  const validUniversities = (universities || []).filter(u => u && typeof u === 'string' && u !== 'undefined');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm">
          <CardBody className="p-6 text-center">
            <AcademicCapIcon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-900">{validCareers.length}</p>
            <p className="text-sm text-blue-700 mt-1">Carreras</p>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-none shadow-sm">
          <CardBody className="p-6 text-center">
            <BuildingLibraryIcon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-purple-900">{validUniversities.length}</p>
            <p className="text-sm text-purple-700 mt-1">Universidades</p>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-none shadow-sm">
          <CardBody className="p-6 text-center">
            <SparklesIcon className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-green-900">100%</p>
            <p className="text-sm text-green-700 mt-1">Match</p>
          </CardBody>
        </Card>
      </div>

      {/* Carreras Recomendadas */}
      {validCareers.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <AcademicCapIcon className="w-6 h-6 text-[#2CBFF0]" />
            <h3 className="text-xl font-bold text-[#181818]">
              Carreras Recomendadas para Ti
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {validCareers.slice(0, 4).map((career, index) => {
              // Extraer nombre de carrera y universidad
              const parts = (career || "").split("(");
              const careerName = parts[0]?.trim() || "Carrera";
              const university = parts[1]?.replace(")", "").trim() || "Universidad";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all hover:scale-[1.02] border-2 border-default-200 h-full">
                    <CardBody className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2CBFF0] to-cyan-500 flex items-center justify-center shadow-md">
                            {getIconForCareer(careerName)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#181818] text-base mb-2 line-clamp-2">
                            {careerName}
                          </h4>
                          {university && university !== "undefined" && (
                            <div className="flex items-center gap-2 text-sm text-default-500">
                              <BuildingLibraryIcon className="w-4 h-4" />
                              <span className="line-clamp-1">{university}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Quinta carrera si existe */}
          {validCareers.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-4"
            >
              <Card className="hover:shadow-lg transition-all hover:scale-[1.01] border-2 border-default-200">
                <CardBody className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2CBFF0] to-cyan-500 flex items-center justify-center shadow-md">
                        {(() => {
                          const parts = (validCareers[4] || "").split("(");
                          const careerName = parts[0]?.trim() || "Carrera";
                          return getIconForCareer(careerName);
                        })()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      {(() => {
                        const parts = (validCareers[4] || "").split("(");
                        const careerName = parts[0]?.trim() || "Carrera";
                        const university = parts[1]?.replace(")", "").trim() || "Universidad";
                        return (
                          <>
                            <h4 className="font-bold text-[#181818] text-base mb-2">
                              {careerName}
                            </h4>
                            {university && university !== "undefined" && (
                              <div className="flex items-center gap-2 text-sm text-default-500">
                                <BuildingLibraryIcon className="w-4 h-4" />
                                <span>{university}</span>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* Universidades */}
      {validUniversities.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <BuildingLibraryIcon className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-[#181818]">
              Universidades en Yucatán
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {validUniversities.map((university, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all hover:scale-[1.02] border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50 h-full">
                  <CardBody className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <BuildingLibraryIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base text-[#181818] line-clamp-2 mb-2">
                          {university}
                        </p>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-purple-600 font-medium">
                            Mérida, Yucatán
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Cursos (si los hay) */}
      {validCourses.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-[#181818]">
              Cursos Recomendados
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {validCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow border border-green-100">
                  <CardBody className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                        <BookOpenIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-[#181818] line-clamp-2">
                          {course}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {validCareers.length === 0 && validUniversities.length === 0 && validCourses.length === 0 && (
        <div className="text-center py-12">
          <SparklesIcon className="w-16 h-16 text-default-300 mx-auto mb-4" />
          <p className="text-default-500">
            No hay recomendaciones disponibles
          </p>
        </div>
      )}

      {/* CTA final */}
      {(validCareers.length > 0 || validUniversities.length > 0) && (
        <Card className="bg-gradient-to-r from-[#2CBFF0]/10 to-cyan-500/10 border-2 border-[#2CBFF0]/30 shadow-md">
          <CardBody className="p-8">
            <div className="text-center">
              <SparklesIcon className="w-12 h-12 text-[#2CBFF0] mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-[#181818] mb-3">
                ¡Excelente elección!
              </h4>
              <p className="text-base text-default-600 max-w-2xl mx-auto">
                Estas carreras se adaptan perfectamente a tu perfil y habilidades. 
                Explora más información sobre cada una en nuestro catálogo de 
                universidades y cursos.
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

/* === Helper para iconos === */
function getIconForCareer(career) {
  const text = String(career || "").toLowerCase();
  
  if (
    text.includes("ingeniería") ||
    text.includes("ingenieria") ||
    text.includes("software") ||
    text.includes("computación") ||
    text.includes("computacion")
  ) {
    return <CodeBracketIcon className="w-7 h-7 text-white" />;
  }
  if (text.includes("diseño") || text.includes("diseno")) {
    return <PencilSquareIcon className="w-7 h-7 text-white" />;
  }
  if (text.includes("psicología") || text.includes("psicologia")) {
    return <LightBulbIcon className="w-7 h-7 text-white" />;
  }
  if (
    text.includes("administración") ||
    text.includes("administracion") ||
    text.includes("empresas") ||
    text.includes("negocios")
  ) {
    return <BriefcaseIcon className="w-7 h-7 text-white" />;
  }
  if (text.includes("arquitectura")) {
    return <HomeModernIcon className="w-7 h-7 text-white" />;
  }
  if (
    text.includes("medicina") ||
    text.includes("salud") ||
    text.includes("enfermería") ||
    text.includes("enfermeria") ||
    text.includes("nutrición") ||
    text.includes("nutricion")
  ) {
    return <HeartIcon className="w-7 h-7 text-white" />;
  }
  if (
    text.includes("literatura") ||
    text.includes("lenguas") ||
    text.includes("historia") ||
    text.includes("comunicación") ||
    text.includes("comunicacion")
  ) {
    return <BookOpenIcon className="w-7 h-7 text-white" />;
  }
  if (
    text.includes("derecho") ||
    text.includes("legal") ||
    text.includes("abogado")
  ) {
    return <GlobeAltIcon className="w-7 h-7 text-white" />;
  }
  
  return <AcademicCapIcon className="w-7 h-7 text-white" />;
}

export default TestResults;