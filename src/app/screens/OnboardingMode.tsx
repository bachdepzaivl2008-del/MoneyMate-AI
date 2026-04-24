import { useNavigate } from "react-router";
import { Sparkles, Gauge, Heart } from "lucide-react";

export default function OnboardingMode() {
  const navigate = useNavigate();

  const modes = [
    {
      id: "simple",
      label: "Cơ bản dễ dùng",
      icon: Heart,
      description: "Tập trung vào sự đơn giản, chữ to rõ",
      features: ["Nút lớn", "Thao tác đơn giản"],
    },
    {
      id: "standard",
      label: "Tiêu chuẩn",
      icon: Gauge,
      description: "Cân bằng giữa tính năng và giao diện",
      features: ["Đầy đủ tính năng", "Biểu đồ cơ bản"],
    },
    {
      id: "expert",
      label: "Nhiều số liệu hơn",
      icon: Sparkles,
      description: "Cho người dùng muốn phân tích chuyên sâu",
      features: ["Báo cáo chi tiết", "Phân tích AI"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <h1 className="text-2xl mb-2 font-bold">Bạn muốn giao diện kiểu nào?</h1>
        <p className="text-muted-foreground text-lg">Chọn giao diện phù hợp với bạn</p>
      </div>

      <div className="flex-1 space-y-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => navigate("/onboarding/wallet")}
              className="w-full p-6 bg-white border-2 border-border rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-lg mb-1">{mode.label}</div>
                  <div className="text-muted-foreground text-sm">{mode.description}</div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {mode.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/onboarding/goal")}
        className="w-full h-14 bg-gray-100 text-foreground rounded-xl hover:bg-gray-200 transition-colors mt-6"
      >
        Quay Lại
      </button>
    </div>
  );
}

