import { useState } from "react";
import { Search, ShoppingBag, Utensils, Car, Home, Heart, TrendingUp, Trash2 } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { useAppStore } from "../store/useAppStore";
import { DatePicker } from "../components/ui/date-picker";

const categoryIcons: Record<string, React.ElementType> = {
  "Ăn Uống": Utensils, "Mua Sắm": ShoppingBag, "Di Chuyển": Car,
  "Nhà Ở": Home, "Sức Khỏe": Heart, "Lương": TrendingUp,
  "Freelance": TrendingUp, "Tiện Ích": Home,
};

export default function TransactionHistory() {
  const { transactions, deleteTransaction, getWalletById } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const getToday = () => new Date().toISOString().split("T")[0];
  const getThirtyDaysAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  };

  const [dateRange, setDateRange] = useState({
    startDate: getThirtyDaysAgo(),
    endDate: getToday(),
  });
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "all" || t.type === filterType;
      const matchesDate = t.date >= dateRange.startDate && t.date <= dateRange.endDate;
      return matchesSearch && matchesFilter && matchesDate;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groupedByDate = filtered.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {} as Record<string, typeof transactions>);

  const formatDate = (ds: string) => {
    const d = new Date(ds);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const formatted = `${day}/${month}/${year}`;

    if (d.toDateString() === today.toDateString()) return `Hôm Nay (${formatted})`;
    if (d.toDateString() === yesterday.toDateString()) return `Hôm Qua (${formatted})`;
    return formatted;
  };

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Lịch Sử Giao Dịch</h1>
        <p className="text-muted-foreground text-sm">{filtered.length} giao dịch</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-background border border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-sm"
          placeholder="Tìm kiếm giao dịch..."
        />
      </div>

      {/* Filter Tabs & Date */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          {(["all", "income", "expense"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`flex-1 sm:flex-none px-4 h-11 rounded-xl transition-all text-sm font-medium ${
                filterType === f
                  ? f === "income" ? "bg-green-600 text-white shadow-md"
                  : f === "expense" ? "bg-red-600 text-white shadow-md"
                  : "bg-blue-600 text-white shadow-md"
                  : "bg-background border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {f === "all" ? "Tất Cả" : f === "income" ? "Thu Nhập" : "Chi Tiêu"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DatePicker 
            value={dateRange.startDate}
            onChange={(val) => setDateRange(p => ({ ...p, startDate: val }))}
            className="flex-1 sm:w-36 h-11 px-3"
          />
          <span className="text-muted-foreground">-</span>
          <DatePicker 
            value={dateRange.endDate}
            onChange={(val) => setDateRange(p => ({ ...p, endDate: val }))}
            className="flex-1 sm:w-36 h-11 px-3"
          />
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-6 pb-6">
        {Object.entries(groupedByDate).map(([date, dayTxs]) => (
          <div key={date}>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{formatDate(date)}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dayTxs.map((tx) => {
                const Icon = categoryIcons[tx.category] || ShoppingBag;
                const isIncome = tx.type === "income";
                const wallet = getWalletById(tx.walletId);
                return (
                  <Card key={tx.id} className="p-4 border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-green-50 dark:bg-green-500/10" : "bg-red-50 dark:bg-red-500/10"}`}>
                        <Icon className={`w-5 h-5 ${isIncome ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-0.5">{tx.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {tx.category} • {wallet?.name || "Ví"}
                        </div>
                      </div>
                      <div className={`text-base font-bold ${isIncome ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {isIncome ? "+" : ""}{tx.amount.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { if (confirm("Xóa giao dịch này?")) deleteTransaction(tx.id); }}
                        className="flex-1 h-8 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Xóa
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <Card className="p-12 border-border shadow-sm text-center">
            <div className="text-muted-foreground text-sm">Không tìm thấy giao dịch nào</div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
