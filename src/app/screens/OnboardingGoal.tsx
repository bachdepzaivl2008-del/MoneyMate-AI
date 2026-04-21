import { useNavigate } from "react-router";
import { TrendingDown, PiggyBank, Users, ShieldAlert } from "lucide-react";

export default function OnboardingGoal() {
  const navigate = useNavigate();

  const goals = [
    { id: "track", label: "Theo Dõi Chi Tiêu", icon: TrendingDown, description: "Xem tiền đi đâu" },
    { id: "save", label: "Tiết Kiệm Tiền", icon: PiggyBank, description: "Xây dựng thói quen tiết kiệm" },
    { id: "family", label: "Ngân Sách Gia Đình", icon: Users, description: "Quản lý chi tiêu hộ gia đình" },
    { id: "avoid", label: "Tránh Chi Tiêu Quá Mức", icon: ShieldAlert, description: "Giữ trong giới hạn" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <h1 className="text-2xl mb-2">Mục Tiêu Chính Của Bạn?</h1>
        <p className="text-muted-foreground text-lg">Chọn điều quan trọng nhất với bạn</p>
      </div>

      <div className="flex-1 space-y-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <button
              key={goal.id}
              onClick={() => navigate("/onboarding/mode")}
              className="w-full p-5 bg-white border-2 border-border rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-left flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="text-lg mb-1">{goal.label}</div>
                <div className="text-muted-foreground text-sm">{goal.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/onboarding/start")}
        className="w-full h-14 bg-gray-100 text-foreground rounded-xl hover:bg-gray-200 transition-colors mt-6"
      >
        Quay Lại
      </button>
    </div>
  );
}
