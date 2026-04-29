import { Brain, TrendingUp, Calendar, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore } from "../store/useAppStore";
import { useState } from "react";

export default function AIInsights() {
  const { getMonthlyExpenses, getMonthlyIncome } = useAppStore();
  const [timeRange, setTimeRange] = useState<"week" | "month">("month");

  const monthlyExpenses = getMonthlyExpenses();
  const monthlyIncome = getMonthlyIncome();

  const insights = [
    {
      id: 1,
      title: "Phân tích chi tiêu",
      description: "Bạn đang chi cho ăn uống cao hơn tháng trước 18%",
      type: "warning",
      action: "Bạn có thể đặt giới hạn 100.000đ/ngày cho nhóm ăn uống",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-500/10",
    },
    {
      id: 2,
      title: "Thói quen cuối tuần",
      description: "Cuối tuần là lúc bạn chi mạnh nhất (thường là tối Thứ 7)",
      type: "info",
      action: "Cân nhắc chuẩn bị bữa tối tại nhà vào Thứ 7 tới",
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      id: 3,
      title: "Sức khỏe tài chính",
      description: "Tỷ lệ tiết kiệm của bạn đạt 24%, rất tốt!",
      type: "success",
      action: "Tiếp tục duy trì phong độ này nhé",
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-500/10",
    },
  ];

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">AI Insights</h1>
          <p className="text-muted-foreground text-sm">Phân tích tài chính thông minh</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === "week" ? "bg-background text-blue-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tuần
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === "month" ? "bg-background text-blue-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tháng
          </button>
        </div>
      </div>

      {/* Hero Summary */}
      <Card className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-indigo-200" />
            <span className="text-sm font-medium text-indigo-100 italic">MoneyMate Intelligence</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Tóm tắt tháng này</h2>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            Bạn đã chi tiêu {monthlyExpenses.toLocaleString("vi-VN")}₫ trên tổng thu nhập {monthlyIncome.toLocaleString("vi-VN")}₫.
            Hệ thống phát hiện chi phí mua sắm đang tăng nhanh hơn dự kiến.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="text-[10px] uppercase font-bold text-indigo-200">Dự kiến chi</div>
              <div className="text-lg font-bold">~5.2tr</div>
            </div>
            <div className="flex-1 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="text-[10px] uppercase font-bold text-indigo-200">Tiết kiệm dự kiến</div>
              <div className="text-lg font-bold">~1.5tr</div>
            </div>
          </div>
        </div>
        <Brain className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        <SectionHeader title="Đề xuất từ AI" />
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} className="p-5 border-border bg-card shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <div className="flex gap-4">
                <div className={`w-12 h-12 ${insight.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${insight.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground text-sm">{insight.title}</h3>
                    {insight.type === "warning" && <AlertCircle className="w-4 h-4 text-orange-500 dark:text-orange-400" />}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                  <div className={`p-3 rounded-xl ${insight.bg} border border-border group-hover:border-blue-400/50 transition-colors flex items-center justify-between`}>
                    <span className={`text-xs font-medium ${insight.color}`}>{insight.action}</span>
                    <ArrowRight className={`w-3 h-3 ${insight.color}`} />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tip of the day */}
      <Card className="p-4 bg-muted border-dashed border-border flex items-center gap-3">
        <div className="text-xl">💡</div>
        <p className="text-xs text-muted-foreground italic">
          Tip: Ghi chép giao dịch ngay khi nó phát sinh giúp bạn quản lý tài chính chính xác hơn 90%.
        </p>
      </Card>
    </PageContainer>
  );
}
