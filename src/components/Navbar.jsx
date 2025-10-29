import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";
import Config from "../Config";
import NotificationCenter from "./NotificationCenter"; // 🔔 Importamos el centro de notificaciones
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

// 🔔 Icono de campana
const BellIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const Navbar = () => {
  const { getRol, getLogout, getToken, getUser, user } = AuthUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { pathname } = useLocation();

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
      .catch((error) => console.error(error));
  };

  const renderLinks = () => {
    const currentUser = user ?? getUser();
    if (getToken()) {
      return (
        <>
          <NavbarItem className="flex items-center gap-3">
            {/* 🔔 Botón campana */}
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-1 rounded-full hover:bg-black/5 transition"
            >
              <BellIcon className="w-5 h-5 text-[#181818]/80" />
              {/* Puntito de alerta */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <span className="hidden sm:inline text-sm md:text-base text-[#181818]/80">
              Bienvenid@
            </span>
            <Link
              href={`/${getRol()}`}
              className="text-sm md:text-base text-[#181818]/80 hover:text-[#181818] transition-colors"
            >
              <span className="mx-1">|</span>
              <span className="font-medium">{currentUser?.name ?? "Usuario"}</span>
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
      );
    } else {
      return (
        <NavbarItem>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2CBFF0] px-4 py-2 text-sm md:text-base font-medium text-[#181818] shadow-sm hover:opacity-90 active:opacity-80 transition"
          >
            Login
          </Link>
        </NavbarItem>
      );
    }
  };

  const isActive = (to) => pathname === to;

  return (
    <>
      <UINavbar
        isBordered
        isBlurred
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        className={`top-0 z-50 bg-[#FEFEFE]/80 text-[#181818] border-b border-black/5 ${
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
            <img src={`MI.png`} width={35} height={35} alt="MI" className="rounded-lg" />
          </Link>
        </NavbarBrand>

        {/* Menú principal */}
        <NavbarContent className="hidden lg:flex gap-6" justify="center">
          {["/", "/universities", "/careers", "/courses", "/plans"].map((path, idx) => {
            const labels = ["Home", "Universidades", "Carreras", "Cursos", "Planes"];
            return (
              <NavbarItem key={path} isActive={isActive(path)}>
                <Link
                  href={path}
                  className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
                    isActive(path) && "text-[#181818]"
                  }`}
                >
                  {labels[idx]}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                      isActive(path) && "w-full"
                    }`}
                  />
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* Acciones desktop */}
        <NavbarContent justify="end" className="hidden lg:flex gap-4">
          {renderLinks()}
        </NavbarContent>

        {/* Toggle mobile */}
        <NavbarContent className="lg:hidden" justify="end">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} className="text-[#181818]" />
        </NavbarContent>

        {/* Menú mobile */}
        <NavbarMenu className="pt-2">
          {["/", "/universities", "/careers", "/courses", "/plans"].map((path, idx) => {
            const labels = ["Home", "Universidades", "Carreras", "Cursos", "Planes"];
            return (
              <NavbarMenuItem key={path} isActive={isActive(path)}>
                <Link
                  href={path}
                  size="lg"
                  className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
                    isActive(path) && "bg-black/[0.04] font-medium"
                  }`}
                >
                  {labels[idx]}
                </Link>
              </NavbarMenuItem>
            );
          })}

          <div className="mt-3 border-t border-black/5 pt-3">
            {getToken() ? (
              <>
                <NavbarMenuItem>
                  <Link
                    href={`/${getRol()}`}
                    className="block rounded-lg px-2 py-2 text-[#181818] hover:bg-black/5"
                  >
                    Administración <span className="mx-1">|</span> {(user ?? getUser())?.name ?? "Usuario"}
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link href="#" onPress={logoutUser} className="block rounded-lg px-2 py-2 text-red-600 hover:bg-red-50">
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

      {/* 🔔 Centro de notificaciones sin Pusher */}
      {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
    </>
  );
};

export default Navbar;
