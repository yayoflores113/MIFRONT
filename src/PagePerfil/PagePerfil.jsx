import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Badge,
  Progress,
  Tabs,
  Tab,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  PencilSquareIcon,
  MapPinIcon,
  InformationCircleIcon,
  XMarkIcon,
  StarIcon,
  BookOpenIcon,
  ClockIcon,
  PlayIcon,
  TrashIcon,
  TagIcon,
  ArrowPathIcon,
  TrophyIcon,
  ShoppingBagIcon,
  BookmarkIcon,
  CalendarIcon,
  UsersIcon,
  CloudArrowDownIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  BookOpenIcon as BookIconOutline,
} from "@heroicons/react/24/outline";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";
import axios from "../lib/axios";
import { Card } from "@heroui/react";

const PagePerfil = () => {
  // ----------------------------
  // ESTADO Y DATOS REALES DEL USUARIO
  // ----------------------------
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("universities");

  // Obtener usuario desde sessionStorage
  useEffect(() => {
    const getUser = () => {
    const loadUserData = async () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (userData) {
          return JSON.parse(userData);
        }
        return null;
        const { data } = await axios.get("/api/v1/auth/me");
        const userData = data.user || data.data || data;
        setUser({
          id: userData.id,
          name: userData.name || "Usuario",
          email: userData.email || "",
          avatar: userData.avatar || null,
          role: userData.roles?.[0]?.name || "Estudiante",
        });
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        return null;
        console.error("Error cargando usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const userData = getUser();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
    loadUserData();
  }, []);

  // ----------------------------
  // Mock data temporal (hasta implementar endpoints reales)
  // ----------------------------
  const universitiesData = [
    {
      id: 1,
      name: "Universidad Nacional Autónoma de México",
      city: "Ciudad de México",
      country: "México",
      specialty: "Ingeniería y Ciencias",
      imageUrl: "https://img.heroui.chat/image/places?w=800&h=400&u=1",
    },
    {
      id: 2,
      name: "Universidad de Barcelona",
      city: "Barcelona",
      country: "España",
      specialty: "Medicina y Ciencias de la Salud",
      imageUrl: "https://img.heroui.chat/image/places?w=800&h=400&u=2",
    },
    {
      id: 3,
      name: "Massachusetts Institute of Technology",
      city: "Cambridge",
      country: "Estados Unidos",
      specialty: "Tecnología e Innovación",
      imageUrl: "https://img.heroui.chat/image/places?w=800&h=400&u=3",
    },
  ];

  const savedCoursesData = [
    {
      id: 1,
      title: "Introducción al Desarrollo Web Moderno",
      institution: "Universidad Tecnológica",
      topic: "Desarrollo Web",
      level: "Principiante",
      difficulty: 2,
      duration: 24,
      rating: 4.7,
      imageUrl: "https://img.heroui.chat/image/ai?w=800&h=400&u=1",
    },
    {
      id: 2,
      title: "Fundamentos de Inteligencia Artificial",
      institution: "Instituto de Ciencias Computacionales",
      topic: "Inteligencia Artificial",
      level: "Intermedio",
      difficulty: 4,
      duration: 36,
      rating: 4.9,
      imageUrl: "https://img.heroui.chat/image/ai?w=800&h=400&u=2",
    },
  ];

  const purchasedCoursesData = [
    {
      id: 1,
      title: "Desarrollo Full Stack con React y Node.js",
      institution: "Tech Academy",
      topic: "Desarrollo Web",
      level: "Avanzado",
      price: 89.99,
      status: "Activo",
      progress: 65,
      imageUrl: "https://img.heroui.chat/image/ai?w=800&h=400&u=5",
    },
    {
      id: 2,
      title: "Diseño de Interfaces Modernas",
      institution: "Design School",
      topic: "Diseño UX/UI",
      level: "Intermedio",
      price: 59.99,
      status: "Completado",
      progress: 100,
      imageUrl: "https://img.heroui.chat/image/ai?w=800&h=400&u=6",
      completionDate: "15/04/2023",
      certificateAvailable: true,
    },
  ];

  const skillAreas = [
    { subject: "Programación", A: 85, fullMark: 100 },
    { subject: "Diseño", A: 70, fullMark: 100 },
    { subject: "Negocios", A: 55, fullMark: 100 },
    { subject: "Ciencias Sociales", A: 65, fullMark: 100 },
    { subject: "Artes", A: 40, fullMark: 100 },
    { subject: "Ciencias", A: 75, fullMark: 100 },
  ];

  const courseCompletions = [
    { name: "Cursos completados", value: 8 },
    { name: "Cursos en progreso", value: 3 },
    { name: "Certificados obtenidos", value: 5 },
  ];

  const [favUniversities, setFavUniversities] = useState(universitiesData);
  const [savedCourses, setSavedCourses] = useState(savedCoursesData);
  const [purchasedCourses] = useState(purchasedCoursesData);

  // ----------------------------
  // Header con datos REALES del usuario
  // ----------------------------
  const ProfileHeader = () => {
    if (!user) return null;

    const getInitials = (name) => {
      if (!name) return "U";
      const parts = name.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    };

    const getUserRole = () => {
      if (user.roles && user.roles.length > 0) {
        return user.roles[0].name === "admin" ? "Administrador" : "Estudiante";
      }
      return "Estudiante";
    };

    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white rounded-xl p-6 shadow-sm border border-default-200">
        <div className="flex items-center gap-4">
          <Avatar
            name={getInitials(user.name)}
            className="w-20 h-20 text-large"
            isBordered
            color="primary"
          />
          <div>
            <h1 className="text-2xl font-semibold text-[#181818]">
              {user.name || "Usuario"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-medium">
                {getUserRole()}
              </span>
              <span className="text-default-500 text-sm">{user.email}</span>
            </div>
            {user.matricula && (
              <p className="text-default-500 mt-2 text-sm">
                Matrícula: {user.matricula}
              </p>
            )}
            {!user.matricula && !user.university_id && (
              <p className="text-default-500 mt-2 text-sm">
                Completa tu perfil para obtener recomendaciones personalizadas
              </p>
            )}
          </div>
        </div>

        <Button
          color="primary"
          variant="flat"
          startContent={<PencilSquareIcon className="w-4 h-4" />}
          className="sm:self-start"
        >
          Editar perfil
        </Button>
      </div>
    );
  };

  // ----------------------------
  // Sección: Universidades favoritas
  // ----------------------------
  const handleRemoveUniversity = (id) =>
    setFavUniversities((prev) => prev.filter((u) => u.id !== id));

  const FavoriteUniversities = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#181818]">
          Universidades favoritas
        </h2>
        <span className="text-default-500 text-sm">
          {favUniversities.length} universidades
        </span>
      </div>

      {favUniversities.length === 0 ? (
        <div className="text-center py-16 bg-default-50 rounded-lg border border-default-200">
          <BookmarkIcon className="mx-auto text-default-300 mb-4 w-12 h-12" />
          <h3 className="text-lg font-medium mb-2">
            No tienes universidades favoritas
          </h3>
          <p className="text-default-500 mb-6 max-w-md mx-auto">
            Agrega universidades a tus favoritos para comparar y tener fácil
            acceso a su información
          </p>
          <Button color="primary">Explorar universidades</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favUniversities.map((university, index) => (
            <motion.div
              key={university.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full rounded-xl shadow-sm border border-default-200">
                <div className="h-44 w-full">
                  <img
                    src={university.imageUrl}
                    alt={university.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardBody className="p-5">
                  <h3 className="font-semibold text-base line-clamp-2">
                    {university.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-default-500 text-sm">
                    <MapPinIcon className="w-4 h-4" />
                    <span>
                      {university.city}, {university.country}
                    </span>
                  </div>
                  <Badge color="primary" variant="flat" className="mt-3">
                    {university.specialty}
                  </Badge>
                </CardBody>
                <CardFooter className="flex justify-between gap-2 p-5 pt-0">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    startContent={<InformationCircleIcon className="w-4 h-4" />}
                  >
                    Ver detalle
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    startContent={<XMarkIcon className="w-4 h-4" />}
                    onPress={() => handleRemoveUniversity(university.id)}
                  >
                    Quitar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  // ----------------------------
  // Sección: Cursos guardados
  // ----------------------------
  const handleRemoveSaved = (id) =>
    setSavedCourses((prev) => prev.filter((c) => c.id !== id));

  const getDifficultyLabel = (difficulty) => {
    const labels = ["Muy fácil", "Fácil", "Moderado", "Difícil", "Muy difícil"];
    return labels[difficulty - 1];
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Principiante":
        return "success";
      case "Intermedio":
        return "warning";
      case "Avanzado":
        return "danger";
      default:
        return "default";
    }
  };

  const SavedCourses = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#181818]">
          Cursos guardados
        </h2>
        <span className="text-default-500 text-sm">
          {savedCourses.length} cursos
        </span>
      </div>

      {savedCourses.length === 0 ? (
        <div className="text-center py-16 bg-default-50 rounded-lg border border-default-200">
          <BookmarkIcon className="mx-auto text-default-300 mb-4 w-12 h-12" />
          <h3 className="text-lg font-medium mb-2">
            No tienes cursos guardados
          </h3>
          <p className="text-default-500 mb-6 max-w-md mx-auto">
            Guarda cursos que te interesen para revisarlos más tarde
          </p>
          <Button color="primary">Explorar cursos</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {savedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-sm border border-default-200">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardBody className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>

                      <p className="text-default-500 text-sm mt-1">
                        {course.institution}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4">
                        <div className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-default-500" />
                          <span className="text-sm">{course.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-default-500" />
                          <span className="text-sm">
                            {course.duration} horas
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            color={getLevelColor(course.level)}
                            variant="flat"
                            size="sm"
                          >
                            {course.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-default-500">
                            Dificultad:
                          </span>
                          <div className="flex-1 max-w-32">
                            <Progress
                              size="sm"
                              value={course.difficulty * 20}
                              color={
                                course.difficulty > 3
                                  ? "danger"
                                  : course.difficulty > 1
                                  ? "warning"
                                  : "success"
                              }
                              aria-label="Dificultad"
                              className="max-w-32"
                            />
                          </div>
                          <span className="text-xs">
                            {getDifficultyLabel(course.difficulty)}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-between gap-2 p-5 pt-0">
                      <Button
                        color="primary"
                        variant="solid"
                        startContent={<PlayIcon className="w-4 h-4" />}
                      >
                        Continuar curso
                      </Button>
                      <Button
                        color="danger"
                        variant="light"
                        startContent={<TrashIcon className="w-4 h-4" />}
                        onPress={() => handleRemoveSaved(course.id)}
                      >
                        Eliminar de guardados
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  // ----------------------------
  // Sección: Cursos comprados
  // ----------------------------
  const getStatusColor = (status) => {
    switch (status) {
      case "Activo":
        return "primary";
      case "Completado":
        return "success";
      default:
        return "default";
    }
  };

  const PurchasedCourses = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#181818]">
          Cursos comprados
        </h2>
        <span className="text-default-500 text-sm">
          {purchasedCourses.length} cursos
        </span>
      </div>

      {purchasedCourses.length === 0 ? (
        <div className="text-center py-16 bg-default-50 rounded-lg border border-default-200">
          <ShoppingBagIcon className="mx-auto text-default-300 mb-4 w-12 h-12" />
          <h3 className="text-lg font-medium mb-2">
            No has comprado ningún curso
          </h3>
          <p className="text-default-500 mb-6 max-w-md mx-auto">
            Los cursos que compres aparecerán aquí para que puedas acceder
            fácilmente
          </p>
          <Button color="primary">Explorar catálogo</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {purchasedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden rounded-xl shadow-sm border border-default-200">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardBody className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="font-semibold text-lg">
                          {course.title}
                        </h3>
                        <Badge
                          color={getStatusColor(course.status)}
                          variant="flat"
                        >
                          {course.status}
                        </Badge>
                      </div>

                      <p className="text-default-500 text-sm mt-1">
                        {course.institution}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4">
                        <div className="flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-default-500" />
                          <span className="text-sm">{course.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TagIcon className="w-4 h-4 text-default-500" />
                          <span className="text-sm">
                            ${course.price.toFixed(2)} USD
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            color={getLevelColor(course.level)}
                            variant="flat"
                            size="sm"
                          >
                            {course.level}
                          </Badge>
                        </div>
                        {course.status === "Completado" &&
                          course.completionDate && (
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-default-500" />
                              <span className="text-sm">
                                Completado: {course.completionDate}
                              </span>
                            </div>
                          )}
                      </div>

                      {course.status === "Activo" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progreso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress
                            value={course.progress}
                            color="primary"
                            aria-label="Progreso del curso"
                            className="h-2"
                          />
                        </div>
                      )}
                    </CardBody>
                    <CardFooter className="flex justify-between gap-2 p-5 pt-0">
                      {course.status === "Activo" ? (
                        <Button
                          color="primary"
                          variant="solid"
                          startContent={<PlayIcon className="w-4 h-4" />}
                        >
                          Continuar curso
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<ArrowPathIcon className="w-4 h-4" />}
                        >
                          Volver a ver
                        </Button>
                      )}

                      {course.certificateAvailable && (
                        <Button
                          color="success"
                          variant="flat"
                          startContent={<TrophyIcon className="w-4 h-4" />}
                        >
                          Ver certificado
                        </Button>
                      )}
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  // ----------------------------
  // Sección: Estadísticas
  // ----------------------------
  const UserStatistics = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#181818]">
          Estadísticas y métricas
        </h2>
        <Button
          color="primary"
          variant="flat"
          startContent={<CloudArrowDownIcon className="w-4 h-4" />}
        >
          Descargar informe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courseCompletions.map((item) => (
          <Card
            key={item.name}
            className="bg-white rounded-xl shadow-sm border border-default-200"
          >
            <CardBody className="flex flex-col items-center justify-center py-8">
              <div className="text-4xl font-bold text-primary mb-2">
                {item.value}
              </div>
              <div className="text-default-600 text-center">{item.name}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="bg-white rounded-xl shadow-sm border border-default-200">
        <CardHeader className="flex flex-col gap-2 px-6 pt-6 pb-0">
          <h3 className="text-lg font-semibold">Áreas de conocimiento</h3>
          <p className="text-default-500 text-sm">
            Este gráfico muestra tus fortalezas en diferentes áreas de
            conocimiento
          </p>
        </CardHeader>
        <CardBody className="px-0 py-6">
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillAreas}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#6b7280" }}
                />
                <Radar
                  name="Nivel de habilidad"
                  dataKey="A"
                  stroke="#2CBFF0"
                  fill="#2CBFF0"
                  fillOpacity={0.6}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Nivel de habilidad"]}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl shadow-sm border border-default-200">
          <CardHeader className="px-6 pt-6 pb-0">
            <h3 className="text-lg font-semibold">
              Recomendaciones personalizadas
            </h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <CodeBracketIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">
                    Desarrollo de habilidades técnicas
                  </h4>
                  <p className="text-default-500 text-sm mt-1">
                    Refuerza tu base de frontend con React y patrones de
                    arquitectura.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BriefcaseIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Oportunidades laborales</h4>
                  <p className="text-default-500 text-sm mt-1">
                    Tu perfil coincide con 15 ofertas recientes en desarrollo de
                    software.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BookIconOutline className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Cursos recomendados</h4>
                  <p className="text-default-500 text-sm mt-1">
                    React avanzado y arquitectura de software para complementar
                    tu formación.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
<Card className="bg-white rounded-xl shadow-sm border border-default-200">
  <CardHeader className="px-6 pt-6 pb-0">
    <h3 className="text-lg font-semibold">Próximos eventos</h3>
  </CardHeader>
  <CardBody className="p-6">
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <CalendarIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium">Feria de empleo tecnológico</h4>
          <div className="flex items-center gap-2 text-default-500 text-sm mt-1">
            <ClockIcon className="w-4 h-4" />
            <span>15 de junio, 2023</span>
          </div>
          <Button
            size="sm"
            color="primary"
            variant="flat"
            className="mt-2"
          >
            Más información
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <UsersIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium">Webinar: Tendencias en IA</h4>
          <div className="flex items-center gap-2 text-default-500 text-sm mt-1">
            <ClockIcon className="w-4 h-4" />
            <span>22 de junio, 2023</span>
          </div>
          <Button
            size="sm"
            color="primary"
            variant="flat"
            className="mt-2"
          >
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  </CardBody>
</Card>

      </div>
    </div>
  );

  // ----------------------------
  // Layout principal + Tabs
  // ----------------------------
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No se pudo cargar el usuario.</div>;
  }

  // Mostrar datos de la UTM si el usuario es utm@gmail.com
  if (user.email.toLowerCase() === "utm@gmail.com") {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No hay sesión activa</h2>
          <p className="text-default-500 mb-6">
            Por favor, inicia sesión para ver tu perfil
        <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#181818]">
            Universidad Tecnológica de la Mixteca (UTM)
          </h2>
          <p className="text-default-600 leading-relaxed">
            La Universidad Tecnológica de la Mixteca (UTM) es una institución
            pública de educación superior ubicada en Huajuapan de León, Oaxaca.
            Se distingue por su enfoque en la formación tecnológica, científica
            y humanista, así como por su compromiso con el desarrollo regional y
            la innovación.
          </p>
          <Button color="primary" as="a" href="/login">
            Ir a Login
          </Button>
        </div>
        </Card>
      </div>
    );
  }

  // Mostrar perfil normal para cualquier otro usuario
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <ProfileHeader />

      {/* Subnavegación con Tabs */}
      <div className="mt-6">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
          variant="underlined"
          aria-label="Secciones del perfil"
          className="w-full"
          classNames={{
            tabList: "gap-6",
            cursor: "bg-[#2CBFF0]",
            tab: "h-10 data-[hover=true]:text-[#2CBFF0]",
            tabContent: "text-base font-medium",
          }}
        >
          <Tab key="universities" title="Universidades favoritas" />
          <Tab key="saved" title="Cursos guardados" />
          <Tab key="purchased" title="Cursos comprados" />
          <Tab key="stats" title="Estadísticas" />
        </Tabs>
      </div>

      {/* Contenido por pestaña */}
      <div className="mt-6 space-y-6">
        {tab === "universities" && <FavoriteUniversities />}
        {tab === "saved" && <SavedCourses />}
        {tab === "purchased" && <PurchasedCourses />}
        {tab === "stats" && <UserStatistics />}
      </div>
      <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-8">
        <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Rol: {user.role}</p>
      </Card>
    </div>
  );
};

export default PagePerfil;
