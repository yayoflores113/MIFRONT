import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../Config";
import AuthUser from "./AuthUser";
import axios from "axios";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setToken } = AuthUser(); // setToken(user, token, rol)

  useEffect(() => {
    // 1) Intentar leer token de query ?token=...
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    const hadError = params.get("error");

    // 2) Alternativa: si en el futuro usas fragmento #token=...
    if (!token && window.location.hash) {
      const hashParams = new URLSearchParams(
        window.location.hash.replace(/^#/, "")
      );
      token = hashParams.get("token");
    }

    if (!token || hadError) {
      navigate("/login", { replace: true });
      return;
    }

    // Persistencia de token (tu app usa sessionStorage y también lee de localStorage)
    sessionStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("auth_token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Cargar perfil para obtener roles y completar setToken(user, token, rol)
    Config.getMe()
      .then((resp) => {
        const data = resp?.data || {};
        const user = data.user ?? data.data ?? data;
        const rol = user?.roles?.[0]?.name || user?.role || "user";
        setToken(user, token, rol);
      })
      .catch(() => {
        // Si por alguna razón /auth/me falla, al menos entramos a home con token seteado
        navigate("/", { replace: true });
      });
  }, [navigate, setToken]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center text-sm text-[#181818]">
      Iniciando sesión con Google…
    </div>
  );
}
