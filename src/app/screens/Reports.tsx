import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { TrendingDown, TrendingUp, Calendar as CalendarIcon, Filter, Info } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { Card } from "../components/ui/card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useAppStore, Transaction } from "../store/useAppStore";
import { DatePicker } from "../components/ui/date-picker";

const CHART_COLORS = ["#2563eb", "#16a34a", "#ea580c", "#d946ef", "#8b5cf6", "#eab308", "#06b6d4", "#f43f5e"];

export default function Reports() {
  const { transactions } = useAppStore();
  const getFirstDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
  };
  const getToday = () => new Date().toISOString().split("T")[0];

  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfMonth(),
    endDate: getToday(),
  });
  const [activeFilter, setActiveFilter] = useState("month");

  // Filter transactions based on selected time range
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      return tx.date >= dateRange.startDate && tx.date <= dateRange.endDate;
    });
  }, [transactions, dateRange]);

  // Donut Chart Data (Expenses by Category)
  const categoryData = useMemo(() => {
    const expenses = filteredTransactions.filter(t => t.type === "expense");
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // Line Chart Data (Daily Trend)
  const trendData = useMemo(() => {
    const grouped = filteredTransactions.reduce((acc, tx) => {
      const day = new Date(tx.date).getDate();
      if (!acc[day]) acc[day] = { day: `${day}`, Thêm: 0, Chi: 0 };
      if (tx.type === "income") acc[day].Thêm += tx.amount;
      else acc[day].Chi += Math.abs(tx.amount);
      return acc;
    }, {} as Record<number, { day: string; Thêm: number; Chi: number }>);

    return Object.values(grouped).sort((a, b) => Number(a.day) - Number(b.day));
  }, [filteredTransactions]);

  // Weekly Income vs Expense
  const totalIncome = filteredTransactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const cashFlowData = [
    { name: "Thu Nhập", value: totalIncome, fill: "#16a34a" },
    { name: "Chi Tiêu", value: totalExpense, fill: "#ea580c" }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-xl shadow-lg border border-border text-sm">
          <p className="font-semibold text-foreground mb-1">{payload[0].name || payload[0].payload.day}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color || entry.fill }}>
              {entry.name}: {entry.value.toLocaleString("vi-VN")}₫
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer className="space-y-6 lg:space-y-8 max-w-xl lg:max-w-5xl mx-auto pb-24">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Báo Cáo Phân Tích</h1>
          <p className="text-muted-foreground text-sm">Tình hình tài chính của bạn</p>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-3">
          <div className="flex bg-muted p-1 rounded-xl w-fit">
            <button
              onClick={() => {
                const today = new Date();
                const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                setDateRange({ startDate: sevenDaysAgo.toISOString().split("T")[0], endDate: getToday() });
                setActiveFilter("week");
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === "week" ? "bg-background text-blue-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              7 Ngày Qua
            </button>
            <button
              onClick={() => {
                setDateRange({ startDate: getFirstDayOfMonth(), endDate: getToday() });
                setActiveFilter("month");
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === "month" ? "bg-background text-blue-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tháng Này
            </button>
            <button
              onClick={() => {
                setDateRange({ startDate: "2000-01-01", endDate: "2100-01-01" });
                setActiveFilter("all");
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === "all" ? "bg-background text-blue-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất Cả
            </button>
          </div>
          <div className="flex items-center gap-2">
            <DatePicker 
              value={dateRange.startDate}
              onChange={(val) => { setDateRange(p => ({ ...p, startDate: val })); setActiveFilter("custom"); }}
              className="h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm w-[130px]"
            />
            <span className="text-muted-foreground text-sm">-</span>
            <DatePicker 
              value={dateRange.endDate}
              onChange={(val) => { setDateRange(p => ({ ...p, endDate: val })); setActiveFilter("custom"); }}
              className="h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm w-[130px]"
            />
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">Tổng Thu</span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-foreground">
            {totalIncome.toLocaleString("vi-VN")}₫
          </div>
        </Card>
        <Card className="p-4 border-border bg-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingDown className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">Tổng Chi</span>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-foreground">
            {totalExpense.toLocaleString("vi-VN")}₫
          </div>
        </Card>
        <Card className="p-4 border-border bg-card col-span-2">
           <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Info className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider">Nhận Xét</span>
          </div>
          <div className="text-sm text-foreground font-medium">
            {totalIncome > totalExpense 
              ? "Tuyệt vời! Bạn đang duy trì số dư dương trong kỳ này." 
              : "Chú ý! Chi tiêu của bạn đang vượt mốc thu nhập."}
          </div>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Donut Chart */}
        <Card className="p-5 lg:p-6 border-slate-100 shadow-sm">
          <SectionHeader title="Chi Tiêu Theo Danh Mục" className="mb-6" />
          {categoryData.length > 0 ? (
            <div className="relative h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3">
                {categoryData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></div>
                    <span className="text-muted-foreground truncate flex-1">{entry.name}</span>
                    <span className="font-semibold text-foreground">{((entry.value / totalExpense) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
              <Filter className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">Chưa có giao dịch chi tiêu nào</p>
            </div>
          )}
        </Card>

        {/* Cashflow Bar Chart */}
        <Card className="p-5 lg:p-6 border-border shadow-sm">
          <SectionHeader title="Dòng Tiền" className="mb-6" />
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} dy={10} className="text-muted-foreground" />
                <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} className="text-muted-foreground" />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'currentColor', opacity: 0.1}} className="text-muted" />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Trend Line Chart */}
        <Card className="p-5 lg:p-6 border-border shadow-sm lg:col-span-2">
          <SectionHeader title="Xu Hướng Hàng Ngày" className="mb-6" />
          {trendData.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-border" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} dy={10} className="text-muted-foreground" />
                  <YAxis tickFormatter={formatCurrency} axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} className="text-muted-foreground" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: 'currentColor' }} className="text-muted-foreground" />
                  <Line type="monotone" dataKey="Thêm" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="Chi" stroke="#f43f5e" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center text-muted-foreground">
              <CalendarIcon className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">Chưa có đủ dữ liệu để vẽ biểu đồ</p>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
