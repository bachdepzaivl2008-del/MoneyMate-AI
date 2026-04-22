import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Utensils, Car, Home, Heart, Smartphone, GraduationCap, Plane, Wallet, Calendar } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notes, setNotes] = useState("");

  const categories = [
    { id: "shopping", label: "Mua Sắm", icon: ShoppingBag },
    { id: "food", label: "Ăn Uống", icon: Utensils },
    { id: "transport", label: "Di Chuyển", icon: Car },
    { id: "housing", label: "Nhà Ở", icon: Home },
    { id: "health", label: "Sức Khỏe", icon: Heart },
    { id: "utilities", label: "Tiện Ích", icon: Smartphone },
    { id: "education", label: "Giáo Dục", icon: GraduationCap },
    { id: "travel", label: "Du Lịch", icon: Plane },
  ];

  const quickAmounts = [20000, 50000, 100000, 200000];

  const handleSave = () => {
    navigate("/app");
  };

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl mb-2">Thêm Giao Dịch</h1>
        <p className="text-muted-foreground">Theo dõi thu nhập hoặc chi tiêu</p>
      </div>

      {/* Type Selector */}
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <button
          onClick={() => setTransactionType("expense")}
          className={`h-14 rounded-xl transition-all ${
            transactionType === "expense"
              ? "bg-red-600 text-white"
              : "bg-white border-2 border-slate-200 text-slate-700"
          }`}
        >
          Chi Tiêu
        </button>
        <button
          onClick={() => setTransactionType("income")}
          className={`h-14 rounded-xl transition-all ${
            transactionType === "income"
              ? "bg-green-600 text-white"
              : "bg-white border-2 border-slate-200 text-slate-700"
          }`}
        >
          Thu Nhập
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-6">

      {/* Amount Input */}
      <div className="bg-white rounded-2xl p-6 border-2 border-border">
        <label className="block mb-3 text-foreground">Số Tiền</label>
        <div className="relative mb-4">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-muted-foreground">
            ₫
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-4xl pl-8 bg-transparent focus:outline-none"
            placeholder="0"
            step="1000"
          />
        </div>
        <div className="flex gap-2">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount.toString())}
              className="flex-1 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              {(quickAmount/1000).toFixed(0)}k
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-2 text-foreground">
          Mô Tả
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-14 px-4 bg-white border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
          placeholder="Dùng để làm gì?"
        />
      </div>

      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Category */}
        <div>
          <label className="block mb-3 text-foreground">Danh Mục</label>
          <div className="grid grid-cols-4 lg:grid-cols-4 gap-3 lg:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-md"
                      : "bg-white border-slate-200 hover:border-blue-600 text-slate-600"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wallet */}
        <div>
          <label className="block mb-2 text-foreground">Ví</label>
          <button className="w-full h-14 px-4 bg-white border-2 border-slate-200 rounded-xl flex items-center gap-3 hover:border-blue-600 transition-colors shadow-sm">
            <Wallet className="w-5 h-5 text-slate-400" />
            <span className="font-medium text-slate-700">Ví Chính</span>
          </button>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-foreground">Ngày</label>
          <button className="w-full h-14 px-4 bg-white border-2 border-slate-200 rounded-xl flex items-center gap-3 hover:border-blue-600 transition-colors shadow-sm">
            <Calendar className="w-5 h-5 text-slate-400" />
            <span className="font-medium text-slate-700">Hôm Nay</span>
          </button>
        </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block mb-2 text-foreground">
          Ghi Chú (Tùy Chọn)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-24 px-4 py-3 bg-white border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors resize-none"
          placeholder="Thêm chi tiết..."
        />
      </div>

        {/* Actions */}
        <div className="space-y-3 pt-6 lg:pt-10 pb-6 border-t border-slate-200">
          <button
            onClick={handleSave}
            disabled={!amount || !description || !selectedCategory}
            className="w-full h-14 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed shadow-md"
          >
            Lưu Giao Dịch
          </button>
          <button
            onClick={() => navigate("/app")}
            className="w-full h-14 bg-white border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
      </div>
    </PageContainer>
  );
}
