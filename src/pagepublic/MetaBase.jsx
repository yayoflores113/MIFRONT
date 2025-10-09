import React from "react";
import MetabaseDashboard from "../pagepublic/MetaBaseDashboard";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ChartBarIcon } from "@heroicons/react/24/outline";

const MetaBase = () => {
  return (
    <div className="content-body bg-background min-h-screen py-6">
      <div className="container-fluid px-4 mx-auto">
        {/* Título */}
        <div className="mb-6">
          <Card className="border-none shadow-sm">
            <CardBody className="py-5">
              <div className="flex items-center gap-2 mb-1">
                <ChartBarIcon className="text-primary-500 text-xl h-5 w-5" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Panel de Estadísticas
                </h2>
              </div>
              <p className="text-default-500">Métricas y análisis</p>
            </CardBody>
          </Card>
        </div>

        {/* Dashboard Principal */}
        <div
          className="rounded-lg overflow-hidden border border-default-200 shadow-sm"
          style={{ width: "77vw", height: "100vh", margin: 0, padding: 0 }}
        >
          <MetabaseDashboard dashboardId={2} height="100vh" />
        </div>

        {/* Opcional: Múltiples dashboards */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-0">
              <h4 className="text-lg font-medium">Ventas</h4>
            </CardHeader>
            <CardBody>
              <div className="rounded-lg overflow-hidden">
                <MetabaseDashboard dashboardId={2} height="400px" />
              </div>
            </CardBody>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-0">
              <h4 className="text-lg font-medium">Usuarios</h4>
            </CardHeader>
            <CardBody>
              <div className="rounded-lg overflow-hidden">
                <MetabaseDashboard dashboardId={3} height="400px" />
              </div>
            </CardBody>
          </Card>
        </div>
        */}
      </div>
    </div>
  );
};

export default MetaBase;
