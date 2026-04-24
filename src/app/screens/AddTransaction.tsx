import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Utensils, Car, Home, Heart, Smartphone, GraduationCap, Plane, Wallet, Calendar, Check } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { useAppStore } from "../store/useAppStore";

export default function AddTransaction() {
  const navigate = useNavigate();
  const { wallets, addTransaction } = useAppStore();

  const [smartInput, setSmartInput] = useState("");
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState(wallets.find(w => w.isDefault)?.id || wallets[0]?.id || "");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSmartInput = (val: string) => {
    setSmartInput(val);
    if (!val) return;

    // Simple parsing logic (simulating AI)
    let parsedAmount = "";
    let parsedDesc = val;
    let parsedType: "expense" | "income" = "expense";
    let parsedCat = "";

    // Parse amount (e.g., 35k, 1tr2, 500.000)
    const amountMatch = val.match(/(\d+[.,]?\d*)\s*(k|tr|triệu|m|đ|vnd)?/i);
    if (amountMatch) {
      let num = parseFloat(amountMatch[1].replace(",", "."));
      const unit = (amountMatch[2] || "").toLowerCase();
      
      if (unit === "k") num *= 1000;
      else if (unit === "tr" || unit === "triệu") num *= 1_000_000;
      
      parsedAmount = num.toString();
      parsedDesc = val.replace(amountMatch[0], "").trim();
    }

    // Parse type & category hints
    const lowerDesc = parsedDesc.toLowerCase();
    if (lowerDesc.includes("gửi") || lowerDesc.includes("lương") || lowerDesc.includes("thu") || lowerDesc.includes("thưởng")) {
      parsedType = "income";
    }

    // Category suggestions
    if (lowerDesc.includes("ăn") || lowerDesc.includes("uống") || lowerDesc.includes("phở") || lowerDesc.includes("cà phê")) parsedCat = "Ăn Uống";
    else if (lowerDesc.includes("xăng") || lowerDesc.includes("xe") || lowerDesc.includes("grab")) parsedCat = "Di Chuyển";
    else if (lowerDesc.includes("mua") || lowerDesc.includes("shopee") || lowerDesc.includes("áo")) parsedCat = "Mua Sắm";
    else if (lowerDesc.includes("điện") || lowerDesc.includes("nước") || lowerDesc.includes("internet")) parsedCat = "Tiện Ích";
    else if (lowerDesc.includes("lương")) parsedCat = "Lương";

    if (parsedAmount) setAmount(parsedAmount);
    if (parsedDesc) setDescription(parsedDesc);
    if (parsedType) setTransactionType(parsedType);
    if (parsedCat) setSelectedCategory(parsedCat);
  };

  const categories = [
    { id: "Mua Sắm", label: "Mua Sắm", icon: ShoppingBag },
    { id: "Ăn Uống", label: "Ăn Uống", icon: Utensils },
    { id: "Di Chuyển", label: "Di Chuyển", icon: Car },
    { id: "Nhà Ở", label: "Nhà Ở", icon: Home },
    { id: "Sức Khỏe", label: "Sức Khỏe", icon: Heart },
    { id: "Tiện Ích", label: "Tiện Ích", icon: Smartphone },
    { id: "Giáo Dục", label: "Giáo Dục", icon: GraduationCap },
    { id: "Du Lịch", label: "Du Lịch", icon: Plane },
  ];

  const incomeCategories = [
    { id: "Lương", label: "Lương" },
    { id: "Freelance", label: "Freelance" },
    { id: "Đầu Tư", label: "Đầu Tư" },
    { id: "Khác", label: "Khác" },
  ];

  const quickAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];

  const handleSave = () => {
    if (!amount || !description || !selectedCategory || !selectedWalletId) return;

    const numAmount = Number(amount);
    const finalAmount = transactionType === "expense" ? -Math.abs(numAmount) : Math.abs(numAmount);

    addTransaction({
      title: description,
      amount: finalAmount,
      type: transactionType,
      category: selectedCategory,
      walletId: selectedWalletId,
      date: new Date().toISOString().split("T")[0],
      notes: notes || undefined,
    });

    setSaved(true);
    setTimeout(() => navigate("/app"), 800);
  };

  if (saved) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center animate-in fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mb-1">Đã Lưu!</div>
          <div className="text-sm text-slate-500">Đang chuyển về trang chủ...</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Thêm Giao Dịch</h1>
        <p className="text-slate-500 text-sm">Theo dõi thu nhập hoặc chi tiêu</p>
      </div>

      {/* Smart Input Section */}
      <Card className="p-1 border-blue-100 bg-blue-50/30 overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-white">
          <input
            type="text"
            value={smartInput}
            onChange={(e) => handleSmartInput(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 font-medium"
            placeholder="Nhập nhanh: ăn sáng 35k, đổ xăng 100k..."
          />
          <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm">AI Active</div>
        </div>
      </Card>

      {/* Type Selector */}
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <button
          onClick={() => { setTransactionType("expense"); setSelectedCategory(""); }}
          className={`h-14 rounded-xl transition-all font-medium ${
            transactionType === "expense"
              ? "bg-red-600 text-white shadow-md"
              : "bg-white border-2 border-slate-200 text-slate-700"
          }`}
        >
          Chi Tiêu
        </button>
        <button
          onClick={() => { setTransactionType("income"); setSelectedCategory(""); }}
          className={`h-14 rounded-xl transition-all font-medium ${
            transactionType === "income"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white border-2 border-slate-200 text-slate-700"
          }`}
        >
          Thu Nhập
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Amount */}
          <Card className="p-6 border-slate-100 shadow-sm">
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Số Tiền</label>
            <div className="relative mb-4">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-slate-300">₫</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-4xl pl-8 bg-transparent focus:outline-none font-semibold text-slate-900"
                placeholder="0"
                step="1000"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(q.toString())}
                  className={`px-3 h-9 rounded-lg text-xs font-medium transition-all ${
                    amount === q.toString()
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {q >= 1_000_000 ? (q / 1_000_000) + "tr" : (q / 1000) + "k"}
                </button>
              ))}
            </div>
          </Card>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Mô Tả</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-sm"
              placeholder="Dùng để làm gì?"
            />
          </div>

          {/* Wallet Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Chọn Ví</label>
            <div className="grid grid-cols-2 gap-2">
              {wallets.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWalletId(w.id)}
                  className={`h-14 px-4 rounded-xl flex items-center gap-3 transition-all text-left ${
                    selectedWalletId === w.id
                      ? "bg-blue-50 border-2 border-blue-600 text-blue-700"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-blue-400"
                  }`}
                >
                  <span className="text-xl">{w.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{w.name}</div>
                    <div className="text-xs text-slate-500">{w.balance.toLocaleString("vi-VN")}₫</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Danh Mục</label>
            {transactionType === "expense" ? (
              <div className="grid grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white shadow-md"
                          : "bg-white border-slate-200 hover:border-blue-400 text-slate-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {incomeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-14 rounded-xl border-2 transition-all font-medium text-sm ${
                      selectedCategory === cat.id
                        ? "bg-green-600 border-green-600 text-white shadow-md"
                        : "bg-white border-slate-200 hover:border-green-400 text-slate-600"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Ghi Chú</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors resize-none text-sm"
              placeholder="Thêm chi tiết (không bắt buộc)..."
            />
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleSave}
              disabled={!amount || !description || !selectedCategory || !selectedWalletId}
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
