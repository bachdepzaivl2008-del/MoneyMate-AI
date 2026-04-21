import { useNavigate } from "react-router";
import { User, Users, GraduationCap, Heart } from "lucide-react";

export default function OnboardingStart() {
  const navigate = useNavigate();

  const userTypes = [
    { id: "personal", label: "Cá Nhân", icon: User, description: "Quản lý tài chính của riêng tôi" },
    { id: "family", label: "Gia Đình", icon: Users, description: "Theo dõi ngân sách gia đình" },
    { id: "student", label: "Sinh Viên", icon: GraduationCap, description: "Học cách quản lý tiền" },
    { id: "elderly", label: "Chế Độ Đơn Giản", icon: Heart, description: "Dễ sử dụng và tiếp cận" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <h1 className="text-2xl mb-2">Chào Mừng Đến MoneyMate!</h1>
        <p className="text-muted-foreground text-lg">Hãy cho chúng tôi biết về bạn</p>
      </div>

      <div className="flex-1 space-y-4">
        {userTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => navigate("/onboarding/goal")}
              className="w-full p-5 bg-white border-2 border-border rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-left flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="text-lg mb-1">{type.label}</div>
                <div className="text-muted-foreground text-sm">{type.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full h-14 bg-gray-100 text-foreground rounded-xl hover:bg-gray-200 transition-colors mt-6"
      >
        Quay Lại
      </button>
    </div>
  );
}
