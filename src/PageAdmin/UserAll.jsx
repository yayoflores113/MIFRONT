// UserAll.jsx — Usuarios estáticos con eliminación simulada
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
  Spinner,
  Chip,
} from "@heroui/react";
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const UserAll = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ===============================
  // USUARIOS ESTÁTICOS
  // ===============================
  const staticUsers = [
    { id: 9, name: "mimi", email: "mimi@gmail.com", role: "user" },
    { id: 10, name: "lalana", email: "lalana@gmail.com", role: "user" },
    { id: 11, name: "pabito", email: "pabito@gmail.com", role: "user" },
    { id: 12, name: "babi", email: "babi@gmail.com", role: "user" },
    { id: 13, name: "babai", email: "babai@gmail.com", role: "user" },
    { id: 14, name: "xavier", email: "a@gmail.com", role: "user" },
    { id: 15, name: "Angel Fajardo", email: "Fajita@gmail.com", role: "user" },
    { id: 16, name: "Alberto Sanguinetti", email: "allgamesmexofficial@gmail.com", role: "user" },
    { id: 17, name: "Jalil Gonzalez", email: "jalilgonzalez414@gmail.com", role: "user" },
    { id: 18, name: "Alberto Sanguinetti 2", email: "albertosanguinetti06@gmail.com", role: "user" },
    { id: 19, name: "Alberto", email: "jugadordevalorant4@gmail.com", role: "user" },
    { id: 20, name: "SANGUINETTI Z...", email: "22090591@alumno.com", role: "user" },
    { id: 21, name: "Archi", email: "arch@gmail.com", role: "user" },
    { id: 22, name: "Erik Jesus Flores...", email: "erikferrerrera29@gmail.com", role: "user" },
    { id: 23, name: "utm", email: "utm@alumno.com", role: "user" },
    { id: 24, name: "FLORES HERRERA", email: "22090600@alumno.com", role: "user" },
    { id: 25, name: "asadarf", email: "erik1@gmail.com", role: "user" },
  ];

  // Cargar datos simulados
  useEffect(() => {
    setTimeout(() => {
      setUsers(staticUsers);
      setLoading(false);
    }, 600);
  }, []);

  // Buscar
  const filtered = users.filter((u) =>
    `${u.name} ${u.email} ${u.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Simular eliminación sin tocar backend
  const deleteUserSimulated = (id) => {
    const sure = window.confirm("¿Eliminar usuario?");

    if (!sure) return;

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Color del rol
  const getRoleColor = (role) => {
    const colors = {
      admin: "danger",
      user: "primary",
      student: "success",
    };
    return colors[role] || "default";
  };

  return (
    <div className="bg-content1 min-h-screen">
      <Sidebar />

      <div className="px-4 ml-20 md:ml-64 transition-[margin] duration-300">
        <div className="py-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <p className="text-gray-500">
                  Administrar usuarios ({filtered.length} de {users.length})
                </p>
              </div>

              <Button
                color="primary"
                as={Link}
                to="/admin/user/create"
                startContent={<UserPlusIcon className="h-5 w-5" />}
              >
                Nuevo Usuario
              </Button>
            </div>

            {/* CARD */}
            <Card shadow="sm" className="mb-6">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4">
                <h2 className="font-semibold text-lg">Gestión de Usuarios</h2>

                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    startContent={
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    }
                    size="sm"
                    isClearable
                  />
                </div>
              </CardHeader>

              <Divider />

              <CardBody className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center py-10">
                    <Spinner size="lg" />
                    <p className="text-gray-500 mt-2">Cargando usuarios...</p>
                  </div>
                ) : (
                  <Table removeWrapper>
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>NOMBRE</TableColumn>
                      <TableColumn>CORREO</TableColumn>
                      <TableColumn>ROL</TableColumn>
                      <TableColumn className="text-right">ACCIÓN</TableColumn>
                    </TableHeader>

                    <TableBody
                      emptyContent={
                        <div className="py-8 text-gray-400 flex flex-col items-center">
                          <UsersIcon className="w-12 h-12 mb-2" />
                          Sin usuarios
                        </div>
                      }
                    >
                      {filtered.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>#{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip
                              size="sm"
                              color={getRoleColor(user.role)}
                              variant="flat"
                            >
                              {user.role}
                            </Chip>
                          </TableCell>

                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                as={Link}
                                to={`/admin/user/edit/${user.id}`}
                                size="sm"
                                color="primary"
                                variant="flat"
                                startContent={
                                  <PencilSquareIcon className="h-4 w-4" />
                                }
                              >
                                Editar
                              </Button>

                              <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                startContent={<TrashIcon className="h-4 w-4" />}
                                onPress={() => deleteUserSimulated(user.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserAll;
