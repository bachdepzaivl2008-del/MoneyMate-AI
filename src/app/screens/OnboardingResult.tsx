import { useNavigate } from "react-router";
import { useAppStore } from "../store/useAppStore";
import { Rocket, Target, GraduationCap, Users, User, ShieldAlert, Heart } from "lucide-react";
import { useEffect } from "react";

const personaDetails = {
  student: {
    title: "Chiến binh Học đường",
    icon: GraduationCap,
    description: "Bạn mang trong mình ngọn lửa nhiệt huyết của tuổi trẻ! MoneyMate AI sẽ giúp bạn kiểm soát ngân sách mỗi ngày thật dễ dàng, để bạn luôn rủng rỉnh mà vẫn thoải mái tận hưởng thanh xuân.",
    color: "from-blue-400 to-indigo-500"
  },
  professional: {
    title: "Nhân viên Kỷ luật",
    icon: Target,
    description: "Sự nề nếp và kế hoạch là kim chỉ nam của bạn! Chúng tôi đã thiết lập sẵn hệ thống tự động hóa và biểu đồ phân tích sâu để bạn dễ dàng quản lý thu nhập ổn định của mình.",
    color: "from-emerald-400 to-teal-500"
  },
  investor: {
    title: "Nhà Đầu tư Chiến lược",
    icon: Rocket,
    description: "Tiền phải đẻ ra tiền! MoneyMate AI đã chuẩn bị sẵn cho bạn một giao diện chuyên sâu, tập trung vào việc theo dõi sự tăng trưởng và tối ưu hóa tài sản ròng.",
    color: "from-purple-500 to-fuchsia-600"
  },
  hustler: {
    title: "Người làm nghề Tự do",
    icon: Rocket,
    description: "Sự linh hoạt là sức mạnh của bạn! Nhưng đừng lo lắng về những biến động thu nhập, AI của chúng tôi sẽ đóng vai trò như một quỹ dự phòng tinh thần, giúp bạn luôn an tâm sáng tạo.",
    color: "from-amber-400 to-orange-500"
  },
  entrepreneur: {
    title: "Doanh nhân Nhỏ",
    icon: Target,
    description: "Bạn là người làm chủ cuộc chơi! Giao diện đã được tinh chỉnh để giúp bạn tách bạch rõ ràng giữa tiền kinh doanh và tiền cá nhân, tránh mọi sự nhầm lẫn.",
    color: "from-rose-400 to-red-500"
  },
  family: {
    title: "Người Quản lý Gia đình",
    icon: Users,
    description: "Tình yêu thương là động lực của bạn! Hệ thống quản lý hóa đơn chung và nhắc nhở chi tiêu gia đình đã sẵn sàng để bạn toàn tâm chăm lo cho tổ ấm.",
    color: "from-pink-400 to-rose-500"
  },
  senior: {
    title: "Người Cao tuổi An nhàn",
    icon: Heart,
    description: "Trải nghiệm của bạn sẽ là sự bình yên và rõ ràng. Giao diện cực kỳ tối giản, chữ to, dễ đọc đã được kích hoạt để bạn tận hưởng cuộc sống một cách thảnh thơi nhất.",
    color: "from-cyan-400 to-blue-500"
  }
};

export default function OnboardingResult() {
  const navigate = useNavigate();
  const userPersona = useAppStore((state) => state.settings.userPersona) as keyof typeof personaDetails | undefined;
  
  // Safety fallback
  useEffect(() => {
    if (!userPersona) {
      navigate("/onboarding/quiz");
    }
  }, [userPersona, navigate]);

  if (!userPersona) return null;

  const details = personaDetails[userPersona] || personaDetails.student;
  const Icon = details.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 items-center justify-center relative overflow-hidden">
      {/* Abstract Background */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br ${details.color} opacity-10 dark:opacity-20 rounded-full blur-[100px] -z-10`} />

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both text-center">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 blur-2xl rounded-full" />
          <div className={`relative w-28 h-28 mx-auto bg-gradient-to-br ${details.color} rounded-3xl rotate-12 flex items-center justify-center shadow-xl`}>
            <div className="-rotate-12">
              <Icon className="w-14 h-14 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Bạn chính là</h2>
        <h1 className={`text-4xl font-extrabold bg-gradient-to-br ${details.color} text-transparent bg-clip-text mb-6`}>
          {details.title}
        </h1>

        <p className="text-foreground/80 leading-relaxed text-lg mb-12">
          {details.description}
        </p>

        <button
          onClick={() => navigate("/onboarding/wallet")}
          className={`w-full py-4 rounded-2xl bg-gradient-to-r ${details.color} text-white font-bold text-lg shadow-lg hover:opacity-90 hover:-translate-y-1 transition-all`}
        >
          Bắt đầu hành trình
        </button>
        
        <button
          onClick={() => navigate("/onboarding/quiz")}
          className="w-full mt-4 py-4 rounded-2xl bg-transparent text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          Làm lại bài trắc nghiệm
        </button>
      </div>
    </div>
  );
}
