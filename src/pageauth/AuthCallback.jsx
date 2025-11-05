import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthUser from "./AuthUser";
import axios from "../lib/axios";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = AuthUser();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFEFE]">
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
      </div>
    </div>
  );
}
