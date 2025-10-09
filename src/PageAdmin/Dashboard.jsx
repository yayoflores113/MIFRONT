import React from "react";
import Sidebar from "./Sidebar";
import { Card, CardBody } from "@heroui/react";

const dashboard = () => {
  return (
    <div className="bg-content1">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 mt-12 mb-12">
          <Sidebar />
          <div className="flex-1">
            <Card isBlurred shadow="sm" radius="lg">
              <CardBody className="py-16">
                <h1 className="text-center text-3xl font-bold tracking-tight">
                  ADMIN
                </h1>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
