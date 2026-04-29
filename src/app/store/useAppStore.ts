import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ───────────────────────────────────────────────

export type TransactionType = "income" | "expense";

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: string;      // emoji or lucide icon name
  color: string;     // tailwind color class
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;       // positive = income, negative = expense
  type: TransactionType;
  category: string;
  walletId: string;
  date: string;         // ISO date string
  notes?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  color: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;   // ISO date string, optional
  icon: string;        // emoji
  color: string;       // tailwind gradient class
  createdAt: string;
}

export interface AppSettings {
  theme: "light" | "dark";
  fontSize: "normal" | "large" | "xlarge";
  simpleMode: boolean;
  currency: string;
  notifications: boolean;
  budgetAlerts: boolean;
  userPersona?: "student" | "professional" | "investor" | "hustler" | "entrepreneur" | "family" | "senior";
  userGoal?: string;
  interfaceMode?: "simple" | "standard" | "expert";
}

// ─── Store Interface ─────────────────────────────────────

interface AppState {
  // Data
  wallets: Wallet[];
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  settings: AppSettings;

  // Settings actions
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetStore: () => void;

  // Wallet actions
  addWallet: (wallet: Omit<Wallet, "id">) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;

  // Transaction actions
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;

  // Budget actions
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;

  // Savings Goal actions
  addSavingsGoal: (goal: Omit<SavingsGoal, "id" | "createdAt">) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  depositToGoal: (id: string, amount: number) => void;
  applyPersonaPresets: () => void;

  // Computed helpers
  getWalletById: (id: string) => Wallet | undefined;
  getDefaultWallet: () => Wallet | undefined;
  getTotalBalance: () => number;
  getMonthlyIncome: () => number;
  getMonthlyExpenses: () => number;
  getSpentByCategory: (category: string) => number;
  getRecentTransactions: (limit?: number) => Transaction[];
  getTotalSaved: () => number;
  getTotalGoalsTarget: () => number;
}

// ─── Helpers ─────────────────────────────────────────────

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

// ─── Default Data ────────────────────────────────────────

const defaultWallets: Wallet[] = [
  { id: "w1", name: "Ví Chính", balance: 4285500, icon: "💰", color: "bg-blue-600", isDefault: true },
  { id: "w2", name: "Tiết Kiệm", balance: 12000000, icon: "🏦", color: "bg-green-600", isDefault: false },
];

const defaultTransactions: Transaction[] = [
  { id: "t1", title: "Lương Tháng",       amount: 5200000,  type: "income",  category: "Lương",     walletId: "w1", date: "2026-04-20" },
  { id: "t2", title: "Mua Sắm Tạp Hóa",  amount: -85500,   type: "expense", category: "Ăn Uống",   walletId: "w1", date: "2026-04-21" },
  { id: "t3", title: "Ăn Trưa Ở Quán",   amount: -25000,   type: "expense", category: "Ăn Uống",   walletId: "w1", date: "2026-04-21" },
  { id: "t4", title: "Đổ Xăng",          amount: -60000,   type: "expense", category: "Di Chuyển", walletId: "w1", date: "2026-04-20" },
  { id: "t5", title: "Tiền Điện",        amount: -120000,  type: "expense", category: "Tiện Ích",  walletId: "w1", date: "2026-04-18" },
  { id: "t6", title: "Khám Bác Sĩ",     amount: -80000,   type: "expense", category: "Sức Khỏe",  walletId: "w1", date: "2026-04-17" },
  { id: "t7", title: "Dự Án Freelance",  amount: 850000,   type: "income",  category: "Freelance", walletId: "w1", date: "2026-04-15" },
  { id: "t8", title: "Mua Sắm Online",   amount: -120000,  type: "expense", category: "Mua Sắm",  walletId: "w1", date: "2026-04-14" },
  { id: "t9", title: "Quà Sinh Nhật",    amount: -200000,  type: "expense", category: "Mua Sắm",  walletId: "w1", date: "2026-04-10" },
  { id: "t10", title: "Gửi Tiết Kiệm",  amount: -2000000, type: "expense", category: "Tiết Kiệm", walletId: "w1", date: "2026-04-01", notes: "Chuyển sang ví tiết kiệm" },
];

const defaultBudgets: Budget[] = [
  { id: "b1", category: "Ăn Uống",   limit: 500000,  color: "bg-blue-600" },
  { id: "b2", category: "Mua Sắm",   limit: 300000,  color: "bg-green-600" },
  { id: "b3", category: "Di Chuyển",  limit: 200000,  color: "bg-orange-600" },
  { id: "b4", category: "Tiện Ích",   limit: 200000,  color: "bg-red-600" },
];

