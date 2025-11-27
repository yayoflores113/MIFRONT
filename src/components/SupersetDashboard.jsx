import React, { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const DASHBOARD_ID = "b3b15dc0-58c8-4265-91f2-12197c770993";

const SupersetDashboard = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    embedDashboard({
      id: DASHBOARD_ID,
      supersetDomain:
        import.meta.env.VITE_SUPERSET_URL || "http://localhost:8088",
      mountPoint: containerRef.current,
      fetchGuestToken: async () => {
        const res = await fetch(
          (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000") +
            "/api/superset/guest-token"
        );

        if (!res.ok) {
          throw new Error("No se pudo obtener guest token");
        }

        const data = await res.json();
        return data.token;
      },
      dashboardUiConfig: {
        hideTitle: false,
        hideTab: false,
        hideChartControls: true,
        filters: {
          visible: true,
          expanded: false,
        },
      },
      iframeSandboxExtras: [
        "allow-top-navigation",
        "allow-popups-to-escape-sandbox",
      ],
      referrerPolicy: "strict-origin-when-cross-origin",
    });
  }, []);

  return (
    <>
      {/* Esto fuerza al iframe interno a estirarse sí o sí */}
      <style>
        {`
          .superset-container iframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
          }
        `}
      </style>

      <div
        className="superset-container"
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          backgroundColor: "#fff",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default SupersetDashboard;
