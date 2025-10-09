import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const navigate = useNavigate();

  // helper seguro para JSON.parse
  const safeParse = (val, fallback = null) => {
    try {
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  };

  const getToken = () => safeParse(sessionStorage.getItem("token"), null);
  const getUser = () => safeParse(sessionStorage.getItem("user"), null);
  const getRol = () => safeParse(sessionStorage.getItem("rol"), null);

  // estados con inicializadores perezosos
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());
  const [rol, setRol] = useState(() => getRol());

  const saveToken = (userValue, tokenValue, rolValue) => {
    // persiste primero
    sessionStorage.setItem("user", JSON.stringify(userValue));
    sessionStorage.setItem("token", JSON.stringify(tokenValue));
    sessionStorage.setItem("rol", JSON.stringify(rolValue));

    // luego sincroniza estado local
    setUser(userValue);
    setToken(tokenValue);
    setRol(rolValue);

    // navegación según rol (misma lógica: admin | user)
    if (rolValue === "admin") navigate("/admin");
    if (rolValue === "user") navigate("/user");
  };

  const getLogout = () => {
    sessionStorage.clear();
    navigate("/");
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
