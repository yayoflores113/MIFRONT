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
  ArrowLeftIcon,
  LinkIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Config from "../Config";
import axios from "../lib/axios";

/** Helper de imagen (mismo criterio que tu catálogo de cursos)
 * - base64 o URL absoluta → se usa tal cual
 * - nombre de archivo → construye `${backend}/img/cursos/<archivo>`
 */

const courseImgSrc = (val) => {
  if (!val) return "";
  const v = String(val).trim();

  if (v.startsWith("data:image")) return v;
  if (/^https?:\/\//i.test(v)) return v;

  // Obtener el origen del backend
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const origin = backendUrl.replace(/\/$/, ""); // Quitar "/" final si existe

  // Construir la URL completa
  return `${origin}/img/cursos/${v}`;
};

const centsToCurrency = (cents, locale = "es-MX", currency = "MXN") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    (Number(cents) || 0) / 100
  );

const Course = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [loadingCheckout, setLoadingCheckout] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await Config.getCourseBySlug(slug);
        if (!active) return;
        setDetail(data);
      } catch (e) {
        console.error("Course fetch error:", e);
        if (!active) return;
        setError("No se pudo cargar el curso.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const c = detail?.course;
  const related = detail?.related || [];
  const career = c?.career;
  const university = c?.career?.university;

  // handler stripe
  const apiOrigin = () => {
    const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
    const fromAxiosOrigin = axiosBase
      ? axiosBase.replace(/\/api\/?.*$/i, "")
      : "";
    const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
    const backendOrigin = (fromAxiosOrigin || fromEnv || "").replace(/\/$/, "");
    return backendOrigin || "";
  };

  const handleBuyCourse = async () => {
    if (!detail?.course) return;

    try {
      setLoadingCheckout(true);

      // Ya no se necesita asegurar CSRF manualmente, axios maneja el token automáticamente
      const slug = detail.course.slug;
      const frontendUrl = window.location.origin;

      const body = {
        mode: "payment",
        amount_cents: Number(detail.course.price_cents || 0),
        currency: (detail.course.currency || "MXN").toUpperCase(),
        product_name: detail.course.title || "Curso",
        success_url: `${frontendUrl}/courses/${slug}?status=success`,
        cancel_url: `${frontendUrl}/courses/${slug}?status=cancel`,
        metadata: {
          kind: "course",
          course_id: detail.course.id,
          course_slug: slug,
        },
      };

      const { data } = await axios.post("/api/v1/checkout", body);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe checkout error:", data);
        alert("No se pudo iniciar el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en handleBuyCourse:", error);
      alert(
        "Ocurrió un error al procesar el pago. Por favor, intenta de nuevo."
      );
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <section className="w-full py-10 px-4 bg-[#FEFEFE]">
      <div className="max-w-6xl mx-auto">
        {/* Acciones */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="light"
            startContent={<ArrowLeftIcon className="w-4" />}
            onPress={() => navigate(-1)}
          >
            Regresar
          </Button>
          <Link to="/courses">
            <Button variant="flat">Ver todos</Button>
          </Link>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3 rounded-lg" />
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        )}
        {!loading && error && <p className="text-warning">{error}</p>}

        {/* Contenido */}
        {!loading && !error && c && (
          <>
            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <div className="relative h-44 bg-default-100 rounded-2xl overflow-hidden flex items-center justify-center">
                  {c.card_image_url ? (
                    <Image
                      alt={`${c.title} cover`}
                      src={courseImgSrc(c.card_image_url)}
                      fallbackSrc="/img/cursos/placeholder.png"
                      radius="none"
                      shadow="none"
                      classNames={{
                        wrapper:
                          "w-full h-full flex items-center justify-center",
                        img: "w-full h-full object-cover",
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-default-400">
                      <AcademicCapIcon className="w-10 mb-2" />
                      <span className="text-sm">Sin imagen</span>
                    </div>
                  )}

                  {(c.is_premium || c.is_free) && (
                    <div className="absolute top-2 right-2">
                      <Chip
                        size="sm"
                        className={
                          c.is_premium
                            ? "bg-[#2CBFF0] text-white"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {c.is_premium ? "Premium" : "Gratis"}
                      </Chip>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{c.title}</h1>

                {/* Metadatos clave */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {c.provider && <Chip variant="flat">{c.provider}</Chip>}
                  {c.topic && <Chip variant="flat">Tema: {c.topic}</Chip>}
                  {c.level && <Chip variant="flat">Nivel: {c.level}</Chip>}
                  {c.difficulty && (
                    <Chip variant="flat">Dificultad: {c.difficulty}</Chip>
                  )}
                  {c.hours != null && <Chip variant="flat">⏱ {c.hours} h</Chip>}
                </div>

                {/* Rating + Precio */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-semibold">
                      {Number(c.rating_avg || 0).toFixed(1)}
                    </span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon
                          key={s}
                          className={`w-4 ${
                            s <= Math.floor(c.rating_avg || 0)
                              ? "text-amber-500"
                              : "text-default-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-default-400 text-xs">
                      ({Number(c.rating_count || 0).toLocaleString()})
                    </span>
                  </div>
                  <Button
                    className="bg-[#2EB86A] text-white"
                    variant="solid"
                    onPress={handleBuyCourse}
                    isLoading={loadingCheckout}
                    isDisabled={loadingCheckout}
                  >
                    {loadingCheckout ? "Procesando..." : "Comprar"}
                  </Button>

                  <div className="text-lg font-bold">
                    {c.is_free ? "Gratis" : centsToCurrency(c.price_cents)}
                  </div>
                </div>

                {c.description && (
                  <p className="text-default-700 mb-4">{c.description}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block"
                    >
                      <Button
                        variant="light"
                        startContent={<LinkIcon className="w-4" />}
                        className="text-[#2CBFF0]"
                      >
                        Ir al proveedor
                      </Button>
                    </a>
                  )}

                  {career && (
                    <Link to={`/careers/${career.slug}`}>
                      <Button
                        variant="flat"
                        startContent={<AcademicCapIcon className="w-4" />}
                      >
                        {career.name}
                      </Button>
                    </Link>
                  )}
                  {university && (
                    <Link to={`/universities/${university.slug}`}>
                      <Button
                        variant="flat"
                        startContent={<BuildingOffice2Icon className="w-4" />}
                      >
                        {university.name || university.acronym}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Relacionados */}
            {Array.isArray(related) && related.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold">Más como este</h2>
                  <span className="text-default-500 text-sm">{related.length}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Card
                      key={r.id}
                      isPressable
                      onPress={() => navigate(`/courses/${r.slug}`)}
                      className="border border-default-200 hover:shadow-md transition-all"
                    >
                      <CardBody className="p-4">
                        <div className="flex gap-3">
                          <div className="w-24 h-16 bg-default-100 rounded-lg overflow-hidden flex items-center justify-center">
                            {r.card_image_url ? (
                              <Image
                                alt={`${r.title} cover`}
                                src={courseImgSrc(r.card_image_url)}
                                fallbackSrc="/img/cursos/placeholder.png"
                                radius="none"
                                shadow="none"
                                classNames={{
                                  wrapper: "w-full h-full",
                                  img: "w-full h-full object-cover",
                                }}
                              />
                            ) : (
                              <AcademicCapIcon className="w-8 text-default-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold line-clamp-2">{r.title}</p>
                            {r.provider && (
                              <p className="text-default-500 text-xs">{r.provider}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-amber-500 text-xs font-semibold">
                                {Number(r.rating_avg || 0).toFixed(1)}
                              </span>
                              <span className="text-default-400 text-xs">
                                ({Number(r.rating_count || 0).toLocaleString()})
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {loading && !detail && (
          <div className="flex items-center gap-2 text-default-500 mt-6">
            <Spinner size="sm" /> Cargando…
          </div>
        )}
      </div>
    </section>
  );
};

export default Course;
