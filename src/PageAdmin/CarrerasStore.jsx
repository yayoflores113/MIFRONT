import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  Image,
  Divider,
} from "@heroui/react";
import {
  AcademicCapIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// helper local para generar slugs (igual que el tuyo)
const slugify = (txt = "") =>
  txt
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const LEVELS = ["TSU", "Licenciatura", "Ingeniería", "Maestría", "Doctorado"];
const MODALITIES = ["presencial", "online", "mixta"];

const readAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

const CarrerasStore = () => {
  const navigate = useNavigate();

  // === mismo estado y lógica que tu archivo ===
  const [university_id, setUniversityId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);
  const [area, setArea] = useState("");
  // NUEVO
  const [division, setDivision] = useState("");
  const [terms_unit, setTermsUnit] = useState("");
  const [modality, setModality] = useState("");
  const [description, setDescription] = useState("");
  const [duration_terms, setDurationTerms] = useState([]);
  const [tmpLevel, setTmpLevel] = useState("");
  const [tmpTerms, setTmpTerms] = useState("");
  const [imageB64, setImageB64] = useState("");
  const [preview, setPreview] = useState("");

  const toggleLevel = (lvl) => () => {
    setLevels((prev) =>
      prev.includes(lvl) ? prev.filter((x) => x !== lvl) : [...prev, lvl]
    );
  };

  const addDuration = (e) => {
    e?.preventDefault?.();
    const t = parseInt(tmpTerms, 10);
    if (!tmpLevel || !Number.isFinite(t) || t <= 0) return;
    setDurationTerms((prev) => {
      const next = prev.filter((x) => x.level !== tmpLevel);
      next.push({ level: tmpLevel, terms: t });
      return next;
    });
    setTmpLevel("");
    setTmpTerms("");
  };

  const removeDuration = (lvl) => () =>
    setDurationTerms((prev) => prev.filter((x) => x.level !== lvl));

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
      university_id: Number(university_id),
      name,
      nombre: name,
      slug: slug || slugify(name),
      level: level || undefined,
      levels: levels.length ? levels : undefined,
      area: area || undefined,
      // NUEVO
      division: division || undefined,
      duration_terms: duration_terms.length ? duration_terms : undefined,
      terms_unit: terms_unit || undefined, // "cuatrimestre" | "semestre"
      modality: modality || undefined, // "presencial" | "online" | "mixta"
      description: description || undefined,
    };
    if (imageB64 && imageB64.startsWith("data:image/")) {
      payload.career_url = imageB64;
    }
    await Config.getCarrerasStore(payload); // POST
    navigate("/admin/careers");
  };

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
                  Nueva carrera
                </h1>
                <p className="text-gray-500 text-sm">
                  Crear un registro de carrera
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/careers"
                variant="flat"
                startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
              >
                Volver
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <AcademicCapIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Datos de la carrera</h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="number"
                        label="Universidad (ID)"
                        value={String(university_id)}
                        onChange={(e) => setUniversityId(e.target.value)}
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-8">
                      <Input
                        type="text"
                        label="Nombre de la carrera"
                        value={name}
                        onChange={(e) => {
                          const v = e.target.value;
                          setName(v);
                          if (!slug) setSlug(slugify(v));
                        }}
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Select
                        label="Nivel máximo"
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

                    <div className="col-span-12 md:col-span-8">
                      <label className="text-sm text-foreground-500">
                        Niveles (marcar)
                      </label>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {LEVELS.map((lvl) => (
                          <Checkbox
                            key={lvl}
                            isSelected={levels.includes(lvl)}
                            onValueChange={toggleLevel(lvl)}
                          >
                            {lvl}
                          </Checkbox>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="text"
                        label="Área"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Tecnologías de la Información, Salud, etc."
                        variant="bordered"
                      />
                    </div>

                    {/* NUEVO: División */}
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="text"
                        label="División (DIV)"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        placeholder="Ej. Facultad de Ingeniería"
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                      <Select
                        label="Unidad de término"
                        selectedKeys={terms_unit ? [terms_unit] : []}
                        onSelectionChange={(keys) =>
                          setTermsUnit(Array.from(keys)[0] || "")
                        }
                      >
                        <SelectItem key="">{`(elige)`}</SelectItem>
                        <SelectItem key="cuatrimestre">cuatrimestre</SelectItem>
                        <SelectItem key="semestre">semestre</SelectItem>
                      </Select>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                      <Select
                        label="Modalidad"
                        selectedKeys={modality ? [modality] : []}
                        onSelectionChange={(keys) =>
                          setModality(Array.from(keys)[0] || "")
                        }
                      >
                        <SelectItem key="">{`(opcional)`}</SelectItem>
                        {MODALITIES.map((m) => (
                          <SelectItem key={m}>{m}</SelectItem>
                        ))}
                      </Select>
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

                    {/* Duraciones */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="text-sm text-foreground-500">
                        Agregar duración por nivel
                      </label>
                      <div className="flex gap-2 mt-2">
                        <Select
                          aria-label="Nivel…"
                          placeholder="Nivel…"
                          selectedKeys={tmpLevel ? [tmpLevel] : []}
                          onSelectionChange={(keys) =>
                            setTmpLevel(Array.from(keys)[0] || "")
                          }
                          className="w-1/2"
                        >
                          <SelectItem key="">{`Nivel…`}</SelectItem>
                          {LEVELS.map((x) => (
                            <SelectItem key={x}>{x}</SelectItem>
                          ))}
                        </Select>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Términos"
                          value={tmpTerms}
                          onChange={(e) => setTmpTerms(e.target.value)}
                          className="w-1/3"
                          variant="bordered"
                        />
                        <Button
                          variant="bordered"
                          type="button"
                          onPress={addDuration}
                        >
                          Añadir
                        </Button>
                      </div>
                      <div className="text-tiny text-foreground-500 mt-1">
                        Ej.: {'{ level: "TSU", terms: 6 }'}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <label className="text-sm text-foreground-500">
                        Duraciones añadidas
                      </label>
                      <div className="mt-2 space-y-2">
                        {duration_terms.length ? (
                          duration_terms.map((d) => (
                            <div
                              key={d.level}
                              className="flex items-center justify-between rounded-medium border border-default-200 px-3 py-2"
                            >
                              <span>
                                {d.level}: {d.terms}
                              </span>
                              <Button
                                size="sm"
                                variant="flat"
                                color="danger"
                                onPress={removeDuration(d.level)}
                              >
                                Quitar
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-foreground-400">
                            Sin elementos
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Imagen */}
                    <div className="col-span-12 md:col-span-6">
                      <label className="text-sm text-foreground-500">
                        Imagen de la carrera
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="mt-2 block w-full rounded-medium border border-default-200 px-3 py-2 bg-content2"
                      />
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
                      to="/admin/careers"
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
                      Crear carrera
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

export default CarrerasStore;
