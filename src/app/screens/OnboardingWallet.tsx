import { useState } from "react";
import { useNavigate } from "react-router";
import { Wallet } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function OnboardingWallet() {
  const navigate = useNavigate();
  const addWallet = useAppStore((state) => state.addWallet);
  const [walletName, setWalletName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const handleContinue = () => {
    if (walletName && initialBalance) {
      addWallet({
        name: walletName,
        balance: parseFloat(initialBalance),
        icon: "💰",
        color: "bg-blue-600",
        isDefault: true,
      });
      navigate("/onboarding/categories");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-2 bg-muted rounded-full"></div>
        </div>
        <h1 className="text-2xl mb-2 font-bold text-foreground">Tạo Ví Đầu Tiên</h1>
        <p className="text-muted-foreground text-lg">Thiết lập nơi bạn giữ tiền</p>
      </div>

      <div className="flex-1">
        <div className="bg-card rounded-2xl p-6 border-2 border-border mb-6 shadow-sm">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="walletName" className="block mb-2 text-foreground font-medium">
                Tên Ví
              </label>
              <input
                id="walletName"
                type="text"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                className="w-full h-14 px-4 bg-background border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                placeholder="VD: Ví Chính, Tiết Kiệm"
              />
            </div>

            <div>
              <label htmlFor="initialBalance" className="block mb-2 text-foreground font-medium">
                Số Dư Ban Đầu
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₫
                </span>
                <input
                  id="initialBalance"
                  type="number"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  className="w-full h-14 pl-8 pr-4 bg-background border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-900 rounded-xl p-4">
          <p className="text-sm text-blue-900 dark:text-blue-300">
            💡 Bạn có thể thêm nhiều ví sau cho các tài khoản khác như tiền mặt, ngân hàng hoặc thẻ tín dụng.
          </p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <button
          onClick={handleContinue}
          disabled={!walletName || !initialBalance}
          className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          Tiếp Tục
        </button>
        <button
          onClick={() => navigate("/onboarding/mode")}
          className="w-full h-14 bg-muted text-foreground rounded-xl hover:bg-muted/80 font-medium transition-colors"
        >
          Quay Lại
        </button>
      </div>
    </div>
  );
}
