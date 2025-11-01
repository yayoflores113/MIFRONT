import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Spinner } from "@heroui/react";
import Config from "../Config";

const LearningPaths = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  const fetchLearningPaths = async () => {
    try {
      setLoading(true);
      const response = await Config.getLearningPaths();
      setPaths(response.data);
    } catch (err) {
      console.error("Error fetching learning paths:", err);
      setError("No se pudieron cargar las rutas de aprendizaje");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un ícono según el índice o título
  const getPathIcon = (index) => {
    const icons = [
      // Icono 1: Código
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>,
      // Icono 2: Libro abierto
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>,
      // Icono 3: Graduación
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>,
      // Icono 4: Rocket
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>,
      // Icono 5: Target
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>,
      // Icono 6: Lightbulb
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>,
    ];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="text-4xl">🗺️</span>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#181818] mb-2">
            Rutas de Aprendizaje
          </h1>
          <p className="text-[#181818]/60">
            Descubre caminos estructurados para alcanzar tus objetivos profesionales
          </p>
        </div>
      </div>

      {paths.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl block mb-4">📚</span>
          <p className="text-[#181818]/60">
            No hay rutas de aprendizaje disponibles en este momento
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, index) => (
            <Card
              key={path.id}
              isPressable
              as={Link}
              to={`/learning-paths/${path.slug}`}
              className="h-full border border-default-200 hover:border-[#2CBFF0] transition-all"
            >
              <CardHeader className="flex-col items-start pb-0">
                <div className="w-full h-48 bg-gradient-to-br from-[#2CBFF0]/10 to-[#2CBFF0]/30 rounded-lg mb-4 flex items-center justify-center text-[#2CBFF0]">
                  {getPathIcon(index)}
                </div>
                <h3 className="text-xl font-semibold text-[#181818]">
                  {path.title}
                </h3>
              </CardHeader>
              
              <CardBody className="py-4">
                <p className="text-[#181818]/60 line-clamp-3">
                  {path.description}
                </p>
                {path.duration && (
                  <div className="flex items-center gap-2 text-sm text-[#181818]/50 mt-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Duración: {path.duration}</span>
                  </div>
                )}
              </CardBody>
              
              <CardFooter className="pt-0">
                <div className="flex items-center gap-2 text-sm text-[#2CBFF0] font-medium">
                  <span>Ver ruta completa</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPaths;