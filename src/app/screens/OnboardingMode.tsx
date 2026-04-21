import { useNavigate } from "react-router";
import { Sparkles, Gauge } from "lucide-react";

export default function OnboardingMode() {
  const navigate = useNavigate();

  const modes = [
    {
      id: "simple",
      label: "Chế Độ Đơn Giản",
      icon: Heart,
      description: "Chữ to hơn, ít tùy chọn hơn, dễ sử dụng hơn",
      features: ["Nút lớn", "Nhãn rõ ràng", "Từng bước"],
    },
    {
      id: "standard",
      label: "Chế Độ Tiêu Chuẩn",
      icon: Gauge,
      description: "Đầy đủ tính năng với tùy chọn nâng cao",
      features: ["Tất cả tính năng", "Biểu đồ & thống kê", "Thao tác nhanh"],
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
        </div>
        <h1 className="text-2xl mb-2">Chọn Giao Diện</h1>
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

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
