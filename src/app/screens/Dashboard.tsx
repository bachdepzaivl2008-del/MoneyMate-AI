import { useState } from "react";
import { TrendingUp, TrendingDown, ShoppingBag, Utensils, Car, Eye, PlusCircle, History, Target } from "lucide-react";
import { useNavigate } from "react-router";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card, CardContent } from "../components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSimpleMode] = useState(false);

  const stats = [
    { label: "Balance", value: "$4,285.50", change: "+12%", positive: true },
    { label: "Income", value: "$5,200.00", subtext: "This month" },
    { label: "Expenses", value: "$914.50", subtext: "This month" },
    { label: "Remaining", value: "$4,285.50", subtext: "Available" },
  ];

  const recentTransactions = [
    { id: 1, title: "Mua Sắm Tạp Hóa", amount: -85500, category: "Ăn Uống", icon: ShoppingBag, date: "Hôm Nay" },
    { id: 2, title: "Ăn Trưa Ở Quán", amount: -25000, category: "Ăn Uống", icon: Utensils, date: "Hôm Nay" },
    { id: 3, title: "Đổ Xăng", amount: -60000, category: "Di Chuyển", icon: Car, date: "Hôm Qua" },
  ];

  const budgets = [
    { category: "Ăn Uống", spent: 285000, total: 500000, color: "bg-blue-600" },
    { category: "Mua Sắm", spent: 120000, total: 300000, color: "bg-green-600" },
    { category: "Di Chuyển", spent: 160000, total: 200000, color: "bg-orange-600" },
  ];

  if (isSimpleMode) {
    return <DashboardSimple />;
  }

  return (
    <PageContainer className="space-y-6 lg:space-y-8">
      {/* Top Section: Balance & Stats (Left), Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 lg:p-8 text-white shadow-md">
            <div className="text-sm opacity-90 mb-2 font-medium">Số Dư Hiện Tại</div>
            <div className="text-4xl lg:text-5xl mb-4 font-semibold tracking-tight">4.285.500₫</div>
            <div className="flex items-center gap-2 text-sm bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% so với tháng trước</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 lg:gap-6">
        <Card className="border-border shadow-sm p-4 text-center rounded-2xl flex flex-col items-center justify-center">
          <div className="text-green-600 text-xl font-semibold mb-1">5.2tr</div>
          <div className="text-xs text-muted-foreground font-medium">Thu Nhập</div>
        </Card>
        <Card className="border-border shadow-sm p-4 text-center rounded-2xl flex flex-col items-center justify-center">
          <div className="text-red-600 text-xl font-semibold mb-1">914k</div>
          <div className="text-xs text-muted-foreground font-medium">Chi Tiêu</div>
        </Card>
        <Card className="border-border shadow-sm p-4 text-center rounded-2xl flex flex-col items-center justify-center">
          <div className="text-blue-600 text-xl font-semibold mb-1">4.3tr</div>
          <div className="text-xs text-muted-foreground font-medium">Còn Lại</div>
        </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <SectionHeader title="Thao Tác Nhanh" className="mb-3" />
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
            <button
              onClick={() => navigate("/app/add")}
              className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-blue-600 transition-colors flex lg:flex-row flex-col items-center lg:justify-start gap-3 shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <PlusCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs lg:text-sm font-medium text-slate-700">Thêm Giao Dịch</span>
            </button>
            <button
              onClick={() => navigate("/app/history")}
              className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-blue-600 transition-colors flex lg:flex-row flex-col items-center lg:justify-start gap-3 shadow-sm"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <History className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs lg:text-sm font-medium text-slate-700">Lịch Sử</span>
            </button>
            <button
              onClick={() => navigate("/app/budgets")}
              className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-blue-600 transition-colors flex lg:flex-row flex-col items-center lg:justify-start gap-3 shadow-sm"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs lg:text-sm font-medium text-slate-700">Ngân Sách</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Transactions & Budgets */}
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
          {recentTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <Card
                key={transaction.id}
                className="p-4 border-slate-100 flex items-center gap-3 shadow-sm"
              >
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 mb-0.5">{transaction.title}</div>
                  <div className="text-xs text-slate-500">{transaction.date}</div>
                </div>
                <div className="text-red-600 font-semibold text-sm">
                  {Math.abs(transaction.amount).toLocaleString('vi-VN')}₫
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
            const percentage = (budget.spent / budget.total) * 100;
            const isWarning = percentage > 80;
            return (
              <Card key={budget.category} className="p-4 border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">{budget.category}</span>
                  <span className={`text-xs font-semibold ${isWarning ? "text-orange-600" : "text-slate-500"}`}>
                    {(budget.spent/1000).toFixed(0)}k / {(budget.total/1000).toFixed(0)}k₫
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
      </div>
    </PageContainer>
  );
}

function DashboardSimple() {
  const navigate = useNavigate();

  return (
    <PageContainer className="space-y-6">
      {/* Large Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white text-center shadow-lg">
        <div className="text-sm opacity-90 mb-3 font-medium uppercase tracking-wider">Số Tiền Của Bạn</div>
        <div className="text-5xl mb-2 font-semibold">4.3tr₫</div>
        <div className="text-sm opacity-90 font-medium">Có Sẵn Ngay</div>
      </div>

      {/* Large Stats */}
      <div className="space-y-3">
        <Card className="p-6 border-slate-100 shadow-sm flex justify-between items-center">
          <div className="text-slate-500 text-sm font-medium">Tiền Vào Tháng Này</div>
          <div className="text-green-600 text-2xl font-bold">5.2tr₫</div>
        </Card>
        <Card className="p-6 border-slate-100 shadow-sm flex justify-between items-center">
          <div className="text-slate-500 text-sm font-medium">Tiền Ra Tháng Này</div>
          <div className="text-red-600 text-2xl font-bold">914k₫</div>
        </Card>
      </div>

      {/* Large Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => navigate("/app/add")}
          className="w-full h-[72px] bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 shadow-md"
        >
          <PlusCircle className="w-6 h-6" />
          <span>Thêm Giao Dịch</span>
        </button>
        <button
          onClick={() => navigate("/app/history")}
          className="w-full h-16 bg-white hover:bg-slate-50 transition-colors border-2 border-slate-100 rounded-2xl text-base font-medium text-slate-700 flex items-center justify-center gap-3 shadow-sm"
        >
          <Eye className="w-5 h-5 text-slate-500" />
          <span>Xem Tất Cả Giao Dịch</span>
        </button>
      </div>

      {/* Top Spending */}
      <div className="mt-6">
        <SectionHeader title="Chi Tiêu Nhiều Nhất" />
        <Card className="bg-orange-50/50 border border-orange-100 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 shadow-sm rounded-xl flex items-center justify-center">
              <Utensils className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-800 mb-0.5">Ăn Uống</div>
              <div className="text-sm font-medium text-orange-600">285k₫ tháng này</div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
