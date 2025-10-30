import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Config from "../Config";
import AuthUser from "./AuthUser";
import { ensureSanctum } from "../lib/axios";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setToken } = AuthUser();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 1. Verificar si hubo error en OAuth
        const error = searchParams.get("error");
        if (error) {
          console.error("Error OAuth:", error);
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        // 2. Obtener datos codificados
        const encodedData = searchParams.get("data");
        if (!encodedData) {
          console.error("No hay datos del usuario");
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        // 3. Decodificar datos
        const userData = JSON.parse(atob(encodedData));
        console.log("Datos recibidos de OAuth:", userData);

        // 4. Asegurar cookie CSRF
        await ensureSanctum();

        // 5. Verificar sesión con el backend
        const resp = await Config.getMe();
        const data = resp?.data || {};

        // 6. Extraer user completo del backend
        const fullUser = data.user ?? data.data ?? data;
        const rol = userData.rol || fullUser?.roles?.[0]?.name || "user";

        console.log("Usuario autenticado:", fullUser);
        console.log("Rol asignado:", rol);

        // 7. Guardar en sessionStorage
        setToken(fullUser, null, rol);

        setStatus("success");

        // 8. Esperar un momento antes de redirigir
        setTimeout(() => {
          if (rol === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 1000);
      } catch (err) {
        console.error("Error en callback OAuth:", err);
        setStatus("error");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    handleCallback();
  }, [navigate, setToken, searchParams]);

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
