import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { useNavigate, Link, useLocation } from "react-router-dom"; // <-- añadido useLocation
import Config from "../Config";
import { Form, Input, Button, Image, Alert, Divider } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ensureSanctum } from "../lib/axios";

const Login = () => {
  const { setToken, getToken } = AuthUser();

  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'danger' | null
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // <-- para leer state.next
  const nextPath = location.state?.next || "/";

  useEffect(() => {
    if (getToken()) navigate(nextPath); // <-- respeta retorno si ya hay sesión
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // 1. Obtener cookie CSRF
      await ensureSanctum();

      // 2. Hacer login
      const resp = await Config.getLogin({ email, password });
      const res = resp?.data || {};

      if (res.success) {
        setStatus("success");
        setMessage(res.message || "Logueado");

        setTimeout(() => {
          // Obtener rol de la respuesta (ahora viene en res.rol)
          const userRol = res.rol || "user";

          // Guardar con token = null (es el segundo parámetro)
          setToken(res.user, null, userRol);

          // Navegar según el rol
          if (userRol === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate(nextPath, { replace: true });
          }
        }, 600);
      } else {
        setStatus("danger");
        setMessage(res.message || "Correo o contraseña incorrectos");
      }
    } catch (err) {
      setStatus("danger");
      setMessage("Ocurrió un error al iniciar sesión.");
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

  const isError = status === "danger" && !!message;
  const GOOGLE_REDIRECT =
    "https://miback-1333.onrender.com/api/v1/auth/google/callback";
  const MICROSOFT_REDIRECT =
    "https://miback-1333.onrender.com/api/v1/auth/microsoft/callback";

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818]">
      {/* Fondo sutil */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-36 -left-24 h-80 w-80 rounded-full bg-[#2CBFF0] opacity-[0.08] blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[#181818] opacity-[0.06] blur-3xl" />
      </div>

      {/* Layout 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* IZQUIERDA: formulario (centrado) */}
        <section className="flex items-center justify-center px-6 md:px-12 py-10">
          <div className="w-full max-w-sm">
            {/* Encabezado */}
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

            {/* Form (HeroUI) */}
            <Form
              className="mt-8 flex flex-col gap-5"
              validationBehavior="aria"
              autoComplete="on"
              onSubmit={submitLogin}
            >
              {/* Mensaje contextual */}
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
                    aria-label={
                      showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
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

              {/* Botón Google */}
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

              {/* Botón Microsoft */}
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

        {/* DERECHA: imagen/hero */}
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
