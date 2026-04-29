import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useAppStore } from "./store/useAppStore";

export default function App() {
  const { settings } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  return <RouterProvider router={router} />;
}