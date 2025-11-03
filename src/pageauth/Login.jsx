import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Config from "../Config";
import { Form, Input, Button, Image, Alert, Divider } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "../lib/axios";

const Login = () => {
  const { setToken, getToken } = AuthUser();

  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = location.state?.next || "/";

  // 🔥 URLs dinámicas según entorno
  const API_BASE = import.meta.env.VITE_API_URL || "https://miback-1333.onrender.com";
  const GOOGLE_REDIRECT = `${API_BASE}/api/v1/auth/google/redirect`;
  const MICROSOFT_REDIRECT = `${API_BASE}/api/v1/auth/microsoft/redirect`;

  useEffect(() => {
    if (getToken()) {
      navigate(nextPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage("");
    setStatus(null);

    try {
      // 🔥 Login directo con tokens (sin CSRF cookie necesario)
      const resp = await Config.getLogin({ email, password });
      const res = resp?.data || {};

      console.log("📡 Respuesta del servidor:", res);

      if (res.success) {
        setStatus("success");
        setMessage(res.message || "Logueado correctamente");

        const user = res.user;
        const token = res.token;
        const rol = res.rol || user?.roles?.[0]?.name || "user";

        // 🔥 Guardar usuario + token + rol
        setToken(user, token, rol);

        // ⚡ Configurar axios con token para futuras peticiones
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        console.log("✅ LOGIN EXITOSO");
        console.log("Usuario:", user);
        console.log("Token:", token);
        console.log("Rol:", rol);

        // Redirigir después de 300ms
        setTimeout(() => {
          navigate(nextPath, { replace: true });
        }, 300);

      } else {
        setStatus("danger");
        setMessage(res.message || "Correo o contraseña incorrectos");
      }

    } catch (err) {
      console.error("❌ Error en login:", err);
      console.error("Detalles:", err.response?.data);
      
      setStatus("danger");
      
      // Mostrar mensaje de error más específico
      const errorMsg = 
        err.response?.data?.message || 
        err.response?.data?.error ||
        err.message ||
        "Error al iniciar sesión. Verifica tu conexión.";
      
      setMessage(errorMsg);
      
    } finally {
      setLoading(false);
    }
  };

  const isError = status === "danger" && !!message;

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818]">
      {/* Fondo sutil */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-36 -left-24 h-80 w-80 rounded-full bg-[#2CBFF0] opacity-[0.08] blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[#181818] opacity-[0.06] blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Formulario */}
        <section className="flex items-center justify-center px-6 md:px-12 py-10">
          <div className="w-full max-w-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2CBFF0]" />
                <span className="text-xs tracking-wide text-[#181818]/70">
                  Bienvenido de nuevo
                </span>
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
                Login
              </h1>
              <p className="mt-1.5 text-sm text-[#181818]/60">
                Ingresa con tu correo y contraseña, o continúa con Google.
              </p>
            </div>

            <Form
              className="mt-8 flex flex-col gap-5"
              validationBehavior="aria"
              autoComplete="on"
              onSubmit={submitLogin}
            >
              {message && (
                <Alert
                  color={status === "success" ? "success" : "danger"}
                  variant="flat"
                  title={message}
                  className="mb-1"
                />
              )}

              <Input
                type="email"
                name="email"
                label="Email"
                labelPlacement="outside"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                isInvalid={isError}
                errorMessage={isError ? message : undefined}
                autoComplete="email"
                size="md"
                classNames={{
                  inputWrapper:
                    "h-11 bg-content2/60 ring-1 ring-default-200 transition-[box-shadow,transform] focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
              />

              <Input
                type={showPwd ? "text" : "password"}
                name="password"
                label="Password"
                labelPlacement="outside"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                isInvalid={isError}
                errorMessage={isError ? message : undefined}
                autoComplete="current-password"
                size="md"
                classNames={{
                  inputWrapper:
                    "h-11 bg-content2/60 ring-1 ring-default-200 transition-[box-shadow,transform] focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="focus:outline-none"
                  >
                    {showPwd ? (
                      <EyeSlashIcon className="size-5 text-default-500" />
                    ) : (
                      <EyeIcon className="size-5 text-default-500" />
                    )}
                  </button>
                }
              />

              <Button
                type="submit"
                radius="md"
                isDisabled={loading}
                isLoading={loading}
                className="h-11 font-semibold tracking-wide text-[#181818] bg-gradient-to-r from-[#2CBFF0] to-[#78dcff] hover:opacity-95"
              >
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </Button>

              <Divider className="my-1" />

              <Button
                as="a"
                href={GOOGLE_REDIRECT}
                variant="flat"
                radius="md"
                className="h-11 w-full font-semibold border border-default-200 bg-white hover:bg-content2 text-[#181818]"
              >
                <span className="inline-flex items-center gap-2">
                  <img
                    alt="Google"
                    src="https://developers.google.com/identity/images/g-logo.png"
                    width="18"
                    height="18"
                    loading="lazy"
                    decoding="async"
                  />
                  Continuar con Google
                </span>
              </Button>

              <Button
                as="a"
                href={MICROSOFT_REDIRECT}
                variant="flat"
                radius="md"
                className="h-11 w-full font-semibold border border-default-200 bg-white hover:bg-content2 text-[#181818]"
              >
                <span className="inline-flex items-center gap-2">
                  <img
                    alt="Microsoft"
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    width="18"
                    height="18"
                    loading="lazy"
                    decoding="async"
                  />
                  Continuar con Microsoft
                </span>
              </Button>

              <div className="text-center text-sm text-foreground-500 mt-2">
                ¿Aún no tienes cuenta?
              </div>
              <Button
                as={Link}
                to="/register"
                variant="flat"
                radius="md"
                className="h-11 font-semibold border border-default-200 text-[#181818] hover:bg-content2"
              >
                Crear cuenta
              </Button>
            </Form>
          </div>
        </section>

        <aside className="relative hidden md:block overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#181818] via-[#252526]/70 to-[#181818]" />
          <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute bottom-12 left-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-[#FEFEFE]/10 blur-2xl" />
          <div className="absolute inset-0 z-10 flex items-end justify-start p-0">
            <div className="w-full flex items-end justify-start p-0 m-0">
              <Image
                removeWrapper
                alt="mi"
                src="MI.png"
                className="block w-full h-full object-contain"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Login;
