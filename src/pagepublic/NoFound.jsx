// NotFound.jsx (rafce) — Solo DISEÑO ajustado
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const NotFound = () => {
  // —— LÓGICA ORIGINAL (sin tocar)
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  React.useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  // —— FIN LÓGICA ORIGINAL

  return (
    <div className="relative min-h-screen w-full bg-[#FEFEFE] text-[#181818] overflow-hidden">
      {/* Fondo grid sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Blob/acento flotante */}
      <motion.div
        aria-hidden="true"
        className="absolute -z-10 blur-[100px] opacity-30"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "60rem",
          height: "60rem",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(44,191,240,0.7) 0%, rgba(44,191,240,0.0) 65%)",
        }}
      />

      {/* Contenido centrado — sin card ni paddings p-6 sm:p-10 */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24 flex items-center justify-center">
        <motion.div
          className="w-full max-w-2xl flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {/* 404 más grande con degradado */}
          <h1
            className="text-[112px] sm:text-[140px] md:text-[168px] font-extrabold leading-none tracking-tight
                       bg-gradient-to-b from-[#2CBFF0] to-[#2CBFF0]/60 bg-clip-text text-transparent
                       drop-shadow-[0_1px_0_rgba(24,24,24,0.06)] select-none"
          >
            404
          </h1>

          {/* Único mensaje */}
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold">
            La página que buscas no existe.
          </h2>

          {/* CTA principal (Home) */}
          <Button
            as={RouterLink}
            to="/"
            size="lg"
            radius="sm"
            className="mt-8 bg-[#2CBFF0] text-white hover:opacity-90 active:opacity-100 transition-opacity"
          >
            Volver a Home
          </Button>
        </motion.div>
      </div>

      {/* Borde superior con sombra suave */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/5 to-transparent" />
    </div>
  );
};

export default NotFound;
