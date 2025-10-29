import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Image,
  Spinner,
  Skeleton,
} from "@heroui/react";
import {
  MapPinIcon,
  ArrowLeftIcon,
  LinkIcon,
  AcademicCapIcon,
  BookOpenIcon,
  TagIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Config from "../Config";

// === Helper de imagen (mismo criterio que usas en Universities.jsx) ===
// Acepta base64 o URL absoluta. Si viene nombre de archivo, arma /img/universidades/<archivo>
// e intenta inferir el origen backend desde axios.baseURL o VITE_BACKEND_URL.
const logoImgSrc = (val) => {
  if (!val) return "";
  const v = String(val).trim();

  // Si es base64 o URL absoluta, usarla tal cual
  if (v.startsWith("data:image")) return v;
  if (/^https?:\/\//i.test(v)) return v;

  // Obtener el origen del backend
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const origin = backendUrl.replace(/\/$/, ""); // Quitar "/" final si existe

  // Construir la URL completa
  return `${origin}/img/universidades/${v}`;
};

const Universitie = () => {
  const { slug } = useParams(); // viene de /universities/:slug
  const navigate = useNavigate();

  const [detail, setDetail] = React.useState(null); // { universities, careers, courses }
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await Config.getUniversityBySlug(slug);
        if (!active) return;
        setDetail(data);
      } catch (e) {
        console.error("Universitie fetch error:", e);
        if (!active) return;
        setError("No se pudo cargar la universidad.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const u = detail?.university;

  // === Favoritos (agregado sin alterar tu estructura) ===
  const [isFav, setIsFav] = React.useState(false);
  const uniId = u?.id != null ? Number(u.id) : null;

  React.useEffect(() => {
    let active = true;
    if (!uniId) return;
    (async () => {
      try {
        const res = await Config.getFavorites?.("university");
        const data = Array.isArray(res?.data) ? res.data : [];
        const ids = new Set(
          data.map((x) => Number(x?.item?.id)).filter(Number.isFinite)
        );
        if (active) setIsFav(ids.has(uniId));
      } catch (e) {
        console.debug("No se pudo leer favoritos:", e?.message ?? e);
      }
    })();
    return () => {
      active = false;
    };
  }, [uniId]);

  const toggleFav = async () => {
    if (!uniId) return;
    try {
      await Config.toggleFavorite?.({
        favoritable_type: "university",
        favoritable_id: uniId,
      });
      setIsFav((v) => !v);
    } catch (e) {
      console.error("Error al alternar favorito:", e?.message ?? e);
    }
  };
  // === /Favoritos ===

  // Variantes para animaciones (solo UI)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full py-10 px-4 bg-[#FEFEFE]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="light"
            startContent={<ArrowLeftIcon className="w-4" />}
            onPress={() => navigate(-1)}
          >
            Regresar
          </Button>
          <Link to="/universities">
            <Button variant="flat">Ver todas</Button>
          </Link>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3 rounded-lg" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        )}

        {!loading && error && <p className="text-warning">{error}</p>}

        {!loading && !error && u && (
          <>
            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <div className="relative h-44 bg-default-100 rounded-2xl overflow-hidden flex items-center justify-center">
                  {u.logo_url ? (
                    <Image
                      alt={`${u.name} logo`}
                      src={logoImgSrc(u.logo_url)}
                      fallbackSrc="/img/universidades/placeholder.png"
                      radius="none"
                      shadow="none"
                      classNames={{
                        wrapper:
                          "w-full h-full flex items-center justify-center",
                        img: "max-h-full max-w-full object-contain p-6",
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-default-400">
                      <AcademicCapIcon className="w-10 mb-2" />
                      <span className="text-sm">Sin logo</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {u.name}
                </h1>
                {u.acronym && (
                  <Chip size="sm" className="bg-[#2CBFF0] text-white mb-3">
                    {u.acronym}
                  </Chip>
                )}

                <div className="flex items-center gap-2 text-default-600 mb-3">
                  <MapPinIcon className="w-4" />
                  <span>
                    {u.city ? `${u.city}, ` : ""}
                    {u.state ? `${u.state}, ` : ""}
                    {u.country || ""}
                  </span>
                </div>

                {u.description && (
                  <p className="text-default-700 mb-4">{u.description}</p>
                )}

                {/* Acciones: Sitio oficial + Favorito */}
                <div className="flex items-center gap-2">
                  {u.website && (
                    <a
                      href={
                        u.website.startsWith("http")
                          ? u.website
                          : `https://${u.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="light"
                        startContent={<LinkIcon className="w-4" />}
                        className="text-[#2CBFF0]"
                      >
                        Sitio oficial
                      </Button>
                    </a>
                  )}

                  <Button
                    variant="light"
                    onPress={toggleFav}
                    startContent={
                      isFav ? (
                        <StarSolid className="w-4 text-yellow-500" />
                      ) : (
                        <StarOutline className="w-4" />
                      )
                    }
                  >
                    {isFav ? "En favoritos" : "Guardar"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Carreras */}
            {Array.isArray(detail.careers) && detail.careers.length > 0 && (
              <div className="mb-10">
                {/* Header estilo nuevo */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">Carreras</h2>
                    <Chip size="sm" variant="flat" className="bg-gray-100">
                      {detail.careers.length}
                    </Chip>
                  </div>
                </div>

                {/* Contenedor animado + card blanca */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {detail.careers.map((c) => (
                      <motion.div
                        key={c.id}
                        variants={itemVariants}
                        className="flex"
                      >
                        {/* Ícono circular */}
                        <div className="flex-shrink-0 mr-4 mt-1">
                          <div className="w-10 h-10 rounded-full bg-[#2CBFF0]/10 flex items-center justify-center">
                            <BookOpenIcon className="h-5 w-5 text-[#2CBFF0]" />
                          </div>
                        </div>

                        {/* Contenido */}
                        <div className="flex-grow">
                          <h3 className="font-semibold text-medium mb-2 line-clamp-1">
                            {c.name}
                          </h3>

                          {/* Área */}
                          {c.area && (
                            <div className="flex items-center text-default-500 mb-2">
                              <TagIcon className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-sm line-clamp-1">
                                {c.area}
                              </span>
                            </div>
                          )}

                          {/* Niveles (si existen) / fallback a level */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {Array.isArray(c.levels) && c.levels.length > 0
                              ? c.levels.map((level, idx) => (
                                  <Chip
                                    key={idx}
                                    size="sm"
                                    variant="flat"
                                    className="bg-[#2CBFF0]/10 text-[#2CBFF0] text-xs"
                                  >
                                    {level}
                                  </Chip>
                                ))
                              : c.level && (
                                  <Chip
                                    size="sm"
                                    variant="flat"
                                    className="bg-[#2CBFF0]/10 text-[#2CBFF0] text-xs"
                                  >
                                    {c.level}
                                  </Chip>
                                )}
                          </div>

                          {/* Botón -> mantiene tu Link y ruta */}
                          <Link to={`/careers/${c.slug}`}>
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              className="px-3"
                              endContent={
                                <ArrowRightIcon className="h-3.5 w-3.5" />
                              }
                            >
                              Ver detalle
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Cursos destacados */}
            {Array.isArray(detail.courses) && detail.courses.length > 0 && (
              <div className="mb-6">
                {/* Header con conteo */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">Cursos</h2>
                    <Chip size="sm" variant="flat" className="bg-gray-100">
                      {detail.courses.length}
                    </Chip>
                  </div>
                </div>

                {/* Contenedor animado + card blanca */}
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {detail.courses.map((course) => (
                      <motion.div key={course.id} variants={itemVariants}>
                        {/* Mantengo tu Card isPressable + onPress con navigate */}
                        <Card
                          isPressable
                          onPress={() => navigate(`/courses/${course.slug}`)}
                          className="border border-default-200 hover:shadow-md transition-all group cursor-pointer"
                        >
                          <CardBody className="p-4">
                            <div className="flex">
                              {/* Ícono circular */}
                              <div className="flex-shrink-0 mr-4 mt-1">
                                <div className="w-10 h-10 rounded-full bg-[#2CBFF0]/10 flex items-center justify-center group-hover:bg-[#2CBFF0]/20 transition-all duration-200">
                                  <BookOpenIcon className="h-5 w-5 text-[#2CBFF0]" />
                                </div>
                              </div>

                              {/* Contenido */}
                              <div className="flex-grow">
                                <h3 className="font-semibold text-medium mb-2 group-hover:text-[#2CBFF0] transition-colors duration-200 line-clamp-1">
                                  {course.title}
                                </h3>

                                {/* Provider */}
                                <div className="flex items-center text-default-500 mb-2">
                                  <BookmarkIcon className="h-3.5 w-3.5 mr-1.5" />
                                  <span className="text-sm">
                                    {course.provider || "Curso propio"}
                                  </span>
                                </div>

                                {/* Duración (si existe) */}
                                {course.duration && (
                                  <div className="flex items-center text-default-500 mb-3">
                                    <ClockIcon className="h-3.5 w-3.5 mr-1.5" />
                                    <span className="text-sm">
                                      {course.duration}
                                    </span>
                                  </div>
                                )}

                                {/* Tags (si existen) */}
                                <div className="flex flex-wrap gap-2">
                                  {Array.isArray(course.tags) &&
                                    course.tags.map((tag, idx) => (
                                      <Chip
                                        key={idx}
                                        size="sm"
                                        variant="flat"
                                        className="bg-gray-100 text-xs"
                                      >
                                        {tag}
                                      </Chip>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </>
        )}

        {/* Cargando inicial mínimo */}
        {loading && !detail && (
          <div className="flex items-center gap-2 text-default-500 mt-6">
            <Spinner size="sm" /> Cargando…
          </div>
        )}
      </div>
    </section>
  );
};

export default Universitie;
