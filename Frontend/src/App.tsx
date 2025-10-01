import { Outlet } from "react-router-dom";
import { PreferencesProvider } from "./context/Preferences";
import Header from "./components/Header";
import { AuthProvider } from "./context/Auth";


export default function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
          <Header />
          <Outlet />
        </div>
      </PreferencesProvider>
    </AuthProvider>
  );
}

