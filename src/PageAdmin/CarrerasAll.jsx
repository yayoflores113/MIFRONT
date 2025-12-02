import React from "react";
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
  Divider,
  Chip,
} from "@heroui/react";
import {
  AcademicCapIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const CarrerasAll = () => {
  // Carreras estáticas
  const items = [
    {
      id: 1,
      university_id: "UTM",
      name: "Ingenieria en desarrollo y gestion de software",
      slug: "ingenieria-desarrollo-gestion-software",
      level: "Ingeniería",
      levels: ["Licenciatura"],
      area: "Tecnologías de la Información",
      division: "TI",
      duration_terms: [{ level: "Ingeniería", terms: "9 cuatrimestres" }],
      terms_unit: "Cuatrimestres",
      modality: "Presencial",
      career_url: "",
    },
    {
      id: 2,
      university_id: "UTM",
      name: "Ingenieria en entornos virtuales y negocios digitales",
      slug: "ingenieria-entornos-virtuales-negocios-digitales",
      level: "Ingeniería",
      levels: ["Licenciatura"],
      area: "Tecnologías de la Información",
      division: "TI",
      duration_terms: [{ level: "Ingeniería", terms: "9 cuatrimestres" }],
      terms_unit: "Cuatrimestres",
      modality: "Presencial",
      career_url: "",
    },
    {
      id: 3,
      university_id: "UTM",
      name: "Ingenieria en redes inteligentes y en ciberceguridad",
      slug: "ingenieria-redes-inteligentes-ciberseguridad",
      level: "Ingeniería",
      levels: ["Licenciatura"],
      area: "Tecnologías de la Información",
      division: "TI",
      duration_terms: [{ level: "Ingeniería", terms: "9 cuatrimestres" }],
      terms_unit: "Cuatrimestres",
      modality: "Presencial",
      career_url: "",
    },
    {
      id: 4,
      university_id: "UTM",
      name: "T.S.U en Desarrollo de software",
      slug: "tsu-desarrollo-software",
      level: "TSU",
      levels: ["TSU"],
      area: "Tecnologías de la Información",
      division: "TI",
      duration_terms: [{ level: "TSU", terms: "6 cuatrimestres" }],
      terms_unit: "Cuatrimestres",
      modality: "Presencial",
      career_url: "",
    },
    {
      id: 5,
      university_id: "UTM",
      name: "T.S.U en entornos virtuales y negocioes digitales",
      slug: "tsu-entornos-virtuales-negocios-digitales",
      level: "TSU",
      levels: ["TSU"],
      area: "Tecnologías de la Información",
      division: "TI",
      duration_terms: [{ level: "TSU", terms: "6 cuatrimestres" }],
      terms_unit: "Cuatrimestres",
      modality: "Presencial",
      career_url: "",
    },
    {
      id: 6,
      university_id: "UTM",
      name: "T.S.U en Infraestructura de redes",
      slug: "tsu-infraestructura-redes",
      level: "TSU",
      levels: ["TSU"],
      area: "Tecnologías de la Información",
      division: "TI",
      duration_terms: [{ level: "TSU", terms: "6 cuatrimestres" }],
      terms_unit: "Cuatrimestres",
      modality: "Presencial",
      career_url: "",
    },
  ];

  const renderLevels = (levels) =>
    Array.isArray(levels) ? (
      <div className="flex flex-wrap gap-1">
        {levels.map((l) => (
          <Chip key={l} size="sm" variant="flat">
            {l}
          </Chip>
        ))}
      </div>
    ) : (
      "-"
    );

  const renderDurations = (arr) =>
    Array.isArray(arr) ? (
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
      <Sidebar />

      {/* Contenido */}
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
                  Carreras estáticas de demostración
                </p>
              </div>

              <Button
                as={Link}
                to="#"
                disabled
                className="bg-gray-400 cursor-not-allowed"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Agregar carrera (deshabilitado)
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <AcademicCapIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Listado de Carreras</h2>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                <Table aria-label="Listado de Carreras" removeWrapper>
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>UNIVERSIDAD</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>SLUG</TableColumn>
                    <TableColumn>NIVEL</TableColumn>
                    <TableColumn>NIVELES</TableColumn>
                    <TableColumn>ÁREA</TableColumn>
                    <TableColumn>DIVISIÓN</TableColumn>
                    <TableColumn>DURACIÓN</TableColumn>
                    <TableColumn>UNIDAD</TableColumn>
                    <TableColumn>MODALIDAD</TableColumn>
                  </TableHeader>

                  <TableBody>
                    {items.map((career) => (
                      <TableRow key={career.id}>
                        <TableCell>{career.id}</TableCell>
                        <TableCell>{career.university_id}</TableCell>
                        <TableCell>{career.name}</TableCell>
                        <TableCell>{career.slug}</TableCell>
                        <TableCell>{career.level}</TableCell>
                        <TableCell>{renderLevels(career.levels)}</TableCell>
                        <TableCell>{career.area}</TableCell>
                        <TableCell>{career.division}</TableCell>
                        <TableCell>
                          {renderDurations(career.duration_terms)}
                        </TableCell>
                        <TableCell>{career.terms_unit}</TableCell>
                        <TableCell>{career.modality}</TableCell>
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
