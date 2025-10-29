import React, { useState, useEffect } from "react";
import { Card, CardBody, Badge, Button } from "@heroui/react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";

const NotificationCenterFloating = () => {
  const { getUser } = AuthUser();
  const user = getUser();
  const navigate = useNavigate();

  const isAdmin = user?.email === "utm@gmail.com"; // Solo superusuario

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const BACKEND_URL = "http://localhost:8000";

  const fetchNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      const res = await fetch(`${BACKEND_URL}/api/notificaciones`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        console.error("Error al obtener notificaciones", res.status);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const notisArray = Array.isArray(data) ? data : data.data || [];
      setNotifications(notisArray);
    } catch (err) {
      console.error("Error fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (!user) return <p>Debes iniciar sesión para ver notificaciones.</p>;
  if (!isAdmin) return <p>No tienes acceso a todas las notificaciones.</p>;

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          isIconOnly
          color="primary"
          size="lg"
          className="rounded-full shadow-lg relative"
          onPress={() => setShowPopup(!showPopup)}
        >
          <BellIcon className="w-6 h-6" />
          {notifications.length > 0 && (
            <Badge
              content={notifications.length}
              color="danger"
              size="sm"
              className="absolute -top-1 -right-1"
            />
          )}
        </Button>
      </div>

      {/* Ventana flotante */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed bottom-20 right-5 z-40"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-2xl border border-gray-200 w-96 bg-white rounded-2xl overflow-hidden">
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <BellIcon className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-semibold">Notificaciones</h2>
                    <Badge color="primary">{notifications.length} total</Badge>
                  </div>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => setShowPopup(false)}
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>

                {loading ? (
                  <p>Cargando notificaciones...</p>
                ) : notifications.length === 0 ? (
                  <p>No hay notificaciones.</p>
                ) : (
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {notifications.map((n) => (
                      <Card
                        key={n.id}
                        className={`transition-all ${
                          n.leido
                            ? "bg-gray-50 hover:bg-gray-100"
                            : "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500"
                        }`}
                      >
                        <CardBody className="py-3 px-4">
                          <p>{n.mensaje || n.message}</p>
                          {n.leido ? (
                            <Badge color="success" variant="flat" size="sm">
                              Leída
                            </Badge>
                          ) : (
                            <Badge color="danger" variant="flat" size="sm">
                              Nueva
                            </Badge>
                          )}
                          <Button
                            variant="link"
                            size="sm"
                            onPress={() => navigate("/plans")}
                            className="mt-2 text-blue-500 underline"
                          >
                            Ver más
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationCenterFloating;
