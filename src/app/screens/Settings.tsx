import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Moon,
  Sun,
  Type,
  Globe,
  Bell,
  Lock,
  Download,
  Trash2,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Eye,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [simpleMode, setSimpleMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="px-6 py-6 space-y-6">
      <div>
        <h1 className="text-2xl mb-2">Cài Đặt</h1>
        <p className="text-muted-foreground">Quản lý tùy chọn của bạn</p>
      </div>

      {/* Appearance Section */}
      <div>
        <h3 className="mb-3">Giao Diện</h3>
        <div className="space-y-2">
          {/* Theme */}
          <div className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "light" ? (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <div className="text-base">Chủ Đề</div>
                  <div className="text-sm text-muted-foreground">
                    {theme === "light" ? "Sáng" : "Tối"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-blue-600"
              >
                {theme === "light" ? (
                  <ToggleLeft className="w-8 h-8" />
                ) : (
                  <ToggleRight className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-muted-foreground" />
                <div className="text-base">Cỡ Chữ</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize("normal")}
                className={`h-10 rounded-lg transition-all ${
                  fontSize === "normal"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-foreground"
                }`}
              >
                Bình Thường
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`h-10 rounded-lg transition-all ${
                  fontSize === "large"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-foreground"
                }`}
              >
                Lớn
              </button>
              <button
                onClick={() => setFontSize("xlarge")}
                className={`h-10 rounded-lg transition-all ${
                  fontSize === "xlarge"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-foreground"
                }`}
              >
                Rất Lớn
              </button>
            </div>
          </div>

          {/* Simple Mode */}
          <div className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-base">Chế Độ Đơn Giản</div>
                  <div className="text-sm text-muted-foreground">
                    Giao diện dễ hơn với phần tử lớn hơn
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSimpleMode(!simpleMode)}
                className="text-blue-600"
              >
                {simpleMode ? (
                  <ToggleRight className="w-8 h-8" />
                ) : (
                  <ToggleLeft className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* General Section */}
      <div>
        <h3 className="mb-3">Chung</h3>
        <div className="space-y-2">
          {/* Language */}
          <button className="w-full bg-white rounded-2xl p-4 border border-border flex items-center justify-between hover:border-blue-600 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div className="text-left">
                <div className="text-base">Ngôn Ngữ</div>
                <div className="text-sm text-muted-foreground">Tiếng Việt</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-base">Thông Báo</div>
                  <div className="text-sm text-muted-foreground">Cảnh báo ngân sách và nhắc nhở</div>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className="text-blue-600"
              >
                {notifications ? (
                  <ToggleRight className="w-8 h-8" />
                ) : (
                  <ToggleLeft className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security Section */}
      <div>
        <h3 className="mb-3">Riêng Tư & Bảo Mật</h3>
        <div className="space-y-2">
          <button className="w-full bg-white rounded-2xl p-4 border border-border flex items-center justify-between hover:border-blue-600 transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <div className="text-base">Cài Đặt Riêng Tư</div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Data Section */}
      <div>
        <h3 className="mb-3">Quản Lý Dữ Liệu</h3>
        <div className="space-y-2">
          <button className="w-full bg-white rounded-2xl p-4 border border-border flex items-center gap-3 hover:border-blue-600 transition-colors">
            <Download className="w-5 h-5 text-blue-600" />
            <div className="text-base">Xuất Dữ Liệu</div>
          </button>

          <button className="w-full bg-white rounded-2xl p-4 border-2 border-red-200 flex items-center gap-3 hover:border-red-600 transition-colors">
            <Trash2 className="w-5 h-5 text-red-600" />
            <div className="text-base text-red-600">Xóa Tất Cả Dữ Liệu</div>
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="pb-6">
        <button
          onClick={() => navigate("/")}
          className="w-full h-14 bg-gray-100 text-foreground rounded-xl hover:bg-gray-200 transition-colors"
        >
          Đăng Xuất
        </button>
      </div>
    </div>
  );
}
