import { Outlet } from "react-router";
import { TopBar } from "./layout/TopBar";
import { BottomNav } from "./layout/BottomNav";
import { Sidebar } from "./layout/Sidebar";
import { useAppStore } from "../store/useAppStore";

export default function AppLayout() {
  const { settings } = useAppStore();

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
