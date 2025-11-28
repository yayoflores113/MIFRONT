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
  TagIcon,
  TrophyIcon,
  ShoppingBagIcon,
  BookmarkIcon,
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
  const [tab, setTab] = useState("saved");
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [savedCourses, setSavedCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [testAttempts, setTestAttempts] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    courses: false,
    purchased: false,
    tests: false,
  });

  // ========== USER (ESTÁTICO) ==========
  useEffect(() => {
    setTimeout(() => {
      setUser({
        id: 1,
        name: "utm",
        email: "utm@gmail.com",
        avatar:
          "https://ui-avatars.com/api/?name=Usuario+Prueba&background=6366f1&color=fff",
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

  // ========== CURSOS GUARDADOS ==========
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

  // ========== SUSCRIPCIONES ==========
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

  // ========== TESTS ==========
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

  // ========== COMPONENTES ==========

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
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-600">{user?.email}</p>

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
            value={userStats?.totalPoints}
          />
          <Stat
            icon={<BookOpenIcon className="w-5 h-5" />}
            label="Cursos"
            value={userStats?.coursesEnrolled}
          />
          <Stat
            icon={<ClockIcon className="w-5 h-5" />}
            label="Horas"
            value={`${userStats?.hoursSpent}h`}
          />
          <Stat
            icon={<ChartBarIcon className="w-5 h-5" />}
            label="Tests"
            value={userStats?.testsCompleted}
          />
        </div>
      </CardBody>
    </Card>
  );

  const Stat = ({ icon, label, value }) => (
    <div className="bg-white/80 rounded-xl p-4 flex items-center gap-3 shadow">
      <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );

  const EmptyState = ({ text }) => (
    <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
      <InformationCircleIcon className="w-8 h-8 mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  );

  // ======= COMPONENTE: UTM =======
  const UTMInfoCard = () => (
    <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 backdrop-blur rounded-2xl shadow-lg border border-indigo-100">
      <CardHeader className="flex flex-col items-start gap-2 pb-2">
        <div className="flex items-center gap-3 w-full">
          <div className="p-3 rounded-xl bg-indigo-600">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Universidad Tecnológica de México (UTM)
            </h3>
            <p className="text-sm text-gray-600">
              Institución de Excelencia Académica
            </p>
          </div>
        </div>
      </CardHeader>

      <CardBody className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPinIcon className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">Ubicación</p>
                <p className="text-sm text-gray-600">Yucatan, México</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <BookOpenIcon className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">Programas Académicos</p>
                <p className="text-sm text-gray-600">
                  Licenciaturas, Maestrías y Doctorados
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <TrophyIcon className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">Reconocimientos</p>
                <p className="text-sm text-gray-600">
                  Certificaciones de calidad educativa
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">Modalidad</p>
                <p className="text-sm text-gray-600">
                  Presencial, Mixta y En línea
                </p>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="bg-white/60 rounded-xl p-4">
          <h4 className="font-semibold mb-2">Áreas Destacadas</h4>
          <div className="flex flex-wrap gap-2">
            <Chip size="sm" variant="flat" color="primary">
              Ingeniería
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              Tecnología
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              Negocios
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              Diseño
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              Salud
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              Comunicación
            </Chip>
          </div>
        </div>

        <div className="bg-indigo-600 text-white rounded-xl p-4">
          <p className="text-sm">
            La UTM se destaca por su formación integral, instalaciones
            modernas y docentes altamente calificados.
          </p>
        </div>
      </CardBody>
    </Card>
  );

  // ========== RENDER ==========
  if (loading.user)
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 w-1/3 rounded" />
            <div className="h-4 bg-gray-200 w-1/2 rounded" />
          </div>
        </Card>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProfileHeader />

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
          className="w-full"
        >
          <Tab key="saved" title="Cursos guardados" />
          <Tab key="purchased" title="Suscripciones" />
          <Tab key="stats" title="Estadísticas" />
        </Tabs>
      </div>

      <div className="mt-6">
        {tab === "saved" && (
          <>
            {savedCourses.length === 0 ? (
              <EmptyState text="No tienes cursos guardados." />
            ) : (
              savedCourses.map((c) => (
                <Card key={c.id} className="mb-4 p-4">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.duration}</p>
                </Card>
              ))
            )}
          </>
        )}

        {tab === "purchased" && (
          <>
            {purchasedCourses.length === 0 ? (
              <EmptyState text="No tienes suscripciones." />
            ) : (
              purchasedCourses.map((p) => (
                <Card key={p.id} className="mb-4 p-4">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">Activo</p>
                </Card>
              ))
            )}
          </>
        )}

        {tab === "stats" && (
          <>
            {testAttempts.length === 0 ? (
              <EmptyState text="No tienes estadísticas disponibles." />
            ) : (
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={testAttempts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="testName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PagePerfil;
