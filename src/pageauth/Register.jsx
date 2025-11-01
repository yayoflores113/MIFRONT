import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import { Input, Button, Image } from "@heroui/react";

// ⟵ Base de API para catálogos (actualizado a producción)
const API = import.meta.env.VITE_API_BASE_URL || "https://miback-1333.onrender.com/api";

const Register = () => {
  const { getToken } = AuthUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // ⟵ Nuevos estados (solo agregados)
  const [birthDate, setBirthDate] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [matricula, setMatricula] = useState("");
  const [countryId, setCountryId] = useState("");

  // ⟵ Catálogos y búsqueda local para Universidad
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [queryUni, setQueryUni] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ⟵ Carga de catálogos (nuevo useEffect independiente, no toca el tuyo)
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const [unisRes, ctrsRes] = await Promise.all([
          fetch(`${API}/v1/public/universities/5000`),
          fetch(`${API}/v1/public/countries`),
        ]);
        const [unis, ctrs] = await Promise.all([
          unisRes.json(),
          ctrsRes.json(),
        ]);

        const uniData = (Array.isArray(unis) ? unis : []).map((u) => ({
          id: u?.id ?? u?.ID ?? u?.Id,
          name: u?.name ?? u?.nombre ?? u?.Name,
        }));
        setUniversities(uniData.filter((u) => u.id && u.name));
        setCountries(Array.isArray(ctrs) ? ctrs : []);
      } catch (e) {
        // Silencioso para no alterar tu UX; el form sigue usable
        console.error("No fue posible cargar catálogos", e);
      }
    };
    loadCatalogs();
  }, []);

  // ⟵ Filtro local por nombre de universidad (búsqueda client-side)
  const filteredUniversities = queryUni.trim()
    ? universities.filter((u) =>
        (u.name || "").toLowerCase().includes(queryUni.trim().toLowerCase())
      )
    : universities;

  const submitRegistro = async (e) => {
    e.preventDefault();

    try {
      // 1. Asegurar cookie CSRF
      await ensureSanctum();

      // 2. Hacer registro
      const { data } = await Config.getRegister({
        name,
        email,
        password,
        birth_date: birthDate || null,
        university_id: universityId || null,
        matricula: matricula || null,
        country_id: countryId || null,
      });

      if (data.success) {
        // Si el backend autologa después del registro
        if (data.user && data.rol) {
          const userRol = data.rol || "user";
          setToken(data.user, null, userRol);

          // Navegar según rol
          if (userRol === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } else {
          // Si no autologa, ir a login
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Error en registro:", err);
      // Mostrar mensaje de error al usuario
    }
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
              {/* Nombre completo (ya usabas 'name') */}
              <Input
                type="text"
                name="name"
                label="Nombre completo"
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

              {/* Fecha de nacimiento (nuevo) */}
              <Input
                type="date"
                name="birth_date"
                label="Fecha de nacimiento"
                labelPlacement="outside"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                autoComplete="bday"
                classNames={{
                  inputWrapper:
                    "bg-content2/60 ring-1 ring-default-200 focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
              />

              {/* Email */}
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

              {/* Contraseña */}
              <Input
                type="password"
                name="password"
                label="Contraseña"
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

              {/* Universidad/Campus (nuevo): búsqueda local + dropdown */}
              <div className="flex flex-col gap-2">
                <select
                  name="university_id"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  className="h-11 rounded-medium px-3 ring-1 ring-default-200 focus:outline-none focus:ring-2 focus:ring-[#2CBFF0] bg-white text-sm"
                >
                  <option value="">Selecciona tu universidad</option>
                  {filteredUniversities.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Matrícula (nuevo) */}
              <Input
                type="text"
                name="matricula"
                label="Matrícula"
                labelPlacement="outside"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                maxLength={30}
                placeholder="Ej. A01234567"
                classNames={{
                  inputWrapper:
                    "bg-content2/60 ring-1 ring-default-200 focus-within:ring-2 focus-within:ring-[#2CBFF0]",
                }}
              />

              {/* País/Región (nuevo) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm">País / Región</label>
                <select
                  name="country_id"
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  className="h-11 rounded-medium px-3 ring-1 ring-default-200 focus:outline-none focus:ring-2 focus:ring-[#2CBFF0] bg-white text-sm"
                >
                  <option value="">Selecciona tu país</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.code ? `(${c.code})` : ""}
                    </option>
                  ))}
                </select>
              </div>

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