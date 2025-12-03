import React, { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const DASHBOARD_ID = "337bc20f-1655-46ec-8d00-5ac94dc25ea5";

const SupersetDashboard = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    embedDashboard({
      id: DASHBOARD_ID,
      supersetDomain:
        import.meta.env.VITE_SUPERSET_URL || "http://40.233.27.142:8088",
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
      {/* Mantener el iframe expandido dentro de su contenedor */}
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
        className="superset-wrapper"
        style={{
          width: "100%",
          height: "calc(100vh - 64px)", // ajusta 64px si tu navbar es más alto
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <div
          className="superset-container"
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
          }}
        />
      </div>
    </>
  );
};

export default SupersetDashboard;
