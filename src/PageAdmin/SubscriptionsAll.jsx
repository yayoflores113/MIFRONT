// SubscriptionsAll.jsx — mismo diseño que el resto del admin, lógica intacta
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Config from "../Config";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Divider,
} from "@heroui/react";
import { CreditCardIcon, PlusIcon } from "@heroicons/react/24/outline";

const SubscriptionsAll = () => {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const load = async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Config.getSubscriptionsAll({ page: p });
      setItems(
        Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
      );
      setMeta(data?.meta || null);
      setPage(p);
    } catch {
      setError("No se pudo cargar el listado de suscripciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta suscripción definitivamente?")) return;
    try {
      await Config.deleteSubscription(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch {
      alert("No se pudo eliminar. Revisa tu conexión o permisos.");
    }
  };

  const canPrev = meta && meta.current_page > 1;
  const canNext = meta && meta.current_page < meta.last_page;

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
                  Suscripciones
                </h1>
                <p className="text-gray-500 text-sm">
                  Administrar suscripciones de usuarios
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/subscriptions/create"
                color="primary"
                className="bg-[#2CBFF0]"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Agregar suscripción
              </Button>
            </div>

            {error && (
              <Chip color="danger" variant="flat" className="mb-3">
                {error}
              </Chip>
            )}

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <CreditCardIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">
                  Gestión de Suscripciones
                </h2>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                <Table
                  aria-label="Listado de Suscripciones"
                  removeWrapper
                  bottomContent={loading ? "Cargando..." : null}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>USER</TableColumn>
                    <TableColumn>PLAN</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>INICIO</TableColumn>
                    <TableColumn>FIN</TableColumn>
                    <TableColumn>TRIAL</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody emptyContent={!loading ? "Sin registros" : null}>
                    {items.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.user_id}</TableCell>
                        <TableCell>
                          {s.plan?.name || s.plan_id || "-"}
                        </TableCell>
                        <TableCell>{s.status}</TableCell>
                        <TableCell>{s.current_period_start || "-"}</TableCell>
                        <TableCell>{s.current_period_end || "-"}</TableCell>
                        <TableCell>{s.trial_ends_at || "-"}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/subscriptions/${s.id}/edit`}
                              color="primary"
                              size="sm"
                              radius="sm"
                              variant="flat"
                            >
                              Editar
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              radius="sm"
                              onPress={() => onDelete(s.id)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {meta && (
                  <>
                    <Divider className="mt-2" />
                    <div className="flex items-center justify-between mt-3 px-4 pb-4">
                      <span className="text-foreground-500 text-sm">
                        Página {meta.current_page} de {meta.last_page}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="bordered"
                          size="sm"
                          radius="sm"
                          isDisabled={!canPrev}
                          onPress={() => canPrev && load(page - 1)}
                        >
                          ← Anterior
                        </Button>
                        <Button
                          variant="bordered"
                          size="sm"
                          radius="sm"
                          isDisabled={!canNext}
                          onPress={() => canNext && load(page + 1)}
                        >
                          Siguiente →
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsAll;
