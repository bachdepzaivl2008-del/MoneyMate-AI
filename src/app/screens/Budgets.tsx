import { useState } from "react";
import { Plus, ShoppingBag, Utensils, Car, Home, AlertCircle, Edit, Trash2 } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";

export default function Budgets() {
  const [showAddForm, setShowAddForm] = useState(false);

  const budgets = [
    {
      id: 1,
      category: "Ăn Uống",
      spent: 285000,
      total: 500000,
      icon: Utensils,
      color: "bg-blue-600",
    },
    {
      id: 2,
      category: "Mua Sắm",
      spent: 120000,
      total: 300000,
      icon: ShoppingBag,
      color: "bg-green-600",
    },
    {
      id: 3,
      category: "Di Chuyển",
      spent: 180000,
      total: 200000,
      icon: Car,
      color: "bg-orange-600",
    },
    {
      id: 4,
      category: "Nhà Ở",
      spent: 950000,
      total: 1000000,
      icon: Home,
      color: "bg-red-600",
    },
  ];

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">Ngân Sách</h1>
          <p className="text-muted-foreground">Theo dõi giới hạn chi tiêu</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 border-2 border-blue-600">
          <h3 className="mb-4">Thêm Ngân Sách Mới</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-foreground">Danh Mục</label>
              <select className="w-full h-14 px-4 bg-gray-50 border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors">
                <option value="">Chọn danh mục</option>
                <option value="food">Ăn Uống</option>
                <option value="shopping">Mua Sắm</option>
                <option value="transport">Di Chuyển</option>
                <option value="utilities">Tiện Ích</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-foreground">Giới Hạn Tháng</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₫
                </span>
                <input
                  type="number"
                  className="w-full h-14 pl-8 pr-4 bg-gray-50 border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                Thêm Ngân Sách
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 h-12 bg-gray-100 text-foreground rounded-xl hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Budget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-6">
        {budgets.map((budget) => {
          const Icon = budget.icon;
          const percentage = (budget.spent / budget.total) * 100;
          const remaining = budget.total - budget.spent;
          const isWarning = percentage > 80;
          const isOverBudget = percentage >= 100;

          return (
            <Card
              key={budget.id}
              className={`p-5 shadow-sm ${
                isOverBudget
                  ? "border-red-200 bg-red-50/50"
                  : isWarning
                  ? "border-orange-200 bg-orange-50/50"
                  : "border-slate-100"
              }`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isOverBudget
                      ? "bg-red-600"
                      : isWarning
                      ? "bg-orange-600"
                      : "bg-blue-100"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${
                      isOverBudget || isWarning ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg mb-1">{budget.category}</div>
                  <div className="text-sm text-muted-foreground">
                    {budget.spent.toLocaleString('vi-VN')}₫ / {budget.total.toLocaleString('vi-VN')}₫
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      isOverBudget ? "bg-red-600" : isWarning ? "bg-orange-600" : budget.color
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              {isOverBudget ? (
                <div className="flex items-center gap-2 text-red-600 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Vượt {Math.abs(remaining).toLocaleString('vi-VN')}₫</span>
                </div>
              ) : isWarning ? (
                <div className="flex items-center gap-2 text-orange-600 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Còn {remaining.toLocaleString('vi-VN')}₫ (cảnh báo)</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground mb-4">
                  Còn {remaining.toLocaleString('vi-VN')}₫
                </div>
              )}

              {/* Actions */}
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
    </PageContainer>
  );
}
