import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Badge,
} from "@heroui/react";
import {
  PencilSquareIcon,
  MapPinIcon,
  XMarkIcon,
  InformationCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import AuthUser from "../pageauth/AuthUser";

const PagePerfil = () => {
  // ----------------------------
  // Obtener usuario actual del sistema
  // ----------------------------
  const { getUser } = AuthUser();
  const user = getUser();

  // En caso de que aún no haya sesión
  const userEmail = user?.email?.toLowerCase() || "";

  // ----------------------------
  // Si el usuario es utm@gmail.com → dashboard escolar
  // ----------------------------
  const isUTMUser = userEmail === "utm@gmail.com";

  // ----------------------------
  // Datos mock de universidades
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
  ];

  const [favUniversities, setFavUniversities] =
    React.useState(universitiesData);

  // ----------------------------
  // Header del perfil (solo si NO es UTM)
  // ----------------------------
  const ProfileHeader = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white rounded-xl p-6 shadow-sm border border-default-200">
      <div className="flex items-center gap-4">
        <Avatar
          src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
          className="w-20 h-20 text-large"
          isBordered
          color="primary"
        />
        <div>
          <h1 className="text-2xl font-semibold text-[#181818]">
            Alejandra Martínez
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-medium">
              Estudiante
            </span>
            <span className="text-default-500 text-sm">
              Universidad Nacional Autónoma de México
            </span>
          </div>
          <p className="text-default-500 mt-2 text-sm">
            Estudiante de Ingeniería en Sistemas Computacionales • 7mo semestre
          </p>
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

  // ----------------------------
  // Universidades favoritas (solo si NO es UTM)
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
  // Dashboard Escolar (solo si ES UTM)
  // ----------------------------
  const SchoolDashboard = () => {
    const schoolStats = [
      { name: "Alumnos", value: 256 },
      { name: "Cursos activos", value: 34 },
      { name: "Certificaciones", value: 18 },
    ];

    const schoolCourses = [
      { id: 1, title: "Matemáticas Avanzadas", level: "Intermedio" },
      { id: 2, title: "Física Moderna", level: "Avanzado" },
      { id: 3, title: "Programación en Python", level: "Principiante" },
    ];

    return (
      <div className="space-y-6">
        <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            🏫 Dashboard Escolar - Universidad Tecnológica
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {schoolStats.map((stat) => (
              <Card
                key={stat.name}
                className="bg-primary/10 text-center p-4 rounded-xl"
              >
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-default-600">{stat.name}</p>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Cursos disponibles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {schoolCourses.map((course) => (
              <Card key={course.id} className="p-4">
                <h4 className="font-medium">{course.title}</h4>
                <Badge color="primary" variant="flat">
                  {course.level}
                </Badge>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-6 flex justify-between">
          <Button color="primary">Agregar curso</Button>
          <Button color="success">Generar reporte</Button>
        </Card>
      </div>
    );
  };

  // ----------------------------
  // Render principal
  // ----------------------------
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {!isUTMUser && <ProfileHeader />}

      <div className="mt-6 space-y-6">
        {isUTMUser ? <SchoolDashboard /> : <FavoriteUniversities />}
      </div>
    </div>
  );
};

export default PagePerfil;
