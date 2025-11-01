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
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Config from "../Config";
import axios from "axios";

// BACKEND URL: usar variable de entorno con fallback a localhost
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// Construye la URL del logo
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
  const { slug } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isFav, setIsFav] = React.useState(false);

  const u = detail?.university;
  const uniId = u?.id != null ? Number(u.id) : null;

  // Cargar datos de la universidad
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
    return () => { active = false; };
  }, [slug]);

  // Cargar estado de favorito
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
    return () => { active = false; };
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

  // Enviar notificación (opcional)
  const handleSendNotification = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        alert("No estás autenticado. Por favor inicia sesión.");
        navigate("/login");
        return;
      }

      await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, { withCredentials: true });

      await axios.post(
        `${BACKEND_URL}/api/notificaciones/send`,
        { mensaje: `${u?.name || "Una universidad"} fue visitada.` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      window.open(u?.website || "https://www.utmerida.edu.mx/", "_blank");

    } catch (error) {
      console.error("Error enviando notificación:", error);
      if (error.response?.status === 401) {
        alert("Sesión expirada. Por favor inicia sesión nuevamente.");
        localStorage.removeItem("auth_token");
        navigate("/login");
      } else if (error.response?.status === 422) {
        alert("Datos inválidos. Verifica el mensaje.");
      } else {
        alert("Error al enviar la notificación. Intenta nuevamente.");
      }
    }
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
                        wrapper: "w-full h-full flex items-center justify-center",
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{u.name}</h1>
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

                {u.description && <p className="text-default-700 mb-4">{u.description}</p>}

                {/* Acciones: Sitio oficial + Favorito */}
                <div className="flex items-center gap-2">
                  {u.website && (
                    <a
                      href={u.website.startsWith("http") ? u.website : `https://${u.website}`}
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
                      isFav ? <StarSolid className="w-4 text-yellow-500" /> : <StarOutline className="w-4" />
                    }
                  >
                    {isFav ? "En favoritos" : "Guardar"}
                  </Button>
                </div>
              </div>
            </div>
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

export default Universitie;
