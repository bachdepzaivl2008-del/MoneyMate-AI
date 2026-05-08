import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { TopBar } from "./layout/TopBar";
import { BottomNav } from "./layout/BottomNav";
import { Sidebar } from "./layout/Sidebar";
import { useAppStore } from "../store/useAppStore";
import { Loader2 } from "lucide-react";

export default function AppLayout() {
  const navigate = useNavigate();
  const { settings, user, initialized, initializeAuth } = useAppStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (initialized && !user) {
      navigate("/");
    }
  }, [initialized, user, navigate]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const fontSizeClass = 
    settings.fontSize === "large" ? "text-lg" : 
    settings.fontSize === "xlarge" ? "text-xl" : "text-base";
  const simpleModeClass = settings.simpleMode ? "simple-mode" : "";

  return (
    <div 
      className={`min-h-screen flex flex-col md:flex-row relative w-full h-full overflow-hidden transition-all bg-background text-foreground ${fontSizeClass} ${simpleModeClass}`}
      data-persona={settings.userPersona || "student"}
    >
      <Sidebar />
      <div className="md:hidden">
        <TopBar />
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
