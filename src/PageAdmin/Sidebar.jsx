// Sidebar.jsx — responsive sin cambiar tu lógica ni rutas
// Dep: @heroicons/react, @heroui/react, framer-motion, tailwindcss

import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Tooltip } from "@heroui/react";

import {
  UsersIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  RectangleStackIcon,
  CreditCardIcon,
  WalletIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const NavItem = ({ to, Icon, label, isOpen = true }) => {
  return (
    <Tooltip
      content={label}
      placement="right"
      isDisabled={false /* en móvil mostramos tooltip */}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-3 sm:px-4 py-3 mb-1 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-[#2CBFF0]/10 text-[#2CBFF0]"
              : "hover:bg-[#2CBFF0]/5 text-[#181818]/80 hover:text-[#2CBFF0]"
          }`
        }
      >
        {/* Ícono centrado en xs, con margen a la derecha desde md */}
        <Icon
          className={`h-5 w-5 ${
            isOpen ? "mx-auto md:mx-0 md:mr-3" : "mx-auto"
          }`}
        />
        {/* Texto oculto en pantallas pequeñas */}
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:inline font-medium text-sm"
          >
            {label}
          </motion.span>
        )}
      </NavLink>
    </Tooltip>
  );
};

const Sidebar = () => {
  // Misma estructura/rutas que ya tenías
  const navItemsTop = [
    { to: "/admin/users", Icon: UsersIcon, label: "Usuarios" },
    {
      to: "/admin/universities",
      Icon: BuildingOfficeIcon,
      label: "Universidades",
    },
    { to: "/admin/careers", Icon: AcademicCapIcon, label: "Carreras" },
    { to: "/admin/courses", Icon: BookOpenIcon, label: "Cursos" },
  ];

  const navItemsBottom = [
    { to: "/admin/plans", Icon: RectangleStackIcon, label: "Planes" },
    {
      to: "/admin/subscriptions",
      Icon: CreditCardIcon,
      label: "Suscripciones",
    },
    { to: "/admin/payments", Icon: WalletIcon, label: "Pagos" },
  ];

  // Sin introducir nueva lógica/toggle: siempre “abierto”
  const isOpen = true;

  return (
    <motion.div
      // Responsive width solo con Tailwind:
      // xs: barra delgada (w-20) con íconos; md+: w-64 con textos
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-100 shadow-sm z-10 transition-all duration-300 ease-in-out w-20 md:w-64"
      initial={false}
      // quitamos animación de width para que mande el CSS responsivo
      animate={{}}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-3 md:px-4 border-b border-gray-100">
        {/* Botón decorativo, sin lógica (se oculta en xs para ganar espacio) */}
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="text-gray-500 pointer-events-none opacity-60 hidden md:flex"
        >
          <div className="h-5 w-5" />
        </Button>
      </div>

      {/* Navegación (padding estrecho en xs) */}
      <div className="py-4 px-2">
        {navItemsTop.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            Icon={item.Icon}
            label={item.label}
            isOpen={isOpen}
          />
        ))}

        <div className="my-3 h-px bg-gray-100" />

        {navItemsBottom.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            Icon={item.Icon}
            label={item.label}
            isOpen={isOpen}
          />
        ))}
      </div>

      {/* Footer: en móvil centramos y ocultamos el botón de perfil */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 border-t border-gray-100 flex justify-center md:justify-between">
        <Tooltip content="Configuración" placement="top">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="text-gray-500"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </Button>
        </Tooltip>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hidden md:block"
        >
          <Tooltip content="Perfil" placement="top">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="text-gray-500"
            >
              <UserIcon className="h-5 w-5" />
            </Button>
          </Tooltip>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
