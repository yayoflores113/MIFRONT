import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link as UILink } from "@heroui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const { pathname } = useLocation();

  return (
    <Navbar isBordered variant="floating">
      <NavbarBrand>
        <UILink as={RouterLink} to="/" className="font-bold text-xl text-white">
          MI
        </UILink>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <UILink as={RouterLink} to="/">
            Inicio
          </UILink>
        </NavbarItem>

        <NavbarItem isActive={pathname.startsWith("/universities")}>
          <UILink as={RouterLink} to="/universities">
            Universidades
          </UILink>
        </NavbarItem>

        <NavbarItem isActive={pathname.startsWith("/careers")}>
          <UILink as={RouterLink} to="/careers">
            Carreras
          </UILink>
        </NavbarItem>

        <NavbarItem isActive={pathname.startsWith("/courses")}>
          <UILink as={RouterLink} to="/courses">
            Cursos
          </UILink>
        </NavbarItem>

        <NavbarItem isActive={pathname.startsWith("/learning-paths")}>
          <UILink as={RouterLink} to="/learning-paths">
            Rutas de Aprendizaje
          </UILink>
        </NavbarItem>

        <NavbarItem isActive={pathname.startsWith("/plans")}>
          <UILink as={RouterLink} to="/plans">
            Planes
          </UILink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UILink as={RouterLink} to="/login" color="primary">
            Iniciar sesión
          </UILink>
        </NavbarItem>
        <NavbarItem>
          <UILink as={RouterLink} to="/register" color="success">
            Registrarse
          </UILink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
