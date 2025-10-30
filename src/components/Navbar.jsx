import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  Link as UILink,
} from "@heroui/react";

const NavbarComponent = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Hooks siempre se declaran al inicio
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Guard de rutas: no mostrar navbar en login/register
  if (pathname === "/login" || pathname === "/register") return null;

  const logoutUser = () => {
    Config.getLogout()
      .then(() => {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      })
      .catch((error) => console.error(error));
  };

  const renderLinks = () => {
    const user = AuthUser.getUser();
    const token = AuthUser.getToken();

    if (token) {
      return (
        <>
          <NavbarItem>
            <UILink
              href={`/${AuthUser.getRol()}`}
              className="text-sm md:text-base text-[#181818]/80 hover:text-[#181818] transition-colors"
            >
              <span className="hidden sm:inline">Bienvenid@</span>
              <span className="mx-1">|</span>
              <span className="font-medium">{user?.name ?? "Usuario"}</span>
            </UILink>
          </NavbarItem>
          <NavbarItem>
            <UILink
              href="#"
              onPress={logoutUser}
              className="inline-flex items-center rounded-xl border border-black/10 px-3 py-2 text-sm md:text-base text-[#181818]/80 hover:text-[#181818] hover:bg-black/5 transition-colors"
            >
              Logout
            </UILink>
          </NavbarItem>
        </>
      );
    } else {
      return (
        <NavbarItem>
          <UILink
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2CBFF0] px-4 py-2 text-sm md:text-base font-medium text-[#181818] shadow-sm hover:opacity-90 active:opacity-80 transition"
          >
            Login
          </UILink>
        </NavbarItem>
      );
    }
  };

  const isActive = (to) => (pathname === to ? "active" : "");

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
        <UILink
          href="/"
          className="flex items-center gap-2 text-[#181818] hover:opacity-90 transition-opacity"
          aria-label="Ir al inicio"
        >
          <img
            src="MI.png"
            width={35}
            height={35}
            alt="MI"
            className="rounded-lg"
          />
          <span className="sr-only">Inicio</span>
        </UILink>
      </NavbarBrand>

      {/* Navegación centro (desktop) */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {["/", "/universities", "/careers", "/courses", "/plans"].map((route, i) => {
          const labels = ["Home", "Universidades", "Carreras", "Cursos", "Planes"];
          return (
            <NavbarItem key={i} isActive={pathname === route}>
              <UILink
                href={route}
                aria-current={pathname === route ? "page" : undefined}
                className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
                  isActive(route) && "text-[#181818]"
                }`}
              >
                {labels[i]}
                <span
                  className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                    isActive(route) && "w-full"
                  }`}
                />
              </UILink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Acciones derecha (desktop) */}
      <NavbarContent justify="end" className="hidden lg:flex gap-4">
        {renderLinks()}
      </NavbarContent>

      {/* Toggle (mobile) */}
      <NavbarContent className="lg:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-[#181818]"
        />
      </NavbarContent>

      {/* Menú (mobile) */}
      <NavbarMenu className="pt-2">
        {["/", "/universities", "/careers", "/courses", "/plans"].map((route, i) => {
          const labels = ["Home", "Universidades", "Carreras", "Cursos", "Planes"];
          return (
            <NavbarMenuItem key={i} isActive={pathname === route}>
              <UILink
                href={route}
                size="lg"
                aria-current={pathname === route ? "page" : undefined}
                className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
                  isActive(route) && "bg-black/[0.04] font-medium"
                }`}
              >
                {labels[i]}
              </UILink>
            </NavbarMenuItem>
          );
        })}

        {/* Acciones (mobile) */}
        <div className="mt-3 border-t border-black/5 pt-3">
          {AuthUser.getToken() ? (
            <>
              <NavbarMenuItem>
                <UILink
                  href={`/${AuthUser.getRol()}`}
                  className="block rounded-lg px-2 py-2 text-[#181818] hover:bg-black/5"
                >
                  Administración | {AuthUser.getUser()?.name ?? "Usuario"}
                </UILink>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <UILink
                  href="#"
                  onPress={logoutUser}
                  className="block rounded-lg px-2 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </UILink>
              </NavbarMenuItem>
            </>
          ) : (
            <NavbarMenuItem>
              <UILink
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2CBFF0] px-4 py-2 text-[#181818] font-medium shadow-sm hover:opacity-90 active:opacity-80 transition"
              >
                Login
              </UILink>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </UINavbar>
  );
};

export default NavbarComponent;
