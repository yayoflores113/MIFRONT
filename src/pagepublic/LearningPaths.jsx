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
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#181818] mb-2">
          Rutas de Aprendizaje
        </h1>
        <p className="text-[#181818]/60">
          Descubre caminos estructurados para alcanzar tus objetivos profesionales
        </p>
      </div>

      {paths.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#181818]/60">
            No hay rutas de aprendizaje disponibles en este momento
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => (
            <Card
              key={path.id}
              isPressable
              as={Link}
              to={`/learning-paths/${path.slug}`}
              className="h-full border border-default-200 hover:border-[#2CBFF0] transition-all"
            >
              <CardHeader className="flex-col items-start pb-0">
                {path.image && (
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-[#181818]">
                  {path.title}
                </h3>
              </CardHeader>
              
              <CardBody className="py-4">
                <p className="text-[#181818]/60 line-clamp-3">
                  {path.description}
                </p>
                {path.duration && (
                  <p className="text-sm text-[#181818]/50 mt-2">
                    Duración: {path.duration}
                  </p>
                )}
              </CardBody>
              
              <CardFooter className="pt-0">
                <span className="text-sm text-[#2CBFF0] font-medium">
                  Ver ruta completa →
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPaths;