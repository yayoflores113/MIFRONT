// CursosAll.jsx — mismo diseño que Users/Universidades/Carreras, sin cambiar tu lógica
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
  Image,
} from "@heroui/react";
import {
  BookOpenIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CursosAll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Config.getCursosAll(); // GET /admin/courses
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudo cargar el listado de cursos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar este curso definitivamente?")) return;
    try {
      await Config.getCursosDestroy(id); // DELETE /admin/courses/{id}
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch {
      alert("No se pudo eliminar. Revisa tu conexión o permisos.");
    }
  };

  // Resuelve la imagen de portada:
  // - base64 o URL absoluta → usar tal cual
  // - nombre de archivo → /img/cursos/{archivo} en el backend
  const cardImgSrc = (val) => {
    if (!val) return "";
    if (val.startsWith("data:image")) return val;
    if (/^https?:\/\//i.test(val)) return val;

    const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
    const fromAxios = axiosBase ? axiosBase.replace(/\/api\/?.*$/i, "") : "";
    const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
    const backendOrigin = fromAxios || fromEnv || "";

    return backendOrigin
      ? `${backendOrigin.replace(/\/$/, "")}/img/cursos/${val}`
      : `/img/cursos/${val}`;
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
                <h1 className="text-2xl font-bold text-[#181818]">Cursos</h1>
                <p className="text-gray-500 text-sm">
                  Administrar cursos registrados
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/courses/create"
                color="primary"
                className="bg-[#2CBFF0]"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Agregar curso
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <BookOpenIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Gestión de Cursos</h2>
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
                  aria-label="Listado de Cursos"
                  removeWrapper
                  bottomContent={loading ? "Cargando..." : null}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>CARRERA</TableColumn>
                    <TableColumn>TÍTULO</TableColumn>
                    <TableColumn>FOTO</TableColumn>
                    <TableColumn>NIVEL</TableColumn>
                    <TableColumn>DIFICULTAD</TableColumn>
                    <TableColumn>HORAS</TableColumn>
                    <TableColumn>PROVIDER</TableColumn>
                    <TableColumn>RATING</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody emptyContent={!loading ? "Sin registros" : null}>
                    {items.map((courses) => (
                      <TableRow key={courses.id}>
                        <TableCell>{courses.id}</TableCell>
                        <TableCell>{courses.career_id}</TableCell>
                        <TableCell>{courses.title}</TableCell>

                        {/* Portada 96x60 */}
                        <TableCell>
                          {courses.card_image_url ? (
                            <Image
                              alt={courses.title}
                              src={cardImgSrc(courses.card_image_url)}
                              className="w-[95px] h-[60px] object-cover"
                              radius="sm"
                              removeWrapper
                            />
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell>{courses.level || "-"}</TableCell>
                        <TableCell>{courses.difficulty || "-"}</TableCell>
                        <TableCell>{courses.hours ?? "-"}</TableCell>
                        <TableCell>{courses.provider || "-"}</TableCell>
                        <TableCell>{courses.rating_avg ?? "—"}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/courses/${courses.id}/edit`}
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
                              onPress={() => onDelete(courses.id)}
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

export default CursosAll;
