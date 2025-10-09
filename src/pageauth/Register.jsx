import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { Input, Button, Image } from "@heroui/react";

const Register = () => {
  const { getToken } = AuthUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitRegistro = async (e) => {
    e.preventDefault();

    Config.getRegister({ name, email, password }).then(({ data }) => {
      if (data.success) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-[#FEFEFE] text-[#181818]">
      {/* halos sutiles de fondo (igual que en Login) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-36 -left-24 h-80 w-80 rounded-full bg-[#2CBFF0] opacity-[0.08] blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[#181818] opacity-[0.06] blur-3xl" />
      </div>

      {/* Split fullscreen */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* IZQUIERDA: FORM visualmente igual al login */}
        <section className="flex items-center justify-center px-6 md:px-12">
          <div className="w-full max-w-sm">
            {/* encabezado */}
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2CBFF0]" />
                <span className="text-xs tracking-wide text-[#181818]/70">
                  Crea tu cuenta
                </span>
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold">Registro</h1>
              <p className="mt-1.5 text-sm text-[#181818]/60">
                Completa los campos para registrarte.
              </p>
            </div>

            {/* Mantengo tu estructura: inputs controlados y botón con onClick */}
            <form
              className="mt-8 flex flex-col gap-5"
              onSubmit={submitRegistro}
            >
              <Input
                type="text"
                name="name"
                label="Nombre"
                labelPlacement="outside"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
                autoComplete="name"
                classNames={{
                  inputWrapper:
                    "bg-content2/60 ring-1 ring-default-200 focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
              />

              <Input
                type="email"
                name="email"
                label="Email"
                labelPlacement="outside"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                autoComplete="email"
                classNames={{
                  inputWrapper:
                    "bg-content2/60 ring-1 ring-default-200 focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
              />

              <Input
                type="password"
                name="password"
                label="Password"
                labelPlacement="outside"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                autoComplete="new-password"
                classNames={{
                  inputWrapper:
                    "bg-content2/60 ring-1 ring-default-200 focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
              />

              <Button
                type="submit"
                radius="md"
                className="h-11 font-semibold tracking-wide text-[#181818] bg-gradient-to-r from-[#2CBFF0] to-[#78dcff] hover:opacity-95"
                onClick={submitRegistro}
              >
                Crear cuenta
              </Button>

              <p className="text-center text-xs text-[#181818]/60">
                Al registrarte aceptas nuestros{" "}
                <a href="#" className="underline">
                  Términos y condiciones
                </a>
                .
              </p>

              <div className="text-center text-sm text-foreground-500">
                ¿Ya tienes cuenta?
              </div>
              <Button
                as="a"
                href="/login"
                variant="flat"
                radius="md"
                className="h-11 font-semibold border border-default-200 text-[#181818] hover:bg-content2"
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
        </section>

        {/* DERECHA: HERO como en Login */}
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
                className="block"
                disableAnimation // ⟵ quita el fade-in
                disableSkeleton // ⟵ quita el efecto de carga
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Register;
