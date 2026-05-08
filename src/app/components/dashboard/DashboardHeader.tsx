import { useAppStore } from "../../store/useAppStore";
import { TrendingUp, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function DashboardHeader() {
  const navigate = useNavigate();
  const { settings, getTotalBalance, getMonthlyIncome, getMonthlyExpenses } = useAppStore();
  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const simpleMode = settings.simpleMode;
  const persona = settings.userPersona;

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
    if (Math.abs(n) >= 1000) return (n / 1000).toFixed(0) + "k";
    return n.toLocaleString("vi-VN");
  };
  const formatFull = (n: number) => n.toLocaleString("vi-VN") + "₫";

  // Standardized Core UI Header Logic
  const title = "Tổng Số Dư";
  const amount = totalBalance;
  let subtitle = `Thu nhập tháng: ${formatMoney(monthlyIncome)}₫`;

  // Persona-specific insights can still appear in the subtitle or as extra badges
  if (persona === "student") {
    subtitle = `Hôm nay: ${formatMoney(Math.floor(totalBalance / 30))}₫ | Tiết kiệm: ${formatMoney(monthlyIncome - monthlyExpenses)}₫`;
  } else if (persona === "investor") {
    subtitle = `Tăng trưởng: +5.2% | Net Worth: ${formatFull(totalBalance + 50000000)}`;
  } else if (persona === "hustler") {
    subtitle = `Runway: ${(totalBalance / (monthlyExpenses || 5000000)).toFixed(1)} tháng`;
  } else if (persona === "entrepreneur") {
    subtitle = `Doanh thu: ${formatMoney(monthlyIncome)}₫ | LN: ${formatMoney(monthlyIncome - monthlyExpenses)}₫`;
  }

  return (
    <div className={`bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 lg:p-8 text-white shadow-lg transition-all duration-500 hover:shadow-xl ${simpleMode ? "text-center" : ""}`}>
      <div className={`${simpleMode ? "text-lg" : "text-sm"} opacity-90 mb-2 font-medium tracking-wide`}>{title}</div>
      <div className={`${simpleMode ? "text-5xl lg:text-7xl" : "text-4xl lg:text-6xl"} mb-4 font-semibold tracking-tight`}>
        {persona === "hustler" ? `${(amount / (monthlyExpenses || 5000000)).toFixed(1)} tháng` : formatFull(amount)}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {!simpleMode && persona !== "senior" && (
          <div className="flex items-center gap-2 text-sm bg-white/20 dark:bg-black/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            <span>{subtitle}</span>
          </div>
        )}
        <button
          onClick={() => navigate("/app/add")}
          className="flex items-center gap-2 text-sm font-semibold w-fit px-4 py-1.5 rounded-full shadow hover:scale-105 active:scale-95 transition-all bg-white text-primary"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Giao Dịch Mới</span>
        </button>
      </div>
    </div>
  );
}
