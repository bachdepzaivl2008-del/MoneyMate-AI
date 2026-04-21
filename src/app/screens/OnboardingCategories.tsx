import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, Utensils, Car, Home, Heart, Smartphone, GraduationCap, Plane } from "lucide-react";

export default function OnboardingCategories() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl mb-2">Chọn Danh Mục</h1>
        <p className="text-muted-foreground text-lg">
          Chọn danh mục chi tiêu bạn dùng nhiều nhất
        </p>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-border hover:border-blue-600"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                    isSelected ? "bg-blue-500" : "bg-blue-100"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-blue-600"}`} />
                </div>
                <div className="text-sm">{category.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <button
          onClick={handleFinish}
          className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Bắt Đầu
        </button>
        <button
          onClick={() => navigate("/onboarding/wallet")}
          className="w-full h-14 bg-gray-100 text-foreground rounded-xl hover:bg-gray-200 transition-colors"
        >
          Quay Lại
        </button>
      </div>
    </div>
  );
}
