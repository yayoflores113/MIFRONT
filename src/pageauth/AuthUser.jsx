import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  // SOLO guardamos user y rol (NO token)
  const getUser = () => safeParse(sessionStorage.getItem("user"), null);
  const getRol = () => sessionStorage.getItem("rol") || null;

  // Estados con inicializadores perezosos
  const [user, setUser] = useState(() => getUser());
  const [rol, setRol] = useState(() => getRol());

  // setToken ahora solo recibe (user, token=null, rol)
  // El token siempre será null porque usamos Sanctum stateful
  const saveToken = (userValue, tokenValue, rolValue) => {
    // Persistir solo user y rol
    sessionStorage.setItem("user", JSON.stringify(userValue));
    sessionStorage.setItem("rol", rolValue);

    // NO guardar token en ningún lado
    // Las cookies (miapi_session y XSRF-TOKEN) manejan la autenticación

    // Sincronizar estado local
    setUser(userValue);
    setRol(rolValue);

    // Navegación según rol
    if (rolValue === "admin") {
      navigate("/admin");
    } else if (rolValue === "user") {
      navigate("/user");
    } else {
      navigate("/");
    }
  };

  const getLogout = () => {
    sessionStorage.clear();
    // NO limpiar localStorage aquí (no lo usamos)
    navigate("/");
  };

  // getToken ahora verifica si hay usuario autenticado (no token)
  const getToken = () => {
    // En Sanctum stateful, "estar autenticado" = tener user guardado
    return getUser() ? true : null;
  };

  return {
    setToken: saveToken,
    token: getToken(), // Devuelve true/null según si hay sesión
    user,
    rol,
    getToken,
    getRol,
    getUser,
    getLogout,
  };
};

export default AuthUser;
