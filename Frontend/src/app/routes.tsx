// src/app/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import OnboardingWizard from "../pages/Onboarding/OnboardingWizard";
import RoutineDetail from "../pages/RoutineDetail";
import WeeklySummary from "../pages/WeeklySummary";
import { RequireProfile } from "../routes/guards/RequireProfile";
import RouterError from "./RouterError";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <RouterError />, // si algo falla en routing, muestra UI en vez de negro
    children: [
      // Rutas públicas
      { path: "/welcome", element: <Welcome /> },
      { path: "/onboarding", element: <OnboardingWizard /> },

      // Rutas protegidas (RequireProfile expone <Outlet/>)
      {
        element: <RequireProfile />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/rutinas/:id", element: <RoutineDetail /> },
          { path: "/resumen", element: <WeeklySummary /> }
        ]
      },

      // Fallback
      { path: "*", element: <Welcome /> }
    ]
  }
]);

export default router;