import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as UILink,
} from "@heroui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", to: "/" },
    { label: "Universidades", to: "/universities" },
    { label: "Carreras", to: "/careers" },
    { label: "Cursos", to: "/courses" },
    { label: "Rutas de Aprendizaje", to: "/learning-paths" },
    { label: "Planes", to: "/plans" },
  ];

  const isActive = (to) => pathname === to || pathname.startsWith(to);

  return (
    <Navbar
      isBordered
      variant="floating"
      isBlurred
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
    >
      {/* Logo con efecto flotante */}
      <NavbarBrand>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <UILink
            as={RouterLink}
            to="/"
            className="font-extrabold text-2xl tracking-wide hover:opacity-90 transition-opacity"
          >
            MI
          </UILink>
        </motion.div>
      </NavbarBrand>

      {/* Desktop Links */}
      <NavbarContent justify="center" className="hidden lg:flex gap-6">
        {navLinks.map((link) => (
          <NavbarItem key={link.to} isActive={isActive(link.to)}>
            <motion.div className="relative">
              <UILink
                as={RouterLink}
                to={link.to}
                className={`relative px-2 py-1 font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-200"
                }`}
              >
                {link.label}
              </UILink>

              {/* Subrayado animado */}
              <motion.span
                layoutId="underline"
                initial={false}
                animate={
                  isActive(link.to)
                    ? { width: "100%" }
                    : { width: 0 }
                }
                className="absolute -bottom-1 left-0 h-1 bg-yellow-300 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </motion.div>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Desktop Actions */}
      <NavbarContent justify="end" className="hidden lg:flex gap-4">
        <NavbarItem>
          <UILink
            as={RouterLink}
            to="/login"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Iniciar sesión
          </UILink>
        </NavbarItem>
        <NavbarItem>
          <UILink
            as={RouterLink}
            to="/register"
            className="bg-yellow-400 text-[#181818] px-4 py-2 rounded-lg font-medium hover:brightness-105 transition"
          >
            Registrarse
          </UILink>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Toggle */}
      <NavbarContent justify="end" className="lg:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-white"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="lg:hidden bg-blue-500 text-white">
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.to} isActive={isActive(link.to)}>
            <UILink
              as={RouterLink}
              to={link.to}
              className={`block px-4 py-2 rounded-lg hover:bg-blue-400 transition ${
                isActive(link.to) ? "bg-blue-600 font-semibold" : ""
              }`}
            >
              {link.label}
            </UILink>
          </NavbarMenuItem>
        ))}

        <div className="mt-3 border-t border-white/30 pt-3 flex flex-col gap-2 px-4">
          <UILink
            as={RouterLink}
            to="/login"
            className="block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-center transition"
          >
            Iniciar sesión
          </UILink>
          <UILink
            as={RouterLink}
            to="/register"
            className="block bg-yellow-400 text-[#181818] px-4 py-2 rounded-lg text-center hover:brightness-105 transition"
          >
            Registrarse
          </UILink>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
