// UserUpdate.jsx — mismo diseño que UserAll.jsx, sin cambiar tu lógica
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@heroui/react";
import {
  ArrowUturnLeftIcon,
  CheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const UserUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserById = async () => {
      Config.getUserById(id).then(({ data }) => {
        setName(data.name);
      });
    };
    getUserById();
  }, []); // misma dependencia

  const submitUpdate = async (e) => {
    e.preventDefault();
    await Config.getUserUpdate({ name }, id);
    navigate("/admin/users");
  };

  return (
    <div className="bg-content1 min-h-screen">
      {/* Sidebar fixed (no se toca) */}
      <Sidebar />

      {/* Contenido alineado al Sidebar (sin espacio perdido) */}
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
                <h1 className="text-2xl font-bold text-[#181818]">Edit User</h1>
                <p className="text-gray-500 text-sm">Update user information</p>
              </div>
              <Button
                as={Link}
                to="/admin/users"
                variant="flat"
                startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
              >
                Volver
              </Button>
            </div>

            {/* Card principal */}
            <Card isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex items-center gap-3 px-6 py-4">
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
                <h2 className="text-lg font-semibold">Editar usuario</h2>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <form onSubmit={submitUpdate} className="space-y-5 max-w-xl">
                  <Input
                    label="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="bordered"
                    size="md"
                  />

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                      as={Link}
                      to="/admin/users"
                      variant="flat"
                      startContent={<ArrowUturnLeftIcon className="h-5 w-5" />}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      className="bg-[#2CBFF0]"
                      startContent={<CheckIcon className="h-5 w-5" />}
                    >
                      Actualizar User
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

export default UserUpdate;
