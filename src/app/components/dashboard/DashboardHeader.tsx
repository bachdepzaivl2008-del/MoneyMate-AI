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

  // Dynamic Header Logic
  let title = "Số Dư Hiện Tại";
  let amount = totalBalance;
  let subtitle = `Thu nhập tháng: ${formatMoney(monthlyIncome)}₫`;

  if (persona === "student") {
    title = "Hôm nay bạn được tiêu";
    amount = Math.floor(Math.max(0, totalBalance / 30) / 1000) * 1000; // rounded daily budget
    subtitle = `Tiết kiệm được: ${formatMoney(monthlyIncome - monthlyExpenses)}₫`;
  } else if (persona === "investor") {
    title = "Tài Sản Ròng (Net Worth)";
    amount = totalBalance + 50000000; // Mock invested amount
    subtitle = `Tăng trưởng: +5.2% tháng này`;
  } else if (persona === "entrepreneur") {
    title = "Lợi Nhuận Gộp (Tháng)";
    amount = monthlyIncome - monthlyExpenses; 
    subtitle = `Doanh thu: ${formatMoney(monthlyIncome)}₫`;
  } else if (persona === "hustler") {
    title = "Đường Băng Sinh Tồn (Runway)";
    const monthlyBurn = monthlyExpenses || 5000000;
    amount = totalBalance; // we will show months instead of pure money
    subtitle = `An toàn trong: ${(totalBalance / monthlyBurn).toFixed(1)} tháng`;
  } else if (persona === "family") {
    title = "Quỹ Gia Đình Chung";
  } else if (persona === "senior") {
    title = "Số tiền bạn đang có";
  }

  return (
    <div className={`bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 lg:p-8 text-primary-foreground shadow-lg transition-all duration-500 hover:shadow-xl ${simpleMode ? "text-center" : ""}`}>
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
          className={`flex items-center gap-2 text-sm font-semibold w-fit px-4 py-1.5 rounded-full shadow hover:scale-105 active:scale-95 transition-all ${
            persona === "senior" ? "bg-white text-primary px-8 py-4 text-lg w-full justify-center mt-4 rounded-2xl" : "bg-white text-primary"
          }`}
        >
          <PlusCircle className={persona === "senior" ? "w-6 h-6" : "w-4 h-4"} />
          <span>{persona === "senior" ? "Ghi Chép Chi Tiêu Ngay" : "Giao Dịch Mới"}</span>
        </button>
      </div>
    </div>
  );
}
