import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PreferencesProvider } from "./context/Preferences";
import Home from "./pages/Home";
import OnboardingWizard from "./pages/Onboarding/OnboardingWizard";
import { RequireProfile } from "./routes/guards/RequireProfile";
import Welcome from "./pages/Welcome";
import RoutineDetail from "./pages/RoutineDetail";
import WeeklySummary from "./pages/WeeklySummary";

export default function App() {
  return (
    <PreferencesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<OnboardingWizard />} />
          <Route element={<RequireProfile />}>
            <Route path="/" element={<Home />} />
            <Route path="/rutinas/:id" element={<RoutineDetail />} />
            <Route path="/resumen" element={<WeeklySummary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PreferencesProvider>
  );
}

