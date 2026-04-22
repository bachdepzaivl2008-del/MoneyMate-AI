import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Moon, Sun, Type, Globe, Bell, Lock, Download,
  Trash2, ChevronRight, Eye, User, DollarSign,
  Accessibility, Shield, HelpCircle, Info, LogOut,
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
        value ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          value ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [simpleMode, setSimpleMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [currency, setCurrency] = useState("VND");

  const fontSizeOptions = [
    { key: "normal", label: "Bình Thường" },
    { key: "large", label: "Lớn" },
    { key: "xlarge", label: "Rất Lớn" },
  ] as const;

  const currencyOptions = ["VND", "USD", "EUR", "JPY"];

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Cài Đặt</h1>
        <p className="text-slate-500 text-sm">Tuỳ chỉnh ứng dụng theo ý bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Quick Link */}
          <Card
            className="p-4 border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-indigo-50"
            onClick={() => navigate("/app/profile")}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">Nguyễn Văn A</div>
                <div className="text-sm text-slate-500">nguyenvana@email.com</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </Card>

          {/* Appearance */}
          <div>
            <SectionHeader title="Giao Diện" className="mb-3" />
            <Card className="border-slate-100 shadow-sm divide-y divide-slate-100">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {theme === "light"
                    ? <Sun className="w-5 h-5 text-yellow-500" />
                    : <Moon className="w-5 h-5 text-indigo-500" />
                  }
                  <div>
                    <div className="text-sm font-medium text-slate-800">Chủ Đề</div>
                    <div className="text-xs text-slate-500">{theme === "light" ? "Sáng" : "Tối"}</div>
                  </div>
                </div>
                <Toggle value={theme === "dark"} onChange={() => setTheme(theme === "light" ? "dark" : "light")} />
              </div>

              {/* Simple Mode */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-800">Chế Độ Đơn Giản</div>
                    <div className="text-xs text-slate-500">Hiển thị phần tử lớn hơn</div>
                  </div>
                </div>
                <Toggle value={simpleMode} onChange={() => setSimpleMode(!simpleMode)} />
              </div>

              {/* Accessibility */}
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                onClick={() => {}}
              >
                <div className="flex items-center gap-3">
                  <Accessibility className="w-5 h-5 text-green-500" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-800">Trợ Năng</div>
                    <div className="text-xs text-slate-500">Điều chỉnh trợ năng cho màn hình</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </Card>
          </div>

          {/* Font Size */}
          <div>
            <SectionHeader title="Cỡ Chữ" className="mb-3" />
            <Card className="p-4 border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">Chọn cỡ chữ phù hợp</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {fontSizeOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setFontSize(opt.key)}
                    className={`h-10 rounded-xl text-xs font-medium transition-all ${
                      fontSize === opt.key
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* General */}
          <div>
            <SectionHeader title="Chung" className="mb-3" />
            <Card className="border-slate-100 shadow-sm divide-y divide-slate-100">
              {/* Currency */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <div className="text-sm font-medium text-slate-800">Đơn Vị Tiền Tệ</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {currencyOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`h-9 rounded-xl text-xs font-bold transition-all ${
                        currency === c
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-800">Ngôn Ngữ</div>
                    <div className="text-xs text-slate-500">Tiếng Việt</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <SectionHeader title="Thông Báo" className="mb-3" />
            <Card className="border-slate-100 shadow-sm divide-y divide-slate-100">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-800">Thông Báo Chung</div>
                    <div className="text-xs text-slate-500">Nhắc nhở và cập nhật</div>
                  </div>
                </div>
                <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm font-medium text-slate-800">Cảnh Báo Ngân Sách</div>
                    <div className="text-xs text-slate-500">Khi gần vượt giới hạn</div>
                  </div>
                </div>
                <Toggle value={budgetAlerts} onChange={() => setBudgetAlerts(!budgetAlerts)} />
              </div>
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                onClick={() => navigate("/app/notifications")}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">Xem Tất Cả Thông Báo</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </Card>
          </div>

          {/* Privacy & Data */}
          <div>
            <SectionHeader title="Bảo Mật & Dữ Liệu" className="mb-3" />
            <Card className="border-slate-100 shadow-sm divide-y divide-slate-100">
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">Cài Đặt Bảo Mật</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-slate-800">Xuất Dữ Liệu</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">Trợ Giúp & Phản Hồi</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
              <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-600">Xóa Tất Cả Dữ Liệu</span>
              </button>
            </Card>
          </div>

          {/* Sign Out */}
          <button
            onClick={() => navigate("/")}
            className="w-full h-12 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Đăng Xuất
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
