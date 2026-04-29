import { useAppStore } from "../../store/useAppStore";
import { Card } from "../ui/card";

export function DashboardMainChart() {
  const { settings, getMonthlyIncome, getMonthlyExpenses, getTotalBalance } = useAppStore();
  const persona = settings.userPersona;
  const simpleMode = settings.simpleMode;

  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const totalBalance = getTotalBalance();

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + "k";
    return n.toLocaleString("vi-VN");
  };

  if (persona === "senior") return null;

  if (persona === "professional") {
    // 50/30/20 Rule Visualization
    const needs = monthlyExpenses * 0.5;
    const wants = monthlyExpenses * 0.3;
    const savings = monthlyExpenses * 0.2;
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1">Biểu Đồ 50/30/20</h3>
        <Card className="p-6 bg-card flex flex-col items-center justify-center space-y-6">
          <div className="w-40 h-40 rounded-full border-[16px] border-primary flex items-center justify-center relative shadow-sm">
             <div className="absolute inset-0 rounded-full border-[16px] border-secondary" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }} />
             <div className="absolute inset-0 rounded-full border-[16px] border-accent" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }} />
             <div className="text-center">
               <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Chi Tiêu</div>
               <div className="font-bold text-xl">{formatMoney(monthlyExpenses)}</div>
             </div>
          </div>
          <div className="grid grid-cols-3 w-full text-center gap-2">
            <div className="p-3 bg-primary/10 rounded-xl">
              <div className="text-xs font-semibold text-primary mb-1">50% Nhu Cầu</div>
              <div className="text-sm font-bold">{formatMoney(needs)}</div>
            </div>
            <div className="p-3 bg-secondary/20 rounded-xl">
              <div className="text-xs font-semibold text-secondary-foreground mb-1">30% Sở Thích</div>
              <div className="text-sm font-bold">{formatMoney(wants)}</div>
            </div>
            <div className="p-3 bg-accent/50 rounded-xl">
              <div className="text-xs font-semibold text-accent-foreground mb-1">20% Tích Lũy</div>
              <div className="text-sm font-bold">{formatMoney(savings)}</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (persona === "entrepreneur") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-semibold">Báo Cáo Lãi/Lỗ Nhanh</h3>
          <div className="bg-muted p-1 rounded-full flex text-xs font-medium">
             <button className="px-3 py-1 bg-background shadow-sm rounded-full text-foreground">Kinh Doanh</button>
             <button className="px-3 py-1 text-muted-foreground">Cá Nhân</button>
          </div>
        </div>
        <Card className="p-6 bg-card flex flex-col space-y-4">
           <div className="flex justify-between items-center pb-4 border-b border-border">
             <div className="text-muted-foreground">Tổng Thu (Doanh thu)</div>
             <div className="font-bold text-green-600">+{formatMoney(monthlyIncome)}</div>
           </div>
           <div className="flex justify-between items-center pb-4 border-b border-border">
             <div className="text-muted-foreground">Tổng Chi (Chi phí)</div>
             <div className="font-bold text-red-600">-{formatMoney(monthlyExpenses)}</div>
           </div>
           <div className="flex justify-between items-center pt-2">
             <div className="font-semibold text-lg">Lợi Nhuận Gộp</div>
             <div className={`font-bold text-xl ${monthlyIncome - monthlyExpenses >= 0 ? "text-primary" : "text-destructive"}`}>
                {formatMoney(monthlyIncome - monthlyExpenses)}
             </div>
           </div>
        </Card>
      </div>
    );
  }

  if (persona === "investor") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold px-1">Cơ Cấu Tài Sản (Asset Allocation)</h3>
        <Card className="p-6 bg-card">
           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /> <span>Tiền Mặt (Ví)</span></div>
               <span className="font-semibold">{formatMoney(totalBalance)}</span>
             </div>
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary" /> <span>Chứng Khoán</span></div>
               <span className="font-semibold">{formatMoney(35000000)}</span>
             </div>
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /> <span>Tiết Kiệm Gửi Góp</span></div>
               <span className="font-semibold">{formatMoney(15000000)}</span>
             </div>
           </div>
           <div className="w-full h-3 bg-muted rounded-full mt-6 flex overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '20%' }} />
              <div className="h-full bg-secondary" style={{ width: '50%' }} />
              <div className="h-full bg-accent" style={{ width: '30%' }} />
           </div>
        </Card>
      </div>
    );
  }

  // Default Stats Grid for Student, Family, Hustler
  return (
    <div className={`grid ${simpleMode ? "grid-cols-2" : "grid-cols-3"} gap-4`}>
      <Card className="border-border shadow-sm p-4 lg:p-6 text-center rounded-2xl flex flex-col items-center justify-center bg-card transition-all hover:-translate-y-1">
        <div className={`text-green-600 dark:text-green-400 ${simpleMode ? "text-2xl" : "text-xl lg:text-3xl"} font-bold mb-1`}>{formatMoney(monthlyIncome)}</div>
        <div className="text-sm text-muted-foreground font-medium">Thu Nhập</div>
      </Card>
      <Card className="border-border shadow-sm p-4 lg:p-6 text-center rounded-2xl flex flex-col items-center justify-center bg-card transition-all hover:-translate-y-1">
        <div className={`text-red-600 dark:text-red-400 ${simpleMode ? "text-2xl" : "text-xl lg:text-3xl"} font-bold mb-1`}>{formatMoney(monthlyExpenses)}</div>
        <div className="text-sm text-muted-foreground font-medium">Chi Tiêu</div>
      </Card>
      {!simpleMode && (
        <Card className="border-border shadow-sm p-4 lg:p-6 text-center rounded-2xl flex flex-col items-center justify-center bg-card transition-all hover:-translate-y-1">
          <div className="text-primary text-xl lg:text-3xl font-bold mb-1">{formatMoney(totalBalance)}</div>
          <div className="text-sm text-muted-foreground font-medium">Tổng Tài Sản</div>
        </Card>
      )}
    </div>
  );
}
