// PlanesStore.jsx — mismo diseño que el resto del admin, lógica intacta
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
  Divider,
} from "@heroui/react";
import {
  RectangleStackIcon,
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

const CTA_TYPES = ["trial", "subscribe", "contact"]; // validar cta_type
const INTERVALS = ["month", "year"]; // validar interval
const CURRENCIES = ["MXN", "USD", "EUR"];

const PlanesStore = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [cta_type, setCtaType] = useState("trial");
  const [cta_label, setCtaLabel] = useState("");
  const [price_cents, setPriceCents] = useState("");
  const [currency, setCurrency] = useState("MXN");
  const [interval, setInterval] = useState("month");
  const [featuresText, setFeaturesText] = useState("");
  const [stripe_product_id, setStripeProductId] = useState("");
  const [stripe_price_id, setStripePriceId] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [trial_days, setTrialDays] = useState("");
  const [sort_order, setSortOrder] = useState("");
  const [is_featured, setIsFeatured] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const features = featuresText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const payload = {
      name,
      slug: slug || slugify(name),
      subtitle: subtitle || undefined,
      description: description || undefined,
      cta_type,
      cta_label: cta_label || undefined,
      price_cents: price_cents === "" ? 0 : Number(price_cents),
      currency,
      interval,
      features: features.length ? features : undefined,
      stripe_product_id: stripe_product_id || undefined,
      stripe_price_id: stripe_price_id || undefined,
      is_active,
      trial_days: trial_days === "" ? undefined : Number(trial_days),
      sort_order: sort_order === "" ? undefined : Number(sort_order),
      is_featured,
    };

    await Config.getPlanesStore(payload); // POST
    navigate("/admin/plans");
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
                  Nuevo plan
                </h1>
                <p className="text-gray-500 text-sm">
                  Crear un registro de plan
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/plans"
                variant="flat"
                startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
              >
                Volver
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <RectangleStackIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Datos del plan</h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Nombre"
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

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="escolar"
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Subtítulo"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Select
                        label="CTA tipo"
                        selectedKeys={cta_type ? [cta_type] : []}
                        onSelectionChange={(keys) =>
                          setCtaType(Array.from(keys)[0] || "")
                        }
                      >
                        {CTA_TYPES.map((x) => (
                          <SelectItem key={x}>{x}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="CTA label"
                        value={cta_label}
                        onChange={(e) => setCtaLabel(e.target.value)}
                        placeholder="Probar gratis / Suscribirme / Contactar"
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
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                      <Select
                        label="Moneda"
                        selectedKeys={currency ? [currency] : []}
                        onSelectionChange={(keys) =>
                          setCurrency(Array.from(keys)[0] || "")
                        }
                      >
                        {CURRENCIES.map((x) => (
                          <SelectItem key={x}>{x}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                      <Select
                        label="Intervalo"
                        selectedKeys={interval ? [interval] : []}
                        onSelectionChange={(keys) =>
                          setInterval(Array.from(keys)[0] || "")
                        }
                      >
                        {INTERVALS.map((x) => (
                          <SelectItem key={x}>{x}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        min={0}
                        label="Trial (días)"
                        value={trial_days}
                        onChange={(e) => setTrialDays(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-3">
                      <Input
                        type="number"
                        min={0}
                        label="Orden"
                        value={sort_order}
                        onChange={(e) => setSortOrder(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-9 flex items-center gap-6">
                      <Checkbox
                        isSelected={is_active}
                        onValueChange={setIsActive}
                      >
                        Activo
                      </Checkbox>
                      <Checkbox
                        isSelected={is_featured}
                        onValueChange={setIsFeatured}
                      >
                        Destacado
                      </Checkbox>
                    </div>

                    <div className="col-span-12">
                      <Textarea
                        label="Descripción"
                        minRows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12">
                      <Textarea
                        label="Features (1 por línea)"
                        minRows={4}
                        value={featuresText}
                        onChange={(e) => setFeaturesText(e.target.value)}
                        placeholder={
                          "Acceso a más de 10,000 cursos\nRecomendaciones centradas en objetivos\n..."
                        }
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Stripe product ID"
                        value={stripe_product_id}
                        onChange={(e) => setStripeProductId(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Stripe price ID"
                        value={stripe_price_id}
                        onChange={(e) => setStripePriceId(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                  </div>

                  <Divider />

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                      as={Link}
                      to="/admin/plans"
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
                      Crear plan
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

export default PlanesStore;
