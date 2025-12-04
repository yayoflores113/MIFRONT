import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tabs,
  Tab,
} from "@heroui/react";

import {
  PencilSquareIcon,
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const PagePerfil = () => {
  const [tab, setTab] = useState("saved");
  const [user, setUser] = useState(null);

  const [savedCourses, setSavedCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const [loading, setLoading] = useState({
    user: true,
    courses: false,
    purchased: false,
  });

  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
    category: "",
  });

  // ========= USUARIO (SIMULADO)
  useEffect(() => {
    setTimeout(() => {
      setUser({
        id: 1,
        name: "utm",
        email: "utm@gmail.com",
        avatar:
          "https://ui-avatars.com/api/?name=Usuario+Prueba&background=6366f1&color=fff",
        role: "Estudiante",
        university: "Universidad Tecnológica de México",
        country: "México",
        matricula: "2024001",
        birthDate: "2000-01-15",
        bio: "Estudiante apasionado por la tecnología y el aprendizaje continuo.",
      });

      setLoading((p) => ({ ...p, user: false }));
    }, 500);
  }, []);

  // ========= CURSOS GUARDADOS (SIMULADO)
  useEffect(() => {
    if (!user?.id || tab !== "saved") return;
    setTimeout(() => {
      setSavedCourses([
        {
          id: 1,
          name: "Introducción a la Programación",
          duration: "40 horas",
          category: "Tecnología",
        },
        {
          id: 2,
          name: "Diseño Web Moderno",
          duration: "30 horas",
          category: "Diseño",
        },
      ]);

      setLoading((p) => ({ ...p, courses: false }));
    }, 200);
  }, [user?.id, tab]);

  // ========= SUSCRIPCIONES (SIMULADO)
  useEffect(() => {
    if (!user?.id || tab !== "purchased") return;
    setTimeout(() => {
      const subs = [
        {
          id: 1,
          name: "Plan Premium Mensual",
          status: "active",
          startDate: "2024-01-15",
          endDate: "2025-01-15",
          price: 299,
        },
      ];
      setPurchasedCourses(subs);

      setLoading((prev) => ({ ...prev, purchased: false }));
    }, 200);
  }, [user?.id, tab]);

  // ========= AGREGAR CURSO
  const handleAddCourse = () => {
    if (!newCourse.name.trim()) return;

    const nuevo = {
      id: savedCourses.length + 1,
      name: newCourse.name,
      duration: newCourse.duration || "Sin duración",
      category: newCourse.category || "Sin categoría",
    };

    setSavedCourses((prev) => [...prev, nuevo]);

    setNewCourse({
      name: "",
      duration: "",
      category: "",
    });
  };

  // ========= COMPONENTES VISUALES

  const EmptyState = ({ text }) => (
    <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
      <InformationCircleIcon className="w-8 h-8 mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  );

  const ProfileHeader = () => (
    <Card className="w-full bg-white/70 backdrop-blur-md shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="flex-col items-start gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
        <div className="flex items-center gap-4 w-full">
          <Avatar
            className="w-20 h-20 text-large ring-4 ring-white"
            src={user?.avatar}
            name={user?.name || "Usuario"}
          />

          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <Button
            className="ml-auto"
            variant="flat"
            startContent={<PencilSquareIcon className="w-4 h-4" />}
          >
            Editar perfil
          </Button>
        </div>
      </CardHeader>
    </Card>
  );

  // ========= RENDER FINAL
  if (loading.user)
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 w-1/3 rounded" />
          </div>
        </Card>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProfileHeader />

      {/* TABS */}
      <div className="mt-6">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
          variant="underlined"
          color="primary"
          className="w-full"
        >
          <Tab key="saved" title="Cursos guardados" />
          <Tab key="add" title="Agregar curso" />
          <Tab key="purchased" title="Suscripciones" />
        </Tabs>
      </div>

      <div className="mt-6">
        {/* ================= CURSOS GUARDADOS ================= */}
        {tab === "saved" && (
          <>
            {savedCourses.length === 0 ? (
              <EmptyState text="No tienes cursos guardados." />
            ) : (
              savedCourses.map((c) => (
                <Card key={c.id} className="mb-4 p-4">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.duration}</p>
                  <p className="text-xs text-gray-400">{c.category}</p>
                </Card>
              ))
            )}
          </>
        )}

        {/* ================= AGREGAR CURSO ================= */}
        {tab === "add" && (
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <PlusCircleIcon className="w-6 h-6 text-indigo-600" />
              Agregar nuevo curso
            </h3>

            <Input
              label="Nombre del curso"
              placeholder="Ej. Python desde cero"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />

            <Input
              label="Duración"
              placeholder="Ej. 20 horas"
              value={newCourse.duration}
              onChange={(e) =>
                setNewCourse({ ...newCourse, duration: e.target.value })
              }
            />

            <Input
              label="Categoría"
              placeholder="Ej. Programación"
              value={newCourse.category}
              onChange={(e) =>
                setNewCourse({ ...newCourse, category: e.target.value })
              }
            />

            <Button
              color="primary"
              className="w-full"
              onPress={handleAddCourse}
            >
              Agregar curso
            </Button>
          </Card>
        )}

        {/* ================= SUSCRIPCIONES ================= */}
        {tab === "purchased" && (
          <>
            {purchasedCourses.length === 0 ? (
              <EmptyState text="No tienes suscripciones." />
            ) : (
              purchasedCourses.map((p) => (
                <Card key={p.id} className="mb-4 p-4">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">Activo</p>
                </Card>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PagePerfil;
