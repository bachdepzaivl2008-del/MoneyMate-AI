import { useNavigate } from "react-router";
import { User, Users, GraduationCap, Heart } from "lucide-react";

export default function OnboardingStart() {
  const navigate = useNavigate();

  const userTypes = [
    { id: "personal", label: "Cá Nhân", icon: User, description: "Quản lý tài chính cá nhân" },
    { id: "family", label: "Gia Đình", icon: Users, description: "Quản lý thu chi chung" },
    { id: "student", label: "Sinh Viên", icon: GraduationCap, description: "Học sinh, sinh viên" },
    { id: "beginner", label: "Người Mới Bắt Đầu", icon: User, description: "Bắt đầu quản lý tiền" },
    { id: "elderly", label: "Chế Độ Đơn Giản", icon: Heart, description: "Dễ sử dụng cho người lớn tuổi" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <h1 className="text-2xl mb-2 font-bold">Bạn dùng cho ai?</h1>
        <p className="text-muted-foreground text-lg">Hãy chọn đối tượng sử dụng chính</p>
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
