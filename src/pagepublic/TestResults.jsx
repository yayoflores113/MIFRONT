import React from "react";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  PencilSquareIcon,
  BriefcaseIcon,
  HomeModernIcon,
  HeartIcon,
  BookOpenIcon,
  AcademicCapIcon,
  LightBulbIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Config from "../Config";

const TestResults = ({
  careers = [],
  courses = [],
  universities = [],
  attemptId = null,
}) => {
  const [recCareers, setRecCareers] = React.useState(careers);
  const [recCourses, setRecCourses] = React.useState(courses);
  const [recUniversities, setRecUniversities] = React.useState(universities);
  const [loading, setLoading] = React.useState(false);

  // Si llega attemptId y falta alguno de los 3 bloques, se completa con la API
  React.useEffect(() => {
    const needsFetch =
      attemptId &&
      (!recCareers?.length || !recCourses?.length || !recUniversities?.length);

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const { data } = await Config.getAttemptRecommendations(attemptId);
        // Esperado del BE:
        // careers: [{ id, name, level, area, modality, duration_terms, terms_unit, career_url, university?: {name, ...} }, ...]
        // courses: [{ title, provider, url, ... }]
        // universities: [{ id, name, acronym, city, state, website, logo_url, ... }]
        if (!recCareers?.length) setRecCareers(data?.careers || []);
        if (!recCourses?.length) setRecCourses(data?.courses || []);
        if (!recUniversities?.length)
          setRecUniversities(data?.universities || []);
      } catch (err) {
        toast.error("No se pudieron cargar las recomendaciones.");
      } finally {
        setLoading(false);
      }
    };

    if (needsFetch) fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="flex flex-col gap-6">
      {/* Carreras */}
      {!!recCareers.length && (
        <section>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">
            Carreras recomendadas
          </h3>
          <motion.ul
            className="flex flex-col gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {recCareers.map((c, idx) => {
              // Acepta string o objeto del BE
              const isObj = c && typeof c === "object";
              const name = isObj ? c.name || "" : String(c);
              const level = isObj ? c.level || null : null;
              const area = isObj ? c.area || null : null;
              const modality = isObj ? c.modality || null : null;
              const termsUnit = isObj ? c.terms_unit || null : null;
              const durationTerms = isObj
                ? Array.isArray(c.duration_terms)
                  ? c.duration_terms
                  : null
                : null;
              const uniName =
                isObj && c.university && c.university.name
                  ? c.university.name
                  : getUniversityFromCareer(name); // fallback para strings "Nombre (UADY)"
              const img = isObj
                ? safeImageUrl(c.career_url, "/img/carreras/")
                : null;

              return (
                <motion.li key={`career-${idx}`} variants={item}>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-medium">
                    <div className="w-8 h-8 rounded-full bg-[#2CBFF0]/10 flex items-center justify-center">
                      {getIconForCareer(name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#181818] break-words">
                        {name}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {uniName ? (
                          <span className="inline-flex items-center gap-1">
                            <AcademicCapIcon className="w-3.5 h-3.5" />{" "}
                            {uniName}
                          </span>
                        ) : null}
                        {level ? <span>• {level}</span> : null}
                        {area ? <span>• {area}</span> : null}
                        {modality ? (
                          <span>• {capitalize(modality)}</span>
                        ) : null}
                        {durationTerms?.length
                          ? durationTerms.map((dt, i) => (
                              <span key={i}>
                                • {dt.level}: {dt.terms}{" "}
                                {termsUnit || "términos"}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>

                    {img ? (
                      <div className="ml-auto w-10 h-10 rounded overflow-hidden bg-white/60 border">
                        {/* imagen opcional de la carrera si la guardas en /public/img/carreras */}
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>
      )}

      {/* Cursos (muestra provider si viene del BE) */}
      {!!recCourses.length && (
        <section>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">
            Cursos sugeridos
          </h3>
          <motion.ul
            className="flex flex-col gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {recCourses.map((course, idx) => {
              const isObj = course && typeof course === "object";
              const title = isObj
                ? course.title || course.name || ""
                : String(course);
              const provider = isObj ? course.provider || "" : "";
              const url = isObj ? course.url : null;

              return (
                <motion.li key={`course-${idx}`} variants={item}>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-medium">
                    <div className="w-8 h-8 rounded-full bg-[#2CBFF0]/10 flex items-center justify-center">
                      <BookOpenIcon className="w-4 h-4 text-[#2CBFF0]" />
                    </div>
                    <div className="min-w-0">
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#181818] hover:underline break-words"
                          title={title}
                        >
                          {title}
                        </a>
                      ) : (
                        <p
                          className="font-medium text-[#181818] break-words"
                          title={title}
                        >
                          {title}
                        </p>
                      )}
                      {provider ? (
                        <p className="text-xs text-slate-500">
                          Proveedor: {provider}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>
      )}

      {/* Universidades */}
      {!!recUniversities.length && (
        <section>
          <h3 className="text-sm font-semibold text-slate-600 mb-2">
            Universidades recomendadas
          </h3>
          <motion.ul
            className="flex flex-col gap-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {recUniversities.map((u, idx) => {
              const isObj = u && typeof u === "object";
              const name = isObj ? u.name || "" : String(u);
              const acronym = isObj ? u.acronym || null : null;
              const city = isObj ? u.city || null : null;
              const state = isObj ? u.state || null : null;
              const website = isObj ? u.website || null : null;
              const logo = isObj
                ? safeImageUrl(u.logo_url, "/img/universidades/")
                : null;

              return (
                <motion.li key={`uni-${idx}`} variants={item}>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-medium">
                    <div className="w-10 h-10 rounded overflow-hidden bg-white/60 border flex items-center justify-center">
                      {logo ? (
                        <img
                          src={logo}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <AcademicCapIcon className="w-5 h-5 text-[#2CBFF0]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#181818] break-words">
                        {name}{" "}
                        {acronym ? (
                          <span className="text-slate-500">({acronym})</span>
                        ) : null}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {city || state ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPinIcon className="w-3.5 h-3.5" />
                            {city ? city : ""}
                            {city && state ? ", " : ""}
                            {state ? state : ""}
                          </span>
                        ) : null}
                        {website ? (
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:underline"
                          >
                            <GlobeAltIcon className="w-3.5 h-3.5" />
                            Sitio web
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>
      )}

      {loading && (
        <p className="text-xs text-slate-500">Cargando recomendaciones…</p>
      )}
    </div>
  );
};

/* === Helpers === */
function getIconForCareer(career) {
  const text = String(career || "").toLowerCase();
  if (
    text.includes("ingeniería") ||
    text.includes("ingenieria") ||
    text.includes("software") ||
    text.includes("computación") ||
    text.includes("computacion")
  ) {
    return <CodeBracketIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  if (text.includes("diseño") || text.includes("diseno")) {
    return <PencilSquareIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  if (text.includes("psicología") || text.includes("psicologia")) {
    return <LightBulbIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  if (
    text.includes("administración") ||
    text.includes("administracion") ||
    text.includes("empresas")
  ) {
    return <BriefcaseIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  if (text.includes("arquitectura")) {
    return <HomeModernIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  if (
    text.includes("medicina") ||
    text.includes("salud") ||
    text.includes("enfermería") ||
    text.includes("enfermeria")
  ) {
    return <HeartIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  if (
    text.includes("literatura") ||
    text.includes("lenguas") ||
    text.includes("historia")
  ) {
    return <BookOpenIcon className="w-4 h-4 text-[#2CBFF0]" />;
  }
  return <AcademicCapIcon className="w-4 h-4 text-[#2CBFF0]" />;
}

function getUniversityFromCareer(career) {
  const match = String(career || "").match(/\(([^)]+)\)/);
  return match ? match[1] : null;
}

function safeImageUrl(value, basePath = "") {
  if (!value) return null;
  const v = String(value);
  // Si el backend guarda sólo el filename (según tus controladores) lo servimos desde /public/img/... (Laravel public/)
  // UniversityController/ CareerController guardan archivo en /img/universidades y /img/carreras, devolviendo el nombre. :contentReference[oaicite:5]{index=5} :contentReference[oaicite:6]{index=6}
  if (/^https?:\/\//i.test(v) || v.startsWith("/")) return v;
  return `${basePath}${v}`;
}

function capitalize(s) {
  return typeof s === "string" && s.length
    ? s.charAt(0).toUpperCase() + s.slice(1)
    : s;
}

export default TestResults;
