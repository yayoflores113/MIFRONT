// UserAll.jsx — Componente con usuarios estáticos
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
  Chip,
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
  // Usuarios estáticos
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "admin",
      email: "admin@gmail.com",
      role_id: 1,
      roles: [{ name: "admin" }],
      university: { name: "Universidad Tecnológica de México" },
    },
    {
      id: 2,
      name: "María García",
      email: "maria.garcia@gmail.com",
      role_id: 2,
      roles: [{ name: "user" }],
      // university: { name: "UNAM" },
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos.lopez@gmail.com",
      role_id: 2,
      roles: [{ name: "user" }],
      university: null,
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@gmail.com",
      role_id: 3,
      roles: [{ name: "user" }],
      university: { name: "Instituto Politécnico Nacional" },
    },
    {
      id: 5,
      name: "Luis Hernández",
      email: "luis.hernandez@gmail.com",
      role_id: 2,
      roles: [{ name: "user" }],
      university: { name: "Universidad Tecnológica de México" },
    },
    {
      id: 6,
      name: "Patricia Rodríguez",
      email: "patricia.rodriguez@gmail.com",
      role_id: 2,
      roles: [{ name: "user" }],
      university: { name: "ITESM" },
    },
    {
      id: 7,
      name: "Roberto Sánchez",
      email: "roberto.sanchez@gmail.com",
      role_id: 1,
      roles: [{ name: "user" }],
      university: null,
    },
    {
      id: 8,
      name: "Laura Ramírez",
      email: "laura.ramirez@gmail.com",
      role_id: 2,
      roles: [{ name: "user" }],
      university: { name: "Universidad Anáhuac" },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!ok) return;
    
    // Eliminar sin animación
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Filtrar usuarios según búsqueda
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.id?.toString().includes(search)
    );
  });

  // Función para obtener el rol del usuario
  const getUserRole = (user) => {
    if (user.roles && user.roles.length > 0) {
      return user.roles[0].name;
    }
    return "Usuario";
  };

  // Función para obtener el color del chip según el rol
  const getRoleColor = (role) => {
    const colors = {
      admin: "danger",
      moderator: "warning",
      user: "primary",
      student: "success",
    };
    return colors[role?.toLowerCase()] || "default";
  };

  return (
    <div className="bg-content1 min-h-screen">
      {/* Sidebar fixed (no se toca) */}
      <Sidebar />

      {/* Contenido alineado al Sidebar */}
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
                  Administrar usuarios registrados ({users.length} total)
                </p>
              </div>
              <Button
                as={Link}
                to="/admin/user/create"
                color="primary"
                startContent={<UserPlusIcon className="h-5 w-5" />}
              >
                Nuevo Usuario
              </Button>
            </div>

            {/* Card principal */}
            <Card className="mb-6" isBlurred shadow="sm" radius="lg">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-4">
                <h2 className="text-lg font-semibold">Gestión de Usuarios</h2>
                <div className="flex w-full sm:w-auto gap-2">
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    startContent={
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    }
                    size="sm"
                    className="w-full sm:max-w-xs"
                    isClearable
                    onClear={() => setSearchTerm("")}
                  />
                  <Button 
                    variant="flat" 
                    size="sm" 
                    isIconOnly
                  >
                    <FunnelIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                <Table 
                  aria-label="Listado de usuarios" 
                  removeWrapper
                  classNames={{
                    th: "bg-gray-50 text-gray-600 font-semibold",
                  }}
                >
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>CORREO</TableColumn>
                    <TableColumn>ROL</TableColumn>
                    <TableColumn className="text-right">ACCIÓN</TableColumn>
                  </TableHeader>

                  <TableBody
                    emptyContent={
                      <div className="flex flex-col items-center justify-center text-gray-400 py-8">
                        <UsersIcon className="h-12 w-12 mb-2" />
                        <p className="font-semibold">Sin usuarios</p>
                        <p className="text-sm">
                          {searchTerm 
                            ? "No se encontraron usuarios con ese criterio" 
                            : "No hay usuarios registrados"}
                        </p>
                      </div>
                    }
                  >
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell>
                          <span className="font-mono text-sm">
                            #{user.id}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name || "Sin nombre"}</span>
                            {user.university && (
                              <span className="text-xs text-gray-500">
                                {user.university.name || user.university}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.email}</span>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="sm" 
                            color={getRoleColor(getUserRole(user))}
                            variant="flat"
                          >
                            {getUserRole(user)}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2 text-nowrap">
                            <Button
                              as={Link}
                              to={`/admin/user/edit/${user.id}`}
                              color="primary"
                              size="sm"
                              variant="flat"
                              startContent={
                                <PencilSquareIcon className="h-4 w-4" />
                              }
                            >
                              Editar
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              variant="flat"
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

            {/* Información adicional */}
            {filteredUsers.length > 0 && (
              <div className="text-sm text-gray-500 text-center">
                Mostrando {filteredUsers.length} de {users.length} usuarios
                {searchTerm && ` (filtrado por: "${searchTerm}")`}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserAll;
