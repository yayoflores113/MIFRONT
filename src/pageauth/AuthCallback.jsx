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

        // 2. Verificar que la autenticación fue exitosa
        const success = searchParams.get("success");
        if (!success) {
          console.error("No se confirmó la autenticación");
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        // 3. Asegurar cookie CSRF (la sesión ya debería estar establecida)
        await ensureSanctum();

        // 4. Obtener datos del usuario desde el backend
        const resp = await Config.getMe();
        const data = resp?.data || {};

        if (!data.success || !data.user) {
          console.error("No se pudo obtener datos del usuario");
          setStatus("error");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          return;
        }

        // 5. Extraer usuario y rol
        const user = data.user;
        const rol = data.user.rol || user.roles?.[0]?.name || "user";

        console.log("Usuario autenticado:", user);
        console.log("Rol asignado:", rol);

        // 6. Guardar en sessionStorage
        setToken(user, null, rol);

        setStatus("success");

        // 7. Redirigir según rol
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
