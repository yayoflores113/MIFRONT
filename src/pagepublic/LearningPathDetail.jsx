import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { generateCoursePDF } from "../components/PDFGenerator";

import {
  Card,
  CardBody,
  Button,
  Chip,
  Progress,
  Spinner,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ClockIcon,
  AcademicCapIcon,
  TrophyIcon,
  LockClosedIcon,
  ArrowRightIcon,
  SparklesIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ChartBarIcon,
  PaintBrushIcon,
  CameraIcon,
  MusicalNoteIcon,
  GlobeAltIcon,
  BeakerIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Config from "../Config";

const centsToCurrency = (cents, locale = "es-MX", currency = "MXN") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    (Number(cents) || 0) / 100
  );

// Iconos temáticos según palabras clave del título
const getCourseIcon = (title) => {
  const titleLower = (title || "").toLowerCase();
  
  if (titleLower.includes("programación") || titleLower.includes("código") || titleLower.includes("code")) {
    return <CodeBracketIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("ia") || titleLower.includes("inteligencia") || titleLower.includes("machine")) {
    return <CpuChipIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("datos") || titleLower.includes("data") || titleLower.includes("análisis")) {
    return <ChartBarIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("diseño") || titleLower.includes("design") || titleLower.includes("ui")) {
    return <PaintBrushIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("foto") || titleLower.includes("video") || titleLower.includes("imagen")) {
    return <CameraIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("música") || titleLower.includes("audio") || titleLower.includes("sonido")) {
    return <MusicalNoteIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("web") || titleLower.includes("internet") || titleLower.includes("html")) {
    return <GlobeAltIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("ciencia") || titleLower.includes("física") || titleLower.includes("química")) {
    return <BeakerIcon className="w-20 h-20" />;
  }
  if (titleLower.includes("startup") || titleLower.includes("emprendimiento") || titleLower.includes("negocio")) {
    return <RocketLaunchIcon className="w-20 h-20" />;
  }
  
  return <AcademicCapIcon className="w-20 h-20" />;
};

// Colores del gradiente según el índice
const getIconGradient = (index) => {
  const gradients = [
    "from-blue-400 to-cyan-500",
    "from-purple-400 to-pink-500",
    "from-green-400 to-emerald-500",
    "from-orange-400 to-red-500",
    "from-indigo-400 to-blue-500",
    "from-yellow-400 to-orange-500",
    "from-teal-400 to-green-500",
    "from-rose-400 to-pink-500",
  ];
  return gradients[index % gradients.length];
};

const LearningPathDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [path, setPath] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchPath = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await Config.getLearningPathBySlug(slug);
        const pathData = response.data?.data || response.data;
        const statsData = response.data?.stats || null;
        
        if (pathData) {
          setPath(pathData);
          setStats(statsData);
        } else {
          setError("No se encontraron datos de la ruta");
        }
      } catch (err) {
        console.error("Error loading path:", err);
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

  const handleCourseClick = (course, index, totalCourses) => {
    const isPremium = index >= totalCourses - 3;
    
    if (isPremium) {
      navigate(`/courses/${course.slug}`);
    } else {
      setSelectedCourse(course);
      onOpen();
    }
  };

  const handleOpenPDF = async () => {
    if (!selectedCourse) return;
    
    setPdfLoading(true);
    try {
      console.log('Generando PDF para:', selectedCourse.title);
      const success = generateCoursePDF(selectedCourse);
      
      if (success) {
        setTimeout(() => {
          onClose();
          setPdfLoading(false);
        }, 500);
      } else {
        setPdfLoading(false);
      }
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert('Error al generar el PDF. Por favor intenta de nuevo.');
      setPdfLoading(false);
    }
  };

  if (loading) {
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

  const pathIcon = path?.icon || "📚";
  const pathSubtitle = path?.subtitle || path?.description?.substring(0, 100) + "..." || "";
  const pathGoal = path?.goal || path?.description || "Aprende y desarrolla nuevas habilidades";
  const pathDifficulty = path?.difficulty || (path?.level ? path.level.toLowerCase() : "intermedio");
  const pathEstimatedHours = path?.estimated_hours || stats?.total_hours || 0;
  const pathCourses = path?.courses || [];
  
  const freeCourses = Math.max(0, pathCourses.length - 3);
  const premiumCourses = Math.min(3, pathCourses.length);
  const progressPercent = pathCourses.length > 0 
    ? Math.round((freeCourses / pathCourses.length) * 100)
    : 0;

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
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
                  {pathCourses.length} cursos
                </Chip>
              </div>

              <p className="text-default-700 leading-relaxed">
                {path.description}
              </p>
            </motion.div>

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

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-default-600">Contenido gratuito</span>
                        <span className="font-semibold text-success">
                          {freeCourses} de {pathCourses.length} cursos
                        </span>
                      </div>
                      <Progress
                        value={progressPercent}
                        color="success"
                        size="md"
                        className="mb-2"
                      />
                      <p className="text-xs text-default-400">
                        {premiumCourses} cursos premium disponibles
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

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2CBFF0] to-transparent hidden md:block" />

            <div className="space-y-6">
              {pathCourses.length > 0 ? (
                pathCourses.map((course, index) => {
                  const isPremium = index >= pathCourses.length - 3;
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#2CBFF0] shadow-lg z-10">
                        <span className="text-xl font-bold text-[#2CBFF0]">
                          {index + 1}
                        </span>
                      </div>

                      <Card className="md:ml-24 border border-default-200 hover:border-[#2CBFF0] transition-all hover:shadow-lg cursor-pointer">
                        <CardBody className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`relative md:w-72 h-48 md:h-auto bg-gradient-to-br ${getIconGradient(index)} flex-shrink-0 flex items-center justify-center`}>
                              <div className="text-white opacity-90">
                                {getCourseIcon(course.title)}
                              </div>

                              <div className="absolute top-3 right-3">
                                {isPremium ? (
                                  <Chip
                                    size="sm"
                                    color="warning"
                                    variant="shadow"
                                    startContent={<LockClosedIcon className="w-4" />}
                                  >
                                    Premium
                                  </Chip>
                                ) : (
                                  <Chip
                                    size="sm"
                                    color="success"
                                    variant="shadow"
                                    startContent={<DocumentTextIcon className="w-4" />}
                                  >
                                    PDF Gratis
                                  </Chip>
                                )}
                              </div>
                            </div>

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

                                <div className="flex flex-col items-end justify-between gap-3 md:min-w-[180px]">
                                  <div className="text-right">
                                    {isPremium ? (
                                      <div>
                                        <span className="text-2xl font-bold">
                                          {centsToCurrency(course.price_cents || 9900)}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-warning mt-1">
                                          <SparklesIcon className="w-3" />
                                          <span>Premium</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        <span className="text-2xl font-bold text-success">
                                          Gratis
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-success mt-1">
                                          <DocumentTextIcon className="w-3" />
                                          <span>PDF incluido</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <Button
                                    onPress={() => handleCourseClick(course, index, pathCourses.length)}
                                    className={isPremium ? "w-full bg-warning text-white" : "w-full bg-[#2CBFF0] text-white"}
                                    size="md"
                                    startContent={isPremium ? <LockClosedIcon className="w-4" /> : <DocumentTextIcon className="w-4" />}
                                  >
                                    {isPremium ? "Ver curso" : "Ver preview"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  );
                })
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
                    Accede a {freeCourses} cursos gratuitos con PDFs incluidos. 
                    Desbloquea los últimos 3 cursos premium cuando estés listo.
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

      {/* Modal de Preview del PDF */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="w-6 h-6 text-[#2CBFF0]" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedCourse?.title}
                    </h3>
                    <p className="text-sm text-default-500 font-normal">
                      Vista previa del contenido
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {selectedCourse?.description && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-default-700">
                        {selectedCourse.description}
                      </p>
                    </div>
                  )}

                  <Card className="border border-default-200">
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-success/10 rounded-lg">
                          <DocumentTextIcon className="w-8 h-8 text-success" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold mb-2">Material de estudio incluido</h4>
                          <p className="text-sm text-default-600 mb-4">
                            Este curso incluye un PDF completo con todo el contenido teórico, 
                            ejemplos prácticos y ejercicios para que puedas estudiar a tu propio ritmo.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" color="success">
                              Descargable
                            </Chip>
                            <Chip size="sm" variant="flat" color="primary">
                              Acceso ilimitado
                            </Chip>
                            <Chip size="sm" variant="flat">
                              {selectedCourse?.hours || 0}h de contenido
                            </Chip>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <div className="border-2 border-dashed border-default-300 rounded-lg p-8 text-center bg-default-50">
                    <DocumentTextIcon className="w-16 h-16 text-default-400 mx-auto mb-4" />
                    <p className="text-default-600 mb-2">
                      Vista previa del PDF
                    </p>
                    <p className="text-sm text-default-400">
                      El PDF se generará y descargará automáticamente
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  className="bg-[#2CBFF0] text-white"
                  onPress={handleOpenPDF}
                  isLoading={pdfLoading}
                  startContent={!pdfLoading && <DocumentTextIcon className="w-5" />}
                >
                  Descargar PDF
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LearningPathDetail;