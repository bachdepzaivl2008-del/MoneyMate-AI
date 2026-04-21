import { Outlet, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Receipt, Plus, Target, Settings, Bell, User } from "lucide-react";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "overview", label: "Tổng Quan", icon: LayoutDashboard, path: "/app" },
    { id: "history", label: "Lịch Sử", icon: Receipt, path: "/app/history" },
    { id: "add", label: "Thêm", icon: Plus, path: "/app/add" },
    { id: "budgets", label: "Ngân Sách", icon: Target, path: "/app/budgets" },
    { id: "ai", label: "AI", icon: Settings, path: "/app/ai", disabled: true },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-xl">💰</span>
          </div>
          <h2 className="text-xl">MoneyMate</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/app/settings")}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-2 safe-area-inset-bottom">
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
                  className="flex flex-col items-center gap-1 relative -top-4"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-blue-600">Thêm</span>
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && navigate(tab.path)}
                disabled={tab.disabled}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  tab.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : active
                    ? "text-blue-600"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
