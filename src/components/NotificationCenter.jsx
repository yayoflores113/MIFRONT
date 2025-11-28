import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Card,
  CardBody,
  Divider,
  Avatar,
} from "@heroui/react";

const NotificationCenter = () => {
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userAvatar: "https://ui-avatars.com/api/?name=User+1&background=6366f1&color=fff",
      time: "Hace 5 minutos",
      read: false,
    },
    {
      id: 2,
      userAvatar: "https://ui-avatars.com/api/?name=User+2&background=ec4899&color=fff",
      time: "Hace 30 minutos",
      read: false,
    },
    {
      id: 3,
      userAvatar: "https://ui-avatars.com/api/?name=User+3&background=10b981&color=fff",
      time: "Hace 1 hora",
      read: false,
    },
    {
      id: 4,
      userAvatar: "https://ui-avatars.com/api/?name=User+4&background=f59e0b&color=fff",
      time: "Hace 2 horas",
      read: true,
    },
    {
      id: 5,
      userAvatar: "https://ui-avatars.com/api/?name=User+5&background=8b5cf6&color=fff",
      time: "Hace 3 horas",
      read: true,
    },
    {
      id: 6,
      userAvatar: "https://ui-avatars.com/api/?name=User+6&background=ef4444&color=fff",
      time: "Hace 5 horas",
      read: true,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Simular carga de notificaciones desde API
  useEffect(() => {
    // Aquí podrías hacer una llamada a tu API para obtener las visitas reales
    // fetchProfileVisits();
  }, []);

  const handleNotificationClick = (id) => {
    // Marcar como leída
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    
    // Cerrar el popover
    setIsOpen(false);
    
    // Redirigir a /plans
    navigate("/plans");
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id, event) => {
    event.stopPropagation();
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <Popover
      placement="bottom-end"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      classNames={{
        content: "p-0",
      }}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          className="relative"
          aria-label="Notificaciones"
        >
          <BellIcon className="w-6 h-6 text-[#181818]/80 hover:text-[#181818] transition-colors" />
          {unreadCount > 0 && (
            <Badge
              content={unreadCount}
              color="danger"
              size="sm"
              className="absolute -top-1 -right-1"
            />
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 max-w-[95vw]">
        <Card className="shadow-none border-none">
          <CardBody className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5">
              <div>
                <h3 className="font-semibold text-[#181818] text-lg">
                  Visitas a tu perfil
                </h3>
                <p className="text-xs text-[#181818]/60 mt-0.5">
                  Usuarios interesados en tu contenido
                </p>
              </div>
              {unreadCount > 0 && (
                <Button
                  size="sm"
                  variant="light"
                  onPress={markAllAsRead}
                  className="text-xs text-[#2CBFF0] hover:text-[#2CBFF0]/80"
                >
                  Marcar todas
                </Button>
              )}
            </div>

            {/* Lista de notificaciones */}
            <div className="max-h-[450px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={`px-4 py-3 hover:bg-black/5 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar del usuario */}
                        <div className="relative">
                          <Avatar
                            src={notification.userAvatar}
                            className="w-12 h-12"
                          />
                          {!notification.read && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
                          )}
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm text-[#181818] ${!notification.read ? "font-semibold" : ""}`}>
                            Un usuario ha visitado tu perfil{" "}
                            <span className="text-[#2CBFF0] hover:underline cursor-pointer">
                              ver mas...
                            </span>
                          </p>
                          <p className="text-xs text-[#181818]/40 mt-1">
                            {notification.time}
                          </p>
                        </div>

                        {/* Botón eliminar */}
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          className="text-[#181818]/40 hover:text-red-500 min-w-0 h-auto"
                          onPress={(e) => deleteNotification(notification.id, e)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    {index < notifications.length - 1 && (
                      <Divider className="opacity-50" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-12 text-center">
                  <UserIcon className="w-16 h-16 mx-auto mb-3 text-[#181818]/20" />
                  <p className="text-sm text-[#181818]/60 font-medium">
                    Sin visitas recientes
                  </p>
                  <p className="text-xs text-[#181818]/40 mt-1">
                    Aún no hay usuarios que hayan visitado tu perfil
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <>
                <Divider />
                <div className="px-4 py-3 text-center">
                  <Button
                    size="sm"
                    variant="light"
                    className="text-sm text-[#2CBFF0] hover:text-[#2CBFF0]/80 font-medium w-full"
                    onPress={() => {
                      setIsOpen(false);
                      navigate("/plans");
                    }}
                  >
                    Ver todos los planes
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
