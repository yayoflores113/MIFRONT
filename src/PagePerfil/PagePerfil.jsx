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
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

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

  // ========== CARGAR INTENTOS DE TEST ==========
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

  // ========== HANDLER ELIMINAR FAVORITO ==========
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

  // ================= COMPONENTES =================
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
    <div className="animate-pulse space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-200 rounded-lg" />)}</div>
  );

  // ================= RENDER PRINCIPAL =================
  const isUTMUser = user?.email?.toLowerCase() === "utm@gmail.com";

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
      <div className="mt-6">
        {!isUTMUser && (
          <Tabs selectedKey={tab} onSelectionChange={(key) => setTab(String(key))} variant="underlined" color="primary" aria-label="Secciones del perfil" className="w-full">
            <Tab key="universities" title="Universidades favoritas" />
            <Tab key="saved" title="Cursos guardados" />
            <Tab key="purchased" title="Suscripciones" />
            <Tab key="stats" title="Estadísticas" />
          </Tabs>
        )}
      </div>

      <div className="mt-6">
        {isUTMUser ? (
          <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#181818]">Universidad Tecnológica de la Mixteca (UTM)</h2>
            <p className="text-default-600 leading-relaxed">
              La Universidad Tecnológica de la Mixteca (UTM) es una institución pública de educación superior ubicada en Huajuapan de León, Oaxaca.
              Se distingue por su enfoque en la formación tecnológica, científica y humanista, así como por su compromiso con el desarrollo regional y la innovación.
            </p>
          </Card>
        ) : tab === "universities" ? (
          <FavoriteUniversities />
        ) : tab === "saved" ? (
          <SavedCourses />
        ) : tab === "purchased" ? (
          <PurchasedCourses />
        ) : tab === "stats" ? (
          <UserStatistics />
        ) : null}
      </div>
    </div>
  );
};

export default PagePerfil;
