import React from "react";
import {
  Accordion,
  AccordionItem,
  CheckboxGroup,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Spinner,
  Image,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  FunnelIcon,
  LinkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { StarIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Config from "../Config";

const DEFAULT_QUANTITY = 120;
const PAGE_SIZE = 9;

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Helper para obtener el origen de la API
const apiOrigin = () => {
  const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
  const fromAxios = axiosBase ? axiosBase.replace(/\/api\/?.*$/i, "") : "";
  const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
  return fromAxios || fromEnv || "";
};

// helper de: (carpeta /img/cursos)
const courseImgSrc = (val) => {
  if (!val) return "";
  const v = String(val).trim();

  // Si es base64 o URL absoluta, usarla tal cual
  if (v.startsWith("data:image")) return v;
  if (/^https?:\/\//i.test(v)) return v;

  // Obtener el origen del backend
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const origin = backendUrl.replace(/\/$/, "");

  return `${origin}/img/cursos/${v}`;
};

const centsToCurrency = (cents, locale = "es-MX", currency = "MXN") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    (Number(cents) || 0) / 100
  );

const hourBuckets = [
  { key: "0-3", label: "1–3 horas", match: (h) => h >= 0 && h <= 3 },
  { key: "3-6", label: "3–6 horas", match: (h) => h > 3 && h <= 6 },
  { key: "6-17", label: "6–17 horas", match: (h) => h > 6 && h <= 17 },
  { key: "17+", label: "17+ horas", match: (h) => h > 17 },
];

const Courses = () => {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [checkoutLoading, setCheckoutLoading] = React.useState(null);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState("popular");

  const [selectedRatings, setSelectedRatings] = React.useState([]);
  const [selectedLevels, setSelectedLevels] = React.useState([]);
  const [selectedTopics, setSelectedTopics] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState([]);
  const [selectedHours, setSelectedHours] = React.useState([]);
  const [selectedPrice, setSelectedPrice] = React.useState([]);

  const [page, setPage] = React.useState(1);

  const handleCourseCheckout = async (course) => {
    const amountCents = Number(course.price_cents || 0);

    if (amountCents <= 0 || course.is_free) {
      alert(`Este curso no tiene precio válido.`);
      return;
    }

    if (!course.title || !course.slug || !course.id) {
      alert("Información del curso incompleta. Por favor, recarga la página.");
      return;
    }

    setCheckoutLoading(course.id);

    const slug = course.slug;
    const success = `${window.location.origin}/courses/${slug}?status=success`;
    const cancel = `${window.location.origin}/courses?status=cancel`;

    const body = {
      mode: "payment",
      amount_cents: amountCents,
      currency: "MXN",
      product_name: course.title,
      success_url: success,
      cancel_url: cancel,
      metadata: {
        kind: "course",
        course_id: course.id,
        course_slug: slug,
        provider: course.provider || "",
        topic: course.topic || "",
      },
    };

    try {
      const origin = apiOrigin();
      const url = `${origin}/api/v1/checkout`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Servidor retornó ${res.status}: ${text.substring(0, 200)}`);
      }

      if (!res.ok) {
        throw new Error(data?.message || data?.error || `Error ${res.status}`);
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert(`Error: ${data?.message || "No se pudo crear la sesión de pago"}`);
        setCheckoutLoading(null);
      }
    } catch (err) {
      alert(`Error: ${err.message || "No se pudo conectar con el servidor"}`);
      setCheckoutLoading(null);
    }
  };

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await Config.getCourses(DEFAULT_QUANTITY);
        if (!active) return;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setCourses(list);
      } catch (e) {
        if (!active) return;
        setError("No se pudo cargar el catálogo de cursos.");
        setCourses([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const levels = React.useMemo(() => uniq(courses.map((c) => c.level)).sort(), [courses]);
  const topics = React.useMemo(() => uniq(courses.map((c) => c.topic)).sort(), [courses]);
  const providers = React.useMemo(() => uniq(courses.map((c) => c.provider)).sort(), [courses]);
  const difficulties = React.useMemo(() => uniq(courses.map((c) => c.difficulty)).sort(), [courses]);

  const filtered = React.useMemo(() => {
    let res = courses.slice();

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter((c) =>
        [c.title, c.description, c.provider, c.topic, c.slug]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (selectedRatings.length) {
      res = res.filter((c) => {
        const val = Number(c.rating_avg || 0);
        return selectedRatings.some((r) => {
          const [min, max] = r.split("-").map(Number);
          return val >= (isNaN(min) ? 0 : min) && val <= (isNaN(max) ? 5 : max);
        });
      });
    }

    if (selectedLevels.length) res = res.filter((c) => selectedLevels.includes(c.level));
    if (selectedTopics.length) res = res.filter((c) => selectedTopics.includes(c.topic));
    if (selectedProvider.length) res = res.filter((c) => selectedProvider.includes(c.provider));
    if (selectedDifficulty.length) res = res.filter((c) => selectedDifficulty.includes(c.difficulty));

    if (selectedHours.length) {
      res = res.filter((c) => {
        const h = Number(c.hours || 0);
        return selectedHours.some((k) => hourBuckets.find((b) => b.key === k)?.match(h));
      });
    }

    if (selectedPrice.length) {
      res = res.filter(
        (c) =>
          (selectedPrice.includes("free") && !!c.is_free) ||
          (selectedPrice.includes("premium") && !!c.is_premium) ||
          (selectedPrice.includes("paid") && !c.is_free && !c.is_premium && (c.price_cents || 0) > 0)
      );
    }

    res.sort((a, b) => {
      switch (sortKey) {
        case "popular":
          return (b.rating_count || 0) - (a.rating_count || 0);
        case "rating":
          return (b.rating_avg || 0) - (a.rating_avg || 0);
        case "newest":
          return new Date(b.published_at || 0) - new Date(a.published_at || 0);
        case "price_low":
          return (a.price_cents || 0) - (b.price_cents || 0);
        case "price_high":
          return (b.price_cents || 0) - (a.price_cents || 0);
        default:
          return 0;
      }
    });

    return res;
  }, [
    courses,
    searchQuery,
    selectedRatings,
    selectedLevels,
    selectedTopics,
    selectedProvider,
    selectedDifficulty,
    selectedHours,
    selectedPrice,
    sortKey,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = clamp(page, 1, totalPages);
  const pageItems = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  React.useEffect(() => {
    setPage(1);
  }, [
    searchQuery,
    selectedRatings,
    selectedLevels,
    selectedTopics,
    selectedProvider,
    selectedDifficulty,
    selectedHours,
    selectedPrice,
    sortKey,
  ]);

  const resetFilters = () => {
    setSelectedRatings([]);
    setSelectedLevels([]);
    setSelectedTopics([]);
    setSelectedProvider([]);
    setSelectedDifficulty([]);
    setSelectedHours([]);
    setSelectedPrice([]);
    setSearchQuery("");
    setSortKey("popular");
    setPage(1);
  };

  return (
    <section className="w-full py-16 px-4 bg-[#FEFEFE] text-[#181818]">
      {/* Aquí va todo tu JSX que ya tenías... */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">Cursos</h1>
        {/* Aquí puedes pegar el resto del JSX tal cual lo tenías */}
      </div>
    </section>
  );
};

export default Courses;
