import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Mail, Phone, Camera, ChevronRight,
  Wallet, TrendingUp, TrendingDown, Edit3, Shield,
  Star, Award, Target
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@email.com");
  const [phone, setPhone] = useState("0912 345 678");

  const stats = [
    { label: "Tổng Giao Dịch", value: "127", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Tháng Này", value: "18", icon: TrendingDown, color: "text-green-600", bg: "bg-green-50" },
    { label: "Ngân Sách", value: "4", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Ví", value: "2", icon: Wallet, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const achievements = [
    { title: "Người Tiết Kiệm", desc: "Tiết kiệm > 20% thu nhập", earned: true, icon: "🏆" },
    { title: "Ghi Chép Chăm Chỉ", desc: "30 ngày ghi liên tiếp", earned: true, icon: "🔥" },
    { title: "Nhà Đầu Tư", desc: "Đặt mục tiêu tiết kiệm", earned: false, icon: "💎" },
    { title: "Bậc Thầy Ngân Sách", desc: "Không vượt ngân sách 3 tháng", earned: false, icon: "⭐" },
  ];

  const menuItems = [
    { label: "Bảo Mật Tài Khoản", icon: Shield, path: "/app/settings" },
    { label: "Cài Đặt Thông Báo", icon: Star, path: "/app/notifications" },
    { label: "Cài Đặt App", icon: Edit3, path: "/app/settings" },
  ];

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Hồ Sơ</h1>
          <p className="text-slate-500 text-sm">Quản lý thông tin cá nhân</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isEditing
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? "Lưu" : "Chỉnh Sửa"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Avatar + Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Avatar */}
          <Card className="p-6 border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">A</span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:border-blue-600 transition-colors">
                <Camera className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-xl font-bold text-slate-900 border-b-2 border-blue-600 focus:outline-none bg-transparent w-full mb-1"
              />
            ) : (
              <div className="text-xl font-bold text-slate-900 mb-1">{name}</div>
            )}
            <div className="text-sm text-slate-500 mb-3">Thành Viên từ T4/2026</div>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span>Người Dùng Tích Cực</span>
            </div>
          </Card>

          {/* Quick Menu */}
          <Card className="border-slate-100 shadow-sm divide-y divide-slate-100">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </Card>
        </div>

        {/* Right: Details + Stats + Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card className="p-5 border-slate-100 shadow-sm">
            <SectionHeader title="Thông Tin Liên Hệ" className="mb-4" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 font-medium mb-0.5">Email</div>
                  {isEditing ? (
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-sm font-medium text-slate-800 border-b border-blue-600 focus:outline-none bg-transparent w-full"
                    />
                  ) : (
                    <div className="text-sm font-medium text-slate-800">{email}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400 font-medium mb-0.5">Số Điện Thoại</div>
                  {isEditing ? (
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-sm font-medium text-slate-800 border-b border-blue-600 focus:outline-none bg-transparent w-full"
                    />
                  ) : (
                    <div className="text-sm font-medium text-slate-800">{phone}</div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div>
            <SectionHeader title="Thống Kê" className="mb-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="p-4 border-slate-100 shadow-sm text-center">
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <SectionHeader title="Thành Tích" className="mb-3" />
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <Card
                  key={ach.title}
                  className={`p-4 border shadow-sm ${
                    ach.earned
                      ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      : "border-slate-100 opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-2">{ach.icon}</div>
                  <div className={`text-sm font-bold mb-0.5 ${ach.earned ? "text-slate-900" : "text-slate-400"}`}>
                    {ach.title}
                  </div>
                  <div className="text-xs text-slate-500">{ach.desc}</div>
                  {ach.earned && (
                    <div className="mt-2 text-xs font-semibold text-yellow-600 bg-yellow-100 inline-block px-2 py-0.5 rounded-full">
                      Đã đạt
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
