import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link as HeroLink,
} from "@heroui/react";
import { Link, useLocation } from "react-router-dom";

const AppNavbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#2CBFF0] font-semibold"
      : "text-default-600 hover:text-[#2CBFF0] transition-colors";

  return (
    <Navbar
      shouldHideOnScroll
      className="bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 w-full z-50"
    >
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2">
          <img src="/MI.png" alt="Logo" className="w-8 h-8" />
          <p className="font-bold text-xl text-[#2CBFF0]">MI</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link to="/" className={isActive("/")}>
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/learning-paths" className={isActive("/learning-paths")}>
            Rutas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/courses" className={isActive("/courses")}>
            Cursos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/tests" className={isActive("/tests")}>
            Test
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            to="/login"
            color="primary"
            variant="flat"
            className="bg-[#2CBFF0]/10 text-[#2CBFF0]"
          >
            Iniciar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
