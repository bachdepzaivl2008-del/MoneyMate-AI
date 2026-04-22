import { useState } from "react";
import { Plus, Utensils, ShoppingBag, Car, Home, AlertCircle, Edit, Trash2, X, Check } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore } from "../store/useAppStore";

const categoryIcons: Record<string, React.ElementType> = {
  "Ăn Uống": Utensils, "Mua Sắm": ShoppingBag, "Di Chuyển": Car,
  "Tiện Ích": Home, "Nhà Ở": Home,
};

const BUDGET_COLORS = ["bg-blue-600", "bg-green-600", "bg-orange-600", "bg-red-600", "bg-purple-600", "bg-teal-600"];

const ALL_CATEGORIES = ["Ăn Uống", "Mua Sắm", "Di Chuyển", "Tiện Ích", "Nhà Ở", "Sức Khỏe", "Giáo Dục", "Du Lịch"];

export default function Budgets() {
  const { budgets, addBudget, updateBudget, deleteBudget, getSpentByCategory } = useAppStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState("");
  const [formLimit, setFormLimit] = useState("");
  const [formColor, setFormColor] = useState("bg-blue-600");

  const resetForm = () => {
    setFormCategory(""); setFormLimit(""); setFormColor("bg-blue-600");
    setEditingId(null); setShowForm(false);
  };

  const startEdit = (b: typeof budgets[0]) => {
    setFormCategory(b.category); setFormLimit(b.limit.toString());
    setFormColor(b.color); setEditingId(b.id); setShowForm(true);
  };

  const handleSave = () => {
    if (!formCategory || !formLimit) return;
    if (editingId) {
      updateBudget(editingId, { category: formCategory, limit: Number(formLimit), color: formColor });
    } else {
      addBudget({ category: formCategory, limit: Number(formLimit), color: formColor });
    }
    resetForm();
  };

  const usedCategories = budgets.map((b) => b.category);
  const availableCategories = editingId
    ? ALL_CATEGORIES
    : ALL_CATEGORIES.filter((c) => !usedCategories.includes(c));

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Ngân Sách</h1>
          <p className="text-slate-500 text-sm">Theo dõi giới hạn chi tiêu</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Thêm
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-5 border-blue-200 bg-blue-50/30 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-800">
              {editingId ? "Chỉnh Sửa Ngân Sách" : "Thêm Ngân Sách Mới"}
            </h3>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Danh Mục</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFormCategory(c)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      formCategory === c
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Giới Hạn Tháng</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₫</span>
                <input
                  type="number"
                  value={formLimit}
                  onChange={(e) => setFormLimit(e.target.value)}
                  className="w-full h-12 pl-8 pr-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none text-sm"
                  placeholder="500000"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Màu</label>
              <div className="flex gap-2">
                {BUDGET_COLORS.map((c) => (
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
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={!formCategory || !formLimit}
                className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                <Check className="w-4 h-4" />
                {editingId ? "Cập Nhật" : "Tạo"}
              </button>
              <button onClick={resetForm} className="flex-1 h-12 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50">
                Hủy
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Budget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-6">
        {budgets.map((budget) => {
          const Icon = categoryIcons[budget.category] || ShoppingBag;
          const spent = getSpentByCategory(budget.category);
          const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
          const remaining = budget.limit - spent;
          const isWarning = percentage > 80;
          const isOverBudget = percentage >= 100;

          return (
            <Card
              key={budget.id}
              className={`p-5 shadow-sm ${
                isOverBudget ? "border-red-200 bg-red-50/50"
                : isWarning ? "border-orange-200 bg-orange-50/50"
                : "border-slate-100"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isOverBudget ? "bg-red-600" : isWarning ? "bg-orange-600" : budget.color
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-900">{budget.category}</div>
                  <div className="text-sm text-slate-500">
                    {spent.toLocaleString("vi-VN")}₫ / {budget.limit.toLocaleString("vi-VN")}₫
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all rounded-full ${isOverBudget ? "bg-red-600" : isWarning ? "bg-orange-600" : budget.color}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              {isOverBudget ? (
                <div className="flex items-center gap-2 text-red-600 mb-3 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Vượt {Math.abs(remaining).toLocaleString("vi-VN")}₫
                </div>
              ) : isWarning ? (
                <div className="flex items-center gap-2 text-orange-600 mb-3 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Còn {remaining.toLocaleString("vi-VN")}₫
                </div>
              ) : (
                <div className="text-sm text-slate-500 mb-3">
                  Còn {remaining.toLocaleString("vi-VN")}₫ ({(100 - percentage).toFixed(0)}%)
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={() => startEdit(budget)}
                  className="flex-1 h-9 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1.5 text-xs font-medium"
                >
                  <Edit className="w-3.5 h-3.5" /> Sửa
                </button>
                <button onClick={() => { if (confirm("Xóa ngân sách này?")) deleteBudget(budget.id); }}
                  className="flex-1 h-9 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1.5 text-xs font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <Card className="p-12 border-slate-100 shadow-sm text-center">
          <div className="text-slate-400 text-sm mb-4">Chưa có ngân sách nào</div>
          <button onClick={() => setShowForm(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium">
            Tạo Ngân Sách Đầu Tiên
          </button>
        </Card>
      )}
    </PageContainer>
  );
}
