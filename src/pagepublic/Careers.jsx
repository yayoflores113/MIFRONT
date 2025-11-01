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
  Squares2X2Icon,
  ChevronDownIcon,
  FunnelIcon,
  LinkIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { AcademicCapIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Config from "../Config";

const DEFAULT_QUANTITY = 120;
const PAGE_SIZE = 9;

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

/** ====== helper de imagen de carrera ======
 * Acepta base64 y URL absoluta. Si viene sólo el nombre de archivo,
 * intenta construir origen/backend + /img/carreras/<archivo>
 * (ajusta "carreras" si tu carpeta pública se llama distinto)
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

const Careers = () => {
  // Data
  const [careers, setCareers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // Search & filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedUniversity, setSelectedUniversity] = React.useState(null);
  const [selectedArea, setSelectedArea] = React.useState(null);
  const [selectedModality, setSelectedModality] = React.useState(null); // presencial | online | mixta
  const [selectedLevel, setSelectedLevel] = React.useState(null); // "level" o algún item de "levels"
  const [onlyWithImage, setOnlyWithImage] = React.useState(false);
  const [sortKey, setSortKey] = React.useState("relevance"); // relevance | name_asc | name_desc

  // === NUEVO: filtro por división ===
  const [selectedDivision, setSelectedDivision] = React.useState(null);

  // Pagination
  const [page, setPage] = React.useState(1);

  // Fetch inicial
  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await Config.getCareers(DEFAULT_QUANTITY);
        if (!active) return;
        // La API puede regresar un array directo (como en universities)
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setCareers(list);
      } catch (e) {
        console.error("Careers fetch error:", e);
        if (!active) return;
        setError("No se pudo cargar el catálogo de carreras.");
        setCareers([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Opciones dependientes (derivadas del dataset)
  const universities = React.useMemo(() => {
    // de categorias() viene with('university'), usamos name o acronym
    const names = careers.map(
      (c) => c?.university?.name || c?.university?.acronym || null
    );
    return uniq(names).sort((a, b) => (a || "").localeCompare(b || ""));
  }, [careers]);

  const areas = React.useMemo(
    () =>
      uniq(careers.map((c) => c.area)).sort((a, b) =>
        (a || "").localeCompare(b || "")
      ),
    [careers]
  );

  const modalities = React.useMemo(
    () => uniq(careers.map((c) => c.modality)).sort(),
    [careers]
  );

  const levels = React.useMemo(() => {
    const flat = [];
    careers.forEach((c) => {
      if (c.level) flat.push(c.level);
      if (Array.isArray(c.levels)) flat.push(...c.levels);
    });
    return uniq(flat).sort((a, b) => (a || "").localeCompare(b || ""));
  }, [careers]);

  // === NUEVO: divisiones derivadas ===
  const divisions = React.useMemo(
    () =>
      uniq(careers.map((c) => c.division)).sort((a, b) =>
        (a || "").localeCompare(b || "")
      ),
    [careers]
  );

  // Filtros + búsqueda + orden
  const filtered = React.useMemo(() => {
    let res = careers.slice();

    // búsqueda (name, area, modality, slug, universidad)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter((c) =>
        [
          c.name,
          c.area,
          c.modality,
          c.slug,
          c?.university?.name,
          c?.university?.acronym,
          c.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    // filtros
    if (selectedUniversity) {
      res = res.filter((c) => {
        const uniName = c?.university?.name || c?.university?.acronym || "";
        return uniName === selectedUniversity;
      });
    }
    if (selectedArea) res = res.filter((c) => c.area === selectedArea);

    // === NUEVO: filtro por división ===
    if (selectedDivision)
      res = res.filter((c) => c.division === selectedDivision);

    if (selectedModality)
      res = res.filter((c) => c.modality === selectedModality);
    if (selectedLevel) {
      res = res.filter((c) => {
        if (c.level === selectedLevel) return true;
        if (Array.isArray(c.levels)) return c.levels.includes(selectedLevel);
        return false;
      });
    }
    if (onlyWithImage) res = res.filter((c) => !!c.career_url);

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
              ((x.area || "").toLowerCase().includes(q) ? 1 : 0);
            return score(b) - score(a);
          }
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    return res;
  }, [
    careers,
    searchQuery,
    selectedUniversity,
    selectedArea,
    selectedModality,
    selectedLevel,
    onlyWithImage,
    sortKey,
    // === NUEVO: dependencia del filtro por división ===
    selectedDivision,
  ]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = clamp(page, 1, totalPages);
  const pageItems = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Reset de hijos al cambiar padres (si lo necesitas)
  React.useEffect(() => {
    setPage(1);
  }, [
    selectedUniversity,
    selectedArea,
    selectedModality,
    selectedLevel,
    searchQuery,
    onlyWithImage,
    sortKey,
    // === NUEVO: reinicia paginación al cambiar división ===
    selectedDivision,
  ]);

  return (
    <section className="w-full py-16 px-4 bg-[#FEFEFE]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Carreras</h1>
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
              placeholder="Buscar por carrera, área, modalidad, universidad…"
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
          {/* Universidad */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                {selectedUniversity || "Todas las universidades"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por universidad"
              selectionMode="single"
              selectedKeys={[selectedUniversity || "all"]}
              onAction={(key) => {
                setSelectedUniversity(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todas las universidades</DropdownItem>
              {universities.map((u) => (
                <DropdownItem key={u}>{u}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Área */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                {selectedArea || "Todas las áreas"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por área"
              selectionMode="single"
              selectedKeys={[selectedArea || "all"]}
              onAction={(key) => {
                setSelectedArea(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todas las áreas</DropdownItem>
              {areas.map((a) => (
                <DropdownItem key={a}>{a}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* === NUEVO: División === */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                {selectedDivision || "Todas las divisiones"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por división"
              selectionMode="single"
              selectedKeys={[selectedDivision || "all"]}
              onAction={(key) => {
                setSelectedDivision(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todas las divisiones</DropdownItem>
              {divisions.map((d) => (
                <DropdownItem key={d}>{d}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Modalidad */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                {selectedModality || "Todas las modalidades"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por modalidad"
              selectionMode="single"
              selectedKeys={[selectedModality || "all"]}
              onAction={(key) => {
                setSelectedModality(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todas las modalidades</DropdownItem>
              {modalities.map((m) => (
                <DropdownItem key={m}>{m}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Nivel (queda igual, fuera del grid de 4 columnas actual) */}
        </div>

        {/* Nivel: lo dejo idéntico donde ya lo tenías */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {/* Nivel */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="h-12 w-full justify-between"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                {selectedLevel || "Todos los niveles"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filtrar por nivel"
              selectionMode="single"
              selectedKeys={[selectedLevel || "all"]}
              onAction={(key) => {
                setSelectedLevel(key === "all" ? null : String(key));
                setPage(1);
              }}
            >
              <DropdownItem key="all">Todos los niveles</DropdownItem>
              {levels.map((lv) => (
                <DropdownItem key={lv}>{lv}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Reset */}
        <div className="flex items-center gap-3 mb-6">
          {(selectedUniversity ||
            selectedArea ||
            selectedModality ||
            selectedLevel ||
            selectedDivision || // === NUEVO
            onlyWithImage ||
            searchQuery) && (
            <Button
              variant="light"
              onPress={() => {
                setSelectedUniversity(null);
                setSelectedArea(null);
                setSelectedModality(null);
                setSelectedLevel(null);
                setSelectedDivision(null); // === NUEVO
                setOnlyWithImage(false);
                setSearchQuery("");
                setSortKey("relevance");
                setPage(1);
              }}
              startContent={<XMarkIcon className="w-5" />}
            >
              Limpiar filtros
            </Button>
          )}
          <Button
            variant={onlyWithImage ? "solid" : "flat"}
            className={onlyWithImage ? "bg-[#2CBFF0] text-white" : ""}
            onPress={() => {
              setOnlyWithImage((v) => !v);
              setPage(1);
            }}
            startContent={<Squares2X2Icon className="w-5" />}
          >
            Con imagen
          </Button>
        </div>

        {/* Count */}
        <div className="mb-6">
          <p className="text-default-500">
            Mostrando {filtered.length}{" "}
            {filtered.length === 1 ? "carrera" : "carreras"}
            {selectedUniversity ? ` en ${selectedUniversity}` : ""}{" "}
            {searchQuery ? ` que coinciden con “${searchQuery}”` : ""}
          </p>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="flex items-center gap-3 text-default-500 mb-6">
            <Spinner size="sm" /> Cargando carreras…
          </div>
        )}
        {!!error && <p className="text-warning mb-4">{error}</p>}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="border border-default-200 shadow-sm h-full overflow-visible">
                <CardBody className="p-0">
                  <Link to={`/careers/${c.slug}`} className="block">
                    <div className="relative h-40 bg-default-100 rounded-large overflow-hidden">
                      {c.career_url ? (
                        <Image
                          isZoomed
                          loading="lazy"
                          alt={`${c.name} image`}
                          src={careerImgSrc(c.career_url)}
                          fallbackSrc="/img/carreras/placeholder.png"
                          radius="none"
                          shadow="none"
                          classNames={{
                            wrapper:
                              "w-full h-full flex items-center justify-center z-0",
                            img: "max-h-full max-w-full object-contain p-6",
                            zoomedWrapper: "z-0",
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-default-400 z-0">
                          <AcademicCapIcon className="w-10 mb-2" />
                          <span className="text-sm">Sin imagen</span>
                        </div>
                      )}

                      {c?.university?.acronym && (
                        <div className="absolute top-2 right-2 z-10">
                          <Chip
                            size="sm"
                            color="primary"
                            className="bg-[#2CBFF0] text-white"
                          >
                            {c.university.acronym}
                          </Chip>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="min-w-0">
                        <Link to={`/careers/${c.slug}`}>
                          <h3
                            className="font-bold text-xl truncate"
                            title={c.name}
                          >
                            {c.name}
                          </h3>
                        </Link>
                        {c.slug && (
                          <p className="text-default-500 text-sm truncate">
                            /{c.slug}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-4 text-amber-500 mr-1" />
                        <span className="text-amber-600 text-sm">Catálogo</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-default-500 text-sm mb-2">
                      <BuildingOffice2Icon className="w-4" />
                      <span className="truncate">
                        {c?.university?.name ||
                          c?.university?.acronym ||
                          "Universidad"}
                      </span>
                    </div>

                    <div className="text-default-500 text-sm mb-2">
                      {c.area && <span className="mr-2">Área: {c.area}</span>}
                      {c.modality && <span>· Modalidad: {c.modality}</span>}
                    </div>

                    {c.description && (
                      <p className="text-default-600 mb-4 line-clamp-3">
                        {c.description}
                      </p>
                    )}
                  </div>
                </CardBody>

                <CardFooter className="flex justify-between p-5 pt-0">
                  <Button
                    as={Link}
                    to={`/careers/${c.slug}`}
                    variant="light"
                    className="text-[#2CBFF0]"
                    startContent={<LinkIcon className="w-4" />}
                  >
                    Ver detalle
                  </Button>
                  <Button className="bg-[#2CBFF0] text-white">
                    Ver cursos
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
              No se encontraron carreras
            </h3>
            <p className="text-default-500 max-w-md mb-6">
              Ajusta los filtros o el término de búsqueda para ver más
              resultados.
            </p>
            <Button
              variant="flat"
              color="primary"
              onPress={() => {
                setSelectedUniversity(null);
                setSelectedArea(null);
                setSelectedModality(null);
                setSelectedLevel(null);
                setSelectedDivision(null); // === NUEVO
                setOnlyWithImage(false);
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

export default Careers;
