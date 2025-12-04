import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Tabs,
  Tab,
} from "@heroui/react";

import {
  PencilSquareIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const PagePerfil = () => {
  const [tab, setTab] = useState("saved");
  const [user, setUser] = useState(null);
  const [savedCourses, setSavedCourses] = useState([]);

  const [loading, setLoading] = useState({
    user: true,
    courses: false,
  });

  const [availableTags] = useState([
    "Programación",
    "Diseño",
    "Marketing",
    "IA",
    "Python",
    "Web",
    "Móvil",
    "BD",
    "Matemáticas",
    "Frontend",
    "Backend",
  ]);

  const [newTag, setNewTag] = useState("");

  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
    category: "",
    description: "",
    tags: [],
    portada: null,
    pdf: null,
  });

  // ==================== CARGA USUARIO SIMULADO ====================
  useEffect(() => {
    setTimeout(() => {
      setUser({
        id: 1,
        name: "utm",
        email: "utm@gmail.com",
        avatar:
          "https://ui-avatars.com/api/?name=Usuario+Prueba&background=6366f1&color=fff",
      });

      setLoading((p) => ({ ...p, user: false }));
    }, 500);
  }, []);

  // ==================== CURSOS GUARDADOS ====================
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

  // ==================== AGREGAR CURSO ====================
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (newCourse.tags.includes(newTag)) return;

    setNewCourse({
      ...newCourse,
      tags: [...newCourse.tags, newTag.trim()],
    });

    setNewTag("");
  };

  const handleSelectTag = (tag) => {
    if (newCourse.tags.includes(tag)) return;

    setNewCourse({
      ...newCourse,
      tags: [...newCourse.tags, tag],
    });
  };

  const handleRemoveTag = (tag) => {
    setNewCourse({
      ...newCourse,
      tags: newCourse.tags.filter((t) => t !== tag),
    });
  };

  const handleAddCourse = () => {
    if (!newCourse.name.trim()) return;

    const nuevo = {
      ...newCourse,
      id: savedCourses.length + 1,
    };

    setSavedCourses((prev) => [...prev, nuevo]);

    // limpiar
    setNewCourse({
      name: "",
      duration: "",
      category: "",
      description: "",
      tags: [],
      portada: null,
      pdf: null,
    });
  };

  // ==================== ESTADO VACÍO ====================
  const EmptyState = ({ text }) => (
    <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
      <InformationCircleIcon className="w-8 h-8 mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  );

  // ==================== HEADER PERFIL ====================
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

      {/* ======== TABS ======== */}
      <div className="mt-6">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
          variant="underlined"
          color="primary"
        >
          <Tab key="saved" title="Cursos guardados" />
          <Tab key="add" title="Agregar curso" />
        </Tabs>
      </div>

      <div className="mt-6">
        {/* =============== CURSOS GUARDADOS =============== */}
        {tab === "saved" && (
          <>
            {savedCourses.length === 0 ? (
              <EmptyState text="No tienes cursos guardados." />
            ) : (
              savedCourses.map((c) => (
                <Card key={c.id} className="mb-4 p-4 shadow">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.duration}</p>
                  <p className="text-xs text-gray-400">{c.category}</p>
                </Card>
              ))
            )}
          </>
        )}

        {/* =============== AGREGAR CURSO =============== */}
        {tab === "add" && (
          <Card className="p-6 space-y-4 shadow">
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

            {/* ========== DESCRIPCIÓN ========== */}
            <Textarea
              label="Descripción del curso"
              placeholder="Escribe una descripción completa del curso..."
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  description: e.target.value,
                })
              }
            />

            {/* ========== ETIQUETAS ========== */}
            <div>
              <p className="text-sm font-medium mb-1">Etiquetas</p>

              {/* Añadir etiqueta manual */}
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Añadir etiqueta"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button color="primary" onPress={handleAddTag}>
                  Agregar
                </Button>
              </div>

              {/* Lista de etiquetas disponibles */}
              <div className="flex flex-wrap gap-2 mb-3">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectTag(tag)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Etiquetas seleccionadas */}
              <div className="flex flex-wrap gap-2">
                {newCourse.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                  >
                    <span className="text-sm">{tag}</span>
                    <XMarkIcon
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* PORTADA */}
            <div>
              <p className="text-sm font-medium mb-1">Portada del curso</p>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2"
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    portada: e.target.files[0],
                  })
                }
              />
            </div>

            {/* PDF */}
            <div>
              <p className="text-sm font-medium mb-1">Archivo PDF del curso</p>
              <input
                type="file"
                accept="application/pdf"
                className="w-full border rounded-lg p-2"
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    pdf: e.target.files[0],
                  })
                }
              />
            </div>

            <Button color="primary" className="w-full" onPress={handleAddCourse}>
              Agregar curso
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PagePerfil;
