// CursosAll.jsx — versión con cursos estáticos
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
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

  // Tus 20 cursos estáticos
  const staticCourses = [
    "Desarrollo Web con PHP",
    "Fundamentos de Python",
    "UX Research y Testing",
    "Design Systems Profesionales",
    "Prototipado y Animaciones",
    "Figma de Cero a Experto",
    "Teoría del Color y Tipografía",
    "Fundamentos de Diseño UI",
    "Deep Learning con TensorFlow",
    "Machine Learning con Scikit-learn",
    "Visualización de Datos",
    "Pandas y NumPy Avanzado",
    "Matemáticas para Data Science",
    "Python para Principiantes",
    "Deployment y DevOps",
    "APIs RESTful Profesionales",
    "Bases de Datos SQL y NoSQL",
    "Node.js y Express Backend",
    "React.js Moderno",
    "JavaScript Fundamental",
    "HTML y CSS Desde Cero",
  ];

  useEffect(() => {
    // Convertimos la lista a objetos como los que usa tu tabla
    const formatted = staticCourses.map((title, i) => ({
      id: i + 1,
      career_id: "-",
      title,
      card_image_url: "", // sin imagen
      level: "Básico",
      difficulty: "Normal",
      hours: "10",
      provider: "Interno",
      rating_avg: "5.0",
    }));

    setItems(formatted);
  }, []);

  const onDelete = (id) => {
    if (!window.confirm("¿Eliminar este curso?")) return;
    setItems((prev) => prev.filter((c) => c.id !== id));
  };

  // Mantengo tu función por si luego agregas imágenes
  const cardImgSrc = (val) => val || "";

  return (
    <div className="bg-content1 min-h-screen">
      <Sidebar />

      <div className="px-4 ml-20 md:ml-64 transition-[margin] duration-300">
        <div className="py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 p-0 sm:p-2"
          >
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

            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <BookOpenIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Gestión de Cursos</h2>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                <Table aria-label="Listado de Cursos" removeWrapper>
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

                  <TableBody emptyContent="Sin registros">
                    {items.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.id}</TableCell>
                        <TableCell>{c.career_id}</TableCell>
                        <TableCell>{c.title}</TableCell>

                        <TableCell>
                          {c.card_image_url ? (
                            <Image
                              alt={c.title}
                              src={cardImgSrc(c.card_image_url)}
                              className="w-[95px] h-[60px] object-cover"
                              radius="sm"
                              removeWrapper
                            />
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell>{c.level}</TableCell>
                        <TableCell>{c.difficulty}</TableCell>
                        <TableCell>{c.hours}</TableCell>
                        <TableCell>{c.provider}</TableCell>
                        <TableCell>{c.rating_avg}</TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/courses/${c.id}/edit`}
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
                              onPress={() => onDelete(c.id)}
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
