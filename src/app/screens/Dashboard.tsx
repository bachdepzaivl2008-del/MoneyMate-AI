import { ShoppingBag, TrendingUp, Target, PieChart, Wallet as WalletIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/card";
import { useAppStore } from "../store/useAppStore";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardMainChart } from "../components/dashboard/DashboardMainChart";

const categoryIcons: Record<string, React.ElementType> = {
  "Ăn Uống": ShoppingBag,
  "Mua Sắm": ShoppingBag,
  "Lương": TrendingUp,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { getRecentTransactions, settings, budgets, savingsGoals, getTotalBalance } = useAppStore();
  const simpleMode = settings.simpleMode;
  const recentTxs = getRecentTransactions(simpleMode ? 2 : 3);

  const formatFull = (n: number) => n.toLocaleString("vi-VN") + "₫";

  const formatDate = (ds: string) => {
    if (!ds) return "";
    const d = new Date(ds);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  };

  return (
    <PageContainer className="space-y-8 lg:space-y-10 pb-20">
      {/* Dynamic Header Component */}
      <DashboardHeader />

      {/* Feature Quick Links - The Core UI "Engine Room" */}
      <div className="grid grid-cols-4 gap-2 py-2">
        {[
          { label: "Ví", icon: WalletIcon, path: "/app/wallets", color: "text-blue-500" },
          { label: "Ngân sách", icon: PieChart, path: "/app/budgets", color: "text-purple-500" },
          { label: "Mục tiêu", icon: Target, path: "/app/goals", color: "text-emerald-500" },
          { label: "Báo cáo", icon: TrendingUp, path: "/app/reports", color: "text-orange-500" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-muted/50 transition-colors"
          >
            <div className={`w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Main Chart Component */}
      <DashboardMainChart />

      {/* Savings Goals Summary */}
      {savingsGoals.length > 0 && (
        <div className="pt-2">
          <SectionHeader
            title="Mục Tiêu Tiết Kiệm"
            action={
              <button onClick={() => navigate("/app/goals")} className="text-primary text-sm font-medium hover:underline">
                Tất Cả
              </button>
            }
            className="mb-4"
          />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {savingsGoals.map((goal) => (
              <Card 
                key={goal.id} 
                className="p-4 min-w-[200px] border-border shadow-sm flex flex-col gap-3 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => navigate("/app/goals")}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{goal.icon}</div>
                  <div className="font-bold text-sm truncate">{goal.name}</div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                    <span>Tiến độ</span>
                    <span>{Math.round((goal.savedAmount / goal.targetAmount) * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${goal.color}`} 
                      style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }} 
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions - Always shown in Core UI */}
      {recentTxs.length > 0 && (
        <div className="pt-4">
          <SectionHeader
            title="Giao Dịch Gần Đây"
            action={
              <button onClick={() => navigate("/app/history")} className="text-primary text-sm font-medium hover:underline">
                Xem Tất Cả
              </button>
            }
            className="mb-4"
          />
          <div className="space-y-3">
            {recentTxs.map((tx) => {
              const Icon = categoryIcons[tx.category] || ShoppingBag;
              const isIncome = tx.type === "income";
              return (
                <Card key={tx.id} className="p-4 border-border flex items-center gap-4 shadow-sm bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className={`w-12 h-12 ${isIncome ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${isIncome ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground mb-0.5">{tx.title}</div>
                    <div className="text-xs text-muted-foreground">{tx.category} • {formatDate(tx.date)}</div>
                  </div>
                  <div className={`font-bold text-sm ${isIncome ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                    {isIncome ? "+" : "-"}{formatFull(tx.amount)}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
