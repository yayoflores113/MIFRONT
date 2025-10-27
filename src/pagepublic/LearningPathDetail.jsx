import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
  Spinner,
  Image,
  Divider,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  TrophyIcon,
  LockClosedIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Config from "../Config";

const centsToCurrency = (cents, locale = "es-MX", currency = "MXN") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    (Number(cents) || 0) / 100
  );

const courseImgSrc = (val) => {
  if (!val) return "";
  if (val.startsWith("data:image")) return val;
  if (/^https?:\/\//i.test(val)) return val;

  const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
  const fromAxios = axiosBase ? axiosBase.replace(/\/api\/?.*$/i, "") : "";
  const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
  const backendOrigin = fromAxios || fromEnv || "";

  return backendOrigin
    ? `${backendOrigin.replace(/\/$/, "")}/img/cursos/${val}`
    : `/img/cursos/${val}`;
};

const LearningPathDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [path, setPath] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log('=== COMPONENTE LEARNING PATH DETAIL CARGADO ===');
  console.log('Slug:', slug);

  useEffect(() => {
    console.log('=== USEEFFECT EJECUTADO ===');
    const fetchPath = async () => {
      setLoading(true);
      setError("");
      try {
        console.log('Llamando API para slug:', slug);
        const response = await Config.getLearningPathBySlug(slug);
        console.log('✅ Response completa:', response);
        console.log('✅ Response.data:', response.data);
        
        const pathData = response.data?.data || response.data;
        const statsData = response.data?.stats || null;
        
        console.log('✅ Path data procesado:', pathData);
        console.log('✅ Stats data procesado:', statsData);
        
        if (pathData) {
          setPath(pathData);
          setStats(statsData);
        } else {
          setError("No se encontraron datos de la ruta");
        }
      } catch (err) {
        console.error("❌ Error loading path:", err);
        console.error("❌ Error response:", err.response);
        setError("No se pudo cargar la ruta de aprendizaje.");
      } finally {
        setLoading(false);
      }
    };

    fetchPath();
  }, [slug]);

  const getDifficultyColor = (diff) => {
    const diffLower = (diff || '').toLowerCase();
    const colors = {
      principiante: "success",
      beginner: "success",
      intermedio: "warning",
      intermediate: "warning",
      avanzado: "danger",
      advanced: "danger",
    };
    return colors[diffLower] || "default";
  };

  console.log('Estado actual:', { loading, error, hasPath: !!path });

  if (loading) {
    console.log('📍 Mostrando spinner de carga...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFEFE]">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-default-600">Cargando ruta de aprendizaje...</p>
        </div>
      </div>
    );
  }

  if (error || !path) {
    console.log('📍 Mostrando error:', error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FEFEFE]">
        <AcademicCapIcon className="w-20 h-20 text-default-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Ruta no encontrada</h2>
        <p className="text-default-500 mb-6">{error || "La ruta no existe"}</p>
        <Button 
          onPress={() => navigate("/learning-paths")}
          className="bg-[#2CBFF0] text-white"
        >
          Ver todas las rutas
        </Button>
      </div>
    );
  }

  console.log('📍 Renderizando contenido completo de la ruta');

  const progressPercent = stats?.total_courses
    ? Math.round((stats.free_courses / stats.total_courses) * 100)
    : 0;

  const pathIcon = path?.icon || "📚";
  const pathSubtitle = path?.subtitle || path?.description?.substring(0, 100) + "..." || "";
  const pathGoal = path?.goal || path?.description || "Aprende y desarrolla nuevas habilidades";
  const pathDifficulty = path?.difficulty || (path?.level ? path.level.toLowerCase() : "intermedio");
  const pathEstimatedHours = path?.estimated_hours || stats?.total_hours || 0;
  const pathCourses = path?.courses || [];

  console.log('📊 Datos finales:', {
    icon: pathIcon,
    difficulty: pathDifficulty,
    hours: pathEstimatedHours,
    coursesCount: pathCourses.length
  });

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Button
            as={Link}
            to="/learning-paths"
            variant="light"
            size="sm"
            startContent={<ArrowLeftIcon className="w-4" />}
            className="mb-6"
          >
            Todas las rutas
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">{pathIcon}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {path.title}
              </h1>
              <p className="text-xl text-default-600 mb-6">{pathSubtitle}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Chip
                  color={getDifficultyColor(pathDifficulty)}
                  variant="flat"
                  size="lg"
                >
                  {pathDifficulty}
                </Chip>

                <Chip variant="flat" size="lg" startContent={<ClockIcon className="w-4" />}>
                  {pathEstimatedHours}h totales
                </Chip>

                <Chip variant="flat" size="lg" startContent={<AcademicCapIcon className="w-4" />}>
                  {stats?.total_courses || pathCourses.length} cursos
                </Chip>
              </div>

              <p className="text-default-700 leading-relaxed">
                {path.description}
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-xl border border-default-200">
                <CardBody className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#2CBFF0]/10 rounded-xl">
                      <TrophyIcon className="w-8 h-8 text-[#2CBFF0]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Objetivo de la ruta</h3>
                      <p className="text-sm text-default-500">
                        Lo que lograrás
                      </p>
                    </div>
                  </div>

                  <p className="text-default-700 mb-6 leading-relaxed">
                    {pathGoal}
                  </p>

                  <Divider className="my-6" />

                  {/* Progreso gratis/premium */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-default-600">Contenido gratuito</span>
                        <span className="font-semibold text-success">
                          {stats?.free_courses || 0} de {stats?.total_courses || pathCourses.length} cursos
                        </span>
                      </div>
                      <Progress
                        value={progressPercent}
                        color="success"
                        size="md"
                        className="mb-2"
                      />
                      <p className="text-xs text-default-400">
                        {stats?.premium_courses || 0} cursos premium disponibles
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-[#2CBFF0] text-white"
                      endContent={<ArrowRightIcon className="w-5" />}
                    >
                      Comenzar ruta
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lista de cursos */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3">Contenido de la ruta</h2>
            <p className="text-default-600">
              Cursos ordenados para un aprendizaje progresivo
            </p>
          </div>

          {/* Roadmap style */}
          <div className="relative">
            {/* Línea vertical conectora */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2CBFF0] to-transparent hidden md:block" />

            <div className="space-y-6">
              {pathCourses.length > 0 ? (
                pathCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Número del paso */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#2CBFF0] shadow-lg z-10">
                      <span className="text-xl font-bold text-[#2CBFF0]">
                        {index + 1}
                      </span>
                    </div>

                    {/* Card del curso */}
                    <Card className="md:ml-24 border border-default-200 hover:border-[#2CBFF0] transition-all hover:shadow-lg">
                      <CardBody className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Imagen */}
                          <div className="relative md:w-72 h-48 md:h-auto bg-default-100 flex-shrink-0">
                            {course.card_image_url ? (
                              <Image
                                src={courseImgSrc(course.card_image_url)}
                                alt={course.title}
                                className="w-full h-full object-cover"
                                radius="none"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <AcademicCapIcon className="w-12 h-12 text-default-300" />
                              </div>
                            )}

                            {/* Badge de estado */}
                            <div className="absolute top-3 right-3">
                              {course.is_free ? (
                                <Chip
                                  size="sm"
                                  color="success"
                                  variant="shadow"
                                  startContent={<CheckCircleIcon className="w-4" />}
                                >
                                  Gratis
                                </Chip>
                              ) : (
                                <Chip
                                  size="sm"
                                  color="warning"
                                  variant="shadow"
                                  startContent={<LockClosedIcon className="w-4" />}
                                >
                                  Premium
                                </Chip>
                              )}
                            </div>
                          </div>

                          {/* Contenido */}
                          <div className="flex-grow p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="flex-grow">
                                <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                                  {course.title}
                                </h3>

                                {course.description && (
                                  <p className="text-default-600 mb-4 line-clamp-2">
                                    {course.description}
                                  </p>
                                )}

                                {/* Metadata del curso */}
                                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                                  {course.hours && (
                                    <div className="flex items-center gap-1 text-default-500">
                                      <ClockIcon className="w-4" />
                                      <span>{course.hours}h</span>
                                    </div>
                                  )}

                                  {course.difficulty && (
                                    <Chip size="sm" variant="flat">
                                      {course.difficulty}
                                    </Chip>
                                  )}

                                  {course.rating_avg && course.rating_avg > 0 && (
                                    <div className="flex items-center gap-1">
                                      <StarIcon className="w-4 text-amber-500" />
                                      <span className="font-semibold">
                                        {Number(course.rating_avg).toFixed(1)}
                                      </span>
                                      {course.rating_count && (
                                        <span className="text-xs text-default-400">
                                          ({course.rating_count})
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Precio y CTA */}
                              <div className="flex flex-col items-end justify-between gap-3 md:min-w-[180px]">
                                <div className="text-right">
                                  {course.is_free ? (
                                    <span className="text-2xl font-bold text-success">
                                      Gratis
                                    </span>
                                  ) : (
                                    <div>
                                      <span className="text-2xl font-bold">
                                        {centsToCurrency(course.price_cents)}
                                      </span>
                                      <div className="flex items-center gap-1 text-xs text-warning mt-1">
                                        <SparklesIcon className="w-3" />
                                        <span>Premium</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <Button
                                  as={Link}
                                  to={`/courses/${course.slug}`}
                                  className="w-full bg-[#2CBFF0] text-white"
                                  size="md"
                                >
                                  Ver curso
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="border border-default-200">
                  <CardBody className="text-center p-12">
                    <AcademicCapIcon className="w-16 h-16 text-default-300 mx-auto mb-4" />
                    <p className="text-default-500">
                      No hay cursos disponibles en esta ruta aún.
                    </p>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>

          {/* CTA final */}
          {pathCourses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-[#2CBFF0]">
                <CardBody className="text-center p-12">
                  <TrophyIcon className="w-16 h-16 text-[#2CBFF0] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">
                    ¿Listo para comenzar tu viaje?
                  </h3>
                  <p className="text-default-600 mb-6 max-w-2xl mx-auto">
                    Empieza con los cursos gratuitos y avanza a tu propio ritmo.
                    Desbloquea contenido premium cuando estés listo.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-[#2CBFF0] text-white"
                      endContent={<ArrowRightIcon className="w-5" />}
                    >
                      Comenzar ahora
                    </Button>
                    <Button
                      as={Link}
                      to="/learning-paths"
                      size="lg"
                      variant="bordered"
                    >
                      Ver otras rutas
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LearningPathDetail;