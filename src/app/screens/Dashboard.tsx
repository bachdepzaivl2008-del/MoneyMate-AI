import { ShoppingBag, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/card";
import { useAppStore } from "../store/useAppStore";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardMainChart } from "../components/dashboard/DashboardMainChart";
import { DashboardActionBlock } from "../components/dashboard/DashboardActionBlock";

const categoryIcons: Record<string, React.ElementType> = {
  "Ăn Uống": ShoppingBag,
  "Mua Sắm": ShoppingBag,
  "Lương": TrendingUp,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { getRecentTransactions, settings } = useAppStore();
  const simpleMode = settings.simpleMode;
  const recentTxs = getRecentTransactions(simpleMode ? 2 : 3);

  const formatFull = (n: number) => n.toLocaleString("vi-VN") + "₫";

  return (
    <PageContainer className="space-y-8 lg:space-y-10 pb-20">
      {/* Dynamic Header Component */}
      <DashboardHeader />

      {/* Dynamic Main Chart Component */}
      <DashboardMainChart />

      {/* Dynamic Action Block (Secret Weapons) */}
      <DashboardActionBlock />

      {/* Recent Transactions - Shared across most personas */}
      {settings.userPersona !== "senior" && (
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
            {recentTxs.length === 0 && (
              <Card className="p-8 border-border shadow-sm text-center text-muted-foreground text-sm">
                Chưa có giao dịch nào
              </Card>
            )}
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
                    <div className="text-xs text-muted-foreground">{tx.category} • {tx.date}</div>
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
