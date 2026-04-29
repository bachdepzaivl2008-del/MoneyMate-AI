import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Plus, Wallet, CreditCard, PiggyBank, Landmark, TrendingUp,
  TrendingDown, Edit3, Trash2, X, Check, ChevronRight
} from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore } from "../store/useAppStore";

const WALLET_ICONS = [
  { emoji: "💰", label: "Ví" },
  { emoji: "🏦", label: "Ngân Hàng" },
  { emoji: "💳", label: "Thẻ" },
  { emoji: "🐷", label: "Tiết Kiệm" },
  { emoji: "💵", label: "Tiền Mặt" },
  { emoji: "📱", label: "MoMo" },
];

const WALLET_COLORS = [
  "bg-blue-600", "bg-green-600", "bg-purple-600",
  "bg-orange-600", "bg-pink-600", "bg-teal-600",
];

export default function Wallets() {
  const navigate = useNavigate();
  const { wallets, transactions, addWallet, updateWallet, deleteWallet, getTotalBalance } = useAppStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formBalance, setFormBalance] = useState("");
  const [formIcon, setFormIcon] = useState("💰");
  const [formColor, setFormColor] = useState("bg-blue-600");

  const resetForm = () => {
    setFormName("");
    setFormBalance("");
    setFormIcon("💰");
    setFormColor("bg-blue-600");
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (w: typeof wallets[0]) => {
    setFormName(w.name);
    setFormBalance(w.balance.toString());
    setFormIcon(w.icon);
    setFormColor(w.color);
    setEditingId(w.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formName.trim()) return;
    const balance = Number(formBalance) || 0;

    if (editingId) {
      updateWallet(editingId, { name: formName, balance, icon: formIcon, color: formColor });
    } else {
      addWallet({ name: formName, balance, icon: formIcon, color: formColor, isDefault: wallets.length === 0 });
    }
    resetForm();
  };

  const getWalletTxCount = (walletId: string) =>
    transactions.filter((t) => t.walletId === walletId).length;

  const formatMoney = (n: number) =>
    n.toLocaleString("vi-VN") + "₫";

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Ví & Tài Khoản</h1>
          <p className="text-muted-foreground text-sm">Quản lý các nguồn tiền</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Thêm Ví
        </button>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 lg:p-8 text-white shadow-lg border-0">
        <div className="text-sm opacity-90 font-medium mb-2 uppercase tracking-wider">Tổng Tài Sản</div>
        <div className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          {formatMoney(getTotalBalance())}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {wallets.length} ví
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {transactions.length} giao dịch
          </span>
        </div>
      </Card>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="p-5 border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-900/10 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-foreground">
              {editingId ? "Chỉnh Sửa Ví" : "Thêm Ví Mới"}
            </h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Tên Ví</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full h-12 px-4 bg-background border border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-sm"
                placeholder="Ví chính, MoMo, Tiết kiệm..."
              />
            </div>

            {/* Balance */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Số Dư Ban Đầu</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₫</span>
                <input
                  type="number"
                  value={formBalance}
                  onChange={(e) => setFormBalance(e.target.value)}
                  className="w-full h-12 pl-8 pr-4 bg-background border border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-sm"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Icon */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Biểu Tượng</label>
              <div className="flex gap-2 flex-wrap">
                {WALLET_ICONS.map((ic) => (
                  <button
                    key={ic.emoji}
                    onClick={() => setFormIcon(ic.emoji)}
                    className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all ${
                      formIcon === ic.emoji
                        ? "bg-blue-600 shadow-md scale-110"
                        : "bg-background border border-border hover:border-blue-400"
                    }`}
                  >
                    {ic.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Màu Sắc</label>
              <div className="flex gap-2">
                {WALLET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFormColor(c)}
                    className={`w-9 h-9 rounded-full ${c} transition-all ${
                      formColor === c ? "ring-2 ring-offset-2 ring-blue-600 scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={!formName.trim()}
                className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                <Check className="w-4 h-4" />
                {editingId ? "Cập Nhật" : "Tạo Ví"}
              </button>
              <button
                onClick={resetForm}
                className="flex-1 h-12 bg-background border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Wallet List */}
      <div>
        <SectionHeader title="Danh Sách Ví" className="mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wallets.map((wallet) => {
            const txCount = getWalletTxCount(wallet.id);
            return (
              <Card
                key={wallet.id}
                className="p-5 border-border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${wallet.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm text-2xl`}>
                    {wallet.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-foreground truncate">{wallet.name}</span>
                      {wallet.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                          Mặc Định
                        </span>
                      )}
                    </div>
                    <div className={`text-xl font-bold ${wallet.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {formatMoney(wallet.balance)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{txCount} giao dịch</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                  <button
                    onClick={() => startEdit(wallet)}
                    className="flex-1 h-9 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Sửa
                  </button>
                  {!wallet.isDefault && (
                    <button
                      onClick={() => { if (confirm(`Xóa ví "${wallet.name}" và tất cả giao dịch liên quan?`)) deleteWallet(wallet.id); }}
                      className="flex-1 h-9 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Xóa
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/app/history")}
                    className="flex-1 h-9 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
                  >
                    Giao Dịch
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {wallets.length === 0 && (
        <Card className="p-12 border-border shadow-sm flex flex-col items-center text-center bg-card">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-foreground font-semibold mb-1">Chưa có ví nào</div>
          <div className="text-muted-foreground text-sm mb-4">Tạo ví đầu tiên để bắt đầu quản lý tiền</div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
          >
            Tạo Ví
          </button>
        </Card>
      )}
    </PageContainer>
  );
}
