// UserAll.jsx — mismo componente/lógica, contenedor alineado al Sidebar (menos espacio perdido)
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from "@heroui/react";
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const UserAll = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 🔥 Usuarios estáticos (los que quieres)
    const staticUsers = [
      { id: 1, name: "Juan Pérez", email: "juan@example.com" },
      { id: 2, name: "María López", email: "maria@example.com" },
      { id: 3, name: "Carlos García", email: "carlos@example.com" },
      { id: 4, name: "Ana Torres", email: "ana@example.com" },
    ];

    setUsers(staticUsers);
  }, []);

  const handleDelete = (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!ok) return;

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-content1 min-h-screen">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Alinear al Sidebar */}
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
                <h1 className="text-2xl font-bold text-[#181818]">Usuarios</h1>
                <p className="text-gray-500 text-sm">
                  Administrar Usuarios registrados
                </p>
              </div>
            </div>

            {/* Card principal */}
            <Card className="mb-6" isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-4">
                <h2 className="text-lg font-semibold">User Management</h2>
                <div className="flex w-full sm:w-auto gap-2">
                  <Input
                    placeholder="Search users..."
                    startContent={
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    }
                    size="sm"
                    className="w-full sm:max-w-xs"
                  />
                  <Button variant="flat" size="sm" isIconOnly>
                    <FunnelIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                <Table aria-label="Listado de usuarios" removeWrapper>
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>CORREO</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody
                    emptyContent={
                      <div className="flex flex-col items-center justify-center text-gray-400 py-8">
                        <UsersIcon className="h-12 w-12 mb-2" />
                        <p>Sin registros</p>
                      </div>
                    }
                  >
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/user/edit/${user.id}`}
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
                              onPress={() => handleDelete(user.id)}
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

export default UserAll;
