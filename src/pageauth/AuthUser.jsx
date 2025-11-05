import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthUser = () => {
  const navigate = useNavigate();

  // Helper seguro para JSON.parse
  const safeParse = (val, fallback = null) => {
    try {
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  };

  // ✅ getToken sin parsear (porque el token es un string simple)
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return token ? token.replace(/^"|"$/g, '') : null; // Quitar comillas si existen
  };

  const getUser = () => safeParse(sessionStorage.getItem("user"), null);
  const getRol = () => sessionStorage.getItem("rol"); // ✅ Sin parsear (es un string)

  // Estados con inicializadores perezosos
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());
  const [rol, setRol] = useState(() => getRol());

  const saveToken = (userValue, tokenValue, rolValue) => {
    // ✅ Guardar correctamente
    sessionStorage.setItem("user", JSON.stringify(userValue)); // User es objeto → JSON
    sessionStorage.setItem("token", tokenValue); // ✅ Token es string → NO usar JSON.stringify
    sessionStorage.setItem("rol", rolValue); // ✅ Rol es string → NO usar JSON.stringify

    // ✅ CRÍTICO: Configurar el header de axios INMEDIATAMENTE
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;

    // Sincronizar estado local
    setUser(userValue);
    setTokenState(tokenValue);
    setRol(rolValue);

    console.log('✅ Token guardado:', tokenValue.substring(0, 20) + '...');
    console.log('✅ Axios configurado con Bearer token');

    // Navegación según rol
    if (rolValue === "admin") {
      navigate("/admin");
    } else if (rolValue === "user") {
      navigate("/user");
    } else {
      navigate("/");
    }
  };

  const getLogout = async () => {
    try {
      // Intentar hacer logout en el backend
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar sesión local de todas formas
      sessionStorage.clear();
      delete axios.defaults.headers.common['Authorization'];
      navigate("/login");
    }
  };

  return {
    setToken: saveToken,
    token,
    user,
    rol,
    getToken,
    getRol,
    getUser,
    getLogout,
  };
};

export default AuthUser;
