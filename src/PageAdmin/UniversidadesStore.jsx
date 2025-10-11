// UniversidadesStore.jsx — mismo diseño que UserAll/UserUpdate, sin cambiar tu lógica
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Divider,
  Image,
} from "@heroui/react";
import {
  AcademicCapIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// helper local para generar slugs (sin cambios)
const slugify = (txt) =>
  txt
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const UniversidadesStore = () => {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [slug, setSlug] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [logo_url, setLogo_url] = useState("");
  const [established_year, setEstablished_year] = useState("");
  const [orden, setOrden] = useState("");
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (ev) => {
      setLogo_url(ev.target.result);
    };
    const url = URL.createObjectURL(files[0]);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const submitStore = async (e) => {
    e.preventDefault();
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
    const hasBase64 =
      logo_url &&
      typeof logo_url === "string" &&
      logo_url.startsWith("data:image/");
    if (hasBase64) {
      payload.logo_base64 = logo_url;
    }
    const { data: created } = await Config.getUniversidadesStore(payload);
    // (mantengo tu comentario/lógica tal cual)
    // 2) Si hubo imagen, hacemos UPDATE inmediato para que el backend guarde el archivo
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
            {/* Header de página */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#181818]">
                  Nueva Universidad
                </h1>
                <p className="text-gray-500 text-sm">
                  Crear un registro de universidad
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

            {/* Card principal del formulario */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <AcademicCapIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">
                  Datos de la Universidad
                </h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submitStore} className="space-y-4">
                  {/* fila 1: name + orden */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-8">
                      <Input
                        label="Nombre de la Universidad"
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

                  {/* fila 2: acronym */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Acrónimo"
                        value={acronym}
                        onChange={(e) => setAcronym(e.target.value)}
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

                  {/* imagen + preview (misma lógica) */}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleInputChange}
                      variant="bordered"
                      label="Imagen"
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
                      Crear Universidad
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

export default UniversidadesStore;
