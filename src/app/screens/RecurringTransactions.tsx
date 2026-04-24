import { Calendar, Plus, Clock, Bell, Trash2, CheckCircle2 } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useState } from "react";

export default function RecurringTransactions() {
  const [showForm, setShowForm] = useState(false);

  const recurringItems = [
    {
      id: 1,
      title: "Tiền thuê nhà",
      amount: 5000000,
      category: "Nhà Ở",
      period: "Hàng tháng",
      nextDate: "2026-05-01",
      icon: "🏠",
    },
    {
      id: 2,
      title: "Gói Netflix",
      amount: 260000,
      category: "Giải Trí",
      period: "Hàng tháng",
      nextDate: "2026-04-28",
      icon: "📺",
    },
    {
      id: 3,
      title: "Tiền điện",
      amount: 850000,
      category: "Tiện Ích",
      period: "Hàng tháng",
      nextDate: "2026-05-10",
      icon: "⚡",
    },
  ];

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Giao Dịch Định Kỳ</h1>
          <p className="text-slate-500 text-sm">Nhắc nhở & tự động hóa chi tiêu</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Thêm Lịch
        </button>
      </div>

      {showForm && (
        <Card className="p-6 border-blue-200 bg-blue-50/20 shadow-sm animate-in slide-in-from-top duration-300">
          <SectionHeader title="Tạo Lịch Nhắc Mới" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Tên Giao Dịch</label>
                <input type="text" className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm" placeholder="VD: Tiền nhà, Internet..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Số Tiền</label>
                <input type="number" className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm" placeholder="0" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Chu Kỳ</label>
                <select className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm appearance-none">
                  <option>Hàng tuần</option>
                  <option selected>Hàng tháng</option>
                  <option>Hàng năm</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Ngày Nhắc Tiếp Theo</label>
                <input type="date" className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md">Lưu Lịch Nhắc</button>
            <button onClick={() => setShowForm(false)} className="flex-1 h-12 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50">Hủy</button>
          </div>
        </Card>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex items-center gap-3 border-slate-100">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Đang hoạt động</div>
            <div className="text-lg font-bold text-slate-900">{recurringItems.length} Lịch</div>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3 border-slate-100">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Tổng chi ước tính</div>
            <div className="text-lg font-bold text-slate-900">~6.1tr</div>
          </div>
        </Card>
      </div>

      {/* List */}
      <div className="space-y-3">
        <SectionHeader title="Danh Sách Lịch Nhắc" />
        {recurringItems.map((item) => (
          <Card key={item.id} className="p-4 border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                <div className="text-xs text-slate-500">{item.period} • {item.category}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-red-600 text-sm">-{item.amount.toLocaleString("vi-VN")}₫</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 justify-end">
                <Calendar className="w-3 h-3" />
                Dự kiến: {item.nextDate}
              </div>
            </div>
            <div className="hidden group-hover:flex items-center gap-2 pl-4 border-l border-slate-100 ml-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
