import React, { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Card,
  CardBody,
  Divider,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

const NotificationCenter = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nueva visita",
      message: "Un usuario ha visitado tu página. Ver más...",
      time: "Hace 5 minutos",
      read: false,
      type: "visit",
    },
    {
      id: 2,
      title: "Nueva visita",
      message: "Un usuario ha visitado tu página. Ver más...",
      time: "Hace 30 minutos",
      read: false,
      type: "visit",
    },
    {
      id: 3,
      title: "Nueva visita",
      message: "Un usuario ha visitado tu página. Ver más...",
      time: "Hace 2 horas",
      read: true,
      type: "visit",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getTypeColor = () => "bg-blue-500";
  const getTypeIcon = () => "👀"; // Icono de visitas

  const goToPlans = () => {
    navigate("/plans");
    setIsOpen(false);
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
              <h3 className="font-semibold text-[#181818] text-lg">
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <Button
                  size="sm"
                  variant="light"
                  onPress={markAllAsRead}
                  className="text-xs text-[#2CBFF0] hover:text-[#2CBFF0]/80"
                >
                  Marcar todas como leídas
                </Button>
              )}
            </div>

            {/* Lista de notificaciones */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={`px-4 py-3 hover:bg-black/5 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        goToPlans();
                      }}
                    >
                      <div className="flex items-start gap-3">
                        
                        {/* Icono */}
                        <div
                          className={`w-10 h-10 rounded-full ${getTypeColor(
                            notification.type
                          )} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          <span className="text-lg">
                            {getTypeIcon(notification.type)}
                          </span>
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`font-medium text-sm text-[#181818] ${
                                !notification.read ? "font-semibold" : ""
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                            )}
                          </div>

                          <p className="text-xs text-[#181818]/60 mt-1">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-[#181818]/40">
                              {notification.time}
                            </p>

                            <Button
                              size="sm"
                              variant="light"
                              className="text-xs text-red-500 hover:text-red-600 min-w-0 h-auto px-2 py-1"
                              onPress={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < notifications.length - 1 && (
                      <Divider className="opacity-50" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-12 text-center">
                  <BellIcon className="w-16 h-16 mx-auto mb-3 text-[#181818]/20" />
                  <p className="text-sm text-[#181818]/60 font-medium">
                    No tienes notificaciones
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
                    onPress={goToPlans}
                    className="text-sm text-[#2CBFF0] hover:text-[#2CBFF0]/80 font-medium w-full"
                  >
                    Ver todas las notificaciones
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
