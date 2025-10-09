// UniversidadesAll.jsx — mismo diseño que UserAll.jsx, sin cambiar tu lógica
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Config from "../Config";
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
  Image,
} from "@heroui/react";

import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const UniversidadesAll = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    getUniversidadesAll();
  }, []);

  const getUniversidadesAll = async () => {
    const response = await Config.getUniversidadesAll();
    setUniversities(response.data);
  };

  const _deleteUniversidadesById = async (id) => {
    const isDelete = window.confirm("Borrar Universidad ?");
    if (isDelete) {
      await Config.getUniversidadesDeleteById(id);
      getUniversidadesAll();
    }
  };

  // Helper para resolver logo_url
  const logoImgSrc = (val) => {
    if (!val) return "";
    if (val.startsWith("data:image")) return val;
    if (/^https?:\/\//i.test(val)) return val;

    const axiosBase = (window?.axios?.defaults?.baseURL || "").trim();
    const fromAxios = axiosBase ? axiosBase.replace(/\/api\/?.*$/i, "") : "";
    const fromEnv = (import.meta?.env?.VITE_BACKEND_URL || "").trim();
    const backendOrigin = fromAxios || fromEnv || "";

    return backendOrigin
      ? `${backendOrigin.replace(/\/$/, "")}/img/universidades/${val}`
      : `/img/universidades/${val}`;
  };

  return (
    <div className="bg-content1 min-h-screen">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido alineado al sidebar */}
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

            {/* Card principal */}
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
                    <TableColumn>LOGO</TableColumn>
                    <TableColumn>ACRÓNIMO</TableColumn>
                    <TableColumn>SLUG</TableColumn>
                    <TableColumn>PAÍS</TableColumn>
                    <TableColumn>ESTADO</TableColumn>
                    <TableColumn>CIUDAD</TableColumn>
                    <TableColumn>WEBSITE</TableColumn>
                    <TableColumn>DESCRIPCIÓN</TableColumn>
                    <TableColumn>AÑO DE FUNDACIÓN</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody emptyContent="Sin registros">
                    {!universities ? (
                      <TableRow>
                        <TableCell colSpan={12}>...loading</TableCell>
                      </TableRow>
                    ) : (
                      universities.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>{u.id}</TableCell>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>
                            {u.logo_url ? (
                              <Image
                                alt={u.name}
                                src={logoImgSrc(u.logo_url)}
                                className="object-cover"
                                radius="sm"
                                removeWrapper
                              />
                            ) : (
                              "-"
                            )}
                          </TableCell>
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
                          <TableCell className="max-w-[320px] whitespace-pre-wrap">
                            {u.description}
                          </TableCell>
                          <TableCell>{u.established_year}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2 text-nowrap">
                              <Button
                                as={Link}
                                to={`/admin/universities/edit/${u.id}`}
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
                                onPress={() => _deleteUniversidadesById(u.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
