import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import AuthUser from "../pageauth/AuthUser";
const LayoutClient = () => {
  const { getRol } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (getRol() != "user") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutClient;
