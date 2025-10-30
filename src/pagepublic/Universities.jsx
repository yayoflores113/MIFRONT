// src/pagepublic/Universities.jsx
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Image,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  FunnelIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { AcademicCapIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Config from "../Config";

const DEFAULT_QUANTITY = 120;
const PAGE_SIZE = 9;

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

/** ========= helper de imágenes (mismo criterio que usas donde sí carga) =========
 *  - Acepta base64 y URL absoluta tal cual
 *  - Si viene sólo el nombre de archivo, construye `${ORIGEN_BACK}/img/universidades/<archivo>`
 *  - ORIGEN_BACK: intenta sacar del baseURL de axios (quitando /api/...), o de VITE_BACKEND_URL
 */
const logoImgSrc = (val) => {
  if (!val) return "";
  const v = String(val).trim();
  if (v.startsWith("data:image")) return v;
  if (/^https?:\/\//i.test(v)) return v;

  // intenta leer baseURL de axios global si existe
  const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
  // si era .../api/v1, quita el /api/...
  const fromAxios = axiosBase ? axiosBase.replace(/\/api\/?.*$/i, "") : "";
  // variable de entorno como respaldo
 const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "https://miback-1333.onrender.com").trim();
  const backendOrigin = fromAxios || fromEnv || "";

  const origin = backendOrigin.replace(/\/$/, "");
  return origin
    ? `${origin}/img/universidades/${v}`
    : `/img/universidades/${v}`;
};

// rafce
const Universities = () => {
  // Data
  const [universities, setUniversities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // Search & filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [selectedState, setSelectedState] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [onlyWithLogo, setOnlyWithLogo] = React.useState(false);
  const [sortKey, setSortKey] = React.useState("relevance"); // relevance | name_asc | name_desc

  // Pagination
  const [page, setPage] = React.useState(1);

  // Fetch inicial
  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await Config.getUniversities(DEFAULT_QUANTITY);
        if (!active) return;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setUniversities(list);
      } catch (e) {
        console.error("Universities fetch error:", e);
        if (!active) return;
        setError("No se pudo cargar el catálogo de universidades.");
        setUniversities([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Opciones dependientes
  const countries = React.useMemo(
    () => uniq(universities.map((u) => u.country)),
    [universities]
  );
  const states = React.useMemo(() => {
    const base = universities.filter((u) =>
      selectedCountry ? u.country === selectedCountry : true
    );
    return uniq(base.map((u) => u.state));
  }, [universities, selectedCountry]);
  const cities = React.useMemo(() => {
    const base = universities
      .filter((u) => (selectedCountry ? u.country === selectedCountry : true))
      .filter((u) => (selectedState ? u.state === selectedState : true));
    return uniq(base.map((u) => u.city));
  }, [universities, selectedCountry, selectedState]);

  // Filtros + búsqueda + orden
  const filtered = React.useMemo(() => {
    let res = universities.slice();

    // búsqueda
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter((u) =>
        [u.name, u.acronym, u.description, u.country, u.state, u.city, u.slug]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    // filtros
    if (selectedCountry) res = res.filter((u) => u.country === selectedCountry);
    if (selectedState) res = res.filter((u) => u.state === selectedState);
    if (selectedCity) res = res.filter((u) => u.city === selectedCity);
    if (onlyWithLogo) res = res.filter((u) => !!u.logo_url);

    // orden
    res.sort((a, b) => {
      switch (sortKey) {
        case "name_asc":
          return (a.name || "").localeCompare(b.name || "");
        case "name_desc":
          return (b.name || "").localeCompare(a.name || "");
        case "relevance":
        default:
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const score = (x) =>
              ((x.name || "").toLowerCase().includes(q) ? 2 : 0) +
              ((x.acronym || "").toLowerCase().includes(q) ? 1 : 0);
            return score(b) - score(a);
          }
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    return res;
  }, [
    universities,
    searchQuery,
    selectedCountry,
    selectedState,
    selectedCity,
    onlyWithLogo,
    sortKey,
  ]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = clamp(page, 1, totalPages);
  const pageItems = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Reset de hijos al cambiar padres
  React.useEffect(() => {
    setSelectedState(null);
    setSelectedCity(null);
  }, [selectedCountry]);
  React.useEffect(() => {
    setSelectedCity(null);
  }, [selectedState]);

  return (
    <section className="w-full py-16 px-4 bg-[#FEFEFE]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Universidades</h1>
            <p className="text-default-600 max-w-2xl">
              Catálogo público con búsqueda y filtros dependientes.
            </p>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-6">
          <div className="flex-1">
            <Input
              classNames={{
                base: "w-full",
                inputWrapper: "bg-default-100 h-12",
              }}
              placeholder="Buscar por nombre, siglas, país, estado o ciudad…"
              size="lg"
              value={searchQuery}
              onValueChange={(v) => {
                setSearchQuery(v);
                setPage(1);
              }}
              startContent={
                <MagnifyingGlassIcon className="w-5 text-default-400" />
              }
              endContent={
                searchQuery ? (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => {
                      setSearchQuery("");
                      setPage(1);
                    }}
                  >
                    <XMarkIcon className="w-4 text-default-400" />
                  </Button>
                ) : null
              }
            />
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 min-w-[180px]"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                Orden:{" "}
                {
                  {
                    relevance: "Relevancia",
                    name_asc: "Nombre (A-Z)",
                    name_desc: "Nombre (Z-A)",
                  }[sortKey]
                }
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Ordenar"
              selectionMode="single"
              selectedKeys={[sortKey]}
              onAction={(key) => {
                setSortKey(String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="relevance">Relevancia</DropdownItem>
              <DropdownItem key="name_asc">Nombre (A-Z)</DropdownItem>
              <DropdownItem key="name_desc">Nombre (Z-A)</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            variant="light"
            className="h-12"
            startContent={<FunnelIcon className="w-5" />}
          >
            Filtros
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {/* País */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                {selectedCountry || "Todos los países"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por país"
              selectionMode="single"
              selectedKeys={[selectedCountry || "all"]}
              onAction={(key) => {
                setSelectedCountry(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todos los países</DropdownItem>
              {countries.map((c) => (
                <DropdownItem key={c}>{c}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Estado */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
                isDisabled={!states.length}
              >
                {selectedState || "Todos los estados"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por estado"
              selectionMode="single"
              selectedKeys={[selectedState || "all"]}
              onAction={(key) => {
                setSelectedState(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todos los estados</DropdownItem>
              {states.map((s) => (
                <DropdownItem key={s}>{s}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Ciudad */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
                isDisabled={!cities.length}
              >
                {selectedCity || "Todas las ciudades"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por ciudad"
              selectionMode="single"
              selectedKeys={[selectedCity || "all"]}
              onAction={(key) => {
                setSelectedCity(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todas las ciudades</DropdownItem>
              {cities.map((c) => (
                <DropdownItem key={c}>{c}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Con logo */}
          <div className="flex gap-2">
            <Button
              variant={onlyWithLogo ? "solid" : "flat"}
              className={
                onlyWithLogo ? "bg-[#2CBFF0] text-white w-full" : "w-full"
              }
              onPress={() => {
                setOnlyWithLogo((v) => !v);
                setPage(1);
              }}
              startContent={<Squares2X2Icon className="w-5" />}
            >
              Con logo
            </Button>
          </div>
        </div>

        {/* Reset */}
        <div className="flex items-center gap-3 mb-6">
          {(selectedCountry ||
            selectedState ||
            selectedCity ||
            onlyWithLogo ||
            searchQuery) && (
            <Button
              variant="light"
              onPress={() => {
                setSelectedCountry(null);
                setSelectedState(null);
                setSelectedCity(null);
                setOnlyWithLogo(false);
                setSearchQuery("");
                setSortKey("relevance");
                setPage(1);
              }}
              startContent={<XMarkIcon className="w-5" />}
            >
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Count */}
        <div className="mb-6">
          <p className="text-default-500">
            Mostrando {filtered.length}{" "}
            {filtered.length === 1 ? "universidad" : "universidades"}
            {selectedCountry ? ` en ${selectedCountry}` : ""}{" "}
            {searchQuery ? ` que coinciden con “${searchQuery}”` : ""}
          </p>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="flex items-center gap-3 text-default-500 mb-6">
            <Spinner size="sm" /> Cargando universidades…
          </div>
        )}
        {!!error && <p className="text-warning mb-4">{error}</p>}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((u, index) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="border border-default-200 shadow-sm h-full overflow-visible">
                <CardBody className="p-0">
                  <Link to={`/universities/${u.slug}`} className="block">
                    <div className="relative h-40 bg-default-100 rounded-large overflow-hidden">
                      {u.logo_url ? (
                        <Image
                          isZoomed
                          loading="lazy"
                          alt={`${u.name} logo`}
                          src={logoImgSrc(u.logo_url)}
                          fallbackSrc="/img/universidades/placeholder.png"
                          radius="none"
                          shadow="none"
                          classNames={{
                            wrapper:
                              "w-full h-full flex items-center justify-center z-0",
                            img: "max-h-full max-w-full object-contain p-6",
                            zoomedWrapper: "z-0", // 👈 evita que el overlay del zoom tape el chip
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-default-400 z-0">
                          <AcademicCapIcon className="w-10 mb-2" />
                          <span className="text-sm">Sin logo</span>
                        </div>
                      )}

                      {u.acronym && (
                        <div className="absolute top-2 right-2 z-10">
                          <Chip
                            size="sm"
                            color="primary"
                            className="bg-[#2CBFF0] text-white"
                          >
                            {u.acronym}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0">
                        <Link to={`/universities/${u.slug}`}>
                          <h3
                            className="font-bold text-xl truncate"
                            title={u.name}
                          >
                            {u.name}
                          </h3>
                        </Link>
                        {u.slug && (
                          <p className="text-default-500 text-sm truncate">
                            /{u.slug}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-4 text-amber-500 mr-1" />
                        <span className="text-amber-600 text-sm">Catálogo</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-default-500 text-sm mb-4">
                      <MapPinIcon className="w-4" />
                      <span className="truncate">
                        {u.city ? `${u.city}, ` : ""}
                        {u.state ? `${u.state}, ` : ""}
                        {u.country || ""}
                      </span>
                    </div>

                    {u.description && (
                      <p className="text-default-600 mb-4 line-clamp-3">
                        {u.description}
                      </p>
                    )}
                  </div>
                </CardBody>

                <CardFooter className="flex justify-between p-5 pt-0">
                  <Button
                    as={Link}
                    to={`/universities/${u.slug}`}
                    variant="light"
                    className="text-[#2CBFF0]"
                    startContent={<LinkIcon className="w-4" />}
                  >
                    Ver detalle
                  </Button>
                  <Button className="bg-[#2CBFF0] text-white">
                    Ver programas
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MagnifyingGlassIcon className="text-default-300 mb-4 w-12" />
            <h3 className="text-xl font-semibold mb-2">
              No se encontraron universidades
            </h3>
            <p className="text-default-500 max-w-md mb-6">
              Ajusta los filtros o el término de búsqueda para ver más
              resultados.
            </p>
            <Button
              variant="flat"
              color="primary"
              onPress={() => {
                setSelectedCountry(null);
                setSelectedState(null);
                setSelectedCity(null);
                setOnlyWithLogo(false);
                setSearchQuery("");
                setSortKey("relevance");
                setPage(1);
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-12 flex-wrap gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === currentPage ? "flat" : "light"}
                className="mx-0.5"
                onPress={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Universities;
