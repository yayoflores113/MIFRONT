import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Alert } from "@heroui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function MetabaseDashboard({ dashboardId, height = "800px" }) {
  const [iframeUrl, setIframeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetabaseUrl = async () => {
      try {
        setLoading(true);

        // URL de tu API Laravel
        const API_URL = "http://localhost:8000";

        const response = await axios.get(
          `${API_URL}/api/v1/metabase/dashboard/${dashboardId}`
        );

        setIframeUrl(response.data.url);
        setError(null);
      } catch (err) {
        console.error("Error cargando Metabase:", err);
        setError(err.response?.data?.error || "No se pudo cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (dashboardId) {
      fetchMetabaseUrl();
    }
  }, [dashboardId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height }}>
        <Spinner
          size="lg"
          color="primary"
          label="Cargando..."
          labelColor="primary"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-5" style={{ height }}>
        <Alert
          color="danger"
          title="Error"
          description={
            <div>
              <p>{error}</p>
              <p className="text-xs mt-2">
                Verifica tu configuración de Metabase y Laravel
              </p>
            </div>
          }
          startContent={<ExclamationCircleIcon className="h-5 w-5" />}
          className="max-w-xl w-full shadow-sm"
        />
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-default-200 shadow-sm bg-content1"
      style={{ height }}
    >
      <iframe
        src={iframeUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        title={`Metabase Dashboard ${dashboardId}`}
      />
    </div>
  );
}

export default MetabaseDashboard;
