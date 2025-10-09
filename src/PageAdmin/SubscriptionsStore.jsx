// SubscriptionsStore.jsx — mismo diseño que el resto del admin, lógica intacta
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
  Select,
  SelectItem,
  Textarea,
  Divider,
} from "@heroui/react";
import {
  CreditCardIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const STATUSES = ["incomplete", "active", "past_due", "canceled", "unpaid"]; // válidos

const SubscriptionsStore = () => {
  const navigate = useNavigate();

  const [user_id, setUserId] = useState("");
  const [plan_id, setPlanId] = useState("");
  const [stripe_customer_id, setStripeCustomerId] = useState("");
  const [stripe_subscription_id, setStripeSubscriptionId] = useState("");
  const [status, setStatus] = useState("active");
  const [trial_ends_at, setTrialEndsAt] = useState("");
  const [current_period_start, setCps] = useState("");
  const [current_period_end, setCpe] = useState("");
  const [cancel_at, setCancelAt] = useState("");
  const [canceled_at, setCanceledAt] = useState("");
  const [metaText, setMetaText] = useState(""); // JSON

  const submit = async (e) => {
    e.preventDefault();
    let meta;
    if (metaText.trim()) {
      try {
        meta = JSON.parse(metaText);
      } catch {
        alert("Meta debe ser JSON válido");
        return;
      }
    }
    const payload = {
      user_id: Number(user_id),
      plan_id: plan_id ? Number(plan_id) : undefined,
      stripe_customer_id: stripe_customer_id || undefined,
      stripe_subscription_id: stripe_subscription_id || undefined,
      status,
      trial_ends_at: trial_ends_at || undefined,
      current_period_start: current_period_start || undefined,
      current_period_end: current_period_end || undefined,
      cancel_at: cancel_at || undefined,
      canceled_at: canceled_at || undefined,
      meta,
    };
    await Config.createSubscription(payload);
    navigate("/admin/subscriptions");
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
                  Nueva suscripción
                </h1>
                <p className="text-gray-500 text-sm">
                  Crear un registro de suscripción
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/subscriptions"
                variant="flat"
                startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
              >
                Volver
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <CreditCardIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">
                  Datos de la suscripción
                </h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="number"
                        label="User ID"
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                        isRequired
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="number"
                        label="Plan ID"
                        value={plan_id}
                        onChange={(e) => setPlanId(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Select
                        label="Status"
                        selectedKeys={status ? [status] : []}
                        onSelectionChange={(keys) =>
                          setStatus(Array.from(keys)[0] || "")
                        }
                      >
                        {STATUSES.map((s) => (
                          <SelectItem key={s}>{s}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Stripe customer ID"
                        value={stripe_customer_id}
                        onChange={(e) => setStripeCustomerId(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        label="Stripe subscription ID"
                        value={stripe_subscription_id}
                        onChange={(e) =>
                          setStripeSubscriptionId(e.target.value)
                        }
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="date"
                        label="Trial hasta"
                        value={trial_ends_at}
                        onChange={(e) => setTrialEndsAt(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="date"
                        label="Periodo inicio"
                        value={current_period_start}
                        onChange={(e) => setCps(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Input
                        type="date"
                        label="Periodo fin"
                        value={current_period_end}
                        onChange={(e) => setCpe(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="date"
                        label="Cancel at"
                        value={cancel_at}
                        onChange={(e) => setCancelAt(e.target.value)}
                        variant="bordered"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <Input
                        type="date"
                        label="Canceled at"
                        value={canceled_at}
                        onChange={(e) => setCanceledAt(e.target.value)}
                        variant="bordered"
                      />
                    </div>

                    <div className="col-span-12">
                      <Textarea
                        label="Meta (JSON)"
                        minRows={4}
                        value={metaText}
                        onChange={(e) => setMetaText(e.target.value)}
                        placeholder='{"origin":"admin","notes":"..."}'
                        variant="bordered"
                      />
                    </div>
                  </div>

                  <Divider />

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                      as={Link}
                      to="/admin/subscriptions"
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
                      Crear suscripción
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

export default SubscriptionsStore;
