import { useState } from "react";
import { Plus, Target, Trash2, X, Check, PiggyBank, TrendingUp, Calendar, ChevronRight, Sparkles } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore, SavingsGoal } from "../store/useAppStore";

const GOAL_COLORS = [
  { label: "Xanh Dương", value: "from-blue-500 to-indigo-600" },
  { label: "Xanh Lá", value: "from-emerald-500 to-teal-600" },
  { label: "Cam", value: "from-orange-500 to-rose-600" },
  { label: "Tím", value: "from-violet-500 to-purple-600" },
  { label: "Vàng", value: "from-amber-400 to-orange-500" },
  { label: "Hồng", value: "from-pink-500 to-rose-500" },
];

const GOAL_ICONS = ["🎯", "💻", "✈️", "🏠", "🚗", "💍", "🎓", "🛡️", "📱", "💎", "🌍", "🎸"];

function getDaysLeft(deadline?: string): number | null {
  if (!deadline) return null;
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatMoney(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "tr";
  if (n >= 1000) return (n / 1000).toFixed(0) + "k";
  return n.toLocaleString("vi-VN");
}

// ── Goal Card ──────────────────────────────────────────────

function GoalCard({
  goal,
  onDelete,
  onDeposit,
  onEdit,
}: {
  goal: SavingsGoal;
  onDelete: () => void;
  onDeposit: () => void;
  onEdit: () => void;
}) {
  const percentage = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;
  const remaining = goal.targetAmount - goal.savedAmount;
  const daysLeft = getDaysLeft(goal.deadline);
  const isCompleted = percentage >= 100;

  return (
    <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Header gradient */}
      <div className={`bg-gradient-to-r ${goal.color} p-5 relative`}>
        {isCompleted && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-semibold">Hoàn thành!</span>
          </div>
        )}
        <div className="flex items-start gap-4">
          <div className="text-4xl">{goal.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-base leading-tight mb-1 truncate">{goal.name}</div>
            <div className="text-white/80 text-sm">
              {goal.savedAmount.toLocaleString("vi-VN")}₫
              <span className="text-white/50 mx-1">/</span>
              {goal.targetAmount.toLocaleString("vi-VN")}₫
            </div>
          </div>
        </div>

        {/* Progress bar inside gradient */}
        <div className="mt-4 w-full h-2 bg-white/25 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-white/80 text-xs">{percentage.toFixed(0)}% hoàn thành</span>
          {daysLeft !== null && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              daysLeft < 0 ? "bg-red-500/30 text-white" :
              daysLeft <= 30 ? "bg-yellow-400/30 text-white" :
              "bg-white/20 text-white/80"
            }`}>
              {daysLeft < 0
                ? `Đã hết hạn ${Math.abs(daysLeft)} ngày`
                : daysLeft === 0
                ? "Hôm nay!"
                : `Còn ${daysLeft} ngày`}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {!isCompleted && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-slate-500">
              Còn cần <span className="font-semibold text-slate-700">{remaining.toLocaleString("vi-VN")}₫</span>
            </div>
            {goal.deadline && (
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(goal.deadline).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
              </div>
            )}
          </div>
        )}
        {isCompleted && (
          <div className="text-center py-2 mb-4">
            <div className="text-2xl mb-1">🎉</div>
            <div className="text-sm font-semibold text-emerald-600">Mục tiêu đã đạt được!</div>
          </div>
        )}

        <div className="flex gap-2">
          {!isCompleted && (
            <button
              onClick={onDeposit}
              className="flex-1 h-10 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Nạp Tiền
            </button>
          )}
          <button
            onClick={onEdit}
            className="h-10 px-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            Sửa
          </button>
          <button
            onClick={onDelete}
            className="h-10 px-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}

// ── Deposit Modal ──────────────────────────────────────────

function DepositModal({
  goal,
  onClose,
  onConfirm,
}: {
  goal: SavingsGoal;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}) {
  const [amount, setAmount] = useState("");
  const remaining = goal.targetAmount - goal.savedAmount;

  const quickAmounts = [100000, 200000, 500000, 1000000].filter(a => a <= remaining);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl">
        <div className={`bg-gradient-to-r ${goal.color} p-5 rounded-t-3xl flex items-center gap-3`}>
          <span className="text-3xl">{goal.icon}</span>
          <div>
            <div className="text-white font-bold text-base">{goal.name}</div>
            <div className="text-white/75 text-sm">Nạp tiền vào mục tiêu</div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Số Tiền</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₫</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-12 pl-8 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                placeholder="0"
                autoFocus
              />
            </div>
          </div>
          {quickAmounts.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a.toString())}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  +{formatMoney(a)}
                </button>
              ))}
              <button
                onClick={() => setAmount(remaining.toString())}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
              >
                Đủ mục tiêu
              </button>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => { if (Number(amount) > 0) onConfirm(Number(amount)); }}
              disabled={!amount || Number(amount) <= 0}
              className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Xác Nhận
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-12 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────

export default function Goals() {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, depositToGoal, getTotalSaved, getTotalGoalsTarget } = useAppStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [depositGoal, setDepositGoal] = useState<SavingsGoal | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formTarget, setFormTarget] = useState("");
  const [formSaved, setFormSaved] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formIcon, setFormIcon] = useState("🎯");
  const [formColor, setFormColor] = useState(GOAL_COLORS[0].value);

  const resetForm = () => {
    setFormName(""); setFormTarget(""); setFormSaved(""); setFormDeadline("");
    setFormIcon("🎯"); setFormColor(GOAL_COLORS[0].value);
    setEditingId(null); setShowForm(false);
  };

  const startEdit = (g: SavingsGoal) => {
    setFormName(g.name); setFormTarget(g.targetAmount.toString());
    setFormSaved(g.savedAmount.toString()); setFormDeadline(g.deadline || "");
    setFormIcon(g.icon); setFormColor(g.color);
    setEditingId(g.id); setShowForm(true);
  };

  const handleSave = () => {
    if (!formName || !formTarget) return;
    if (editingId) {
      updateSavingsGoal(editingId, {
        name: formName, targetAmount: Number(formTarget),
        savedAmount: Number(formSaved) || 0,
        deadline: formDeadline || undefined,
        icon: formIcon, color: formColor,
      });
    } else {
      addSavingsGoal({
        name: formName, targetAmount: Number(formTarget),
        savedAmount: Number(formSaved) || 0,
        deadline: formDeadline || undefined,
        icon: formIcon, color: formColor,
      });
    }
    resetForm();
  };

  const totalSaved = getTotalSaved();
  const totalTarget = getTotalGoalsTarget();
  const overallPct = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  const completedCount = savingsGoals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      {/* Deposit Modal */}
      {depositGoal && (
        <DepositModal
          goal={depositGoal}
          onClose={() => setDepositGoal(null)}
          onConfirm={(amount) => {
            depositToGoal(depositGoal.id, amount);
            setDepositGoal(null);
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Mục Tiêu Tiết Kiệm</h1>
          <p className="text-slate-500 text-sm">Lên kế hoạch và thực hiện ước mơ của bạn</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Thêm
        </button>
      </div>

      {/* Overall Progress Card */}
      {savingsGoals.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-slate-300">Tổng Tiết Kiệm</div>
              <div className="text-2xl font-bold">{totalSaved.toLocaleString("vi-VN")}₫</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <div className="text-lg font-bold">{savingsGoals.length}</div>
              <div className="text-xs text-slate-400">Mục Tiêu</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <div className="text-lg font-bold">{completedCount}</div>
              <div className="text-xs text-slate-400">Hoàn Thành</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <div className="text-lg font-bold">{overallPct.toFixed(0)}%</div>
              <div className="text-xs text-slate-400">Tiến Độ</div>
            </div>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(overallPct, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-400">{totalSaved.toLocaleString("vi-VN")}₫</span>
            <span className="text-xs text-slate-400">{totalTarget.toLocaleString("vi-VN")}₫</span>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <Card className="p-5 border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-slate-800">
              {editingId ? "Chỉnh Sửa Mục Tiêu" : "Tạo Mục Tiêu Mới"}
            </h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Biểu Tượng</label>
              <div className="flex flex-wrap gap-2">
                {GOAL_ICONS.map((ic) => (
                  <button
                    key={ic}
                    onClick={() => setFormIcon(ic)}
                    className={`w-10 h-10 rounded-xl text-xl transition-all ${
                      formIcon === ic
                        ? "bg-slate-900 shadow-md scale-110"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Tên Mục Tiêu</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm"
                placeholder="Ví dụ: Mua iPhone 17..."
              />
            </div>

            {/* Amounts */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Số Tiền Mục Tiêu</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₫</span>
                  <input
                    type="number"
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm"
                    placeholder="10000000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Đã Tiết Kiệm</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₫</span>
                  <input
                    type="number"
                    value={formSaved}
                    onChange={(e) => setFormSaved(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Hạn Chót (không bắt buộc)</label>
              <input
                type="date"
                value={formDeadline}
                onChange={(e) => setFormDeadline(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none text-sm"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Màu Sắc</label>
              <div className="flex flex-wrap gap-2">
                {GOAL_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setFormColor(c.value)}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${c.value} transition-all ${
                      formColor === c.value ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            {formName && (
              <div className={`bg-gradient-to-r ${formColor} rounded-2xl p-4 flex items-center gap-3`}>
                <span className="text-3xl">{formIcon}</span>
                <div>
                  <div className="text-white font-bold text-sm">{formName}</div>
                  <div className="text-white/75 text-xs">
                    {Number(formSaved || 0).toLocaleString("vi-VN")}₫ / {Number(formTarget || 0).toLocaleString("vi-VN")}₫
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={!formName || !formTarget}
                className="flex-1 h-12 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                {editingId ? "Cập Nhật" : "Tạo Mục Tiêu"}
              </button>
              <button onClick={resetForm} className="flex-1 h-12 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50">
                Hủy
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Goals Grid */}
      {savingsGoals.length === 0 && !showForm ? (
        <Card className="p-12 border-slate-100 shadow-sm text-center">
          <div className="text-5xl mb-4">🐖</div>
          <div className="text-slate-700 font-semibold mb-2">Chưa có mục tiêu nào</div>
          <div className="text-slate-400 text-sm mb-6">Đặt ra mục tiêu và bắt đầu tiết kiệm ngay hôm nay!</div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800"
          >
            Tạo Mục Tiêu Đầu Tiên
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-6">
          {savingsGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={() => { if (confirm("Xóa mục tiêu này?")) deleteSavingsGoal(goal.id); }}
              onDeposit={() => setDepositGoal(goal)}
              onEdit={() => startEdit(goal)}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
