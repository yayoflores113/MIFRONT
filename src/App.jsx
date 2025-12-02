import React from "react";

// LAYOUTS
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";

// PUBLIC
import Home from "./pagepublic/Home";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Universities from "./pagepublic/Universities";
import Universitie from "./pagepublic/Universitie";
import Careers from "./pagepublic/Careers";
import Career from "./pagepublic/Career";
import Courses from "./pagepublic/Courses";
import Course from "./pagepublic/Course";
import Plan from "./pagepublic/Plan";
import TestRunner from "./pagepublic/TestRunner";
import Recommendations from "./pagepublic/Recommendations";
import NotFound from "./pagepublic/NoFound";
import Certificates from "./pagepublic/Certificates"; // ✅ NUEVO

// Metabase
import MetaBase from "./pagepublic/MetaBase";
import MetaBaseDashboard from "./pagepublic/MetaBaseDashboard";

// Test
import Test from "./pagepublic/Test";
import TestQuestion from "./pagepublic/TestQuestion";
import TestResults from "./pagepublic/TestResults";
import OpenRouterChat from "./pagepublic/OpenRouterChat";

// Learning Paths
import LearningPaths from "./pagepublic/LearningPaths";
import LearningPathDetail from "./pagepublic/LearningPathDetail";

// AUTH
import Login from "./pageauth/Login";
import Register from "./pageauth/Register";
import Dashboard from "./PageAdmin/Dashboard";
import AuthCallback from "./pageauth/AuthCallback";

// ROLE USUARIO (Perfil)
import PagePerfil from "./PagePerfil/PagePerfil";
import UserDashboard from "./components/UserDashboard";

// ROLE ADMIN
import UserAll from "./PageAdmin/UserAll";
import UserUpdate from "./PageAdmin/UserUpdate";
import UniversidadesAll from "./PageAdmin/UniversidadesAll";
import UniversidadesStore from "./PageAdmin/UniversidadesStore";
import UniversidadesUpdate from "./PageAdmin/UniversidadesUpdate";
import CarrerasAll from "./PageAdmin/CarrerasAll";
import CarrerasStore from "./PageAdmin/CarrerasStore";
import CarrerasUpdate from "./PageAdmin/CarrerasUpdate";
import CursosAll from "./PageAdmin/CursosAll";
import CursosStore from "./PageAdmin/CursosStore";
import CursosUpdate from "./PageAdmin/CursosUpdate";
import PlanesAll from "./PageAdmin/PlanesAll";
import PlanesStore from "./PageAdmin/PlanesStore";
import PlanesUpdate from "./PageAdmin/PlanesUpdate";
import SubscriptionsAll from "./PageAdmin/SubscriptionsAll";
import SubscriptionsStore from "./PageAdmin/SubscriptionsStore";
import SubscriptionsUpdate from "./PageAdmin/SubscriptionsUpdate";

import SupersetDashboard from "./components/SupersetDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Catálogos */}
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:slug" element={<Universitie />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<Career />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<Course />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route
            path="/learning-paths/:slug"
            element={<LearningPathDetail />}
          />
          <Route path="/certificates" element={<Certificates />} />{" "}
          {/* ✅ NUEVO */}
          <Route path="/plans" element={<Plan />} />
          {/* Tests */}
          <Route path="/tests" element={<Test />} />
          <Route path="/tests/:slug" element={<TestRunner />} />
          <Route path="/results" element={<TestResults />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/question" element={<TestQuestion />} />
          <Route path="/openchat" element={<OpenRouterChat />} />
          {/* Metabase */}
          <Route path="/meta" element={<MetaBase />} />
          <Route path="/metadashboard" element={<MetaBaseDashboard />} />
          {/* Superset */}
          <Route path="/superset" element={<SupersetDashboard />} />
          {/* 404 not found */}
          <Route path="/*" element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoutes />} />

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserAll />} />
          <Route path="user/edit/:id" element={<UserUpdate />} />
          <Route path="universities" element={<UniversidadesAll />} />
          <Route path="universities/create" element={<UniversidadesStore />} />
          <Route
            path="universities/edit/:id"
            element={<UniversidadesUpdate />}
          />
          <Route path="careers" element={<CarrerasAll />} />
          <Route path="careers/create" element={<CarrerasStore />} />
          <Route path="careers/:id/edit" element={<CarrerasUpdate />} />
          <Route path="courses" element={<CursosAll />} />
          <Route path="courses/create" element={<CursosStore />} />
          <Route path="courses/:id/edit" element={<CursosUpdate />} />
          <Route path="plans" element={<PlanesAll />} />
          <Route path="plans/create" element={<PlanesStore />} />
          <Route path="plans/:id/edit" element={<PlanesUpdate />} />
          <Route path="subscriptions" element={<SubscriptionsAll />} />
          <Route path="subscriptions/create" element={<SubscriptionsStore />} />
          <Route
            path="subscriptions/:id/edit"
            element={<SubscriptionsUpdate />}
          />
        </Route>

        <Route path="/user" element={<LayoutClient />}>
          <Route index element={<PagePerfil />} />
          <Route path="profile" element={<PagePerfil />} />
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
