import { createBrowserRouter, Navigate } from "react-router";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import OnboardingQuiz from "./screens/OnboardingQuiz";
import OnboardingResult from "./screens/OnboardingResult";
import OnboardingWallet from "./screens/OnboardingWallet";
import OnboardingCategories from "./screens/OnboardingCategories";
import Dashboard from "./screens/Dashboard";
import AddTransaction from "./screens/AddTransaction";
import TransactionHistory from "./screens/TransactionHistory";
import Budgets from "./screens/Budgets";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import Wallets from "./screens/Wallets";
import Goals from "./screens/Goals";
import AIInsights from "./screens/AIInsights";
import RecurringTransactions from "./screens/RecurringTransactions";
import AppLayout from "./components/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/onboarding",
    element: <Navigate to="/onboarding/quiz" replace />,
  },
  {
    path: "/onboarding/quiz",
    Component: OnboardingQuiz,
  },
  {
    path: "/onboarding/result",
    Component: OnboardingResult,
  },
  {
    path: "/onboarding/wallet",
    Component: OnboardingWallet,
  },
  {
    path: "/onboarding/categories",
    Component: OnboardingCategories,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "reports", Component: Reports },
      { path: "add", Component: AddTransaction },
      { path: "history", Component: TransactionHistory },
      { path: "budgets", Component: Budgets },
      { path: "wallets", Component: Wallets },
      { path: "goals", Component: Goals },
      { path: "insights", Component: AIInsights },
      { path: "recurring", Component: RecurringTransactions },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "notifications", Component: Notifications },
    ],
  },
]);
