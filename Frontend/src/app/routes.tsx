import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import OnboardingWizard from "../pages/Onboarding/OnboardingWizard";
import RoutineDetail from "../pages/RoutineDetail";
import WeeklySummary from "../pages/WeeklySummary";
import RoutinePlayer from "../pages/RoutinePlayer";
import SUSQuestionnaire from "../pages/SUSQuestionnaire";
import OAuth2RedirectHandler from "../pages/OAuth2RedirectHandler";
import { RequireProfile } from "../routes/guards/RequireProfile";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/welcome", element: <Welcome /> },
      { path: "/onboarding", element: <OnboardingWizard /> },
      { path: "/oauth2/redirect", element: <OAuth2RedirectHandler /> },
      {
        element: <RequireProfile />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/rutinas/:id", element: <RoutineDetail /> },
          { path: "/rutinas/:id/ejecutar", element: <RoutinePlayer /> },
          { path: "/resumen", element: <WeeklySummary /> },
          { path: "/sus-questionnaire", element: <SUSQuestionnaire version="1.0" environment="staging" /> }
        ]
      }
    ]
  }
]);

export default router;