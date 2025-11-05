<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Config from "../Config";
import AuthUser from "./AuthUser";
import { ensureSanctum } from "../lib/axios";
=======
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthUser from "./AuthUser";
import axios from "../lib/axios";
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = AuthUser();
<<<<<<< HEAD
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
=======

  useEffect(() => {
    const processAuth = async () => {
      // 1. Obtener parámetros de la URL
      const data = searchParams.get('data'); // Datos codificados en base64
      const error = searchParams.get('error');
      const provider = searchParams.get('provider');

      console.log('🔍 AuthCallback - Parámetros:', { 
        hasData: !!data, 
        error, 
        provider 
      });

      // 2. Si hay error en la autenticación
      if (error) {
        console.error('❌ OAuth error:', error);
        navigate('/login', { 
          state: { 
            message: `Error al autenticarse con ${provider || 'el proveedor'}`,
            status: 'danger'
          },
          replace: true
        });
        return;
      }

      // 3. Si no hay data, redirigir a login
      if (!data) {
        console.warn('⚠️ Callback sin data');
        navigate('/login', { replace: true });
        return;
      }

      // 4. Procesar los datos del OAuth
      try {
        // Decodificar data (viene en base64 desde el backend)
        const decoded = JSON.parse(atob(data));
        console.log('🔐 Datos OAuth recibidos:', decoded);

        const { 
          token, 
          rol, 
          id, 
          name, 
          email, 
          provider: authProvider, 
          new: isNew 
        } = decoded;

        // Validar que venga el token
        if (!token) {
          throw new Error('No se recibió token en la respuesta');
        }

        // Crear objeto user
        const user = { 
          id, 
          name, 
          email,
          provider: authProvider
        };

        // Guardar token y usuario usando tu hook AuthUser
        setToken(user, token, rol || 'user');

        // Configurar axios con el token para futuras peticiones
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        console.log('✅ OAuth exitoso');
        console.log('Usuario:', user);
        console.log('Token:', token);
        console.log('Rol:', rol);
        console.log('Nuevo usuario:', isNew);

        // Mensaje de bienvenida
        const welcomeMsg = isNew 
          ? `¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`
          : `¡Bienvenido de nuevo ${name}!`;

        // Redirigir al home después de un breve delay
        setTimeout(() => {
          navigate('/', { 
            replace: true,
            state: {
              message: welcomeMsg,
              status: 'success'
            }
          });
        }, 500);

      } catch (err) {
        console.error('❌ Error procesando OAuth data:', err);
        console.error('Detalles del error:', err.message);
        
        navigate('/login', {
          state: {
            message: 'Error procesando la autenticación. Intenta nuevamente.',
            status: 'danger'
          },
          replace: true
        });
      }
    };

    processAuth();
  }, [searchParams, navigate, setToken]);
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c

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
<<<<<<< HEAD
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
=======
      <div className="text-center">
        {/* Spinner animado */}
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#2CBFF0] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        
        {/* Texto */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#181818]">
            Procesando autenticación...
          </h2>
          <p className="mt-2 text-sm text-[#181818]/60">
            Espera un momento mientras completamos el proceso
          </p>
        </div>

        {/* Puntos animados */}
        <div className="mt-4 flex justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#2CBFF0] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 rounded-full bg-[#2CBFF0] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 rounded-full bg-[#2CBFF0] animate-bounce"></span>
        </div>
>>>>>>> d0cff049c7d38dcd075dc7a1d189e32065000e9c
      </div>
    </div>
  );
}
