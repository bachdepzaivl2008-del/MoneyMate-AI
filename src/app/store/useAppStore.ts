import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

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

export interface RecurringTransaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  period: string;
  nextDate: string; // ISO date string
  icon: string; // emoji
}


export type NotificationType = "warning" | "success" | "reminder" | "info";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string; // ISO
  read: boolean;
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
  enabledFeatures: {
    budgets: boolean;
    goals: boolean;
    aiInsights: boolean;
    debt: boolean;
    investments: boolean;
    recurring: boolean;
    reports: boolean;
  };
}

// ─── Store Interface ─────────────────────────────────────

interface AppState {
  // Auth
  user: User | null;
  initialized: boolean;
  initializeAuth: () => void;
  signOut: () => Promise<void>;

  // Data
  wallets: Wallet[];
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  recurringTransactions: RecurringTransaction[];
  settings: AppSettings;
  notifications: AppNotification[];

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

  // Recurring Transaction actions
  addRecurringTransaction: (tx: Omit<RecurringTransaction, "id">) => void;
  updateRecurringTransaction: (id: string, updates: Partial<RecurringTransaction>) => void;
  deleteRecurringTransaction: (id: string) => void;

  // Notification actions
  addNotification: (notif: Omit<AppNotification, "id" | "time" | "read">) => void;
  deleteNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

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

const defaultWallets: Wallet[] = [];

const defaultTransactions: Transaction[] = [];

const defaultBudgets: Budget[] = [];

const defaultSavingsGoals: SavingsGoal[] = [];

const defaultRecurringTransactions: RecurringTransaction[] = [];

const defaultSettings: AppSettings = {
  theme: "light",
  fontSize: "normal",
  simpleMode: false,
  currency: "VND",
  notifications: true,
  budgetAlerts: true,
  enabledFeatures: {
    budgets: true,
    goals: true,
    aiInsights: true,
    debt: true,
    investments: true,
    recurring: true,
    reports: true,
  },
};

// ─── Store ───────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      initialized: false,
      initializeAuth: async () => {
        if (get().initialized) return;

        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        set({ user: session?.user ?? null, initialized: true });

        // Listen for changes
        supabase.auth.onAuthStateChange((_event, session) => {
          set({ user: session?.user ?? null });
        });
      },
      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
        get().resetStore();
      },

      wallets: defaultWallets,
      transactions: defaultTransactions,
      budgets: defaultBudgets,
      savingsGoals: defaultSavingsGoals,
      recurringTransactions: defaultRecurringTransactions,
      settings: defaultSettings,
      notifications: [],

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
          recurringTransactions: [],
          settings: defaultSettings,
          notifications: [],
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
          
          let newNotifications = [...s.notifications];
          
          // Smart Trigger: Budget Warning
          if (tx.type === "expense") {
            const budget = s.budgets.find(b => b.category === tx.category);
            if (budget) {
              const month = tx.date.substring(0, 7); // YYYY-MM
              // Calculate total spent in this category for this month INCLUDING the new transaction
              const totalSpent = s.transactions
                .filter(t => t.type === "expense" && t.category === tx.category && t.date.startsWith(month))
                .reduce((sum, t) => sum + Math.abs(t.amount), 0) + Math.abs(tx.amount);
              
              // Only trigger if this transaction is the one that crosses the limit
              const previousSpent = totalSpent - Math.abs(tx.amount);
              
              if (totalSpent > budget.limit && previousSpent <= budget.limit) {
                newNotifications.unshift({
                  id: uid(),
                  type: "warning",
                  title: "Vượt Ngân Sách",
                  message: `Bạn đã chi tiêu vượt ngân sách ${budget.category} (${totalSpent.toLocaleString("vi-VN")}₫ / ${budget.limit.toLocaleString("vi-VN")}₫).`,
                  time: new Date().toISOString(),
                  read: false
                });
              }
            }
          }

          return {
            transactions: [newTx, ...s.transactions],
            wallets,
            notifications: newNotifications
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
        set((s) => {
          let newNotifications = [...s.notifications];
          const goals = s.savingsGoals.map((g) => {
            if (g.id === id) {
              const newAmount = Math.min(g.savedAmount + amount, g.targetAmount);
              // Smart Trigger: Goal Reached
              if (newAmount >= g.targetAmount && g.savedAmount < g.targetAmount) {
                newNotifications.unshift({
                  id: uid(),
                  type: "success",
                  title: "Đạt Mục Tiêu!",
                  message: `Chúc mừng! Bạn đã hoàn thành mục tiêu tiết kiệm "${g.name}".`,
                  time: new Date().toISOString(),
                  read: false
                });
              }
              return { ...g, savedAmount: newAmount };
            }
            return g;
          });
          return {
            savingsGoals: goals,
            notifications: newNotifications
          };
        }),

      applyPersonaPresets: () => {
        // Chúng ta không tạo dữ liệu mẫu (mock data) nữa để giữ ứng dụng sạch
        // Người dùng sẽ tự thêm ngân sách và mục tiêu theo ý muốn.
      },

      // ── Recurring Transaction Actions ──
      addRecurringTransaction: (tx) =>
        set((s) => ({
          recurringTransactions: [...s.recurringTransactions, { ...tx, id: uid() }],
        })),

      updateRecurringTransaction: (id, updates) =>
        set((s) => ({
          recurringTransactions: s.recurringTransactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        })),

      deleteRecurringTransaction: (id) =>
        set((s) => ({
          recurringTransactions: s.recurringTransactions.filter((tx) => tx.id !== id),
        })),

      // ── Notification Actions ──
      addNotification: (notif) =>
        set((s) => ({
          notifications: [{ ...notif, id: uid(), time: new Date().toISOString(), read: false }, ...s.notifications]
        })),
        
      deleteNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter(n => n.id !== id)
        })),
        
      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
        })),
        
      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map(n => ({ ...n, read: true }))
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
