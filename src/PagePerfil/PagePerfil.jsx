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

const PagePerfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("universities");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const { data } = await axios.get("/api/v1/auth/me");
          const userFromAPI = data.user || data.data || data;
          setUser({
            id: userFromAPI.id,
            name: userFromAPI.name || "Usuario",
            email: userFromAPI.email || "",
            avatar: userFromAPI.avatar || null,
            role: userFromAPI.roles?.[0]?.name || "Estudiante",
          });
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Mock data temporal
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
  // Las demás secciones (Favoritos, Cursos guardados, Comprados, Estadísticas)
  // ----------------------------
  // Aquí puedes pegar tu código tal cual lo tenías para FavoriteUniversities, SavedCourses, PurchasedCourses, UserStatistics
  // No requieren cambios

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
  }

  if (!user) {
    return <div>No se pudo cargar el usuario.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <ProfileHeader />

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

      <div className="mt-6 space-y-6">
        {tab === "universities" && <FavoriteUniversities />}
        {tab === "saved" && <SavedCourses />}
        {tab === "purchased" && <PurchasedCourses />}
        {tab === "stats" && <UserStatistics />}
      </div>
    </div>
  );
};

export default PagePerfil;
