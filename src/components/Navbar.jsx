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
  Link,
} from "@heroui/react";

const Navbar = () => {
  const { getRol, getLogout, getToken, getUser, user } = AuthUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { pathname } = useLocation();

  // (1) Hooks siempre se declaran en todas las renderizaciones
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // (2) Guard de rutas: ahora SÍ después de los hooks
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
          <NavbarItem>
            <Link
              href={`/${getRol()}`}
              className="text-sm md:text-base text-[#181818]/80 hover:text-[#181818] transition-colors"
            >
              <span className="hidden sm:inline">Bienvenid@</span>
              <span className="mx-1">|</span>
              <span className="font-medium">
                {currentUser?.name ?? "Usuario"}
              </span>
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
            className="inline-flex items-center gap-2 rounded-xl bg-[#2CBFF0] px-4 py-2 text-sm md:text-base font-medium text-[#181818] shadow-sm hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2CBFF0] focus-visible:ring-offset-2 transition"
          >
            Login
          </Link>
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
        <Link
          href="/"
          className="flex items-center gap-2 text-[#181818] hover:opacity-90 transition-opacity"
          aria-label="Ir al inicio"
        >
          <img
            src={`MI.png`}
            width={35}
            height={35}
            alt="MI"
            className="rounded-lg"
          />
          <span className="sr-only">Inicio</span>
        </Link>
      </NavbarBrand>

      {/* Navegación centro (desktop) */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
              isActive("/") && "text-[#181818]"
            }`}
          >
            Home
            <span
              className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                isActive("/") && "w-full"
              }`}
            />
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === "/universities"}>
          <Link
            href="/universities"
            aria-current={pathname === "/universities" ? "page" : undefined}
            className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
              isActive("/universities") && "text-[#181818]"
            }`}
          >
            Universidades
            <span
              className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                isActive("/universities") && "w-full"
              }`}
            />
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === "/careers"}>
          <Link
            href="/careers"
            aria-current={pathname === "/careers" ? "page" : undefined}
            className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
              isActive("/careers") && "text-[#181818]"
            }`}
          >
            Carreras
            <span
              className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                isActive("/careers") && "w-full"
              }`}
            />
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === "/courses"}>
          <Link
            href="/courses"
            aria-current={pathname === "/courses" ? "page" : undefined}
            className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
              isActive("/courses") && "text-[#181818]"
            }`}
          >
            Cursos
            <span
              className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                isActive("/courses") && "w-full"
              }`}
            />
          </Link>
        </NavbarItem>

        <NavbarItem isActive={pathname === "/plans"}>
          <Link
            href="/plans"
            aria-current={pathname === "/plans" ? "page" : undefined}
            className={`group relative text-[#181818]/80 hover:text-[#181818] transition-colors ${
              isActive("/plans") && "text-[#181818]"
            }`}
          >
            Planes
            <span
              className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2CBFF0] transition-[width] duration-200 group-hover:w-full ${
                isActive("/plans") && "w-full"
              }`}
            />
          </Link>
        </NavbarItem>
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
        <NavbarMenuItem isActive={pathname === "/"}>
          <Link
            href="/"
            size="lg"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
              isActive("/") && "bg-black/[0.04] font-medium"
            }`}
          >
            Home
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem isActive={pathname === "/universities"}>
          <Link
            href="/universities"
            size="lg"
            aria-current={pathname === "/universities" ? "page" : undefined}
            className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
              isActive("/universities") && "bg-black/[0.04] font-medium"
            }`}
          >
            Universidades
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem isActive={pathname === "/careers"}>
          <Link
            href="/careers"
            size="lg"
            aria-current={pathname === "/careers" ? "page" : undefined}
            className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
              isActive("/careers") && "bg-black/[0.04] font-medium"
            }`}
          >
            Carreras
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem isActive={pathname === "/courses"}>
          <Link
            href="/courses"
            size="lg"
            aria-current={pathname === "/courses" ? "page" : undefined}
            className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
              isActive("/courses") && "bg-black/[0.04] font-medium"
            }`}
          >
            Cursos
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem isActive={pathname === "/plans"}>
          <Link
            href="/plans"
            size="lg"
            aria-current={pathname === "/plans" ? "page" : undefined}
            className={`block rounded-lg px-2 py-2 text-[#181818]/90 hover:bg-black/5 ${
              isActive("/plans") && "bg-black/[0.04] font-medium"
            }`}
          >
            Planes
          </Link>
        </NavbarMenuItem>

        {/* Acciones (mobile) — misma lógica tuya */}
        <div className="mt-3 border-t border-black/5 pt-3">
          {getToken() ? (
            <>
              <NavbarMenuItem>
                <Link
                  href={`/${getRol()}`}
                  className="block rounded-lg px-2 py-2 text-[#181818] hover:bg-black/5"
                >
                  Administración <span className="mx-1">|</span>{" "}
                  {(user ?? getUser())?.name ?? "Usuario"}
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
