import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import {
  BuildingOfficeIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const UniversidadesAll = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // 🔥 Universidades estáticas solicitadas
    setUniversities([
      {
        id: 1,
        name: "Instituto Tecnológico de Mérida",
        acronym: "ITM",
        slug: "instituto-tecnologico-de-merida",
        country: "México",
        state: "Yucatán",
        city: "Mérida",
        website: "https://www.itmerida.mx",
        established_year: 1961,
        logo_url: "", // vacío
      },
      {
        id: 2,
        name: "Universidad Autónoma de Yucatán",
        acronym: "UADY",
        slug: "universidad-autonoma-de-yucatan",
        country: "México",
        state: "Yucatán",
        city: "Mérida",
        website: "https://www.uady.mx",
        established_year: 1922,
        logo_url: "",
      },
      {
        id: 3,
        name: "Universidad Modelo",
        acronym: "UM",
        slug: "universidad-modelo",
        country: "México",
        state: "Yucatán",
        city: "Mérida",
        website: "https://www.unimodelo.edu.mx",
        established_year: 1910,
        logo_url: "",
      },
      {
        id: 4,
        name: "Universidad Tecnológica Metropolitana",
        acronym: "UTM",
        slug: "universidad-tecnologica-metropolitana",
        country: "México",
        state: "Yucatán",
        city: "Mérida",
        website: "https://www.utmetropolitana.edu.mx",
        established_year: 1999,
        logo_url: "",
      },
      {
        id: 5,
        name: "Universidad Vizcaya de las Américas",
        acronym: "UVA",
        slug: "universidad-vizcaya-de-las-americas",
        country: "México",
        state: "Yucatán",
        city: "Mérida",
        website: "https://www.univizcaya.edu.mx",
        established_year: 2000,
        logo_url: "",
      },
    ]);
  }, []);

  // ❌ Ya no borra en BD — solo elimina del estado
  const _deleteUniversidadesById = (id) => {
    const isDelete = window.confirm("¿Borrar universidad?");
    if (!isDelete) return;

    setUniversities((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-content1 min-h-screen">
      <Sidebar />

      <div className="px-4 ml-20 md:ml-64 transition-[margin] duration-300">
        <div className="py-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#181818]">
                  Universidades
                </h1>
                <p className="text-gray-500 text-sm">
                  Administrar universidades registradas
                </p>
              </div>

              <Button
                as={Link}
                to="/admin/universities/create"
                color="primary"
                className="bg-[#2CBFF0]"
                startContent={<PlusIcon className="h-5 w-5" />}
              >
                Agregar Universidad
              </Button>
            </div>

            {/* Tabla */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">
                  Gestión de Universidades
                </h2>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                <Table aria-label="Listado de Universidades" removeWrapper>
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>ACRÓNIMO</TableColumn>
                    <TableColumn>SLUG</TableColumn>
                    <TableColumn>PAÍS</TableColumn>
                    <TableColumn>ESTADO</TableColumn>
                    <TableColumn>CIUDAD</TableColumn>
                    <TableColumn>WEBSITE</TableColumn>
                    <TableColumn>AÑO</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody>
                    {universities.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.id}</TableCell>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.acronym}</TableCell>
                        <TableCell>{u.slug}</TableCell>
                        <TableCell>{u.country}</TableCell>
                        <TableCell>{u.state}</TableCell>
                        <TableCell>{u.city}</TableCell>
                        <TableCell>
                          <a
                            href={u.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500"
                          >
                            {u.website}
                          </a>
                        </TableCell>
                        <TableCell>{u.established_year}</TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              as={Link}
                              to={`/admin/universities/edit/${u.id}`}
                              size="sm"
                              color="primary"
                              startContent={
                                <PencilSquareIcon className="h-4 w-4" />
                              }
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              startContent={
                                <TrashIcon className="h-4 w-4" />
                              }
                              onPress={() => _deleteUniversidadesById(u.id)}
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

export default UniversidadesAll;
