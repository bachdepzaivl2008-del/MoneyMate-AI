import { Outlet } from "react-router";
import { TopBar } from "./layout/TopBar";
import { BottomNav } from "./layout/BottomNav";
import { Sidebar } from "./layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative w-full h-full overflow-hidden">
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
