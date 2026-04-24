import { useNavigate } from "react-router";
import { TrendingDown, PiggyBank, Users, ShieldAlert } from "lucide-react";

export default function OnboardingGoal() {
  const navigate = useNavigate();

  const goals = [
    { id: "track", label: "Biết mình tiêu bao nhiêu", icon: TrendingDown, description: "Theo dõi dòng tiền hàng ngày" },
    { id: "save", label: "Tiết kiệm nhiều hơn", icon: PiggyBank, description: "Tích trữ cho tương lai" },
    { id: "family", label: "Quản lí thu chi gia đình", icon: Users, description: "Cân đối tài chính tổ ấm" },
    { id: "avoid", label: "Tránh tiêu quá tay", icon: ShieldAlert, description: "Giữ kỷ luật tài chính" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <h1 className="text-2xl mb-2 font-bold">Mục tiêu chính của bạn là gì?</h1>
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
