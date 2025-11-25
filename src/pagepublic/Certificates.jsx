import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Progress,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  TrophyIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  ChartBarIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import AuthUser from "../pageauth/AuthUser";

const Certificates = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUser } = AuthUser();

  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unlocked: 0,
    inProgress: 0,
  });

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = () => {
    setLoading(true);
    
    try {
      // Cursos de ejemplo - NINGUNO está completado (todos 0%)
      const mockCourses = [
        {
          id: 1,
          title: "Desarrollo Web Frontend",
          description: "Domina HTML, CSS y JavaScript desde cero",
          progress: 0, // No completado
          category: "Programación",
          hours: 40,
          instructor: "Carlos Méndez",
          topics: ["HTML", "CSS", "JavaScript"],
        },
        {
          id: 2,
          title: "React Avanzado",
          description: "Hooks, Context API y patrones avanzados",
          progress: 0, // No completado
          category: "Programación",
          hours: 50,
          instructor: "María González",
          topics: ["React", "Hooks", "Context"],
        },
        {
          id: 3,
          title: "Diseño UI/UX",
          description: "Principios de diseño de interfaces modernas",
          progress: 0, // No completado
          category: "Diseño",
          hours: 30,
          instructor: "Ana López",
          topics: ["UI", "UX", "Figma"],
        },
        {
          id: 4,
          title: "Marketing Digital",
          description: "Estrategias de marketing online efectivas",
          progress: 0, // No completado
          category: "Marketing",
          hours: 35,
          instructor: "Pedro Ramírez",
          topics: ["SEO", "SEM", "Social Media"],
        },
        {
          id: 5,
          title: "Python para Data Science",
          description: "Análisis de datos con Python y sus librerías",
          progress: 0, // No completado
          category: "Programación",
          hours: 60,
          instructor: "Laura Torres",
          topics: ["Python", "Pandas", "NumPy"],
        },
        {
          id: 6,
          title: "Node.js y Express",
          description: "Backend con JavaScript y APIs REST",
          progress: 0, // No completado
          category: "Programación",
          hours: 45,
          instructor: "Roberto Silva",
          topics: ["Node.js", "Express", "API"],
        },
      ];

      // Convertir cursos a certificados
      const certs = mockCourses.map((course) => ({
        id: `cert-${course.id}`,
        courseId: course.id,
        title: course.title,
        description: course.description,
        progress: course.progress,
        isUnlocked: course.progress === 100, // Todos false porque progress = 0
        category: course.category,
        hours: course.hours,
        instructor: course.instructor,
        topics: course.topics,
        issueDate: course.progress === 100 ? new Date().toISOString() : null,
        badgeColor: getCategoryColor(course.category),
      }));

      setCertificates(certs);
      updateStats(certs);
    } catch (error) {
      console.error("Error loading certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const categoryLower = (category || "").toLowerCase();
    const colors = {
      programación: "from-blue-500 to-cyan-500",
      programming: "from-blue-500 to-cyan-500",
      diseño: "from-pink-500 to-rose-500",
      design: "from-pink-500 to-rose-500",
      marketing: "from-orange-500 to-amber-500",
      negocios: "from-green-500 to-emerald-500",
      business: "from-green-500 to-emerald-500",
      "desarrollo personal": "from-purple-500 to-violet-500",
      "personal development": "from-purple-500 to-violet-500",
      "data science": "from-indigo-500 to-purple-500",
      "web development": "from-blue-500 to-cyan-500",
    };
    
    for (const [key, value] of Object.entries(colors)) {
      if (categoryLower.includes(key)) return value;
    }
    
    return "from-gray-500 to-slate-500";
  };

  const updateStats = (certs) => {
    const unlocked = certs.filter((c) => c.isUnlocked).length;
    const inProgress = certs.filter(
      (c) => !c.isUnlocked && c.progress > 0
    ).length;

    setStats({
      total: certs.length,
      unlocked,
      inProgress,
    });
  };

  const filteredCertificates = certificates.filter((cert) => {
    if (filter === "unlocked") return cert.isUnlocked;
    if (filter === "locked") return !cert.isUnlocked;
    return true;
  });

  const handleViewCertificate = (cert) => {
    setSelectedCertificate(cert);
    onOpen();
  };

  const handleDownloadCertificate = async (cert) => {
    if (!cert.isUnlocked) {
      alert("⚠️ Este certificado aún no está disponible para descarga.\n\nCompleta el 100% del curso para desbloquearlo.\n\nProgreso actual: " + cert.progress + "%");
      return;
    }

    try {
      // Importar html2pdf dinámicamente
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Crear elemento temporal con el certificado
      const element = document.getElementById('certificate-preview');
      
      if (!element) {
        alert("Error al generar el PDF. Por favor intenta de nuevo.");
        return;
      }

      const opt = {
        margin: 0,
        filename: `Certificado_${cert.title.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
      };

      await html2pdf().set(opt).from(element).save();
      
      alert("✅ ¡Certificado descargado exitosamente!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("⚠️ Para descargar el certificado como PDF, necesitas instalar la librería html2pdf.js:\n\nnpm install html2pdf.js\n\nPor ahora, puedes usar Ctrl+P para imprimir el certificado.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFEFE]">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-default-600">Cargando certificados...</p>
        </div>
      </div>
    );
  }

  const currentUser = getUser();

  return (
    <div className="w-full bg-[#FEFEFE] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
              <TrophyIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#181818]">
                Mis Certificados
              </h1>
              <p className="text-default-600">
                Logros y reconocimientos por tu aprendizaje
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border border-default-200">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-600 mb-1">
                      Certificados Totales
                    </p>
                    <p className="text-3xl font-bold text-[#181818]">
                      {stats.total}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border border-default-200">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-default-600 mb-1">
                      Desbloqueados
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.unlocked}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <Progress
                  value={stats.total > 0 ? (stats.unlocked / stats.total) * 100 : 0}
                  color="success"
                  size="sm"
                  className="mb-2"
                />
                <p className="text-xs text-default-500">
                  {stats.total - stats.unlocked} certificados por desbloquear
                </p>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="border border-default-200">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-default-600 mb-1">
                      En Progreso
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {stats.inProgress}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <ChartBarIcon className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex gap-3 mb-6"
        >
          <Button
            onPress={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-[#2CBFF0] text-white"
                : "bg-default-100 text-default-600"
            }
          >
            Todos ({certificates.length})
          </Button>
          <Button
            onPress={() => setFilter("unlocked")}
            className={
              filter === "unlocked"
                ? "bg-green-600 text-white"
                : "bg-default-100 text-default-600"
            }
          >
            Desbloqueados ({stats.unlocked})
          </Button>
          <Button
            onPress={() => setFilter("locked")}
            className={
              filter === "locked"
                ? "bg-gray-600 text-white"
                : "bg-default-100 text-default-600"
            }
          >
            Bloqueados ({stats.total - stats.unlocked})
          </Button>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              index={index}
              onView={handleViewCertificate}
              onDownload={handleDownloadCertificate}
            />
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <AcademicCapIcon className="w-16 h-16 text-default-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#181818] mb-2">
              No hay certificados en esta categoría
            </h3>
            <p className="text-default-600 mb-6">
              {filter === "unlocked"
                ? "Completa cursos para desbloquear certificados"
                : "Explora nuevos cursos para obtener más certificados"}
            </p>
            <Button
              as={Link}
              to="/courses"
              className="bg-[#2CBFF0] text-white"
              endContent={<ArrowRightIcon className="w-5" />}
            >
              Explorar cursos
            </Button>
          </motion.div>
        )}
      </div>

      {/* Modal de Certificado */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isOpen}
        onClose={onClose}
        onDownload={handleDownloadCertificate}
        userName={currentUser?.name || "Estudiante"}
      />
    </div>
  );
};

// Componente de Tarjeta de Certificado
const CertificateCard = ({ certificate, index, onView, onDownload }) => {
  const isLocked = !certificate.isUnlocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        isPressable
        onPress={() => onView(certificate)}
        className={`border-2 transition-all ${
          isLocked
            ? "border-default-200 opacity-90"
            : "border-transparent hover:border-[#2CBFF0] hover:shadow-lg"
        }`}
      >
        <CardBody className="p-0">
          {/* Header con gradiente */}
          <div
            className={`h-32 bg-gradient-to-br ${certificate.badgeColor} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10" />

            {/* Patrón decorativo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
            </div>

            {/* Logo en el centro del círculo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <img
                  src="/MI.png"
                  alt="Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>

            {/* Badge de estado */}
            <div className="absolute top-2 right-2">
              {isLocked ? (
                <Chip size="sm" className="bg-red-500 text-white">
                  <LockClosedIcon className="w-3 h-3 mr-1" />
                  Bloqueado
                </Chip>
              ) : (
                <Chip size="sm" className="bg-green-500 text-white">
                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                  Completado
                </Chip>
              )}
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <h3
              className={`text-lg font-bold mb-2 line-clamp-2 ${
                isLocked ? "text-default-600" : "text-[#181818]"
              }`}
            >
              {certificate.title}
            </h3>
            <p
              className={`text-sm mb-4 line-clamp-2 ${
                isLocked ? "text-default-400" : "text-default-600"
              }`}
            >
              {certificate.description}
            </p>

            {/* Topics */}
            {certificate.topics && certificate.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {certificate.topics.slice(0, 3).map((topic, idx) => (
                  <Chip
                    key={idx}
                    size="sm"
                    variant="flat"
                    className={
                      isLocked
                        ? "bg-default-100 text-default-500"
                        : "bg-blue-100 text-blue-700"
                    }
                  >
                    {topic}
                  </Chip>
                ))}
              </div>
            )}

            {/* Progreso para bloqueados */}
            {isLocked && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-default-600 font-medium">
                    Progreso
                  </span>
                  <span className="text-[#181818] font-bold">
                    {certificate.progress}%
                  </span>
                </div>
                <Progress
                  value={certificate.progress}
                  color="primary"
                  size="sm"
                  className="mb-2"
                />
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <SparklesIcon className="w-3 h-3" />
                  <span>{100 - certificate.progress}% para desbloquear</span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-default-200">
              <div className="flex items-center gap-2 text-sm text-default-600">
                <ClockIcon className="w-4 h-4" />
                <span>{certificate.hours}h</span>
              </div>

              <div className="flex gap-2">
                {/* Botón de previsualizar (siempre visible) */}
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-blue-100 text-blue-700"
                  startContent={<EyeIcon className="w-4 h-4" />}
                  onPress={(e) => {
                    e.stopPropagation();
                    onView(certificate);
                  }}
                >
                  Ver
                </Button>

                {/* Botón de descargar (solo si está desbloqueado) */}
                {!isLocked && (
                  <Button
                    size="sm"
                    className="bg-[#2CBFF0] text-white"
                    startContent={<ArrowDownTrayIcon className="w-4 h-4" />}
                    onPress={(e) => {
                      e.stopPropagation();
                      onDownload(certificate);
                    }}
                  >
                    Descargar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

// Modal de Certificado con preview profesional
const CertificateModal = ({ certificate, isOpen, onClose, onDownload, userName }) => {
  if (!certificate) return null;

  const isLocked = !certificate.isUnlocked;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-[#181818]">
                {isLocked ? "Vista Previa del Certificado" : "Certificado Completado"}
              </h3>
              <p className="text-sm text-default-500 font-normal">
                {certificate.title}
              </p>
            </ModalHeader>

            <ModalBody className="p-6">
              {/* Certificado Profesional */}
              <div
                id="certificate-preview"
                className="bg-white p-12 border-8 border-double border-gray-300 relative"
                style={{ aspectRatio: '11/8.5' }}
              >
                {/* Borde interior */}
                <div className="absolute inset-3 border-2 border-gray-200 pointer-events-none" />

                {/* Marca de agua de fondo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <img
                    src="/MI.png"
                    alt="Watermark"
                    className="w-96 h-96 object-contain"
                  />
                </div>

                {/* Contenido */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="text-center">
                    <img
                      src="/MI.png"
                      alt="Logo"
                      className="w-20 h-20 mx-auto mb-4 object-contain"
                    />
                    <h1 className="text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                      Certificado de Finalización
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-[#2CBFF0] to-cyan-500 mx-auto rounded-full" />
                  </div>

                  {/* Body */}
                  <div className="text-center flex-grow flex flex-col justify-center">
                    <p className="text-xl text-gray-600 mb-6">
                      Este certificado se otorga a
                    </p>
                    
                    <div className="mb-6">
                      <p className="text-5xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
                        {userName}
                      </p>
                      <div className="w-64 h-0.5 bg-gray-400 mx-auto" />
                    </div>

                    <p className="text-xl text-gray-600 mb-4">
                      por {isLocked ? "estar cursando" : "completar exitosamente"} el curso
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
                      {certificate.title}
                    </h2>

                    {certificate.topics && certificate.topics.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {certificate.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-[#2CBFF0]/10 border-2 border-[#2CBFF0] rounded-lg text-gray-700 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t-2 border-gray-200 pt-6 mt-6">
                    <div className="flex justify-between items-end">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Duración</p>
                        <p className="text-lg font-semibold text-gray-800">{certificate.hours} horas</p>
                      </div>

                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center border-4 border-amber-600 shadow-lg">
                          <img
                            src="/MI.png"
                            alt="Sello"
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="w-48 h-0.5 bg-gray-400 mb-2 mx-auto" />
                        <p className="text-sm font-semibold text-gray-700">
                          {certificate.instructor}
                        </p>
                        <p className="text-xs text-gray-600">Instructor</p>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500">
                        Código de Verificación: CERT-{certificate.id?.toUpperCase().substring(0, 12)}
                      </p>
                      {certificate.issueDate && (
                        <p className="text-xs text-gray-400 mt-1">
                          Fecha de emisión: {new Date(certificate.issueDate).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensaje para certificados bloqueados */}
              {isLocked && (
                <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <p className="text-center text-amber-800">
                    📋 <strong>Vista Previa:</strong> Así se verá tu certificado cuando completes el curso. 
                    <br />
                    <strong>Progreso actual: {certificate.progress}%</strong> - Necesitas llegar al 100% para desbloquearlo.
                  </p>
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cerrar
              </Button>
              {!isLocked ? (
                <Button
                  className="bg-[#2CBFF0] text-white"
                  onPress={() => onDownload(certificate)}
                  startContent={<ArrowDownTrayIcon className="w-5" />}
                >
                  Descargar PDF
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/courses"
                  className="bg-[#2CBFF0] text-white"
                  onPress={onClose}
                  endContent={<ArrowRightIcon className="w-5" />}
                >
                  Continuar Aprendiendo
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Certificates;