import { useAppStore } from "../../store/useAppStore";
import { Card } from "../ui/card";
import { SectionHeader } from "../ui/SectionHeader";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router";

export function DashboardMainChart() {
  const navigate = useNavigate();
  const { settings, getMonthlyIncome, getMonthlyExpenses, getTotalBalance, wallets } = useAppStore();
  const simpleMode = settings.simpleMode;

  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const totalBalance = getTotalBalance();

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + "k";
    return n.toLocaleString("vi-VN");
  };

  const formatFull = (n: number) => n.toLocaleString("vi-VN") + "₫";

  // Không hiển thị biểu đồ nếu chưa có dữ liệu giao dịch/ví nào
  if (monthlyIncome === 0 && monthlyExpenses === 0 && totalBalance === 0) {
    return null;
  }

  // Bảng màu mặc định cho các ví nếu ví không có màu (hoặc thiếu màu)
  const fallbackColors = [
    "bg-blue-500", "bg-purple-500", "bg-emerald-500", 
    "bg-amber-500", "bg-rose-500", "bg-cyan-500"
  ];

  return (
    <div className="space-y-6">
      {/* 1. Tổng Kết Thu / Chi Tháng Này */}
      {(monthlyIncome > 0 || monthlyExpenses > 0) && (
        <div className="pt-2">
          <SectionHeader title="Thu / Chi Tháng Này" className="mb-4" />
          <div className={`grid ${simpleMode ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
            <Card className="border-border shadow-sm p-4 text-center rounded-2xl bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30">
              <div className="text-sm text-green-700 dark:text-green-400 font-medium mb-1">Tổng Thu Nhập</div>
              <div className={`text-green-600 dark:text-green-400 ${simpleMode ? "text-3xl" : "text-2xl lg:text-3xl"} font-bold`}>
                +{formatMoney(monthlyIncome)}
              </div>
            </Card>
            <Card className="border-border shadow-sm p-4 text-center rounded-2xl bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30">
              <div className="text-sm text-red-700 dark:text-red-400 font-medium mb-1">Tổng Chi Tiêu</div>
              <div className={`text-red-600 dark:text-red-400 ${simpleMode ? "text-3xl" : "text-2xl lg:text-3xl"} font-bold`}>
                -{formatMoney(monthlyExpenses)}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Cơ Cấu Tài Sản (Asset Allocation) từ dữ liệu ví thật */}
      {wallets.length > 0 && totalBalance > 0 && (
        <div className="pt-2">
          <SectionHeader 
            title="Cơ Cấu Tài Sản" 
            action={
              <button onClick={() => navigate("/app/wallets")} className="text-primary text-sm font-medium hover:underline">
                Quản lý Ví
              </button>
            }
            className="mb-4" 
          />
          <Card className="p-5 bg-card border-border shadow-sm">
             <div className="space-y-3">
               {wallets.map((wallet, index) => {
                 const percentage = ((wallet.balance / totalBalance) * 100).toFixed(1);
                 const colorClass = wallet.color || fallbackColors[index % fallbackColors.length];
                 return (
                   <div key={wallet.id} className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                       <div className={`w-3 h-3 rounded-full ${colorClass.replace('text-', 'bg-')}`} /> 
                       <span className="text-sm font-medium text-foreground">{wallet.name}</span>
                       <span className="text-xs text-muted-foreground ml-1">({percentage}%)</span>
                     </div>
                     <span className="font-semibold text-sm">{formatFull(wallet.balance)}</span>
                   </div>
                 );
               })}
             </div>
             
             {/* Progress bar tổng hợp */}
             <div className="w-full h-3 bg-muted rounded-full mt-5 flex overflow-hidden shadow-inner">
                {wallets.map((wallet, index) => {
                  const percentage = (wallet.balance / totalBalance) * 100;
                  const colorClass = wallet.color || fallbackColors[index % fallbackColors.length];
                  // Trích xuất mã màu nền (nếu color format là text-blue-500 thì chuyển thành bg-blue-500)
                  const bgClass = colorClass.includes('text-') ? colorClass.replace('text-', 'bg-') : colorClass;
                  
                  return (
                    <div 
                      key={`bar-${wallet.id}`} 
                      className={`h-full ${bgClass}`} 
                      style={{ width: `${percentage}%` }} 
                      title={`${wallet.name}: ${percentage.toFixed(1)}%`}
                    />
                  );
                })}
             </div>
          </Card>
        </div>
      )}
    </div>
  );
}
