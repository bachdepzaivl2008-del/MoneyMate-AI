import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "../store/useAppStore";
import { ChevronLeft } from "lucide-react";

type Persona = "student" | "professional" | "investor" | "hustler" | "entrepreneur" | "family" | "senior";

const questions = [
  {
    id: 1,
    title: "Nguồn năng lượng chính nuôi dưỡng 'ví' của bạn hiện tại đến từ đâu?",
    options: [
      { id: "A", text: "Mình đang nhận trợ cấp từ gia đình hoặc làm thêm part-time.", scores: { student: 3 } },
      { id: "B", text: "Mình có lương cố định, 'đến hẹn lại lên' hàng tháng.", scores: { professional: 3 } },
      { id: "C", text: "Thu nhập của mình đến từ các dự án, khách hàng tự do, lúc nhiều lúc ít.", scores: { hustler: 3 } },
      { id: "D", text: "Mình đang quản lý dòng tiền kinh doanh/bán hàng của riêng mình.", scores: { entrepreneur: 3 } },
      { id: "E", text: "Mình sống dựa trên các khoản tích lũy hoặc lương hưu an nhàn.", scores: { senior: 3 } },
      { id: "F", text: "Phần lớn thu nhập của mình đến từ các kênh đầu tư (chứng khoán, bất động sản...).", scores: { investor: 3 } },
    ]
  },
  {
    id: 2,
    title: "Trong thế giới tài chính, bạn thấy mình giống phong cách nào nhất?",
    options: [
      { id: "A", text: "\"Kiến tha lâu đầy tổ\": Ưu tiên tiết kiệm từng chút một cho tương lai.", scores: { student: 2, professional: 2 } },
      { id: "B", text: "\"Tiền phải đẻ ra tiền\": Luôn tìm cách để tối ưu hóa lợi nhuận.", scores: { investor: 3, entrepreneur: 2 } },
      { id: "C", text: "\"Tay hòm chìa khóa\": Ưu tiên lo cho gia đình và các hóa đơn chung.", scores: { family: 3 } },
      { id: "D", text: "\"Sống trọn khoảnh khắc\": Không ngại chi cho trải nghiệm và sở thích cá nhân.", scores: { student: 2, hustler: 2 } },
      { id: "E", text: "\"An toàn là trên hết\": Chỉ cần mọi thứ ổn định, rõ ràng và dễ hiểu.", scores: { senior: 2, professional: 2 } },
    ]
  },
  {
    id: 3,
    title: "Khi mở app quản lý chi tiêu, bạn muốn 'đập vào mắt' mình là điều gì?",
    options: [
      { id: "A", text: "Một con số duy nhất: \"Hôm nay mình được tiêu bao nhiêu?\".", scores: { student: 3, hustler: 2 }, isSimpleMode: true },
      { id: "B", text: "Những biểu đồ tăng trưởng, chỉ số kỹ thuật và báo cáo chi tiết.", scores: { investor: 3, entrepreneur: 2 } },
      { id: "C", text: "Danh sách các hóa đơn cần thanh toán và quỹ gia đình.", scores: { family: 3 } },
      { id: "D", text: "Giao diện cực kỳ đơn giản, chữ to, dễ nhìn, không cần thao tác nhiều.", scores: { senior: 3 }, isSimpleMode: true },
      { id: "E", text: "Biểu đồ phân bổ theo quy tắc (ví dụ 50/30/20) để tự kỷ luật.", scores: { professional: 3 } },
    ]
  },
  {
    id: 4,
    title: "Điều gì về tiền bạc khiến bạn đôi khi cảm thấy 'lăn tăn' nhất?",
    options: [
      { id: "A", text: "Sợ cuối tháng phải ăn mì tôm vì lỡ tay tiêu quá đà.", scores: { student: 3 } },
      { id: "B", text: "Sợ các khoản đầu tư bị 'đứng yên' hoặc sụt giảm.", scores: { investor: 3 } },
      { id: "C", text: "Sợ thu nhập bấp bênh, tháng sau không biết có dự án không.", scores: { hustler: 3 } },
      { id: "D", text: "Sợ tiền cá nhân bị lẫn lộn hết vào tiền hàng, tiền kinh doanh.", scores: { entrepreneur: 3 } },
      { id: "E", text: "Sợ có biến cố bất ngờ mà không có quỹ dự phòng cho người thân.", scores: { family: 3, senior: 2 } },
    ]
  },
  {
    id: 5,
    title: "Nếu được chọn một 'siêu năng lực' từ MoneyMate, bạn sẽ chọn gì?",
    options: [
      { id: "A", text: "Khả năng nhắc nhở khéo léo để mình không tiêu xài lãng phí.", scores: { student: 3, professional: 2 } },
      { id: "B", text: "Khả năng phân tích sâu để mình đưa ra quyết định đầu tư đúng đắn.", scores: { investor: 3 } },
      { id: "C", text: "Khả năng tự động hóa mọi hóa đơn để mình rảnh tay lo cho gia đình.", scores: { family: 3 } },
      { id: "D", text: "Khả năng dự báo dòng tiền để mình yên tâm làm nghề tự do.", scores: { hustler: 3, entrepreneur: 3 } },
      { id: "E", text: "Sự đơn giản tuyệt đối, chỉ cần ghi chép và xem lại thật nhanh.", scores: { senior: 3 }, isSimpleMode: true },
    ]
  }
];

