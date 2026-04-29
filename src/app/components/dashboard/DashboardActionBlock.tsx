import { useAppStore } from "../../store/useAppStore";
import { Card } from "../ui/card";
import { Target, Zap, ShieldAlert, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

export function DashboardActionBlock() {
  const { settings, getMonthlyExpenses, getTotalBalance } = useAppStore();
  const persona = settings.userPersona;
  const simpleMode = settings.simpleMode;

  const totalBalance = getTotalBalance();
  const monthlyExpenses = getMonthlyExpenses() || 5000000;

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + "k";
    return n.toLocaleString("vi-VN");
  };

  if (persona === "senior") {
    return (
      <div className="pt-4">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-between shadow-lg cursor-pointer hover:scale-105 transition-all">
           <div className="flex items-center gap-4">
             <div className="bg-white/20 p-3 rounded-full">
               <HelpCircle className="w-8 h-8" />
             </div>
             <div>
               <h3 className="text-xl font-bold">The Legacy Button</h3>
               <p className="text-sm opacity-90">Gửi báo cáo nhanh cho con cái</p>
             </div>
           </div>
        </Card>
      </div>
    );
  }

  if (persona === "student") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          The Future Me
        </h3>
        <Card className="p-6 bg-card border-amber-200 dark:border-amber-900 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
          <p className="text-sm text-muted-foreground mb-4">Nếu bạn bớt 1 ly trà sữa (50k) hôm nay, sau 1 năm bạn sẽ có:</p>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">18.250.000₫</span>
            <span className="text-sm font-medium text-muted-foreground mb-1">~ Đủ đi du lịch Thái Lan!</span>
          </div>
          <input type="range" className="w-full accent-amber-500 mt-4" min="0" max="100" defaultValue="50" />
        </Card>
      </div>
    );
  }

  if (persona === "family") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          Predictive Bill Spike
        </h3>
        <Card className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 shadow-sm flex gap-4 items-start">
          <div className="bg-rose-100 dark:bg-rose-900 p-2 rounded-lg text-rose-600 dark:text-rose-400 mt-1">
            <Zap className="w-5 h-5" />
          </div>
          <div>
             <h4 className="font-semibold text-rose-900 dark:text-rose-100">Cảnh báo Tiền Điện</h4>
             <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">Dựa trên dữ liệu mùa hè năm ngoái, dự kiến tiền điện tháng tới sẽ tăng <span className="font-bold">~40%</span>. Hãy trích lập thêm 500k vào quỹ hóa đơn nhé!</p>
          </div>
        </Card>
      </div>
    );
  }

  if (persona === "professional") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Smart Subscription Cleaner
        </h3>
        <Card className="p-4 bg-card border-border shadow-sm">
           <div className="flex justify-between items-center mb-4">
             <div className="text-sm font-medium">Phát hiện 2 dịch vụ ít dùng</div>
             <button className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">Tối ưu ngay</button>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                <span>Spotify Premium</span>
                <span className="text-muted-foreground">-59.000₫</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                <span>Adobe CC</span>
                <span className="text-muted-foreground">-249.000₫</span>
              </div>
           </div>
        </Card>
      </div>
    );
  }

  if (persona === "hustler") {
    const drySeasonBuffer = totalBalance > 0 ? totalBalance * 0.15 : 2000000;
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-indigo-500" />
          The Dry Season Buffer
        </h3>
        <Card className="p-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 shadow-sm">
          <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-3">Tháng này thu nhập của bạn cao hơn trung bình 20%. AI đề xuất trích lập quỹ dự phòng cho "mùa khô":</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{formatMoney(drySeasonBuffer)}</span>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">Chuyển vào Quỹ</button>
          </div>
        </Card>
      </div>
    );
  }

  if (persona === "investor") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-500" />
          Fear & Greed Index
        </h3>
        <Card className="p-6 bg-card border-border shadow-sm">
           <div className="flex justify-between items-end mb-4">
             <div>
               <div className="text-sm text-muted-foreground font-medium mb-1">Chỉ số cảm xúc thị trường</div>
               <div className="text-2xl font-bold text-violet-600">Sợ hãi cực độ (24)</div>
             </div>
             <div className="text-right">
               <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">Cơ hội mua vào</span>
             </div>
           </div>
           <div className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-violet-600 rounded-full shadow" style={{ left: '24%' }} />
           </div>
        </Card>
      </div>
    );
  }

  if (persona === "entrepreneur") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Inventory Bridge
        </h3>
        <Card className="p-5 bg-card border-border shadow-sm">
          <div className="flex justify-between items-center mb-3">
             <span className="text-sm font-medium text-muted-foreground">Ước tính giá trị Tồn kho</span>
             <span className="text-sm font-semibold text-yellow-600">Cập nhật 2h trước</span>
          </div>
          <div className="text-3xl font-bold mb-1">{formatMoney(125000000)}</div>
          <p className="text-xs text-muted-foreground">Tổng tài sản thực tế (Tiền mặt + Tồn kho): <span className="font-semibold text-foreground">{formatMoney(totalBalance + 125000000)}</span></p>
        </Card>
      </div>
    );
  }

  return null;
}
