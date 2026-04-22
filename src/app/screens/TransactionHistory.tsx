import { useState } from "react";
import { Search, ShoppingBag, Utensils, Car, Home, Heart, TrendingUp, Edit, Trash2 } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore } from "../store/useAppStore";

const categoryIcons: Record<string, React.ElementType> = {
  "Ăn Uống": Utensils, "Mua Sắm": ShoppingBag, "Di Chuyển": Car,
  "Nhà Ở": Home, "Sức Khỏe": Heart, "Lương": TrendingUp,
  "Freelance": TrendingUp, "Tiện Ích": Home,
};

export default function TransactionHistory() {
  const { transactions, deleteTransaction, getWalletById } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const filtered = transactions
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "all" || t.type === filterType;
      return matchesSearch && matchesFilter;
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

    if (d.toDateString() === today.toDateString()) return "Hôm Nay";
    if (d.toDateString() === yesterday.toDateString()) return "Hôm Qua";
    return d.toLocaleDateString("vi-VN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Lịch Sử Giao Dịch</h1>
        <p className="text-slate-500 text-sm">{filtered.length} giao dịch</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-sm"
          placeholder="Tìm kiếm giao dịch..."
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "income", "expense"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`flex-1 h-11 rounded-xl transition-all text-sm font-medium ${
              filterType === f
                ? f === "income" ? "bg-green-600 text-white shadow-md"
                : f === "expense" ? "bg-red-600 text-white shadow-md"
                : "bg-blue-600 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-600"
            }`}
          >
            {f === "all" ? "Tất Cả" : f === "income" ? "Thu Nhập" : "Chi Tiêu"}
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="space-y-6 pb-6">
        {Object.entries(groupedByDate).map(([date, dayTxs]) => (
          <div key={date}>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{formatDate(date)}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dayTxs.map((tx) => {
                const Icon = categoryIcons[tx.category] || ShoppingBag;
                const isIncome = tx.type === "income";
                const wallet = getWalletById(tx.walletId);
                return (
                  <Card key={tx.id} className="p-4 border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isIncome ? "bg-green-50" : "bg-red-50"}`}>
                        <Icon className={`w-5 h-5 ${isIncome ? "text-green-600" : "text-red-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 mb-0.5">{tx.title}</div>
                        <div className="text-xs text-slate-500">
                          {tx.category} • {wallet?.name || "Ví"}
                        </div>
                      </div>
                      <div className={`text-base font-bold ${isIncome ? "text-green-600" : "text-red-600"}`}>
                        {isIncome ? "+" : ""}{tx.amount.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { if (confirm("Xóa giao dịch này?")) deleteTransaction(tx.id); }}
                        className="flex-1 h-8 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
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
          <Card className="p-12 border-slate-100 shadow-sm text-center">
            <div className="text-slate-400 text-sm">Không tìm thấy giao dịch nào</div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
