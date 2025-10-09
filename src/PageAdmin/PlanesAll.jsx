// PlanesAll.jsx — mismo diseño que el resto del admin, lógica intacta
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
import {
  RectangleStackIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// === misma función de tu archivo ===
const fmtMoney = (currency, cents) => {
  const n = Number(cents ?? 0) / 100;
  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency || "MXN",
    }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency || "MXN"}`;
  }
};

const PlanesAll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Config.getPlanesAll(); // GET /admin/plans
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("No se pudo cargar el listado de planes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar este plan definitivamente?")) return;
    try {
      await Config.getPlanesDestroy(id); // DELETE /admin/plans/{id}
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch {
      alert("No se pudo eliminar. Revisa tu conexión o permisos.");
    }
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
                <h1 className="text-2xl font-bold text-[#181818]">Planes</h1>
                <p className="text-gray-500 text-sm">
                  Administrar planes disponibles
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/plans/create"
                color="primary"
                className="bg-[#2CBFF0]"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Agregar plan
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <RectangleStackIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Gestión de Planes</h2>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                {error && (
                  <div className="px-6 pt-4">
                    <Chip color="danger" variant="flat">
                      {error}
                    </Chip>
                  </div>
                )}

                <Table
                  aria-label="Listado de Planes"
                  removeWrapper
                  bottomContent={loading ? "Cargando..." : null}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>SLUG</TableColumn>
                    <TableColumn>PRECIO</TableColumn>
                    <TableColumn>INTERVALO</TableColumn>
                    <TableColumn>CTA</TableColumn>
                    <TableColumn>DESTACADO</TableColumn>
                    <TableColumn>ORDEN</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody emptyContent={!loading ? "Sin registros" : null}>
                    {items.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.slug || "-"}</TableCell>
                        <TableCell>
                          {fmtMoney(p.currency, p.price_cents)}
                        </TableCell>
                        <TableCell>{p.interval}</TableCell>
                        <TableCell>{p.cta_type || "-"}</TableCell>
                        <TableCell>{p.is_featured ? "Sí" : "No"}</TableCell>
                        <TableCell>{p.sort_order ?? "-"}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/plans/${p.id}/edit`}
                              color="primary"
                              size="sm"
                              startContent={
                                <PencilSquareIcon className="h-4 w-4" />
                              }
                            >
                              Editar
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              startContent={<TrashIcon className="h-4 w-4" />}
                              onPress={() => onDelete(p.id)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlanesAll;
