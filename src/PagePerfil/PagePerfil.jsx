import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import {
  MapPinIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const PagePerfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          university: userData.university?.name || null,
          country: userData.country?.name || null,
          matricula: userData.matricula || null,
        });
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <Card className="bg-white/80 backdrop-blur rounded-2xl p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <Card className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center text-gray-500">
          No se pudo cargar el perfil. Por favor, inicia sesión.
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <Card className="bg-white/70 backdrop-blur-md shadow-lg rounded-3xl overflow-hidden">
        <CardHeader className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <Avatar
            className="w-20 h-20 text-large ring-4 ring-white"
            src={user.avatar}
            name={user.name}
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-gray-500">
              {user.university && (
                <div className="flex items-center gap-1">
                  <AcademicCapIcon className="w-4 h-4" />
                  <span className="text-sm">{user.university}</span>
                </div>
              )}
              {user.country && (
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm">{user.country}</span>
                </div>
              )}
              {user.matricula && (
                <div className="flex items-center gap-1">
                  <DocumentTextIcon className="w-4 h-4" />
                  <span className="text-sm">{user.matricula}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            Bienvenido a tu perfil personal. Aquí podrás acceder a tu
            panel de estudiante y consultar tu progreso académico.
          </p>
          <Button
            color="primary"
            size="lg"
            startContent={<ArrowRightCircleIcon className="w-5 h-5" />}
            onPress={() => navigate("/user/dashboard")}
          >
            Ir al Panel de Usuario
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PagePerfil;
