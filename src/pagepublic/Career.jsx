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
  BuildingOffice2Icon,
  LinkIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Config from "../Config";

/** Helper de imagen para "career_url"
 * - Si es base64 o URL absoluta: la usa tal cual
 * - Si es solo nombre de archivo: arma /img/carreras/<archivo> con origen del backend
 */
const careerImgSrc = (val) => {
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
  return `${origin}/img/carreras/${v}`;
};

const prettyTerms = (arr, unit) => {
  if (!Array.isArray(arr) || !arr.length) return null;
  // arr: [{ level: "TSU", terms: 6 }, { level: "Licenciatura", terms: 5 }]
  const unitTxt = unit || "términos";
  return arr
    .map((x) => (x?.level ? `${x.level}: ${x?.terms ?? "?"} ${unitTxt}` : null))
    .filter(Boolean)
    .join(" · ");
};

const Career = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = React.useState(null); // { career, university, courses }
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await Config.getCareerBySlug(slug);
        if (!active) return;
        setDetail(data);
      } catch (e) {
        console.error("Career fetch error:", e);
        if (!active) return;
        setError("No se pudo cargar la carrera.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const c = detail?.career;
  const u = detail?.university;
  const related = detail?.courses || [];

  return (
    <section className="w-full py-10 px-4 bg-[#FEFEFE]">
      <div className="max-w-6xl mx-auto">
        {/* Header acciones */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="light"
            startContent={<ArrowLeftIcon className="w-4" />}
            onPress={() => navigate(-1)}
          >
            Regresar
          </Button>
          <Link to="/careers">
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

        {/* Contenido */}
        {!loading && !error && c && (
          <>
            {/* Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <div className="relative h-44 bg-default-100 rounded-2xl overflow-hidden flex items-center justify-center">
                  {c.career_url ? (
                    <Image
                      alt={`${c.name} image`}
                      src={careerImgSrc(c.career_url)}
                      fallbackSrc="/img/carreras/placeholder.png"
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
                      <span className="text-sm">Sin imagen</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {c.name}
                </h1>

                {/* Universidad */}
                <div className="flex items-center gap-3 mb-3">
                  <BuildingOffice2Icon className="w-5 text-default-500" />
                  {u ? (
                    <>
                      <Link to={`/universities/${u.slug}`}>
                        <span className="font-medium hover:underline">
                          {u.name || u.acronym}
                        </span>
                      </Link>
                      {u.acronym && (
                        <Chip size="sm" className="bg-[#2CBFF0] text-white">
                          {u.acronym}
                        </Chip>
                      )}
                    </>
                  ) : (
                    <span className="text-default-500">Universidad</span>
                  )}
                </div>

                {/* Metadatos clave */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.level && <Chip variant="flat">{c.level}</Chip>}
                  {Array.isArray(c.levels) && c.levels.length > 0 && (
                    <Chip variant="flat">Niveles: {c.levels.join(", ")}</Chip>
                  )}
                  {c.area && <Chip variant="flat">Área: {c.area}</Chip>}
                  {c.modality && (
                    <Chip variant="flat">Modalidad: {c.modality}</Chip>
                  )}

                  {/* === NUEVO: División === */}
                  {c.division && (
                    <Chip variant="flat">División: {c.division}</Chip>
                  )}

                  {Array.isArray(c.duration_terms) &&
                    c.duration_terms.length > 0 && (
                      <Chip variant="flat">
                        {prettyTerms(c.duration_terms, c.terms_unit)}
                      </Chip>
                    )}
                </div>

                {c.description && (
                  <p className="text-default-700 mb-4">{c.description}</p>
                )}

                {/* Enlace externo si aplica */}
                {c.career_external_url && (
                  <a
                    href={
                      c.career_external_url.startsWith("http")
                        ? c.career_external_url
                        : `https://${c.career_external_url}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      variant="light"
                      startContent={<LinkIcon className="w-4" />}
                      className="text-[#2CBFF0]"
                    >
                      Ver sitio del programa
                    </Button>
                  </a>
                )}

                {/* === NUEVO: Ir al listado filtrado por división === */}
                {c.division && (
                  <div className="mt-3">
                    <Link
                      to={`/careers?division=${encodeURIComponent(c.division)}`}
                    >
                      <Button variant="flat" className="bg-default-100">
                        Ver más de esta división
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Cursos asociados */}
            {Array.isArray(related) && related.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold">
                    Cursos relacionados
                  </h2>
                  <span className="text-default-500 text-sm">
                    {related.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((course) => (
                    <Card
                      key={course.id}
                      isPressable
                      onPress={() => navigate(`/courses/${course.slug}`)}
                      className="border border-default-200 hover:shadow-md transition-all"
                    >
                      <CardBody className="p-4">
                        <p className="font-semibold line-clamp-1">
                          {course.title}
                        </p>
                        {course.provider && (
                          <p className="text-default-500 text-xs">
                            {course.provider}
                          </p>
                        )}
                        {course.level && (
                          <div className="mt-2">
                            <Chip size="sm" variant="flat">
                              {course.level}
                            </Chip>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Cargando mínimo al inicio */}
        {loading && !detail && (
          <div className="flex items-center gap-2 text-default-500 mt-6">
            <Spinner size="sm" /> Cargando…
          </div>
        )}
      </div>
    </section>
  );
};

export default Career;
