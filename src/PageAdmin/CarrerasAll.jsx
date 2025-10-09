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
  Divider,
  Chip,
  Image,
} from "@heroui/react";
import {
  AcademicCapIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CarrerasAll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Config.getCarrerasAll();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("No se pudo cargar el listado de carreras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta carrera definitivamente?")) return;
    try {
      await Config.getCarrerasDestroy(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch {
      alert("No se pudo eliminar. Revisa tu conexión o permisos.");
    }
  };

  const careerImgSrc = (val) => {
    if (!val) return "";
    if (val.startsWith("data:image")) return val;
    if (/^https?:\/\//i.test(val)) return val;

    const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
    const fromAxios = axiosBase ? axiosBase.replace(/\/api\/?.*$/i, "") : "";
    const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
    const backendOrigin = fromAxios || fromEnv || "";

    return backendOrigin
      ? `${backendOrigin.replace(/\/$/, "")}/img/carreras/${val}`
      : `/img/carreras/${val}`;
  };

  const renderLevels = (levels) =>
    Array.isArray(levels) && levels.length ? (
      <div className="flex flex-wrap gap-1">
        {levels.map((lvl) => (
          <Chip key={lvl} size="sm" variant="flat">
            {lvl}
          </Chip>
        ))}
      </div>
    ) : (
      "-"
    );

  const renderDurations = (arr) =>
    Array.isArray(arr) && arr.length ? (
      <div className="flex flex-wrap gap-1">
        {arr.map((d) => (
          <Chip key={d.level} size="sm" variant="flat">
            {d.level}: {d.terms}
          </Chip>
        ))}
      </div>
    ) : (
      "-"
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
                <h1 className="text-2xl font-bold text-[#181818]">Carreras</h1>
                <p className="text-gray-500 text-sm">
                  Administrar carreras registradas
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/careers/create"
                color="primary"
                className="bg-[#2CBFF0]"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Agregar carrera
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <AcademicCapIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Gestión de Carreras</h2>
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
                  aria-label="Listado de Carreras"
                  removeWrapper
                  bottomContent={loading ? "Cargando..." : null}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>UNIVERSIDAD</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>SLUG</TableColumn>
                    <TableColumn>NIVEL MÁX.</TableColumn>
                    <TableColumn>NIVELES</TableColumn>
                    <TableColumn>ÁREA</TableColumn>
                    {/* NUEVO */}
                    <TableColumn>DIVISIÓN</TableColumn>
                    <TableColumn>DURACIONES</TableColumn>
                    <TableColumn>UNIDAD</TableColumn>
                    <TableColumn>MODALIDAD</TableColumn>
                    <TableColumn>FOTO</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody emptyContent={!loading ? "Sin registros" : null}>
                    {items.map((careers) => (
                      <TableRow key={careers.id}>
                        <TableCell>{careers.id}</TableCell>
                        <TableCell>{careers.university_id}</TableCell>
                        <TableCell>{careers.name}</TableCell>
                        <TableCell>{careers.slug || "-"}</TableCell>
                        <TableCell>{careers.level || "-"}</TableCell>
                        <TableCell>{renderLevels(careers.levels)}</TableCell>
                        <TableCell>{careers.area || "-"}</TableCell>
                        {/* NUEVO */}
                        <TableCell>{careers.division || "-"}</TableCell>
                        <TableCell>
                          {renderDurations(careers.duration_terms)}
                        </TableCell>
                        <TableCell>{careers.terms_unit || "-"}</TableCell>
                        <TableCell>{careers.modality || "-"}</TableCell>

                        <TableCell>
                          {careers.career_url ? (
                            <Image
                              alt={careers.name}
                              src={careerImgSrc(careers.career_url)}
                              className="w-[72px] h-[48px] object-cover"
                              radius="sm"
                              removeWrapper
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/careers/${careers.id}/edit`}
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
                              onPress={() => onDelete(careers.id)}
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

export default CarrerasAll;
