import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Card } from "@heroui/react";

const PagePerfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
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
        console.error("Error cargando usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No se pudo cargar el usuario.</div>;
  }

  // Mostrar datos de la UTM si el usuario es utm@gmail.com
  if (user.email.toLowerCase() === "utm@gmail.com") {
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

  // Mostrar perfil normal para cualquier otro usuario
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <Card className="bg-white rounded-xl shadow-sm border border-default-200 p-8">
        <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Rol: {user.role}</p>
      </Card>
    </div>
  );
};

export default PagePerfil;
