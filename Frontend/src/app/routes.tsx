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

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/welcome", element: <Welcome /> },
      { path: "/onboarding", element: <OnboardingWizard /> },
      {
        element: <RequireProfile />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/rutinas/:id", element: <RoutineDetail /> },
          { path: "/resumen", element: <WeeklySummary /> }
        ]
      }
    ]
  }
]);

export default router;