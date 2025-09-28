import { Outlet } from "react-router-dom";
import { PreferencesProvider } from "./context/Preferences";
import Header from "./components/Header";


export default function App() {
  return (
    <PreferencesProvider>
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <Header />
        <Outlet />
      </div>
    </PreferencesProvider>
  );
}

