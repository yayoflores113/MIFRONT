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

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/me");
        const userData = data.user || data.data || data;
        setUser({
          id: userData.id,
          name: userData.name || "Usuario",
          email: userData.email || "",
          avatar:
            userData.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
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

  // Resto de useEffect para cargar favoritos, cursos, compras y tests
  // (igual que tu código original, omitiendo aquí por brevedad)

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
          <Stat
            icon={<TrophyIcon className="w-5 h-5" />}
            label="Puntos"
            value={userStats?.totalPoints?.toLocaleString() || "0"}
          />
          <Stat
            icon={<BookOpenIcon className="w-5 h-5" />}
            label="Cursos"
            value={userStats?.coursesEnrolled || "0"}
          />
          <Stat
            icon={<ClockIcon className="w-5 h-5" />}
            label="Horas"
            value={`${userStats?.hoursSpent || 0}h`}
          />
          <Stat
            icon={<ChartBarIcon className="w-5 h-5" />}
            label="Tests"
            value={userStats?.testsCompleted || "0"}
          />
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
    </div>
  );
};

export default PagePerfil;
