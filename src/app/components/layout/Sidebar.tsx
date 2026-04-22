import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Receipt, Plus, Target, Settings, Bell, User, Wallet } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const mainTabs = [
    { id: "overview", label: "Tổng Quan", icon: LayoutDashboard, path: "/app" },
    { id: "wallets", label: "Ví & Tài Khoản", icon: Wallet, path: "/app/wallets" },
    { id: "history", label: "Lịch Sử", icon: Receipt, path: "/app/history" },
    { id: "add", label: "Giao Dịch Mới", icon: Plus, path: "/app/add" },
    { id: "budgets", label: "Ngân Sách", icon: Target, path: "/app/budgets" },
  ];

  const secondaryTabs = [
    { id: "notifications", label: "Thông Báo", icon: Bell, path: "/app/notifications" },
    { id: "settings", label: "Cài Đặt", icon: Settings, path: "/app/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(path);
  };

  const NavButton = ({
    tab,
    isAdd = false,
  }: {
    tab: { id: string; label: string; icon: React.ElementType; path: string; disabled?: boolean };
    isAdd?: boolean;
  }) => {
    const Icon = tab.icon;
    const active = isActive(tab.path);
    return (
      <button
        key={tab.id}
        onClick={() => navigate(tab.path)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium outline-none ${
          isAdd
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md my-1"
            : active
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{tab.label}</span>
      </button>
    );
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen flex-shrink-0">
      {/* Brand / Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          MoneyMate
        </span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Chính</span>
        </div>
        {mainTabs.map((tab) => (
          <NavButton key={tab.id} tab={tab} isAdd={tab.id === "add"} />
        ))}

        <div className="px-2 pt-4 mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cài Đặt</span>
        </div>
        {secondaryTabs.map((tab) => (
          <NavButton key={tab.id} tab={tab} />
        ))}
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={() => navigate("/app/profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors ${
            isActive("/app/profile") ? "bg-blue-50 text-blue-600" : ""
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0 flex items-center justify-center font-bold text-white text-sm shadow-sm">
            A
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm font-semibold text-slate-900 truncate">Nguyễn Văn A</div>
            <div className="text-xs text-slate-500 truncate">Xem hồ sơ</div>
          </div>
          <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
