import { useNavigate } from "react-router";
import { Bell, User } from "lucide-react";

export function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-xl">💰</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-800">MoneyMate</h2>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => navigate("/app/settings")}
          className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <User className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
