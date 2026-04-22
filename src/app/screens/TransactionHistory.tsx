import { useState } from "react";
import { Search, Filter, ShoppingBag, Utensils, Car, Home, Heart, TrendingUp, TrendingDown, Edit, Trash2 } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const transactions = [
    {
      id: 1,
      title: "Lương Tháng",
      amount: 5200000,
      type: "income" as const,
      category: "Lương",
      wallet: "Ví Chính",
      date: "2026-04-20",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Mua Sắm Tạp Hóa",
      amount: -85500,
      type: "expense" as const,
      category: "Ăn Uống",
      wallet: "Ví Chính",
      date: "2026-04-21",
      icon: ShoppingBag,
    },
    {
      id: 3,
      title: "Ăn Trưa Ở Quán",
      amount: -25000,
      type: "expense" as const,
      category: "Ăn Uống",
      wallet: "Ví Chính",
      date: "2026-04-21",
      icon: Utensils,
    },
    {
      id: 4,
      title: "Đổ Xăng",
      amount: -60000,
      type: "expense" as const,
      category: "Di Chuyển",
      wallet: "Ví Chính",
      date: "2026-04-20",
      icon: Car,
    },
    {
      id: 5,
      title: "Tiền Điện",
      amount: -120000,
      type: "expense" as const,
      category: "Tiện Ích",
      wallet: "Ví Chính",
      date: "2026-04-18",
      icon: Home,
    },
    {
      id: 6,
      title: "Khám Bác Sĩ",
      amount: -80000,
      type: "expense" as const,
      category: "Sức Khỏe",
      wallet: "Ví Chính",
      date: "2026-04-17",
      icon: Heart,
    },
    {
      id: 7,
      title: "Dự Án Freelance",
      amount: 850000,
      type: "income" as const,
      category: "Freelance",
      wallet: "Ví Chính",
      date: "2026-04-15",
      icon: TrendingUp,
    },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const groupedByDate = filteredTransactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, typeof transactions>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date("2026-04-21");
    const yesterday = new Date("2026-04-20");

    if (date.toDateString() === today.toDateString()) return "Hôm Nay";
    if (date.toDateString() === yesterday.toDateString()) return "Hôm Qua";

    return date.toLocaleDateString("vi-VN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl mb-2">Lịch Sử Giao Dịch</h1>
        <p className="text-muted-foreground">Xem và quản lý tất cả giao dịch</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-4 bg-white border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
          placeholder="Tìm kiếm giao dịch..."
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterType("all")}
          className={`flex-1 h-12 rounded-xl transition-all ${
            filterType === "all"
              ? "bg-blue-600 text-white"
              : "bg-white border-2 border-border"
          }`}
        >
          Tất Cả
        </button>
        <button
          onClick={() => setFilterType("income")}
          className={`flex-1 h-12 rounded-xl transition-all ${
            filterType === "income"
              ? "bg-green-600 text-white"
              : "bg-white border-2 border-border"
          }`}
        >
          Thu Nhập
        </button>
        <button
          onClick={() => setFilterType("expense")}
          className={`flex-1 h-12 rounded-xl transition-all ${
            filterType === "expense"
              ? "bg-red-600 text-white"
              : "bg-white border-2 border-border"
          }`}
        >
          Chi Tiêu
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-6 pb-6">
        {Object.entries(groupedByDate).map(([date, dayTransactions]) => (
          <div key={date}>
            <div className="text-sm text-muted-foreground mb-3">{formatDate(date)}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {dayTransactions.map((transaction) => {
                const Icon = transaction.icon;
                const isIncome = transaction.type === "income";
                return (
                  <Card
                    key={transaction.id}
                    className="p-4 border-slate-100 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isIncome ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isIncome ? "text-green-600" : "text-red-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base mb-0.5">{transaction.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.wallet}
                        </div>
                      </div>
                      <div className={`text-lg ${isIncome ? "text-green-600" : "text-red-600"}`}>
                        {isIncome ? "+" : "-"}{Math.abs(transaction.amount).toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 h-10 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        <span className="text-sm">Sửa</span>
                      </button>
                      <button className="flex-1 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Xóa</span>
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
