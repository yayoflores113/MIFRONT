import React from "react";

// LAYOUTS
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";

// PUBLIC
import Home from "./pagePublic/Home";
import ProtectedRoutes from "./PageAuth/ProtectedRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Universities from "./pagePublic/Universities";
import Universitie from "./pagePublic/Universitie";
import Careers from "./pagePublic/Careers";
import Career from "./pagePublic/Career";
import Courses from "./pagePublic/Courses";
import Course from "./pagePublic/Course";
import Plan from "./pagePublic/Plan";
import TestRunner from "./pagePublic/TestRunner";
import Recommendations from "./pagePublic/Recommendations";
import NotFound from "./pagePublic/NoFound";
// Metabase
import MetaBase from "./pagePublic/MetaBase";
import MetaBaseDashboard from "./pagePublic/MetaBaseDashboard";

// Test
import Test from "./pagePublic/Test";
import TestQuestion from "./pagePublic/TestQuestion";
import TestResults from "./pagePublic/TestResults";
import OpenRouterChat from "./pagePublic/OpenRouterChat";

// Learning Paths
import LearningPaths from "./pagePublic/LearningPaths";
import LearningPathDetail from "./pagePublic/LearningPathDetail";

// AUTH
import Login from "./PageAuth/Login";
import Register from "./PageAuth/Register";
import Dashboard from "./PageAdmin/Dashboard";
import AuthCallback from "./PageAuth/AuthCallback";

// ROLE USUARIO (Perfil)
import PagePerfil from "./PagePerfil/PagePerfil";

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
          <Route path="/learning-paths/:slug" element={<LearningPathDetail />} />
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
          <Route path="universities/edit/:id" element={<UniversidadesUpdate />} />
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
          <Route path="subscriptions/:id/edit" element={<SubscriptionsUpdate />} />
        </Route>

        <Route path="/user" element={<LayoutClient />}>
          <Route index element={<PagePerfil />} />
          <Route path="profile" element={<PagePerfil />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;