const defaultSavingsGoals: SavingsGoal[] = [
  {
    id: "g1",
    name: "Mua MacBook Pro",
    targetAmount: 35000000,
    savedAmount: 12000000,
    deadline: "2026-08-01",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
    createdAt: "2026-01-15",
  },
  {
    id: "g2",
    name: "Du lịch Đà Lạt",
    targetAmount: 5000000,
    savedAmount: 3500000,
    deadline: "2026-06-15",
    icon: "✈️",
    color: "from-emerald-500 to-teal-600",
    createdAt: "2026-02-01",
  },
  {
    id: "g3",
    name: "Quỹ Khẩn Cấp",
    targetAmount: 20000000,
    savedAmount: 8000000,
    icon: "🛡️",
    color: "from-orange-500 to-rose-600",
    createdAt: "2026-01-01",
  },
];

const defaultSettings: AppSettings = {
  theme: "light",
  fontSize: "normal",
  simpleMode: false,
  currency: "VND",
  notifications: true,
  budgetAlerts: true,
};

// ─── Store ───────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      wallets: defaultWallets,
      transactions: defaultTransactions,
      budgets: defaultBudgets,
      savingsGoals: defaultSavingsGoals,
      settings: defaultSettings,

      // ── Settings Actions ──
      updateSettings: (updates) =>
        set((s) => ({
          settings: { ...s.settings, ...updates },
        })),

      resetStore: () =>
        set(() => ({
          wallets: [],
          transactions: [],
          budgets: [],
          savingsGoals: [],
          settings: defaultSettings,
        })),

      // ── Wallet Actions ──
      addWallet: (wallet) =>
        set((s) => ({
          wallets: [...s.wallets, { ...wallet, id: uid() }],
        })),

      updateWallet: (id, updates) =>
        set((s) => ({
          wallets: s.wallets.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        })),

      deleteWallet: (id) =>
        set((s) => ({
          wallets: s.wallets.filter((w) => w.id !== id),
          transactions: s.transactions.filter((t) => t.walletId !== id),
        })),

      // ── Transaction Actions ──
      addTransaction: (tx) =>
        set((s) => {
          const newTx = { ...tx, id: uid() };
          // Update wallet balance
          const wallets = s.wallets.map((w) =>
            w.id === tx.walletId ? { ...w, balance: w.balance + tx.amount } : w
          );
          return {
            transactions: [newTx, ...s.transactions],
            wallets,
          };
        }),

      deleteTransaction: (id) =>
        set((s) => {
          const tx = s.transactions.find((t) => t.id === id);
          if (!tx) return s;
          // Reverse the wallet balance change
          const wallets = s.wallets.map((w) =>
            w.id === tx.walletId ? { ...w, balance: w.balance - tx.amount } : w
          );
          return {
            transactions: s.transactions.filter((t) => t.id !== id),
            wallets,
          };
        }),

      // ── Budget Actions ──
      addBudget: (budget) =>
        set((s) => ({
          budgets: [...s.budgets, { ...budget, id: uid() }],
        })),

      updateBudget: (id, updates) =>
        set((s) => ({
          budgets: s.budgets.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),

      deleteBudget: (id) =>
        set((s) => ({
          budgets: s.budgets.filter((b) => b.id !== id),
        })),

      // ── Savings Goal Actions ──
      addSavingsGoal: (goal) =>
        set((s) => ({
          savingsGoals: [
            ...s.savingsGoals,
            { ...goal, id: uid(), createdAt: new Date().toISOString().split("T")[0] },
          ],
        })),

      updateSavingsGoal: (id, updates) =>
        set((s) => ({
          savingsGoals: s.savingsGoals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),

      deleteSavingsGoal: (id) =>
        set((s) => ({
          savingsGoals: s.savingsGoals.filter((g) => g.id !== id),
        })),

      depositToGoal: (id, amount) =>
        set((s) => ({
          savingsGoals: s.savingsGoals.map((g) =>
            g.id === id
              ? { ...g, savedAmount: Math.min(g.savedAmount + amount, g.targetAmount) }
              : g
          ),
        })),

      applyPersonaPresets: () => {
        const { settings } = get();
        const persona = settings.userPersona;

        let budgets: Budget[] = [];
        let goals: SavingsGoal[] = [];

        // Simple presets based on 7 Personas
        if (persona === "student") {
          budgets = [
            { id: uid(), category: "Ăn Uống", limit: 3000000, color: "bg-orange-500" },
            { id: uid(), category: "Học Tập", limit: 1000000, color: "bg-blue-500" },
            { id: uid(), category: "Giải Trí", limit: 1000000, color: "bg-purple-500" },
          ];
          goals = [
            { id: uid(), name: "Mua Laptop mới", targetAmount: 20000000, savedAmount: 0, icon: "💻", color: "from-blue-500 to-indigo-600", createdAt: new Date().toISOString() }
          ];
        } else if (persona === "professional") {
          budgets = [
            { id: uid(), category: "Cố Định (50%)", limit: 10000000, color: "bg-teal-500" },
            { id: uid(), category: "Linh Hoạt (30%)", limit: 6000000, color: "bg-emerald-500" },
            { id: uid(), category: "Tiết Kiệm (20%)", limit: 4000000, color: "bg-blue-600" },
          ];
          goals = [
            { id: uid(), name: "Mua Nhà", targetAmount: 1000000000, savedAmount: 50000000, icon: "🏠", color: "from-emerald-400 to-teal-500", createdAt: new Date().toISOString() }
          ];
        } else if (persona === "investor") {
          budgets = [
            { id: uid(), category: "Sinh Hoạt", limit: 10000000, color: "bg-slate-600" },
            { id: uid(), category: "Quỹ Đầu Tư (Chứng khoán)", limit: 15000000, color: "bg-purple-600" },
          ];
          goals = [
            { id: uid(), name: "Đạt Tự Do Tài Chính", targetAmount: 5000000000, savedAmount: 500000000, icon: "🚀", color: "from-purple-500 to-fuchsia-600", createdAt: new Date().toISOString() }
          ];
        } else if (persona === "hustler") {
          budgets = [
            { id: uid(), category: "Chi Phí Tối Thiểu", limit: 8000000, color: "bg-amber-600" },
            { id: uid(), category: "Thiết Bị & Công Cụ", limit: 3000000, color: "bg-orange-500" },
          ];
          goals = [
            { id: uid(), name: "Quỹ Khẩn Cấp (6 Tháng)", targetAmount: 50000000, savedAmount: 10000000, icon: "🛡️", color: "from-amber-400 to-orange-500", createdAt: new Date().toISOString() }
          ];
        } else if (persona === "entrepreneur") {
          budgets = [
            { id: uid(), category: "Chi Phí Cá Nhân", limit: 10000000, color: "bg-blue-600" },
            { id: uid(), category: "Tiền Nhập Hàng", limit: 50000000, color: "bg-red-500" },
            { id: uid(), category: "Vận Hành & Marketing", limit: 15000000, color: "bg-rose-500" },
          ];
          goals = [
            { id: uid(), name: "Mở Rộng Cửa Hàng", targetAmount: 200000000, savedAmount: 50000000, icon: "🏪", color: "from-rose-400 to-red-500", createdAt: new Date().toISOString() }
          ];
        } else if (persona === "family") {
          budgets = [
            { id: uid(), category: "Chợ Búa & Siêu Thị", limit: 8000000, color: "bg-pink-500" },
            { id: uid(), category: "Điện Nước & Hóa Đơn", limit: 3000000, color: "bg-orange-500" },
            { id: uid(), category: "Giáo Dục (Con cái)", limit: 5000000, color: "bg-rose-600" },
          ];
          goals = [
            { id: uid(), name: "Đại học cho con", targetAmount: 300000000, savedAmount: 20000000, icon: "🎓", color: "from-pink-400 to-rose-500", createdAt: new Date().toISOString() }
          ];
        } else if (persona === "senior") {
          budgets = [
            { id: uid(), category: "Ăn Uống", limit: 4000000, color: "bg-blue-500" },
            { id: uid(), category: "Sức Khỏe & Thuốc Men", limit: 3000000, color: "bg-teal-500" },
            { id: uid(), category: "Quà Cáp Cho Cháu", limit: 2000000, color: "bg-cyan-500" },
          ];
          goals = [
            { id: uid(), name: "Du Lịch Nghỉ Dưỡng", targetAmount: 50000000, savedAmount: 10000000, icon: "🌴", color: "from-cyan-400 to-blue-500", createdAt: new Date().toISOString() }
          ];
        } else {
          // Default fallback
          budgets = [
            { id: uid(), category: "Ăn Uống", limit: 5000000, color: "bg-blue-600" },
            { id: uid(), category: "Mua Sắm", limit: 2000000, color: "bg-green-600" },
          ];
        }

        set({
          budgets,
          savingsGoals: goals,
        });
      },

      // ── Computed Helpers ──
      getWalletById: (id) => get().wallets.find((w) => w.id === id),

      getDefaultWallet: () => get().wallets.find((w) => w.isDefault) || get().wallets[0],

      getTotalBalance: () => get().wallets.reduce((sum, w) => sum + w.balance, 0),

      getMonthlyIncome: () => {
        const month = getCurrentMonth();
        return get()
          .transactions.filter((t) => t.type === "income" && t.date.startsWith(month))
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getMonthlyExpenses: () => {
        const month = getCurrentMonth();
        return get()
          .transactions.filter((t) => t.type === "expense" && t.date.startsWith(month))
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      },

      getSpentByCategory: (category) => {
        const month = getCurrentMonth();
        return get()
          .transactions.filter(
            (t) => t.type === "expense" && t.category === category && t.date.startsWith(month)
          )
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      },

      getRecentTransactions: (limit = 5) =>
        [...get().transactions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit),

      getTotalSaved: () =>
        get().savingsGoals.reduce((sum, g) => sum + g.savedAmount, 0),

      getTotalGoalsTarget: () =>
        get().savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0),
    }),
    {
      name: "moneymate-storage",
    }
  )
);
