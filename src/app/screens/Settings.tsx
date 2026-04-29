import { useNavigate } from "react-router";
import {
  Moon, Sun, Type, Globe, Bell, Lock, Download,
  Trash2, ChevronRight, Eye, User, DollarSign,
  Accessibility, Shield, HelpCircle, Info, LogOut,
  Target, GraduationCap, Users, UserCircle
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore } from "../store/useAppStore";

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
  const { settings, updateSettings, applyPersonaPresets } = useAppStore();
  const { theme, fontSize, simpleMode, notifications, budgetAlerts, currency, userPersona, userGoal } = settings;

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
        <h1 className="text-2xl font-bold text-foreground mb-1">Cài Đặt</h1>
        <p className="text-muted-foreground text-sm">Tuỳ chỉnh ứng dụng theo ý bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Quick Link */}
          <Card
            className="p-4 border-border shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-card hover:bg-muted/50"
            onClick={() => navigate("/app/profile")}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">Nguyễn Văn A</div>
                <div className="text-sm text-muted-foreground">nguyenvana@email.com</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          {/* Appearance */}
          <div>
            <SectionHeader title="Giao Diện" className="mb-3" />
            <Card className="border-border shadow-sm divide-y divide-border">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {theme === "light"
                    ? <Sun className="w-5 h-5 text-yellow-500" />
                    : <Moon className="w-5 h-5 text-indigo-500" />
                  }
                  <div>
                    <div className="text-sm font-medium text-foreground">Chủ Đề</div>
                    <div className="text-xs text-muted-foreground">{theme === "light" ? "Sáng" : "Tối"}</div>
                  </div>
                </div>
                <Toggle value={theme === "dark"} onChange={() => updateSettings({ theme: theme === "light" ? "dark" : "light" })} />
              </div>

              {/* Simple Mode */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Chế Độ Đơn Giản</div>
                    <div className="text-xs text-muted-foreground">Hiển thị phần tử lớn hơn</div>
                  </div>
                </div>
                <Toggle value={simpleMode} onChange={() => updateSettings({ simpleMode: !simpleMode })} />
              </div>

              {/* Accessibility */}
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                onClick={() => {}}
              >
                <div className="flex items-center gap-3">
                  <Accessibility className="w-5 h-5 text-green-500" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">Trợ Năng</div>
                    <div className="text-xs text-muted-foreground">Điều chỉnh trợ năng cho màn hình</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Persona & Goals */}
          <div>
            <SectionHeader title="Đối Tượng & Mục Tiêu" className="mb-3" />
            <Card className="border-border shadow-sm divide-y divide-border">
              {/* Persona Selection */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle className="w-5 h-5 text-blue-500" />
                  <div className="text-sm font-medium text-foreground">Bạn dùng MoneyMate cho:</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "student", label: "Sinh Viên", icon: GraduationCap },
                    { id: "professional", label: "NV Kỷ Luật", icon: Target },
                    { id: "investor", label: "Nhà Đầu Tư", icon: Target }, // using Target as a fallback or import Rocket if needed
                    { id: "hustler", label: "Freelancer", icon: User },
                    { id: "entrepreneur", label: "Doanh Nhân", icon: User },
                    { id: "family", label: "Gia Đình", icon: Users },
                    { id: "senior", label: "Cao Tuổi", icon: User },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isActive = userPersona === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => updateSettings({ userPersona: p.id })}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          isActive ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-muted border-transparent text-foreground hover:bg-accent"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-semibold">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
                {userPersona !== settings.userPersona && (
                  <button 
                    onClick={() => {
                      if (window.confirm("Cập nhật lại danh mục mặc định cho đối tượng này? (Dữ liệu cũ sẽ được bảo toàn)")) {
                        applyPersonaPresets();
                      }
                    }}
                    className="w-full mt-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    Áp dụng danh mục gợi ý mới
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Font Size */}
          <div>
            <SectionHeader title="Cỡ Chữ" className="mb-3" />
            <Card className="p-4 border-border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Chọn cỡ chữ phù hợp</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {fontSizeOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => updateSettings({ fontSize: opt.key })}
                    className={`h-10 rounded-xl text-xs font-medium transition-all ${
                      fontSize === opt.key
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-muted text-foreground hover:bg-accent"
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
            <Card className="border-border shadow-sm divide-y divide-border">
              {/* Currency */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <div className="text-sm font-medium text-foreground">Đơn Vị Tiền Tệ</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {currencyOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => updateSettings({ currency: c })}
                      className={`h-9 rounded-xl text-xs font-bold transition-all ${
                        currency === c
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-muted text-foreground hover:bg-accent"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">Ngôn Ngữ</div>
                    <div className="text-xs text-muted-foreground">Tiếng Việt</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <SectionHeader title="Thông Báo" className="mb-3" />
            <Card className="border-border shadow-sm divide-y divide-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Thông Báo Chung</div>
                    <div className="text-xs text-muted-foreground">Nhắc nhở và cập nhật</div>
                  </div>
                </div>
                <Toggle value={notifications} onChange={() => updateSettings({ notifications: !notifications })} />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Cảnh Báo Ngân Sách</div>
                    <div className="text-xs text-muted-foreground">Khi gần vượt giới hạn</div>
                  </div>
                </div>
                <Toggle value={budgetAlerts} onChange={() => updateSettings({ budgetAlerts: !budgetAlerts })} />
              </div>
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                onClick={() => navigate("/app/notifications")}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Xem Tất Cả Thông Báo</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Privacy & Data */}
          <div>
            <SectionHeader title="Bảo Mật & Dữ Liệu" className="mb-3" />
            <Card className="border-border shadow-sm divide-y divide-border">
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Cài Đặt Bảo Mật</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-foreground">Xuất Dữ Liệu</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Trợ Giúp & Phản Hồi</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center gap-3 p-4 hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-5 h-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">Xóa Tất Cả Dữ Liệu</span>
              </button>
            </Card>
          </div>

          {/* Sign Out */}
          <button
            onClick={() => navigate("/")}
            className="w-full h-12 bg-muted hover:bg-destructive/10 hover:text-destructive text-foreground font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Đăng Xuất
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
