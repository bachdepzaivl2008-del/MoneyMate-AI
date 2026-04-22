import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  const handleGoogleSignIn = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-3xl mb-2">Chào Mừng Trở Lại!</h1>
          <p className="text-muted-foreground text-lg">Đăng nhập vào MoneyMate AI</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-foreground">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-12 bg-white border-2 border-border rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-blue-600 text-base">
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-muted-foreground">Hoặc tiếp tục với</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full h-14 bg-white border-2 border-border rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Đăng nhập với Google</span>
        </button>

        <p className="text-center mt-8 text-base text-muted-foreground">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600"
          >
            Đăng Ký
          </button>
        </p>

        {/* Developer Mode Section */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
          <p className="text-center text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            Developer Mode 🛠️
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/onboarding/start")}
              className="px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
              title="Đi tới luồng Onboarding"
            >
              🚀 New User
            </button>
            <button
              onClick={() => navigate("/app")}
              className="px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
              title="Đi thẳng vào Dashboard"
            >
              🏠 Old User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