export default function OnboardingQuiz() {
  const navigate = useNavigate();
  const updateSettings = useAppStore((state) => state.updateSettings);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<Persona, number>>({
    student: 0, professional: 0, investor: 0, hustler: 0, entrepreneur: 0, family: 0, senior: 0
  });
  // Track answers to allow "Back"
  const [history, setHistory] = useState<any[]>([]);

  const handleSelect = (option: any) => {
    // Add to scores
    const newScores = { ...scores };
    Object.keys(option.scores).forEach(key => {
      newScores[key as Persona] += option.scores[key];
    });

    setHistory([...history, { step: currentStep, option }]);

    if (currentStep < questions.length - 1) {
      setScores(newScores);
      setCurrentStep(currentStep + 1);
    } else {
      // Finish Quiz
      let maxScore = -1;
      let winningPersona: Persona = "student";
      
      Object.entries(newScores).forEach(([persona, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winningPersona = persona as Persona;
        }
      });

      // Determine simpleMode based on answers
      const wantsSimpleMode = history.some(h => h.option.isSimpleMode) || option.isSimpleMode || winningPersona === "senior";

      updateSettings({ 
        userPersona: winningPersona,
        simpleMode: wantsSimpleMode
      });

      navigate("/onboarding/result");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const lastAction = history[history.length - 1];
      
      // Revert scores
      const revertedScores = { ...scores };
      Object.keys(lastAction.option.scores).forEach(key => {
        revertedScores[key as Persona] -= lastAction.option.scores[key];
      });

      setScores(revertedScores);
      setHistory(history.slice(0, -1));
      setCurrentStep(currentStep - 1);
    }
  };

  const question = questions[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 max-w-3xl mx-auto pt-12">
      {/* Header & Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleBack} 
            disabled={currentStep === 0}
            className={`p-2 -ml-2 rounded-xl transition-colors ${currentStep === 0 ? "opacity-0" : "hover:bg-muted text-muted-foreground"}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {currentStep + 1} / {questions.length}
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Intro for Step 1 */}
      {currentStep === 0 && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Chào bạn, mình là MoneyMate AI 👋
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-xl mx-auto">
            Rất vui được đồng hành cùng bạn trên con đường quản lý tài chính. Để mình có thể "hóa thân" thành người trợ lý phù hợp nhất với phong cách của bạn, hãy chia sẻ với mình một chút nhé!
          </p>
        </div>
      )}

      {/* Question */}
      <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex-1 flex flex-col" key={currentStep}>
        <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-6 leading-snug">
          {question.title}
        </h2>
        
        <div className="space-y-3 flex-1 overflow-y-auto pb-6">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className="w-full p-4 lg:p-5 bg-card border-2 border-border rounded-2xl hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left flex items-start gap-4 group"
            >
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 font-bold flex items-center justify-center flex-shrink-0 transition-colors text-sm mt-0.5">
                {option.id}
              </div>
              <div className="flex-1 font-medium text-foreground text-sm lg:text-base leading-relaxed">
                {option.text}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
