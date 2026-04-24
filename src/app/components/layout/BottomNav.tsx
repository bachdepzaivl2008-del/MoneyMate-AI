import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Receipt, Plus, Target, Settings, Wallet, PiggyBank, Brain } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "overview", label: "Tổng Quan", icon: LayoutDashboard, path: "/app" },
    { id: "goals", label: "Mục Tiêu", icon: PiggyBank, path: "/app/goals" },
    { id: "add", label: "Thêm", icon: Plus, path: "/app/add" },
    { id: "insights", label: "Insights", icon: Brain, path: "/app/insights" },
    { id: "settings", label: "Cài Đặt", icon: Settings, path: "/app/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-2 safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          const isAddButton = tab.id === "add";

          if (isAddButton) {
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-1 relative -top-4 outline-none"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-blue-600 font-medium">Thêm</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && navigate(tab.path)}
              disabled={tab.disabled}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors outline-none ${
                tab.disabled
                  ? "opacity-40 cursor-not-allowed"
                  : active
                  ? "text-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className={`text-xs ${active ? "font-medium" : ""}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
