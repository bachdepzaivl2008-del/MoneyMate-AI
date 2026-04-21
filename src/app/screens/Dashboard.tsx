import { useState } from "react";
import { TrendingUp, TrendingDown, ShoppingBag, Utensils, Car, Eye, PlusCircle, History, Target } from "lucide-react";
import { useNavigate } from "react-router";

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
    <div className="px-6 py-6 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white">
        <div className="text-sm opacity-90 mb-2">Số Dư Hiện Tại</div>
        <div className="text-4xl mb-4">4.285.500₫</div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>+12% so với tháng trước</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="text-green-600 text-2xl mb-1">5.2tr</div>
          <div className="text-sm text-muted-foreground">Thu Nhập</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="text-red-600 text-2xl mb-1">914k</div>
          <div className="text-sm text-muted-foreground">Chi Tiêu</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="text-blue-600 text-2xl mb-1">4.3tr</div>
          <div className="text-sm text-muted-foreground">Còn Lại</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3">Thao Tác Nhanh</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate("/app/add")}
            className="bg-white rounded-2xl p-4 border border-border hover:border-blue-600 transition-colors flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm">Thêm</span>
          </button>
          <button
            onClick={() => navigate("/app/history")}
            className="bg-white rounded-2xl p-4 border border-border hover:border-blue-600 transition-colors flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm">Lịch Sử</span>
          </button>
          <button
            onClick={() => navigate("/app/budgets")}
            className="bg-white rounded-2xl p-4 border border-border hover:border-blue-600 transition-colors flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm">Ngân Sách</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3>Giao Dịch Gần Đây</h3>
          <button
            onClick={() => navigate("/app/history")}
            className="text-blue-600 text-sm"
          >
            Xem Tất Cả
          </button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div
                key={transaction.id}
                className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base mb-0.5">{transaction.title}</div>
                  <div className="text-sm text-muted-foreground">{transaction.date}</div>
                </div>
                <div className="text-red-600">
                  {Math.abs(transaction.amount).toLocaleString('vi-VN')}₫
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3>Tiến Độ Ngân Sách</h3>
          <button
            onClick={() => navigate("/app/budgets")}
            className="text-blue-600 text-sm"
          >
            Quản Lý
          </button>
        </div>
        <div className="space-y-3">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.total) * 100;
            const isWarning = percentage > 80;
            return (
              <div key={budget.category} className="bg-white rounded-2xl p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base">{budget.category}</span>
                  <span className={`text-sm ${isWarning ? "text-orange-600" : "text-muted-foreground"}`}>
                    {(budget.spent/1000).toFixed(0)}k / {(budget.total/1000).toFixed(0)}k₫
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${isWarning ? "bg-orange-600" : budget.color}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DashboardSimple() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Large Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white text-center">
        <div className="text-lg opacity-90 mb-3">Số Tiền Của Bạn</div>
        <div className="text-5xl mb-2">4.3tr₫</div>
        <div className="text-lg opacity-90">Có Sẵn Ngay</div>
      </div>

      {/* Large Stats */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 border-2 border-border">
          <div className="text-muted-foreground text-lg mb-2">Tiền Vào Tháng Này</div>
          <div className="text-green-600 text-3xl">5.2tr₫</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border-2 border-border">
          <div className="text-muted-foreground text-lg mb-2">Tiền Ra Tháng Này</div>
          <div className="text-red-600 text-3xl">914k₫</div>
        </div>
      </div>

      {/* Large Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => navigate("/app/add")}
          className="w-full h-20 bg-blue-600 text-white rounded-2xl text-xl flex items-center justify-center gap-3 shadow-lg"
        >
          <PlusCircle className="w-8 h-8" />
          <span>Thêm Giao Dịch</span>
        </button>
        <button
          onClick={() => navigate("/app/history")}
          className="w-full h-16 bg-white border-2 border-border rounded-2xl text-lg flex items-center justify-center gap-3"
        >
          <Eye className="w-7 h-7" />
          <span>Xem Tất Cả Giao Dịch</span>
        </button>
      </div>

      {/* Top Spending */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
        <div className="text-lg mb-3">Chi Tiêu Nhiều Nhất</div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center">
            <Utensils className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-xl mb-1">Ăn Uống</div>
            <div className="text-muted-foreground">285k₫ tháng này</div>
          </div>
        </div>
      </div>
    </div>
  );
}
