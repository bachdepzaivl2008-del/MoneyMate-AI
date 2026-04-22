import { useState } from "react";
import {
  Bell, BellOff, CheckCircle2, AlertCircle,
  TrendingDown, Target, Calendar, Info, ChevronRight,
  Trash2, Settings
} from "lucide-react";
import { useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";

type NotificationType = "warning" | "success" | "reminder" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "warning",
      title: "Cảnh Báo Ngân Sách",
      message: "Bạn đã dùng 90% ngân sách Di Chuyển tháng này. Còn lại 20.000₫.",
      time: "5 phút trước",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Mục Tiêu Gần Đạt",
      message: "Tuyệt vời! Bạn đã tiết kiệm được 85% mục tiêu tháng này.",
      time: "2 giờ trước",
      read: false,
    },
    {
      id: 3,
      type: "reminder",
      title: "Nhắc Thanh Toán",
      message: "Đừng quên đóng tiền điện trước ngày 25/04. Ước tính ~120.000₫.",
      time: "Hôm qua",
      read: false,
    },
    {
      id: 4,
      type: "info",
      title: "Tổng Kết Tuần",
      message: "Tuần này bạn chi tiêu 342.000₫, ít hơn 15% so với tuần trước.",
      time: "2 ngày trước",
      read: true,
    },
    {
      id: 5,
      type: "success",
      title: "Giao Dịch Thành Công",
      message: "Đã ghi nhận: Chi tiêu Ăn Uống 85.500₫ lúc 12:30 hôm nay.",
      time: "3 ngày trước",
      read: true,
    },
    {
      id: 6,
      type: "warning",
      title: "Chi Tiêu Bất Thường",
      message: "Phát hiện chi tiêu Mua Sắm cao hơn 50% so với tuần trước.",
      time: "5 ngày trước",
      read: true,
    },
  ]);

  const iconMap: Record<NotificationType, { icon: React.ElementType; color: string; bg: string }> = {
    warning: { icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
    success: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    reminder: { icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
    info: { icon: Info, color: "text-slate-500", bg: "bg-slate-100" },
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Thông Báo</h1>
          <p className="text-slate-500 text-sm">
            {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : "Tất cả đã đọc"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Đọc tất cả
            </button>
          )}
          <button
            onClick={() => navigate("/app/settings")}
            className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <Card className="p-12 border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <BellOff className="w-8 h-8 text-slate-400" />
          </div>
          <div className="text-slate-700 font-semibold mb-1">Không có thông báo</div>
          <div className="text-slate-400 text-sm">Bạn đã xử lý hết rồi!</div>
        </Card>
      )}

      {/* Unread */}
      {unread.length > 0 && (
        <div>
          <SectionHeader
            title="Chưa Đọc"
            action={
              <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                {unread.length}
              </span>
            }
            className="mb-3"
          />
          <div className="space-y-3">
            {unread.map((notif) => {
              const { icon: Icon, color, bg } = iconMap[notif.type];
              return (
                <Card
                  key={notif.id}
                  className="p-4 border-blue-100 bg-blue-50/30 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => markRead(notif.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-900">{notif.title}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                          className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2">{notif.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{notif.time}</span>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Read */}
      {read.length > 0 && (
        <div>
          <SectionHeader title="Đã Đọc" className="mb-3" />
          <div className="space-y-2">
            {read.map((notif) => {
              const { icon: Icon, color, bg } = iconMap[notif.type];
              return (
                <Card
                  key={notif.id}
                  className="p-4 border-slate-100 shadow-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-medium text-slate-700">{notif.title}</span>
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-1">{notif.message}</p>
                      <span className="text-xs text-slate-400">{notif.time}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Notification Preferences CTA */}
      <Card className="p-4 border-slate-100 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">Tùy Chỉnh Thông Báo</div>
              <div className="text-xs text-slate-500">Chọn loại thông báo bạn muốn nhận</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/app/settings")}
            className="text-blue-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Card>
    </PageContainer>
  );
}
