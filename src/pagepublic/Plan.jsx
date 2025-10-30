import React from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Skeleton,
  Tooltip,
  Divider,
} from "@heroui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Config from "../Config";

// Helper para stripe checkout
const apiOrigin = () => {
  const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
  const fromAxiosOrigin = axiosBase
    ? axiosBase.replace(/\/api\/?.*$/i, "")
    : "";
  const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
  const backendOrigin = (fromAxiosOrigin || fromEnv || "").replace(/\/$/, "");
  return backendOrigin || "";
};

// utilidades pequeñas y limpias
const cn = (...xs) => xs.filter(Boolean).join(" ");
const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
const currencyFmt = (amount, currency = "MXN", locale = "es-MX") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    (Number(amount) || 0) / 100
  );

// ---- Tarjeta de Plan (UI minimalista) ----
const PlanCard = ({ plan, i }) => {
  const [loadingCheckout, setLoadingCheckout] = React.useState(false);
  const isFeatured = !!plan.is_featured;
  const hasTrial = Number(plan.trial_days || 0) > 0;
  const price = currencyFmt(plan.price_cents, plan.currency || "MXN");

  // Stripe Checkout
  const handlePlanCheckout = async () => {
    try {
      setLoadingCheckout(true);

      // 1. Asegurar cookie CSRF
      await ensureSanctum();

      const slug = plan.slug;
      const frontendUrl = window.location.origin;

      // 2. Preparar datos del checkout
      const body = {
        mode: "payment",
        amount_cents: Number(plan.price_cents || 0),
        currency: (plan.currency || "MXN").toUpperCase(),
        product_name: plan.name || "Plan",
        success_url: `${frontendUrl}/plans?status=success&plan=${slug}`,
        cancel_url: `${frontendUrl}/plans?status=cancel&plan=${slug}`,
        metadata: {
          kind: "plan",
          plan_id: plan.id,
          plan_slug: slug,
          interval: plan.interval || "month",
        },
      };

      // 3. Hacer petición con axios (NO fetch)
      const { data } = await axios.post("/api/v1/checkout", body);

      // 4. Redirigir a Stripe
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe checkout error:", data);
        alert("No se pudo iniciar el pago del plan. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en handlePlanCheckout:", error);
      alert(
        "Ocurrió un error al procesar el pago. Por favor, intenta de nuevo."
      );
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: i * 0.04, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        shadow="sm"
        className={cn(
          "relative h-full border",
          "rounded-2xl transition-all duration-200",
          "bg-white/90 backdrop-blur",
          isFeatured ? "border-[#2CBFF0]" : "border-default-200",
          "hover:shadow-lg hover:-translate-y-0.5 hover:border-[#2CBFF0]"
        )}
      >
        <CardBody className="p-7 flex flex-col">
          {/* Header */}
          <div className="mb-5 text-center">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#181818]">
              {plan.name}
            </h3>
            {plan.subtitle && (
              <p className="text-sm text-default-600 mt-1 leading-relaxed">
                {plan.subtitle}
              </p>
            )}
          </div>

          {/* Precio */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-end gap-1">
              <span className="text-4xl font-black leading-none text-[#181818]">
                {price}
              </span>
              {plan.interval && (
                <span className="text-sm text-gray-500 mb-[2px]">
                  / {plan.interval}
                </span>
              )}
            </div>
            {hasTrial && (
              <p className="text-xs text-[#2CBFF0] mt-2">
                Prueba gratis {plan.trial_days} días
              </p>
            )}
          </div>

          {!!plan.description && (
            <>
              <p className="text-sm text-default-600 text-center mb-5">
                {plan.description}
              </p>
              <Divider className="mb-5" />
            </>
          )}

          {/* Features */}
          {!!plan.features?.length && (
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[0.95rem]">
                  <CheckCircleIcon className="w-5 min-w-5 mt-[2px] text-[#2CBFF0]" />
                  <span className="text-[#181818] leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA con loading */}
          <Tooltip
            content={
              plan.cta_type === "trial"
                ? "Empieza tu prueba gratis"
                : "Continuar"
            }
            placement="bottom"
          >
            <Button
              className="bg-[#2CBFF0] text-white font-semibold h-11 rounded-xl"
              fullWidth
              aria-label={plan.cta_label || "Continuar"}
              onPress={handlePlanCheckout}
              isLoading={loadingCheckout} // ← Agregar
              isDisabled={loadingCheckout} // ← Agregar
            >
              {loadingCheckout
                ? "Procesando..."
                : plan.cta_label || "Continuar"}
            </Button>
          </Tooltip>
        </CardBody>
      </Card>
    </motion.div>
  );
};

// ---- Skeleton (carga) ----
const LoadingSkeleton = () => (
  <Card className="h-full border border-default-200 rounded-2xl">
    <CardBody className="p-7">
      <Skeleton className="h-7 w-1/2 rounded-lg mb-2" />
      <Skeleton className="h-4 w-2/3 rounded-lg mb-5" />
      <Skeleton className="h-9 w-1/3 rounded-lg mb-6" />
      <div className="space-y-2.5 mb-6">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-11/12 rounded-lg" />
        <Skeleton className="h-4 w-10/12 rounded-lg" />
      </div>
      <Skeleton className="h-11 w-full rounded-xl" />
    </CardBody>
  </Card>
);

/**
 * Listado de Planes (centrado, minimalista)
 * - Mobile: 1 col
 * - md: 2 cols
 * - lg: 3 cols
 *
 * Props:
 * - plans: array (si lo pasas, NO fetchea)
 * - quantity: cuántos pedir si fetchea (default 4; renderiza hasta 3 en desktop para foco)
 */
const Plan = ({ plans: plansProp, quantity = 4 }) => {
  const [plans, setPlans] = React.useState(plansProp || []);
  const [loading, setLoading] = React.useState(!plansProp);
  const [error, setError] = React.useState("");

  // Fetch desde API pública usando Config
  React.useEffect(() => {
    if (plansProp) return;
    let active = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await Config.getPlans(quantity);
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.plans)
          ? data.plans
          : [];

        if (!active) return;
        setPlans(list);
      } catch {
        if (!active) return;
        setError("No se pudieron cargar los planes.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [plansProp, quantity]);

  // Orden (destacado primero) y límite visual a 3 para layout más limpio
  const sorted = React.useMemo(() => {
    const list = [...plans];
    list.sort((a, b) => {
      if (!!b.is_featured - !!a.is_featured !== 0)
        return !!b.is_featured - !!a.is_featured;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
    return list.slice(0, 3);
  }, [plans]);

  return (
    <section className="bg-[#FEFEFE] text-[#181818] py-16">
      {/* Hero centrado con copy corto */}
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-3xl md:text-4xl font-black tracking-tight"
        >
          Elige tu plan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.06 }}
          className="text-default-600 mt-3"
        >
          Planes claros, justos y listos para empezar. Sin ruido visual, solo lo
          esencial.
        </motion.p>
      </div>

      {/* Mensaje de error */}
      {!!error && (
        <div className="max-w-xl mx-auto text-center text-sm text-red-500 mt-6">
          {error}
        </div>
      )}

      {/* Grid centrada y contenida */}
      <div className="w-full px-6 mt-10">
        <div
          className={cn(
            "grid gap-6",
            "grid-cols-1",
            "md:grid-cols-2", // ✅ siempre 2 columnas en desktop
            "justify-center", // ✅ centra el “track” del grid
            "max-w-5xl mx-auto" // ✅ limita ancho y lo centra
          )}
        >
          {loading
            ? Array.from({ length: clamp(quantity, 1, 2) }).map((_, i) => (
                <LoadingSkeleton key={`s-${i}`} />
              ))
            : sorted.slice(0, 2).map(
                (
                  plan,
                  i // muestra 2 cards
                ) => <PlanCard key={plan.id ?? i} plan={plan} i={i} />
              )}
        </div>
      </div>
    </section>
  );
};

export default Plan;
