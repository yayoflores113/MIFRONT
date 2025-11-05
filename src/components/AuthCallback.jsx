import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthUser from './AuthUser';
import axios from '../lib/axios';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = AuthUser();

  useEffect(() => {
    const processAuth = async () => {
      // Obtener parámetros de la URL
      const data = searchParams.get('data');
      const error = searchParams.get('error');
      const provider = searchParams.get('provider');

      console.log('🔍 AuthCallback - Parámetros:', { data: !!data, error, provider });

      // Si hay error
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

      // Si hay data (usuario + token)
      if (data) {
        try {
          // Decodificar data
          const decoded = JSON.parse(atob(data));
          console.log('🔐 Datos OAuth recibidos:', decoded);

          const { token, rol, id, name, email, provider: authProvider, new: isNew } = decoded;

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

          // Guardar token y usuario
          setToken(user, token, rol || 'user');

          // Configurar axios con el token para futuras peticiones
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          console.log('✅ OAuth exitoso');
          console.log('Usuario:', user);
          console.log('Token:', token);
          console.log('Rol:', rol);
          console.log('Nuevo usuario:', isNew);

          // Mostrar mensaje de bienvenida
          const welcomeMsg = isNew 
            ? `¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`
            : `¡Bienvenido de nuevo ${name}!`;

          // Redirigir al home con mensaje de éxito
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
          navigate('/login', {
            state: {
              message: 'Error procesando la autenticación. Intenta nuevamente.',
              status: 'danger'
            },
            replace: true
          });
        }
      } else {
        // No hay data ni error (no debería pasar)
        console.warn('⚠️ Callback sin data ni error');
        navigate('/login', { replace: true });
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
};

export default AuthCallback;
