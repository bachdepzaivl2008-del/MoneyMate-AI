import { TrendingUp, ShoppingBag, Utensils, Car, PlusCircle, Target, Wallet, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/card";
import { useAppStore } from "../store/useAppStore";

const categoryIcons: Record<string, React.ElementType> = {
  "Ăn Uống": Utensils,
  "Mua Sắm": ShoppingBag,
  "Di Chuyển": Car,
  "Lương": TrendingUp,
  "Freelance": TrendingUp,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    getTotalBalance, getMonthlyIncome, getMonthlyExpenses,
    getRecentTransactions, budgets, getSpentByCategory,
    savingsGoals,
  } = useAppStore();

  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const recentTxs = getRecentTransactions(3);
  const topGoals = savingsGoals.slice(0, 2);

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + "k";
    return n.toLocaleString("vi-VN");
  };

  const formatFull = (n: number) => n.toLocaleString("vi-VN") + "₫";

  return (
    <PageContainer className="space-y-6 lg:space-y-8">
      {/* Top Section - Balance & Stats */}
      <div className="space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 lg:p-8 text-white shadow-md">
          <div className="text-sm opacity-90 mb-2 font-medium">Số Dư Hiện Tại</div>
          <div className="text-4xl lg:text-6xl mb-4 font-semibold tracking-tight">
            {formatFull(totalBalance)}
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Thu nhập tháng: {formatMoney(monthlyIncome)}₫</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 lg:gap-8">
          <Card className="border-border shadow-sm p-6 text-center rounded-2xl flex flex-col items-center justify-center bg-white">
            <div className="text-green-600 text-2xl lg:text-3xl font-bold mb-1">{formatMoney(monthlyIncome)}</div>
            <div className="text-sm text-muted-foreground font-medium">Thu Nhập</div>
          </Card>
          <Card className="border-border shadow-sm p-6 text-center rounded-2xl flex flex-col items-center justify-center bg-white">
            <div className="text-red-600 text-2xl lg:text-3xl font-bold mb-1">{formatMoney(monthlyExpenses)}</div>
            <div className="text-sm text-muted-foreground font-medium">Chi Tiêu</div>
          </Card>
          <Card className="border-border shadow-sm p-6 text-center rounded-2xl flex flex-col items-center justify-center bg-white">
            <div className="text-blue-600 text-2xl lg:text-3xl font-bold mb-1">{formatMoney(totalBalance)}</div>
            <div className="text-sm text-muted-foreground font-medium">Tổng Tài Sản</div>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div>
          <SectionHeader
            title="Giao Dịch Gần Đây"
            action={
              <button onClick={() => navigate("/app/history")} className="text-blue-600 text-sm font-medium hover:underline">
                Xem Tất Cả
              </button>
            }
            className="mb-3"
          />
          <div className="space-y-3">
            {recentTxs.length === 0 && (
              <Card className="p-8 border-slate-100 shadow-sm text-center text-slate-400 text-sm">
                Chưa có giao dịch nào
              </Card>
            )}
            {recentTxs.map((tx) => {
              const Icon = categoryIcons[tx.category] || ShoppingBag;
              const isIncome = tx.type === "income";
              return (
                <Card key={tx.id} className="p-4 border-slate-100 flex items-center gap-3 shadow-sm">
                  <div className={`w-12 h-12 ${isIncome ? "bg-green-50" : "bg-slate-50"} border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${isIncome ? "text-green-600" : "text-slate-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800 mb-0.5">{tx.title}</div>
                    <div className="text-xs text-slate-500">{tx.category} • {tx.date}</div>
                  </div>
                  <div className={`font-semibold text-sm ${isIncome ? "text-green-600" : "text-red-600"}`}>
                    {isIncome ? "+" : ""}{formatFull(tx.amount)}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Budget Progress */}
        <div>
          <SectionHeader
            title="Tiến Độ Ngân Sách"
            action={
              <button onClick={() => navigate("/app/budgets")} className="text-blue-600 text-sm font-medium hover:underline">
                Quản Lý
              </button>
            }
            className="mb-3"
          />
          <div className="space-y-3">
            {budgets.map((budget) => {
              const spent = getSpentByCategory(budget.category);
              const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
              const isWarning = percentage > 80;
              return (
                <Card key={budget.id} className="p-4 border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">{budget.category}</span>
                    <span className={`text-xs font-semibold ${isWarning ? "text-orange-600" : "text-slate-500"}`}>
                      {formatMoney(spent)} / {formatMoney(budget.limit)}₫
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${isWarning ? "bg-orange-600" : budget.color}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Savings Goals Widget */}
        {topGoals.length > 0 && (
          <div>
            <SectionHeader
              title="Mục Tiêu Tiết Kiệm"
              action={
                <button onClick={() => navigate("/app/goals")} className="text-blue-600 text-sm font-medium hover:underline">
                  Xem Tất Cả
                </button>
              }
              className="mb-3"
            />
            <div className="space-y-3">
              {topGoals.map((goal) => {
                const pct = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;
                return (
                  <Card key={goal.id} className="overflow-hidden border-slate-100 shadow-sm">
                    <div className={`bg-gradient-to-r ${goal.color} px-4 py-3 flex items-center gap-3`}>
                      <span className="text-2xl">{goal.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm truncate">{goal.name}</div>
                        <div className="text-white/75 text-xs">{formatMoney(goal.savedAmount)}₫ / {formatMoney(goal.targetAmount)}₫</div>
                      </div>
                      <span className="text-white font-bold text-sm">{pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100">
                      <div
                        className={`h-full bg-gradient-to-r ${goal.color} transition-all`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
