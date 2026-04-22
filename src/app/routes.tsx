import { createBrowserRouter } from "react-router";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import OnboardingStart from "./screens/OnboardingStart";
import OnboardingGoal from "./screens/OnboardingGoal";
import OnboardingMode from "./screens/OnboardingMode";
import OnboardingWallet from "./screens/OnboardingWallet";
import OnboardingCategories from "./screens/OnboardingCategories";
import Dashboard from "./screens/Dashboard";
import AddTransaction from "./screens/AddTransaction";
import TransactionHistory from "./screens/TransactionHistory";
import Budgets from "./screens/Budgets";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import Wallets from "./screens/Wallets";
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
    path: "/onboarding/start",
    Component: OnboardingStart,
  },
  {
    path: "/onboarding/goal",
    Component: OnboardingGoal,
  },
  {
    path: "/onboarding/mode",
    Component: OnboardingMode,
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
      { path: "add", Component: AddTransaction },
      { path: "history", Component: TransactionHistory },
      { path: "budgets", Component: Budgets },
      { path: "wallets", Component: Wallets },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "notifications", Component: Notifications },
    ],
  },
]);
