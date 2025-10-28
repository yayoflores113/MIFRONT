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
} from "@heroicons/react/24/outline";
import { StarIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Config from "../Config";

const DEFAULT_QUANTITY = 120;
const PAGE_SIZE = 9;

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

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
  const origin = backendUrl.replace(/\/$/, ""); // Quitar "/" final si existe

  // Construir la URL completa
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
  // Data
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // Search & sort
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState("popular"); // popular | rating | newest | price_low | price_high

  // Filters
  const [selectedRatings, setSelectedRatings] = React.useState([]); // ["4.5-5","4-4.5","3-4"]
  const [selectedLevels, setSelectedLevels] = React.useState([]); // db.level
  const [selectedTopics, setSelectedTopics] = React.useState([]); // db.topic
  const [selectedProvider, setSelectedProvider] = React.useState([]); // db.provider
  const [selectedDifficulty, setSelectedDifficulty] = React.useState([]); // db.difficulty
  const [selectedHours, setSelectedHours] = React.useState([]); // hourBuckets keys
  const [selectedPrice, setSelectedPrice] = React.useState([]); // ["free","paid","premium"]

  // Pagination
  const [page, setPage] = React.useState(1);

  // Fetch inicial (mismo patrón que Universities/Careers)
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
        console.error("Courses fetch error:", e);
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

  // Opciones para filtros (derivadas del dataset)
  const levels = React.useMemo(
    () => uniq(courses.map((c) => c.level)).sort(),
    [courses]
  );
  const topics = React.useMemo(
    () => uniq(courses.map((c) => c.topic)).sort(),
    [courses]
  );
  const providers = React.useMemo(
    () => uniq(courses.map((c) => c.provider)).sort(),
    [courses]
  );
  const difficulties = React.useMemo(
    () => uniq(courses.map((c) => c.difficulty)).sort(),
    [courses]
  );

  // Filtrado + búsqueda
  const filtered = React.useMemo(() => {
    let res = courses.slice();

    // search (title, description, provider, topic)
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

    // ratings
    if (selectedRatings.length) {
      res = res.filter((c) => {
        const val = Number(c.rating_avg || 0);
        return selectedRatings.some((r) => {
          const [min, max] = r.split("-").map(Number);
          return val >= (isNaN(min) ? 0 : min) && val <= (isNaN(max) ? 5 : max);
        });
      });
    }

    // level/topic/provider/difficulty
    if (selectedLevels.length)
      res = res.filter((c) => selectedLevels.includes(c.level));
    if (selectedTopics.length)
      res = res.filter((c) => selectedTopics.includes(c.topic));
    if (selectedProvider.length)
      res = res.filter((c) => selectedProvider.includes(c.provider));
    if (selectedDifficulty.length)
      res = res.filter((c) => selectedDifficulty.includes(c.difficulty));

    // hours
    if (selectedHours.length) {
      res = res.filter((c) => {
        const h = Number(c.hours || 0);
        return selectedHours.some((k) =>
          hourBuckets.find((b) => b.key === k)?.match(h)
        );
      });
    }

    // price (is_free / is_premium / paid)
    if (selectedPrice.length) {
      res = res.filter(
        (c) =>
          (selectedPrice.includes("free") && !!c.is_free) ||
          (selectedPrice.includes("premium") && !!c.is_premium) ||
          (selectedPrice.includes("paid") &&
            !c.is_free &&
            !c.is_premium &&
            (c.price_cents || 0) > 0)
      );
    }

    // orden (local)
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

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = clamp(page, 1, totalPages);
  const pageItems = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // Reset al cambiar filtros principales
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Cursos</h1>
            <p className="text-default-600 max-w-2xl">
              Catálogo público con búsqueda, filtros y ordenamiento.
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
              placeholder="Buscar por título, proveedor o tema…"
              size="lg"
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={
                <MagnifyingGlassIcon className="w-5 text-default-400" />
              }
              endContent={
                searchQuery ? (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setSearchQuery("")}
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
                className="h-12 min-w-[220px]"
                endContent={<ChevronDownIcon className="w-4" />}
              >
                Orden:{" "}
                {
                  {
                    popular: "Más populares",
                    rating: "Mejor valorados",
                    newest: "Más recientes",
                    price_low: "Precio: menor a mayor",
                    price_high: "Precio: mayor a menor",
                  }[sortKey]
                }
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Ordenar cursos"
              selectionMode="single"
              selectedKeys={[sortKey]}
              onAction={(key) => setSortKey(String(key))}
            >
              <DropdownItem key="popular">Más populares</DropdownItem>
              <DropdownItem key="rating">Mejor valorados</DropdownItem>
              <DropdownItem key="newest">Más recientes</DropdownItem>
              <DropdownItem key="price_low">Precio: menor a mayor</DropdownItem>
              <DropdownItem key="price_high">
                Precio: mayor a menor
              </DropdownItem>
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtros */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              {(selectedRatings.length ||
                selectedLevels.length ||
                selectedTopics.length ||
                selectedProvider.length ||
                selectedDifficulty.length ||
                selectedHours.length ||
                selectedPrice.length ||
                searchQuery) > 0 && (
                <div className="mb-3">
                  <Button
                    variant="light"
                    onPress={resetFilters}
                    startContent={<XMarkIcon className="w-5" />}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}

              <Accordion
                selectionMode="multiple"
                defaultSelectedKeys={["ratings", "hours", "level", "price"]}
              >
                <AccordionItem key="ratings" title="Valoraciones">
                  <CheckboxGroup
                    value={selectedRatings}
                    onValueChange={setSelectedRatings}
                    className="flex flex-col gap-2"
                  >
                    <Checkbox value="4.5-5">4.5 y más</Checkbox>
                    <Checkbox value="4-4.5">4.0 y más</Checkbox>
                    <Checkbox value="3-4">3.0 y más</Checkbox>
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem key="hours" title="Duración del Curso">
                  <CheckboxGroup
                    value={selectedHours}
                    onValueChange={setSelectedHours}
                    className="flex flex-col gap-2"
                  >
                    {hourBuckets.map((b) => (
                      <Checkbox key={b.key} value={b.key}>
                        {b.label}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem key="level" title="Nivel">
                  <CheckboxGroup
                    value={selectedLevels}
                    onValueChange={setSelectedLevels}
                    className="flex flex-col gap-2"
                  >
                    {levels.map((lv) => (
                      <Checkbox key={lv} value={lv}>
                        {lv}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem key="topic" title="Tema">
                  <CheckboxGroup
                    value={selectedTopics}
                    onValueChange={setSelectedTopics}
                    className="flex flex-col gap-2"
                  >
                    {topics.map((tp) => (
                      <Checkbox key={tp} value={tp}>
                        {tp}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem key="provider" title="Proveedor">
                  <CheckboxGroup
                    value={selectedProvider}
                    onValueChange={setSelectedProvider}
                    className="flex flex-col gap-2"
                  >
                    {providers.map((pv) => (
                      <Checkbox key={pv} value={pv}>
                        {pv}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem key="difficulty" title="Dificultad">
                  <CheckboxGroup
                    value={selectedDifficulty}
                    onValueChange={setSelectedDifficulty}
                    className="flex flex-col gap-2"
                  >
                    {difficulties.map((df) => (
                      <Checkbox key={df} value={df}>
                        {df}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>

                <AccordionItem key="price" title="Precio">
                  <CheckboxGroup
                    value={selectedPrice}
                    onValueChange={setSelectedPrice}
                    className="flex flex-col gap-2"
                  >
                    <Checkbox value="free">Gratis</Checkbox>
                    <Checkbox value="premium">Premium</Checkbox>
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-grow">
            {loading && (
              <div className="flex items-center gap-3 text-default-500 mb-6">
                <Spinner size="sm" /> Cargando cursos…
              </div>
            )}
            {!!error && <p className="text-warning mb-4">{error}</p>}

            {/* Count */}
            {!loading && (
              <div className="mb-6">
                <p className="text-default-500">
                  Mostrando {filtered.length}{" "}
                  {filtered.length === 1 ? "curso" : "cursos"}
                  {searchQuery ? ` que coinciden con “${searchQuery}”` : ""}
                </p>
              </div>
            )}

            {/* Lista estilo Udemy */}
            <div className="grid grid-cols-1 gap-6">
              {pageItems.map((c, index) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="border border-default-200 shadow-sm overflow-visible hover:shadow-md transition">
                    <CardBody className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-64 h-44 md:h-auto bg-default-100 rounded-large overflow-hidden">
                          {c.card_image_url ? (
                            <Image
                              loading="lazy"
                              alt={`${c.title} cover`}
                              src={courseImgSrc(c.card_image_url)}
                              fallbackSrc="/img/courses/placeholder.png"
                              radius="none"
                              shadow="none"
                              classNames={{
                                wrapper:
                                  "w-full h-full flex items-center justify-center z-0",
                                img: "w-full h-full object-cover",
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-default-400 z-0">
                              <AcademicCapIcon className="w-10 mb-2" />
                              <span className="text-sm">Sin imagen</span>
                            </div>
                          )}

                          {(c.is_premium || c.is_free) && (
                            <div className="absolute top-2 right-2 z-10">
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

                        <div className="flex flex-col flex-grow p-5">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-grow pr-4">
                              <Link to={`/courses/${c.slug}`}>
                                <h3 className="font-bold text-xl mb-2 line-clamp-2">
                                  {c.title}
                                </h3>
                              </Link>
                              {c.description && (
                                <p className="text-default-600 mb-3 line-clamp-2">
                                  {c.description}
                                </p>
                              )}
                              <p className="text-default-500 text-sm mb-2">
                                {c.provider || "Proveedor"}{" "}
                                {c.topic ? `• ${c.topic}` : ""}
                              </p>

                              <div className="flex items-center gap-2 mb-3">
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
                                  (
                                  {Number(c.rating_count || 0).toLocaleString()}
                                  )
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                {c.hours != null && <span>⏱ {c.hours} h</span>}
                                {c.level && <span>• Nivel: {c.level}</span>}
                                {c.difficulty && (
                                  <span>• Dificultad: {c.difficulty}</span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
                              <div className="text-right">
                                {c.is_free ? (
                                  <span className="font-bold text-lg text-[#181818]">
                                    Gratis
                                  </span>
                                ) : (
                                  <span className="font-bold text-lg text-[#181818]">
                                    {centsToCurrency(c.price_cents)}
                                  </span>
                                )}
                              </div>

                              <div className="mt-3 flex gap-2">
                                {c.url && (
                                  <Button
                                    as="a"
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="light"
                                    className="text-[#2CBFF0]"
                                    startContent={<LinkIcon className="w-4" />}
                                  >
                                    Ir al proveedor
                                  </Button>
                                )}
                                <Button
                                  as={Link}
                                  to={`/courses/${c.slug}`}
                                  className="bg-[#2CBFF0] text-white"
                                >
                                  Ver curso
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>

                    {Boolean(c.popularity_score) && (
                      <CardFooter className="p-5 pt-0">
                        <Chip variant="flat" size="sm">
                          Popularidad: {Number(c.popularity_score).toFixed(0)}
                        </Chip>
                      </CardFooter>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty */}
            {!loading && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MagnifyingGlassIcon className="text-default-300 mb-4 w-12" />
                <h3 className="text-xl font-semibold mb-2">
                  No se encontraron cursos
                </h3>
                <p className="text-default-500 max-w-md mb-6">
                  Ajusta los filtros o el término de búsqueda para ver más
                  resultados.
                </p>
                <Button variant="flat" onPress={resetFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex justify-center mt-12 flex-wrap gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === currentPage ? "flat" : "light"}
                      className={
                        p === currentPage ? "bg-[#2CBFF0] text-white" : ""
                      }
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  )
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Courses;
