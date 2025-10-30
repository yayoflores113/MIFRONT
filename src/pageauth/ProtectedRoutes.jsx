import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config";

const ProtectedRoutes = () => {
  const { getToken, getUser } = AuthUser();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      // Si no hay user en sessionStorage, no está autenticado
      if (!getUser()) {
        setIsAuthenticated(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Verificar con el backend que la sesión sigue válida
        await Config.getMe();
        setIsAuthenticated(true);
      } catch (err) {
        // Si falla, limpiar sessionStorage
        sessionStorage.clear();
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [getUser]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-[#181818]/70">Verificando sesión...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ next: location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
