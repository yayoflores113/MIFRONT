// src/page/AuthCallback.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// Usa namespace import para evitar problemas de export default vs nombrados
import * as Config from "../Config";
// Si necesitas fallback, importaremos axios on-demand
// import axios from "../lib/axios"; // no es necesario si funciona Config.getMe()

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | error

  // CSRF en la RAÍZ del backend (no bajo /api/v1)
  const getCsrfCookie = async () => {
    const API_ORIGIN = (import.meta.env.VITE_BACKEND_URL || "").replace(
      /\/+$/,
      ""
    );
    await fetch(`${API_ORIGIN}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 1) Verificar error OAuth
        const error = searchParams.get("error");
        if (error) {
          console.error("Error OAuth:", error);
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 1200);
          return;
        }

        // 2) Verificar éxito OAuth
        const success = searchParams.get("success");
        if (!success) {
          console.error("No se confirmó la autenticación");
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 1200);
          return;
        }

        // 3) Generar cookies CSRF/sesión en la raíz (evita /api/v1)
        await getCsrfCookie();

        // 4) Obtener datos del usuario
        let resp;
        if (typeof Config?.getMe === "function") {
          resp = await Config.getMe(); // Debe llamar a /auth/me con tu axios (baseURL .../api/v1)
        } else {
          // Fallback directo (por si Config no expone getMe)
          const { default: axios } = await import("../lib/axios");
          resp = await axios.get("/auth/me"); // NO repitas /api/v1
        }

        const data = resp?.data || {};
        if (!data?.user) {
          console.error("No se pudo obtener datos del usuario");
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 1200);
          return;
        }

        const user = data.user;
        const rol = user.rol || user.roles?.[0]?.name || "user";

        // 5) Persistir sesión del lado del front si es necesario
        // Si usas algún helper tipo AuthUser().setToken(user, null, rol), úsalo aquí:
        // const { setToken } = AuthUser(); setToken(user, null, rol);

        setStatus("success");

        // 6) Redirigir por rol
        setTimeout(() => {
          if (rol === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 800);
      } catch (err) {
        console.error("Error en callback OAuth:", err);
        setStatus("error");
        setTimeout(() => navigate("/login", { replace: true }), 1200);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  // UI de carga/éxito/error
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFEFE]">
      <div className="text-center max-w-md px-6">
        {status === "loading" && (
          <>
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#2CBFF0] border-r-transparent mb-4"></div>
            <h2 className="text-xl font-semibold text-[#181818] mb-2">
              Iniciando sesión...
            </h2>
            <p className="text-sm text-[#181818]/60">
              Estamos configurando tu cuenta
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#181818] mb-2">
              ¡Listo!
            </h2>
            <p className="text-sm text-[#181818]/60">
              Redirigiendo a tu dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#181818] mb-2">
              Error de autenticación
            </h2>
            <p className="text-sm text-[#181818]/60">
              Redirigiendo al login...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
