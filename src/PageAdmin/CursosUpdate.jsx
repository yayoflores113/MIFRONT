// CursosUpdate.jsx — mismo diseño que el resto del admin, sin cambiar tu lógica
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
  Image,
  Divider,
  CardHeader,
} from "@heroui/react";
import {
  BookOpenIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const slugify = (txt = "") =>
  txt
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const LEVELS = ["todos", "principiante", "intermedio", "experto"];

const readAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

const CursosUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // === mismo estado/handlers que tu archivo ===
  const [career_id, setCareerId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [provider, setProvider] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hours, setHours] = useState("");
  const [is_premium, setIsPremium] = useState(false);
  const [is_free, setIsFree] = useState(true);
  const [price_cents, setPriceCents] = useState("");
  const [rating_avg, setRatingAvg] = useState("");
  const [rating_count, setRatingCount] = useState("");
  const [popularity_score, setPopularityScore] = useState("");
  const [url, setUrl] = useState("");
  const [published_at, setPublishedAt] = useState("");
  const [description, setDescription] = useState("");
  const [currentImageName, setCurrentImageName] = useState("");

  const [imageB64, setImageB64] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Config.getCursosShow(id); // GET /admin/courses/{id}
        setCareerId(data.career_id ?? "");
        setTitle(data.title ?? "");
        setSlug(data.slug ?? "");
        setProvider(data.provider ?? "");
        setTopic(data.topic ?? "");
        setLevel(data.level ?? "");
        setDifficulty(data.difficulty ?? "");
        setHours(data.hours ?? "");
        setIsPremium(Boolean(data.is_premium));
        setIsFree(Boolean(data.is_free));
        setPriceCents(data.price_cents ?? "");
        setRatingAvg(data.rating_avg ?? "");
        setRatingCount(data.rating_count ?? "");
        setPopularityScore(data.popularity_score ?? "");
        setUrl(data.url ?? "");
        setPublishedAt(data.published_at ?? "");
        setDescription(data.description ?? "");
        setCurrentImageName(data.card_image_url || "");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleImage = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const b64 = await readAsDataURL(f);
    setImageB64(b64);
    setPreview(b64);
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      career_id: Number(career_id),
      title,
      slug: slug || slugify(title),
      provider: provider || undefined,
      topic: topic || undefined,
      level: level || undefined,
      difficulty: difficulty || undefined,
      hours: hours === "" ? undefined : Number(hours),
      is_premium,
      is_free,
      price_cents: price_cents === "" ? undefined : Number(price_cents),
      rating_avg: rating_avg === "" ? undefined : Number(rating_avg),
      rating_count: rating_count === "" ? undefined : Number(rating_count),
      popularity_score:
        popularity_score === "" ? undefined : Number(popularity_score),
      url: url || undefined,
      published_at: published_at || undefined,
      description: description || undefined,
    };

    if (imageB64 && imageB64.startsWith("data:image/")) {
      payload.file = imageB64; // controller acepta base64
    }

    await Config.getCursosUpdate(payload, id); // PUT /admin/courses/{id}
    navigate("/admin/courses");
  };

  if (loading)
    return (
      <div className="bg-content1 min-h-screen">
        <Sidebar />
        <div className="px-4 ml-20 md:ml-64 py-6">Cargando…</div>
      </div>
    );

  return (
    <div className="bg-content1 min-h-screen">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido alineado al sidebar (sin espacio perdido) */}
      <div className="px-4 ml-20 md:ml-64 transition-[margin] duration-300">
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 p-0 sm:p-2"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#181818]">
                  Editar curso
                </h1>
                <p className="text-gray-500 text-sm">
                  Actualiza la información del curso
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/courses"
                variant="flat"
                startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
              >
                Volver
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <BookOpenIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Datos del curso</h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        label="Carrera (ID)"
                        value={String(career_id)}
                        onChange={(e) => setCareerId(e.target.value)}
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-9">
                      <Input
                        type="text"
                        label="Nombre del curso"
                        value={title}
                        onChange={(e) => {
                          const v = e.target.value;
                          setTitle(v);
                          if (!slug) setSlug(slugify(v));
                        }}
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Select
                        label="Nivel"
                        selectedKeys={level ? [level] : []}
                        onSelectionChange={(keys) =>
                          setLevel(Array.from(keys)[0] || "")
                        }
                      >
                        <SelectItem key="">{`(opcional)`}</SelectItem>
                        {LEVELS.map((x) => (
                          <SelectItem key={x}>{x}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="text"
                        label="Dificultad"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        placeholder="baja, media, alta…"
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="number"
                        min={1}
                        label="Horas"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="text"
                        label="Provedor (Universidad)"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="text"
                        label="Materia (Tema)"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="url"
                        label="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="date"
                        label="Publicado el"
                        value={published_at}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        min={0}
                        label="Precio (centavos)"
                        value={price_cents}
                        onChange={(e) => setPriceCents(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        step="0.1"
                        min={0}
                        max={5}
                        label="Rating promedio"
                        value={rating_avg}
                        onChange={(e) => setRatingAvg(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        min={0}
                        label="# Ratings"
                        value={rating_count}
                        onChange={(e) => setRatingCount(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        min={0}
                        label="Popularidad"
                        value={popularity_score}
                        onChange={(e) => setPopularityScore(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Checkbox isSelected={is_free} onValueChange={setIsFree}>
                        Es gratis
                      </Checkbox>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Checkbox
                        isSelected={is_premium}
                        onValueChange={setIsPremium}
                      >
                        Es premium
                      </Checkbox>
                    </div>

                    <div className="col-span-12">
                      <Textarea
                        label="Descripción"
                        minRows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    {/* Imagen (card) */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="text-sm text-foreground-500">
                        Imagen (card)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="mt-2 block w-full rounded-medium border border-default-200 px-3 py-2 bg-content2"
                      />
                      {currentImageName && !preview && (
                        <div className="text-tiny text-foreground-500 mt-1">
                          Imagen actual: <code>{currentImageName}</code>
                        </div>
                      )}
                      {preview && (
                        <div className="mt-3">
                          <Image
                            alt="preview"
                            src={preview}
                            className="max-w-[220px]"
                            radius="sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <Divider />

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                      as={Link}
                      to="/admin/courses"
                      variant="flat"
                      startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
                    >
                      Volver
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      className="bg-[#2CBFF0]"
                      startContent={<CheckIcon className="h-5 w-5" />}
                    >
                      Guardar cambios
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CursosUpdate;
