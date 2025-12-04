import React, { useState } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

const NotificationCenter = () => {

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "mayito12",
      message: "Este usuario ha visitado tu página",
      time: "Hace 5 minutos",
      read: false,
      type: "visit",
      correo: "mayito12@gmail.com",
      numero: "999-123-4567"
    },
    {
      id: 2,
      title: "Erik Flores",
      message: "Este usuario ha visitado tu página",
      time: "Hace 30 minutos",
      read: false,
      type: "visit",
      correo: "erik@example.com",
      numero: "999-222-3344"
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  // MODAL
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const openUserModal = (notification) => {
    setSelectedUser(notification);
    setIsUserModalOpen(true);
  };

  return (
    <>
      {/* POPOVER — ICONO DE NOTIFICACIONES */}
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
            <BellIcon className="w-6 h-6 text-black/80 hover:text-black transition-colors" />
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
                <h3 className="font-semibold text-black text-lg">
                  Notificaciones
                </h3>

                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="light"
                    onPress={() =>
                      setNotifications((prev) =>
                        prev.map((n) => ({ ...n, read: true }))
                      )
                    }
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    Marcar todas como leídas
                  </Button>
                )}
              </div>

              {/* Lista */}
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
                          openUserModal(notification);
                        }}
                      >
                        <div className="flex items-start gap-3">

                          {/* Icono */}
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">
                            👀
                          </div>

                          {/* Contenido */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`font-medium text-sm text-black ${
                                  !notification.read ? "font-semibold" : ""
                                }`}
                              >
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1" />
                              )}
                            </div>

                            <p className="text-xs text-black/60 mt-1">
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-black/40">
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
                    <BellIcon className="w-16 h-16 mx-auto mb-3 text-black/20" />
                    <p className="text-sm text-black/60 font-medium">
                      No tienes notificaciones
                    </p>
                  </div>
                )}
              </div>

            </CardBody>
          </Card>
        </PopoverContent>
      </Popover>

      {/* MODAL — INFORMACIÓN DEL USUARIO */}
      <Modal
        isOpen={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
        size="md"
        backdrop="blur"
        className="rounded-2xl"
      >
        <ModalContent className="p-0 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-6 text-white">
            <ModalHeader className="text-2xl font-semibold text-white px-0">
              Información del Usuario
            </ModalHeader>

            <div className="flex flex-col items-center mt-2">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-4xl shadow-inner">
                👤
              </div>
              <h2 className="text-xl font-semibold mt-3">
                {selectedUser?.title}
              </h2>
              <p className="text-white/80 text-sm">
                Usuario reciente
              </p>
            </div>
          </div>

          <ModalBody className="p-6 space-y-4 bg-white">

            {selectedUser && (
              <div className="space-y-4">

                {/* Correo */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                    📧
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correo</p>
                    <p className="font-medium">{selectedUser.correo}</p>
                  </div>
                </div>

                <Divider />

                {/* Número */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                    📱
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Número</p>
                    <p className="font-medium">{selectedUser.numero}</p>
                  </div>
                </div>

                <Divider />

                {/* Actividad */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                    🧑‍💼
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Actividad</p>
                    <p className="font-medium">{selectedUser.message}</p>
                  </div>
                </div>

              </div>
            )}
          </ModalBody>

          <ModalFooter className="bg-white px-6 pb-6">
            <Button
              className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:opacity-90 transition"
              onPress={() => setIsUserModalOpen(false)}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationCenter;
