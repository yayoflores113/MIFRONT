import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config";
import {
  Navbar as UINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";

const Navbar = () => {
  const { getRol, getLogout, getToken, getUser, user } = AuthUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/login" || pathname === "/register") return null;

  const logoutUser = () => {
    Config.getLogout("/logout")
      .then(() => getLogout())
      .catch(console.error);
    navigate("/login");
  };

  const handleDashboardRedirect = () => {
    if (getToken()) {
      navigate(`/${getRol()}`);
    } else {
      navigate("/login");
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Universidades", to: "/universities" },
    { label: "Carreras", to: "/careers" },
    { label: "Cursos", to: "/courses" },
    { label: "Rutas de Aprendizaje", to: "/learning-paths" },
    { label: "Planes", to: "/plans" },
  ];

  const isActive = (to) => pathname === to;

  return (
    <UINavbar
      isBordered
      isBlurred
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className={`top-0 z-50 supports-[backdrop-filter]:backdrop-blur-xl bg-[#FEFEFE]/80 text-[#181818] border-b border-black/5 ${
        hasScrolled ? "shadow-sm" : ""
      }`}
      classNames={{
        brand: "gap-2",
        content: "items-center",
        menu: "bg-[#FEFEFE] text-[#181818]",
        item: "data-[active=true]:text-[#181818]",
        wrapper: "px-4 md:px-6",
      }}
    >
      {/* Brand */}
      <NavbarBrand>
        <Link
          href="/"
          className="flex items-center gap-2 text-[#181818] hover:opacity-90 transition-opacity"
          aria-label="Ir al inicio"
        >
          <img src="MI.png" width={35} height={35} alt="MI" className="rounded-lg" />
          <span className="sr-only">Inicio</span>
        </Link>
      </NavbarBrand>

      {/* Links Desktop */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.to} isActive={isActive(link.to)}>
            <Link
              href={link.to}
              aria-current={isActive(link.to) ? "page" : undefined}
              className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
                isActive(link.to) ? "text-[#181818]" : ""
              }`}
            >
              {link.label}
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                  isActive(link.to) ? "w-full" : ""
                }`}
              />
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Actions Desktop */}
      <NavbarContent justify="end" className="hidden lg:flex gap-4">
        {getToken() ? (
          <>
            <NavbarItem>
              <Link
                href="#"
                onPress={handleDashboardRedirect}
                className="text-sm md:text-base text-[#181818]/80 hover:text-[#181818] transition-colors"
              >
                Bienvenid@ | <span className="font-medium">{(user ?? getUser())?.name ?? "Usuario"}</span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="#"
                onPress={logoutUser}
                className="inline-flex items-center rounded-xl border border-black/10 px-3 py-2 text-sm md:text-base text-[#181818]/80 hover:text-[#181818] hover:bg-black/5 transition-colors"
              >
                Logout
              </Link>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2CBFF0] px-4 py-2 text-sm md:text-base font-medium text-[#181818] shadow-sm hover:opacity-90 active:opacity-80 transition"
            >
              Login
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Toggle Mobile */}
      <NavbarContent className="lg:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-[#181818]"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-2">
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.to} isActive={isActive(link.to)}>
            <Link
              href={link.to}
              size="lg"
              aria-current={isActive(link.to) ? "page" : undefined}
              className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
                isActive(link.to) ? "bg-black/[0.04] font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Mobile Actions */}
        <div className="mt-3 border-t border-black/5 pt-3">
          {getToken() ? (
            <>
              <NavbarMenuItem>
                <Link
                  href="#"
                  onPress={handleDashboardRedirect}
                  className="block rounded-lg px-2 py-2 text-[#181818] hover:bg-black/5"
                >
                  Administración | {(user ?? getUser())?.name ?? "Usuario"}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="#"
                  onPress={logoutUser}
                  className="block rounded-lg px-2 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <NavbarMenuItem>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2CBFF0] px-4 py-2 text-[#181818] font-medium shadow-sm hover:opacity-90 active:opacity-80 transition"
              >
                Login
              </Link>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </UINavbar>
  );
};

export default Navbar;
