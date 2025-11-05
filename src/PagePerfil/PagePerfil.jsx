import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
<<<<<<< HEAD
import { Card } from "@heroui/react";

const PagePerfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  // Asegura cookies CSRF/sesión en el origen del backend (no en /api/v1)
  const initSanctum = async () => {
    const API_ORIGIN = (import.meta.env.VITE_BACKEND_URL || "").replace(
      /\/+$/,
      ""
    );
    try {
      await fetch(`${API_ORIGIN}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });
    } catch (e) {
      console.error("No se pudo inicializar Sanctum", e);
      setMsg("No se pudo inicializar la sesión (CSRF).");
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await initSanctum();
        // Tu axios ya tiene baseURL .../api/v1 → aquí NO repitas /api/v1
        const { data } = await axios.get("/auth/me");
        const userData = data?.user || data?.data || data;

        setUser({
          id: userData?.id ?? null,
          name: userData?.name || "Usuario",
          email: userData?.email || "",
          avatar: userData?.avatar || null,
          role: userData?.roles?.[0]?.name || "Estudiante",
        });
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setMsg(error?.message || "No se pudo cargar el usuario.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return <div className="px-4 py-8">Cargando...</div>;
=======
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
  });

  // ========== CARGAR DATOS DEL USUARIO ==========
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/me");
        const userData = data.user || data.data || data;
        setUser({
          id: userData.id,
          name: userData.name || "Usuario",
          email: userData.email || "",
          avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(
            userData.name || "U"
          )}&background=6366f1&color=fff`,
          role: (Array.isArray(userData.roles) && userData.roles[0]?.name) || "Estudiante",
          university: userData.university?.name || null,
          universityId: userData.university_id || null,
          country: userData.country?.name || null,
          countryId: userData.country_id || null,
          matricula: userData.matricula || null,
          birthDate: userData.birth_date || null,
          bio: userData.bio || null,
          createdAt: userData.created_at,
        });
        setUserStats({
          totalPoints: Math.floor(Math.random() * 2000) + 500,
          coursesEnrolled: 0,
          hoursSpent: 0,
          testsCompleted: 0,
        });
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setUser(null);
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }
    };
    loadUserData();
  }, []);

  // ========== CARGAR UNIVERSIDADES FAVORITAS ==========
  useEffect(() => {
    if (!user?.id || tab !== "universities") return;
    const loadFavoriteUniversities = async () => {
      setLoading((prev) => ({ ...prev, favorites: true }));
      try {
        const { data } = await axios.get("/api/v1/favorites?type=university");
        setFavoriteUniversities(
          (data.data || data || [])
            .filter((fav) => fav.favoritable_type === "App\\Models\\University")
            .map((fav) => ({
              id: fav.id,
              favId: fav.favoritable_id,
              name: fav.favoritable?.name || "Universidad",
              slug: fav.favoritable?.slug || "",
              logo: fav.favoritable?.logo || null,
              location: fav.favoritable?.country?.name || "Internacional",
            }))
        );
      } catch (error) {
        console.error("Error cargando favoritos:", error);
        setFavoriteUniversities([]);
      } finally {
        setLoading((prev) => ({ ...prev, favorites: false }));
      }
    };
    loadFavoriteUniversities();
  }, [user?.id, tab]);

  // ========== CARGAR CURSOS GUARDADOS ==========
  useEffect(() => {
    if (!user?.id || tab !== "saved") return;
    const loadSavedCourses = async () => {
      setLoading((prev) => ({ ...prev, courses: true }));
      try {
        const { data } = await axios.get("/api/v1/favorites?type=course");
        setSavedCourses(
          (data.data || data || [])
            .filter((fav) => fav.favoritable_type === "App\\Models\\Course")
            .map((fav) => ({
              id: fav.id,
              favId: fav.favoritable_id,
              name: fav.favoritable?.name || "Curso",
              slug: fav.favoritable?.slug || "",
              thumbnail: fav.favoritable?.thumbnail || null,
              category: fav.favoritable?.career?.name || "General",
              duration: fav.favoritable?.duration || null,
            }))
        );
      } catch (error) {
        console.error("Error cargando cursos guardados:", error);
        setSavedCourses([]);
      } finally {
        setLoading((prev) => ({ ...prev, courses: false }));
      }
    };
    loadSavedCourses();
  }, [user?.id, tab]);

  // ========== CARGAR CURSOS COMPRADOS ==========
  useEffect(() => {
    if (!user?.id || tab !== "purchased") return;
    const loadPurchasedCourses = async () => {
      setLoading((prev) => ({ ...prev, purchased: true }));
      try {
        const { data } = await axios.get("/api/v1/user/subscriptions");
        const subs = (data.data || data || []).map((sub) => ({
          id: sub.id,
          name: sub.plan?.name || "Plan",
          status: sub.status || "active",
          startDate: sub.start_date,
          endDate: sub.end_date,
          price: sub.plan?.price || 0,
        }));
        setPurchasedCourses(subs);
        setUserStats((prev) => ({ ...prev, coursesEnrolled: subs.length }));
      } catch (error) {
        console.error("Error cargando suscripciones:", error);
        setPurchasedCourses([]);
      } finally {
        setLoading((prev) => ({ ...prev, purchased: false }));
      }
    };
    loadPurchasedCourses();
  }, [user?.id, tab]);

  // ========== CARGAR INTENTOS DE TESTS ==========
  useEffect(() => {
    if (!user?.id || tab !== "stats") return;
    const loadTestAttempts = async () => {
      setLoading((prev) => ({ ...prev, tests: true }));
      try {
        const { data } = await axios.get("/api/v1/user/test-attempts");
        const attempts = (data.data || data || []).map((attempt) => ({
          id: attempt.id,
          testName: attempt.test?.name || "Test",
          score: attempt.score || 0,
          maxScore: attempt.max_score || 100,
          completedAt: attempt.completed_at,
          status: attempt.status,
        }));
        setTestAttempts(attempts);
        setUserStats((prev) => ({
          ...prev,
          testsCompleted: attempts.filter((a) => a.status === "completed").length,
        }));
      } catch (error) {
        console.error("Error cargando tests:", error);
        setTestAttempts([]);
      } finally {
        setLoading((prev) => ({ ...prev, tests: false }));
      }
    };
    loadTestAttempts();
  }, [user?.id, tab]);

  // ========== HANDLER: ELIMINAR FAVORITO ==========
  const handleRemoveFavorite = async (favoriteId, type) => {
    try {
      await axios.delete(`/api/v1/favorites/${favoriteId}`);
      if (type === "university") {
        setFavoriteUniversities((prev) => prev.filter((f) => f.id !== favoriteId));
      } else if (type === "course") {
        setSavedCourses((prev) => prev.filter((f) => f.id !== favoriteId));
      }
    } catch (error) {
      console.error("Error eliminando favorito:", error);
    }
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
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
<<<<<<< HEAD
        <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-6">
          <h2 className="text-xl font-semibold mb-2">
            No se pudo cargar el usuario
          </h2>
          <p className="text-default-600">{msg || "Inténtalo nuevamente."}</p>
=======
        <Card className="bg-white/80 backdrop-blur rounded-2xl p-6">
          <EmptyState text="No se pudo cargar el perfil. Por favor, inicia sesión." />
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c
        </Card>
      </div>
    );
  }

  // Vista especial para UTM
  if (user.email?.toLowerCase() === "utm@gmail.com") {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
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
        </Card>
      </div>
    );
  }

  // Perfil estándar
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
<<<<<<< HEAD
      <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-8">
        <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
        <div className="space-y-1 text-default-700">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Rol:</span> {user.role}
          </p>
        </div>
      </Card>
=======
      <ProfileHeader />
      <div className="mt-6">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
          variant="underlined"
          color="primary"
          aria-label="Secciones del perfil"
          className="w-full"
        >
          <Tab key="universities" title="Universidades favoritas" />
          <Tab key="saved" title="Cursos guardados" />
          <Tab key="purchased" title="Suscripciones" />
          <Tab key="stats" title="Estadísticas" />
        </Tabs>
      </div>
      <div className="mt-6">
        {tab === "universities" && <FavoriteUniversities />}
        {tab === "saved" && <SavedCourses />}
        {tab === "purchased" && <PurchasedCourses />}
        {tab === "stats" && <UserStatistics />}
      </div>
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c
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
