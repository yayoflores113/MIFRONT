// UniversidadesUpdate.jsx — mismo diseño que UserAll/Store, sin cambiar tu lógica
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Image,
  Divider,
} from "@heroui/react";
import {
  AcademicCapIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// helper local para generar slugs (igual al de Store)
const slugify = (txt) =>
  txt
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const UniversidadesUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [slug, setSlug] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [logo_url, setLogo_url] = useState("foto.jpg");
  const [established_year, setEstablished_year] = useState("");
  const [orden, setOrden] = useState("");
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      // limpiar preview si el usuario deselecciona
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (ev) => {
      setLogo_url(ev.target.result);
    };

    // previsualización inmediata con objectURL
    const url = URL.createObjectURL(files[0]);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  // Limpieza del objectURL al desmontar o cambiar
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    const _getUniversidadesUpdate = async () => {
      Config.getUniversidadesById(id).then(({ data }) => {
        setName(data.name);
        setAcronym(data.acronym);
        setSlug(data.slug);
        setCountry(data.country);
        setState(data.state);
        setCity(data.city);
        setWebsite(data.website);
        setDescription(data.description);
        setEstablished_year(data.established_year);
        setOrden(data.orden);
        setLogo_url(data.logo_url ?? "");
      });
    };
    _getUniversidadesUpdate();
  }, [id]);

  const submitUpdate = async (ev) => {
    ev.preventDefault();

    const payload = {
      name,
      acronym,
      slug: slug || slugify(name || ""),
      country,
      state,
      city,
      website,
      description,
      established_year,
      orden,
    };

    if (
      logo_url &&
      typeof logo_url === "string" &&
      logo_url.startsWith("data:image/")
    ) {
      payload.file = logo_url;
      payload.logo_base64 = logo_url;
    }

    await Config.getUniversidadesUpdate(payload, id);
    navigate("/admin/universities");
  };

  return (
    <div className="bg-content1 min-h-screen">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido alineado al Sidebar (sin espacio perdido) */}
      <div className="px-4 ml-20 md:ml-64 transition-[margin] duration-300">
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 p-0 sm:p-2"
          >
            {/* Header de página */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#181818]">
                  Editar Universidad
                </h1>
                <p className="text-gray-500 text-sm">
                  Actualiza la información de la universidad
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/universities"
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
                <h2 className="text-lg font-semibold">
                  Datos de la Universidad
                </h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submitUpdate} className="space-y-4">
                  {/* fila 1: name + orden */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-8">
                      <Input
                        label="Nombre"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (!slug) setSlug(slugify(e.target.value));
                        }}
                        variant="bordered"
                        isRequired
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4 hidden">
                      <Input
                        label="Orden"
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        type="number"
                        min={0}
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* fila 2: acronym + slug */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Acrónimo"
                        value={acronym}
                        onChange={(e) => setAcronym(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* fila 3: country + state + city */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        label="País"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        label="Estado"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        label="Ciudad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* fila 4: website + established_year */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-8">
                      <Input
                        label="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        type="url"
                        variant="bordered"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        label="Año de fundación"
                        value={established_year}
                        onChange={(e) => setEstablished_year(e.target.value)}
                        type="number"
                        variant="bordered"
                      />
                    </div>
                  </div>

                  {/* descripción */}
                  <Textarea
                    label="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="bordered"
                  />

                  {/* imagen (estructura original + preview debajo del Input) */}
                  <div className="space-y-2">
                    {logo_url && !logo_url.startsWith("data:image/") && (
                      <Image
                        src={`/img/universidades/${logo_url}`}
                        alt="Logo actual"
                        radius="md"
                        shadow="sm"
                        className="max-w-xs"
                      />
                    )}
                    <Input
                      type="file"
                      variant="bordered"
                      label="Imagen"
                      onChange={handleInputChange}
                    />
                    {preview && (
                      <Image
                        alt="preview"
                        src={preview}
                        radius="sm"
                        className="max-w-[220px]"
                      />
                    )}
                  </div>

                  <Divider />

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                      as={Link}
                      to="/admin/universities"
                      variant="flat"
                      startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
                    >
                      Cancelar
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

export default UniversidadesUpdate;
