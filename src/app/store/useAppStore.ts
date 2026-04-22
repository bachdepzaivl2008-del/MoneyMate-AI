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

// ─── Store Interface ─────────────────────────────────────

interface AppState {
  // Data
  wallets: Wallet[];
  transactions: Transaction[];
  budgets: Budget[];

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

  // Computed helpers
  getWalletById: (id: string) => Wallet | undefined;
  getDefaultWallet: () => Wallet | undefined;
  getTotalBalance: () => number;
  getMonthlyIncome: () => number;
  getMonthlyExpenses: () => number;
  getSpentByCategory: (category: string) => number;
  getRecentTransactions: (limit?: number) => Transaction[];
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

// ─── Store ───────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      wallets: defaultWallets,
      transactions: defaultTransactions,
      budgets: defaultBudgets,

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
    }),
    {
      name: "moneymate-storage",
    }
  )
);
