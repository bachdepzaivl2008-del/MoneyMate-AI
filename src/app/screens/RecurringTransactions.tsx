import { Calendar, Plus, Clock, Bell, Trash2, CheckCircle2 } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { DatePicker } from "../components/ui/date-picker";

export default function RecurringTransactions() {
  const [showForm, setShowForm] = useState(false);
  const { recurringTransactions, addRecurringTransaction, deleteRecurringTransaction } = useAppStore();

  // Form states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("Hàng tháng");
  const [nextDate, setNextDate] = useState("");

  const formatDate = (ds: string) => {
    if (!ds) return "";
    const d = new Date(ds);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  };

  const handleSave = () => {
    if (!title || !amount || !nextDate) return;
    
    addRecurringTransaction({
      title,
      amount: Number(amount),
      category: "Khác", // Defaulting for now
      period,
      nextDate,
      icon: "🔄",
    });
    
    // Reset and close
    setTitle("");
    setAmount("");
    setPeriod("Hàng tháng");
    setNextDate("");
    setShowForm(false);
  };

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Giao Dịch Định Kỳ</h1>
          <p className="text-muted-foreground text-sm">Nhắc nhở & tự động hóa chi tiêu</p>
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
        <Card className="p-6 border-blue-200 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-900/10 shadow-sm animate-in slide-in-from-top duration-300">
          <SectionHeader title="Tạo Lịch Nhắc Mới" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Tên Giao Dịch</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-4 bg-background border border-border rounded-xl focus:border-blue-600 focus:outline-none text-sm" 
                  placeholder="VD: Tiền nhà, Internet..." 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Số Tiền</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-11 px-4 bg-background border border-border rounded-xl focus:border-blue-600 focus:outline-none text-sm" 
                  placeholder="0" 
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Chu Kỳ</label>
                <select 
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full h-11 px-4 bg-background border border-border rounded-xl focus:border-blue-600 focus:outline-none text-sm appearance-none"
                >
                  <option value="Hàng tuần">Hàng tuần</option>
                  <option value="Hàng tháng">Hàng tháng</option>
                  <option value="Hàng năm">Hàng năm</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Ngày Nhắc Tiếp Theo</label>
                <DatePicker 
                  value={nextDate}
                  onChange={setNextDate}
                  className="w-full h-11 rounded-xl px-4"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md">Lưu Lịch Nhắc</button>
            <button onClick={() => setShowForm(false)} className="flex-1 h-12 bg-background border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors">Hủy</button>
          </div>
        </Card>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex items-center gap-3 border-border bg-card">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground">Đang hoạt động</div>
            <div className="text-lg font-bold text-foreground">{recurringTransactions.length} Lịch</div>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3 border-border bg-card">
          <div className="w-10 h-10 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground">Tổng chi ước tính</div>
            <div className="text-lg font-bold text-foreground">
              ~{(recurringTransactions.reduce((sum, item) => sum + item.amount, 0) / 1000000).toFixed(1)}tr
            </div>
          </div>
        </Card>
      </div>

      {/* List */}
      <div className="space-y-3">
        <SectionHeader title="Danh Sách Lịch Nhắc" />
        
        {recurringTransactions.length === 0 ? (
          <Card className="p-8 border-dashed border-border bg-transparent flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Chưa có lịch nhắc nào</h3>
            <p className="text-xs text-muted-foreground max-w-[250px] mb-4">
              Thêm các giao dịch định kỳ để ứng dụng tự động nhắc nhở bạn.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Thêm lịch ngay
            </button>
          </Card>
        ) : (
          recurringTransactions.map((item) => (
            <Card key={item.id} className="p-4 border-border bg-card flex items-center justify-between hover:border-blue-200 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                <div>
                  <div className="font-bold text-foreground text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.period} • {item.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-600 dark:text-red-400 text-sm">-{item.amount.toLocaleString("vi-VN")}₫</div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end">
                  <Calendar className="w-3 h-3" />
                  Dự kiến: {formatDate(item.nextDate)}
                </div>
              </div>
              <div className="hidden group-hover:flex items-center gap-2 pl-4 border-l border-border ml-4">
                <button className="p-2 text-muted-foreground hover:text-blue-600 transition-colors"><CheckCircle2 className="w-5 h-5" /></button>
                <button 
                  onClick={() => deleteRecurringTransaction(item.id)}
                  className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </PageContainer>
  );
}
