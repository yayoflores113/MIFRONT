import React, { useMemo, useCallback, useState } from "react";
import { Button, Card, CardBody, Avatar } from "@heroui/react";
import {
  CodeBracketIcon,
  ChartBarIcon,
  BriefcaseIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Config from "../Config";
/* ----------------------- Datos para categorías (sin cambios) ----------------------- */

const categories = [
  {
    id: 1,
    name: "Web Development",
    icon: CodeBracketIcon,
    courses: 1240,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    name: "Data Science",
    icon: ChartBarIcon,
    courses: 840,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 3,
    name: "Business",
    icon: BriefcaseIcon,
    courses: 1120,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: 4,
    name: "Design",
    icon: PaintBrushIcon,
    courses: 940,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 5,
    name: "Marketing",
    icon: MegaphoneIcon,
    courses: 650,
    color: "bg-green-50 text-green-600",
  },
  {
    id: 6,
    name: "Personal Development",
    icon: AcademicCapIcon,
    courses: 780,
    color: "bg-orange-50 text-orange-600",
  },
];

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  // --- CTA mejorado: sesión -> test activo -> runner/listado; sin sesión -> login ---
  const handleStartTest = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      await Config.getMe(); // 200 si hay sesión

      // Intenta ir directo al test activo si existe
      try {
        const res = await Config.getActiveTests();
        const active = res?.data?.data;
        if (active?.slug) {
          navigate(`/tests/${active.slug}`);
        } else {
          navigate("/tests");
        }
      } catch {
        // Si el endpoint de activo no existe o falla, cae al listado
        navigate("/tests");
      }
    } catch {
      // No hay sesión: vamos a login y luego volvemos a /tests
      navigate("/login", { state: { next: "/tests" }, replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate, loading]);

  const container = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    []
  );

  const media = useMemo(
    () => ({
      hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
      show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [shouldReduceMotion]
  );

  return (
    <>
      <style>{`
        @keyframes floatY { 0%{ transform: translateY(0) } 50%{ transform: translateY(-10px) } 100%{ transform: translateY(0) } }
        .animate-float { animation: floatY 6s ease-in-out infinite; }
      `}</style>

      {/* --------------------------- Hero (Test Vocacional) --------------------------- */}
      <section className="bg-[#FEFEFE] text-[#181818] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto y CTA */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={container}
              className="flex flex-col gap-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Descubre tu camino con nuestro{" "}
                <span className="bg-gradient-to-r from-[#2CBFF0] to-[#2CBFF0] bg-clip-text text-transparent">
                  Test Vocacional
                </span>
              </h1>

              <p className="text-lg md:text-xl opacity-80 max-w-lg">
                Responde unas preguntas y descubre tu carrera ideal. Recibe
                recomendaciones personalizadas de cursos y universidades que se
                adapten a ti.
              </p>

              <div className="mt-4">
                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.03 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg font-medium shadow-lg transition-all duration-200
                 bg-[#2CBFF0] text-white hover:opacity-95 hover:shadow-[0_10px_25px_rgba(44,191,240,0.35)]"
                    endContent={
                      !loading ? (
                        <ArrowRightIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      ) : null
                    }
                    onPress={handleStartTest}
                    isLoading={loading}
                    isDisabled={loading}
                    aria-busy={loading}
                    aria-label="Hacer el test ahora"
                  >
                    {loading ? "Preparando tu test..." : "Hacer el test ahora"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={media}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="animate-float">
                  <img
                    src="https://img.heroui.chat/image/ai?w=500&h=500&u=vocational_test"
                    alt="Exploración vocacional"
                    className="rounded-2xl shadow-xl max-w-full h-auto"
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                </div>

                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="bg-[#2CBFF0]/10 p-2 rounded-lg">
                    <LightBulbIcon
                      className="w-5 h-5 text-[#2CBFF0]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm font-medium">¡Descubre tu potencial!</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --------------------- Sección: Categorías (tu contenido original) --------------------- */}
      <section className="w-full bg-default-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Explorar las categorías</h2>
            <p className="mx-auto max-w-2xl text-default-600">
              Explora nuestras categorías de cursos y encuentra el camino
              adecuado para tu carrera.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const IconComp = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card
                    isPressable
                    isHoverable
                    className="border border-default-200 shadow-sm"
                  >
                    <CardBody className="flex flex-row items-center gap-4 p-6">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color}`}
                        aria-hidden="true"
                      >
                        <IconComp className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {category.name}
                        </h3>
                        <p className="text-sm text-default-500">
                          {category.courses} courses
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- Sección: Testimonios (tu contenido original) --------------------- */}
      <section className="w-full bg-gradient-to-b from-white to-default-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Lo que dicen los estudiantes
            </h2>
            <p className="mx-auto max-w-2xl text-default-600">
              Únase a miles de estudiantes satisfechos que han utilizado "MI"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                id: 1,
                name: "Marta",
                role: "El master de los masters",
                company: "en la UTM",
                avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=1",
                content:
                  "Esta pagina me ha dejado sin palabras, la calidad de los cursos es impresionante y los instructores son expertos en sus campos. Gracias a MI, he podido avanzar en mi carrera y adquirir nuevas habilidades que me han abierto muchas puertas. ¡Altamente recomendado!",
              },
              {
                id: 2,
                name: "Flor",
                role: "UX Designer",
                company: "Googlesss",
                avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=2",
                content:
                  "El curso de UX/UI fue justo lo que necesitaba para cambiarme a tech. Los proyectos fueron retadores y el feedback de los instructores fue invaluable. ¡Súper recomendado!",
              },
              {
                id: 3,
                name: "Raul",
                role: "Data Scientist",
                company: "Microsoft",
                avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=3",
                content:
                  "He probado muchas plataformas, pero MI destaca por su plan de estudios estructurado y comunidad de apoyo. La ruta de Data Science me preparó para retos reales del día a día.",
              },
            ].map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border border-default-200 shadow-sm">
                  <CardBody className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar src={t.avatar} size="lg" />
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-default-500">
                          {t.role} at {t.company}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <ChatBubbleLeftRightIcon
                        className="h-8 w-8 text-[#2CBFF0] opacity-30"
                        aria-hidden="true"
                      />
                    </div>

                    <p className="italic text-default-700">"{t.content}"</p>

                    <div className="mt-4 flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon
                          key={i}
                          className="h-4 w-4 text-amber-500"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
