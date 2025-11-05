import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
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
        // Tu axios ya tiene baseURL .../api/v1, por eso aquí NO repetimos /api/v1
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

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-6">
          <h2 className="text-xl font-semibold mb-2">
            No se pudo cargar el usuario
          </h2>
          <p className="text-default-600">{msg || "Inténtalo nuevamente."}</p>
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
    </div>
  );
};

export default PagePerfil;
