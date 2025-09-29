import { Outlet } from "react-router-dom";
import { PreferencesProvider } from "./context/Preferences";
import Header from "./components/Header";
import { AuthProvider } from "./context/Auth";


export default function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
          <Header />
          <Outlet />
        </div>
      </PreferencesProvider>
    </AuthProvider>
  );
}

