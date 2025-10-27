import React from "react";

// LAYOUTS
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient"; //LAYOUT user realmente

// PUBLIC
import Home from "./pagepublic/Home";
import ProtectedRoutes from "./pageauth/ProtectedRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Universities from "./pagepublic/universities";
import Universitie from "./pagepublic/universitie";
import Careers from "./pagepublic/careers";
import Career from "./pagepublic/career";
import Courses from "./pagepublic/courses";
import Course from "./pagepublic/course";
import Plan from "./pagepublic/Plan";
import TestRunner from "./pagepublic/TestRunner";
import Recommendations from "./pagepublic/Recommendations";
import NotFound from "./pagepublic/NoFound";
// metabase
import MetaBase from "./pagepublic/MetaBase";
import MetaBaseDashboard from "./pagepublic/MetaBaseDashboard";

//Test
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
import Dashboard from "./PageAdmin/dashboard";
import AuthCallback from "./pageauth/AuthCallback";

// ROLE USURARIO (Perfil)
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
          {/* Catalogos */}
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
          {/* hola mundo */}
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;