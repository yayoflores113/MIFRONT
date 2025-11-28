import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Badge,
  Tabs,
  Tab,
  Chip,
  Divider,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  PencilSquareIcon,
  MapPinIcon,
  InformationCircleIcon,
  BookOpenIcon,
  ClockIcon,
  PlayIcon,
  TrashIcon,
  TagIcon,
  ArrowPathIcon,
  TrophyIcon,
  ShoppingBagIcon,
  BookmarkIcon,
  CloudArrowDownIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PlusIcon,
  CloudArrowUpIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const PagePerfil = () => {
  const [tab, setTab] = useState("universities");
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [favoriteUniversities, setFavoriteUniversities] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [testAttempts, setTestAttempts] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    favorites: false,
    courses: false,
    purchased: false,
    tests: false,
    uploadCourse: false,
  });
  
  // Estados para el formulario de subir curso
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    price: "",
    thumbnail: null,
    video: null,
  });

  // ========== CARGAR DATOS DEL USUARIO (ESTÁTICO) ==========
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      // Datos estáticos del usuario
      setUser({
        id: 1,
        name: "Universidad tecnologica metropolitana",
        email: "utm@gmail.com", // Cambia este email para probar la funcionalidad
        avatar: "https://ui-avatars.com/api/?name=Usuario+Prueba&background=6366f1&color=fff",
        role: "Estudiante",
        university: "Universidad Tecnológica de México",
        universityId: 1,
        country: "México",
        countryId: 1,
        matricula: "2024001",
        birthDate: "2000-01-15",
        bio: "Estudiante apasionado por la tecnología y el aprendizaje continuo.",
        createdAt: new Date().toISOString(),
      });
      setUserStats({
        totalPoints: 1250,
        coursesEnrolled: 3,
        hoursSpent: 45,
        testsCompleted: 12,
      });
      setLoading((prev) => ({ ...prev, user: false }));
    }, 500);
  }, []);

  // ========== CARGAR UNIVERSIDADES FAVORITAS (ESTÁTICO) ==========
  useEffect(() => {
    if (!user?.id || tab !== "universities") return;
    setTimeout(() => {
      setFavoriteUniversities([
        {
          id: 1,
          favId: 1,
          name: "Universidad Nacional Autónoma de México",
          slug: "unam",
          logo: null,
          location: "México",
        },
        {
          id: 2,
          favId: 2,
          name: "Instituto Tecnológico de Monterrey",
          slug: "tec",
          logo: null,
          location: "México",
        },
      ]);
      setLoading((prev) => ({ ...prev, favorites: false }));
    }, 300);
  }, [user?.id, tab]);

  // ========== CARGAR CURSOS GUARDADOS (ESTÁTICO) ==========
  useEffect(() => {
    if (!user?.id || tab !== "saved") return;
    setTimeout(() => {
      setSavedCourses([
        {
          id: 1,
          favId: 1,
          name: "Introducción a la Programación",
          slug: "intro-programacion",
          thumbnail: null,
          category: "Tecnología",
          duration: "40 horas",
        },
        {
          id: 2,
          favId: 2,
          name: "Diseño Web Moderno",
          slug: "diseno-web",
          thumbnail: null,
          category: "Diseño",
          duration: "30 horas",
        },
      ]);
      setLoading((prev) => ({ ...prev, courses: false }));
    }, 300);
  }, [user?.id, tab]);

  // ========== CARGAR CURSOS COMPRADOS (ESTÁTICO) ==========
  useEffect(() => {
    if (!user?.id || tab !== "purchased") return;
    setTimeout(() => {
      const subs = [
        {
          id: 1,
          name: "Plan Premium Mensual",
          status: "active",
          startDate: "2024-01-15",
          endDate: "2025-01-15",
          price: 299,
        },
      ];
      setPurchasedCourses(subs);
      setUserStats((prev) => ({ ...prev, coursesEnrolled: subs.length }));
      setLoading((prev) => ({ ...prev, purchased: false }));
    }, 300);
  }, [user?.id, tab]);

  // ========== CARGAR INTENTOS DE TESTS (ESTÁTICO) ==========
  useEffect(() => {
    if (!user?.id || tab !== "stats") return;
    setTimeout(() => {
      const attempts = [
        {
          id: 1,
          testName: "Examen de Matemáticas",
          score: 85,
          maxScore: 100,
          completedAt: "2024-11-10",
          status: "completed",
        },
        {
          id: 2,
          testName: "Test de Programación",
          score: 92,
          maxScore: 100,
          completedAt: "2024-11-08",
          status: "completed",
        },
        {
          id: 3,
          testName: "Evaluación de Inglés",
          score: 78,
          maxScore: 100,
          completedAt: "2024-11-05",
          status: "completed",
        },
      ];
      setTestAttempts(attempts);
      setUserStats((prev) => ({
        ...prev,
        testsCompleted: attempts.filter((a) => a.status === "completed").length,
      }));
      setLoading((prev) => ({ ...prev, tests: false }));
    }, 300);
  }, [user?.id, tab]);

  // ========== HANDLER: ELIMINAR FAVORITO (ESTÁTICO) ==========
  const handleRemoveFavorite = async (favoriteId, type) => {
    // Simular eliminación en modo estático
    if (type === "university") {
      setFavoriteUniversities((prev) => prev.filter((f) => f.id !== favoriteId));
    } else if (type === "course") {
      setSavedCourses((prev) => prev.filter((f) => f.id !== favoriteId));
    }
    console.log(`Favorito ${favoriteId} eliminado (modo estático)`);
  };

  // ========== HANDLER: SUBIR CURSO ==========
  const handleCourseFormChange = (field, value) => {
    setCourseForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setCourseForm((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, uploadCourse: true }));
    
    // Simular envío de curso (modo estático)
    setTimeout(() => {
      console.log("Curso enviado:", courseForm);
      alert("¡Curso subido exitosamente! (Modo estático)");
      
      // Resetear formulario
      setCourseForm({
        name: "",
        description: "",
        category: "",
        duration: "",
        level: "",
        price: "",
        thumbnail: null,
        video: null,
      });
      
      setLoading((prev) => ({ ...prev, uploadCourse: false }));
    }, 1500);
  };

  // ========== COMPONENTES AUXILIARES ==========
  const ProfileHeader = () => (
    <Card className="w-full bg-white/70 backdrop-blur-md shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="flex-col items-start gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
        <div className="flex items-center gap-4 w-full">
          <Avatar
            className="w-20 h-20 text-large ring-4 ring-white"
            src={user?.avatar}
            name={user?.name || "Usuario"}
          />
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user?.name || "Usuario"}
              </h2>
            </div>
            <p className="text-gray-600">{user?.email || ""}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {user?.university && (
                <div className="flex items-center gap-1 text-gray-500">
                  <AcademicCapIcon className="w-4 h-4" />
                  <span className="text-sm">{user.university}</span>
                </div>
              )}
              {user?.country && (
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm">{user.country}</span>
                </div>
              )}
              {user?.matricula && (
                <div className="flex items-center gap-1 text-gray-500">
                  <DocumentTextIcon className="w-4 h-4" />
                  <span className="text-sm">{user.matricula}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            className="ml-auto"
            variant="flat"
            startContent={<PencilSquareIcon className="w-4 h-4" />}
          >
            Editar perfil
          </Button>
        </div>
        {user?.bio ? (
          <p className="mt-4 text-gray-700">{user.bio}</p>
        ) : (
          <p className="mt-4 text-gray-500 italic text-sm">
            Añade una breve biografía a tu perfil.
          </p>
        )}
      </CardHeader>
      <CardBody className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat icon={<TrophyIcon className="w-5 h-5" />} label="Puntos" value={userStats?.totalPoints?.toLocaleString() || "0"} />
          <Stat icon={<BookOpenIcon className="w-5 h-5" />} label="Cursos" value={userStats?.coursesEnrolled || "0"} />
          <Stat icon={<ClockIcon className="w-5 h-5" />} label="Horas" value={`${userStats?.hoursSpent || 0}h`} />
          <Stat icon={<ChartBarIcon className="w-5 h-5" />} label="Tests" value={userStats?.testsCompleted || "0"} />
        </div>
      </CardBody>
      <CardFooter className="px-6 py-4 flex gap-2 justify-end"></CardFooter>
    </Card>
  );

  const Stat = ({ icon, label, value }) => (
    <Card className="bg-white/80 backdrop-blur rounded-2xl">
      <CardBody className="flex flex-row items-center gap-3 p-4">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{label}</span>
          <span className="text-lg font-semibold text-gray-900">{value}</span>
        </div>
      </CardBody>
    </Card>
  );

  const EmptyState = ({ text }) => (
    <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
      <InformationCircleIcon className="w-8 h-8 mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  );

  const LoadingState = () => (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-200 rounded-lg" />
      ))}
    </div>
  );

  // ========== COMPONENTE DE INFORMACIÓN DE LA UTM ==========
  const UTMInfoCard = () => (
    <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 backdrop-blur rounded-2xl shadow-lg border border-indigo-100">
      <CardHeader className="flex flex-col items-start gap-2 pb-2">
        <div className="flex items-center gap-3 w-full">
          <div className="p-3 rounded-xl bg-indigo-600">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Universidad Tecnológica de México (UTM)</h3>
            <p className="text-sm text-gray-600">Institución de Excelencia Académica</p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPinIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Ubicación</p>
                <p className="text-sm text-gray-600">Ciudad de México, México</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BookOpenIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Programas Académicos</p>
                <p className="text-sm text-gray-600">Licenciaturas, Maestrías y Doctorados</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <TrophyIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Reconocimientos</p>
                <p className="text-sm text-gray-600">Certificaciones de calidad educativa</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DocumentTextIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Modalidad</p>
                <p className="text-sm text-gray-600">Presencial, Mixta y En línea</p>
              </div>
            </div>
          </div>
        </div>
        
        <Divider className="my-2" />
        
        <div className="bg-white/60 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Áreas de Estudio Destacadas</h4>
          <div className="flex flex-wrap gap-2">
            <Chip size="sm" variant="flat" color="primary">Ingeniería</Chip>
            <Chip size="sm" variant="flat" color="primary">Tecnología</Chip>
            <Chip size="sm" variant="flat" color="primary">Negocios</Chip>
            <Chip size="sm" variant="flat" color="primary">Diseño</Chip>
            <Chip size="sm" variant="flat" color="primary">Salud</Chip>
            <Chip size="sm" variant="flat" color="primary">Comunicación</Chip>
          </div>
        </div>

        <div className="bg-indigo-600 text-white rounded-xl p-4">
          <p className="text-sm leading-relaxed">
            La UTM se destaca por su enfoque en la formación integral de profesionales competentes, 
            con instalaciones de vanguardia y un cuerpo docente altamente calificado comprometido 
            con la excelencia académica y el desarrollo de habilidades prácticas.
          </p>
        </div>
      </CardBody>
    </Card>
  );

  // ======= Renderizado principal =======
  if (loading.user) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <Card className="bg-white/80 backdrop-blur rounded-2xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <Card className="bg-white/80 backdrop-blur rounded-2xl p-6">
          <EmptyState text="No se pudo cargar el perfil. Por favor, inicia sesión." />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <ProfileHeader />
      
      {/* Mostrar información de la UTM solo para utm@gmail.com */}
      {user?.email === "utm@gmail.com" && (
        <div className="mt-6">
          <UTMInfoCard />
        </div>
      )}
      
      <div className="mt-6">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
          variant="underlined"
          color="primary"
          aria-label="Secciones del perfil"
          className="w-full"
        >
          {/* <Tab key="universities" title="Universidades favoritas" /> */}
          {/* <Tab key="saved" title="Cursos guardados" /> */}
          {/* <Tab key="purchased" title="Suscripciones" /> */}
          <Tab key="upload" title={
            <div className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              <span>Subir Curso</span>
            </div>
          } />
          {/* <Tab key="stats" title="Estadísticas" /> */}
        </Tabs>
      </div>
      <div className="mt-6">
        {tab === "universities" && <FavoriteUniversities />}
        {tab === "saved" && <SavedCourses />}
        {tab === "purchased" && <PurchasedCourses />}
        {tab === "upload" && <UploadCourse />}
        {tab === "stats" && <UserStatistics />}
      </div>
    </div>
  );

  // ======= COMPONENTES DE SECCIONES =======
  function FavoriteUniversities() {
    return (
      <Card className="bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Universidades favoritas</h3>
            <Chip size="sm" variant="flat">{favoriteUniversities.length}</Chip>
          </div>
          <Button
            size="sm"
            variant="flat"
            startContent={<ArrowPathIcon className="w-4 h-4" />}
            isLoading={loading.favorites}
            onPress={() => window.location.reload()}
          >
            Actualizar
          </Button>
        </CardHeader>
        <CardBody className="gap-3">
          {loading.favorites ? (
            <LoadingState />
          ) : favoriteUniversities.length > 0 ? (
            favoriteUniversities.map((uni) => (
              <Card key={uni.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                <CardBody className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                      {uni.logo ? <img src={uni.logo} alt={uni.name} className="w-8 h-8 object-contain" /> : <AcademicCapIcon className="w-6 h-6 text-gray-400" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{uni.name}</h4>
                      <p className="text-sm text-gray-500">{uni.location}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="flat" color="danger" isIconOnly onPress={() => handleRemoveFavorite(uni.id, "university")}>
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </CardBody>
              </Card>
            ))
          ) : (
            <EmptyState text="Aún no tienes universidades favoritas." />
          )}
        </CardBody>
      </Card>
    );
  }

  function SavedCourses() {
    return (
      <Card className="bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Cursos guardados</h3>
            <Chip size="sm" variant="flat">{savedCourses.length}</Chip>
          </div>
        </CardHeader>
        <CardBody className="gap-3">
          {loading.courses ? (
            <LoadingState />
          ) : savedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {savedCourses.map((course) => (
                <Card key={course.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                  <CardBody className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <BookOpenIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{course.name}</h4>
                        <p className="text-sm text-gray-500">{course.category}</p>
                        {course.duration && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                            <ClockIcon className="w-3 h-3" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                      </div>
                      <Button size="sm" variant="flat" color="danger" isIconOnly onPress={() => handleRemoveFavorite(course.id, "course")}>
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState text="Aún no tienes cursos guardados." />
          )}
        </CardBody>
      </Card>
    );
  }

  function PurchasedCourses() {
    return (
      <Card className="bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Suscripciones activas</h3>
            <Chip size="sm" variant="flat">{purchasedCourses.length}</Chip>
          </div>
        </CardHeader>
        <CardBody className="gap-3">
          {loading.purchased ? (
            <LoadingState />
          ) : purchasedCourses.length > 0 ? (
            purchasedCourses.map((sub) => (
              <Card key={sub.id} className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardBody className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{sub.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Inicio: {new Date(sub.startDate).toLocaleDateString()}</p>
                      {sub.endDate && <p className="text-sm text-gray-600">Fin: {new Date(sub.endDate).toLocaleDateString()}</p>}
                    </div>
                    <Badge color={sub.status === "active" ? "success" : "warning"} variant="flat">{sub.status}</Badge>
                  </div>
                  <Divider className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">${sub.price}</span>
                    <Button size="sm" color="primary" startContent={<PlayIcon className="w-4 h-4" />}>Continuar</Button>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <EmptyState text="Aún no has comprado cursos." />
          )}
        </CardBody>
      </Card>
    );
  }

  function UploadCourse() {
    const categories = ["Tecnología", "Diseño", "Negocios", "Salud", "Comunicación", "Ingeniería", "Arte", "Idiomas"];
    const levels = ["Principiante", "Intermedio", "Avanzado"];

    return (
      <Card className="bg-white/80 backdrop-blur rounded-2xl">
        <CardHeader className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <CloudArrowUpIcon className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">Subir Nuevo Curso</h3>
          </div>
          <p className="text-sm text-gray-600">Completa la información para publicar tu curso</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmitCourse} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Información Básica</h4>
              
              <Input
                label="Nombre del Curso"
                placeholder="Ej: Introducción a React"
                value={courseForm.name}
                onChange={(e) => handleCourseFormChange("name", e.target.value)}
                required
                variant="bordered"
                classNames={{
                  input: "text-gray-900",
                  label: "text-gray-700",
                }}
              />

              <Textarea
                label="Descripción"
                placeholder="Describe de qué trata tu curso..."
                value={courseForm.description}
                onChange={(e) => handleCourseFormChange("description", e.target.value)}
                required
                variant="bordered"
                minRows={4}
                classNames={{
                  input: "text-gray-900",
                  label: "text-gray-700",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Categoría"
                  placeholder="Selecciona una categoría"
                  value={courseForm.category}
                  onChange={(e) => handleCourseFormChange("category", e.target.value)}
                  required
                  variant="bordered"
                  classNames={{
                    label: "text-gray-700",
                    value: "text-gray-900",
                  }}
                >
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Nivel"
                  placeholder="Selecciona el nivel"
                  value={courseForm.level}
                  onChange={(e) => handleCourseFormChange("level", e.target.value)}
                  required
                  variant="bordered"
                  classNames={{
                    label: "text-gray-700",
                    value: "text-gray-900",
                  }}
                >
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Duración"
                  placeholder="Ej: 40 horas"
                  value={courseForm.duration}
                  onChange={(e) => handleCourseFormChange("duration", e.target.value)}
                  required
                  variant="bordered"
                  startContent={<ClockIcon className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: "text-gray-900",
                    label: "text-gray-700",
                  }}
                />

                <Input
                  label="Precio (MXN)"
                  placeholder="Ej: 499"
                  type="number"
                  value={courseForm.price}
                  onChange={(e) => handleCourseFormChange("price", e.target.value)}
                  required
                  variant="bordered"
                  startContent={<span className="text-gray-400">$</span>}
                  classNames={{
                    input: "text-gray-900",
                    label: "text-gray-700",
                  }}
                />
              </div>
            </div>

            <Divider />

            {/* Archivos multimedia */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Archivos Multimedia</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen de portada
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange("thumbnail", e)}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                    >
                      <CloudArrowUpIcon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        {courseForm.thumbnail ? courseForm.thumbnail.name : "Subir imagen"}
                      </span>
                    </label>
                    {courseForm.thumbnail && (
                      <Chip color="success" variant="flat" size="sm">
                        ✓ Archivo cargado
                      </Chip>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceptados: JPG, PNG (Máx. 5MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video de presentación (opcional)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange("video", e)}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                    >
                      <VideoCameraIcon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        {courseForm.video ? courseForm.video.name : "Subir video"}
                      </span>
                    </label>
                    {courseForm.video && (
                      <Chip color="success" variant="flat" size="sm">
                        ✓ Archivo cargado
                      </Chip>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Formatos aceptados: MP4, MOV (Máx. 100MB)
                  </p>
                </div>
              </div>
            </div>

            <Divider />

            {/* Botones de acción */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="flat"
                onPress={() => {
                  setCourseForm({
                    name: "",
                    description: "",
                    category: "",
                    duration: "",
                    level: "",
                    price: "",
                    thumbnail: null,
                    video: null,
                  });
                }}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={loading.uploadCourse}
                startContent={!loading.uploadCourse && <CloudArrowUpIcon className="w-5 h-5" />}
              >
                Publicar Curso
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }

  function UserStatistics() {
    const chartData = testAttempts
      .filter((a) => a.status === "completed")
      .slice(0, 5)
      .map((attempt) => ({
        name: attempt.testName.slice(0, 20),
        score: Math.round((attempt.score / attempt.maxScore) * 100),
      }));

    return (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur rounded-2xl">
          <CardHeader className="flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Resultados de tests</h3>
            <Chip size="sm" variant="flat">{testAttempts.length}</Chip>
          </CardHeader>
          <CardBody>
            {loading.tests ? (
              <LoadingState />
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState text="Completa tests para ver tus estadísticas." />
            )}
          </CardBody>
        </Card>

        {testAttempts.length > 0 && (
          <Card className="bg-white/80 backdrop-blur rounded-2xl">
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Historial reciente</h3>
            </CardHeader>
            <CardBody className="gap-2">
              {testAttempts.slice(0, 5).map((attempt) => (
                <div key={attempt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{attempt.testName}</p>
                    <p className="text-sm text-gray-500">{attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : "En progreso"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-indigo-600">{attempt.score}/{attempt.maxScore}</p>
                    <p className="text-xs text-gray-500">{Math.round((attempt.score / attempt.maxScore) * 100)}%</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
};

export default PagePerfil;
