"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/users/forgotPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setSuccess("Reset link sent! Please check your email inbox.");
      // Auto-toggle back after some time or keep it
    } catch (err: any) {
      setError(err.message || "Forgot password request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* ... Left Panel Code (Skipped for brevity in this replace block, but keep it) ... */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(24 85% 18%) 0%, hsl(0 0% 6%) 60%, hsl(32 60% 12%) 100%)" }} />
        <div className="relative z-10 flex items-center gap-3">
          <Image src="/tecno-logo.png" alt="Tecno Industries" width={140} height={40} className="object-contain brightness-0 invert" />
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-plus-jakarta-sans)", color: "#fff" }}>
            Admin Control <span style={{ display: "block", backgroundImage: "linear-gradient(135deg, hsl(24 85% 58%), hsl(32 90% 65%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Panel</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 55%)" }}>Secure access to management operations.</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-plus-jakarta-sans)", color: "#fff" }}>
              {isForgotMode ? "Reset Password" : "Welcome back"}
            </h2>
            <p className="text-sm" style={{ color: "hsl(0 0% 50%)" }}>
              {isForgotMode 
                ? "Enter your email to receive a secure reset link" 
                : "Sign in to access the admin dashboard"}
            </p>
          </div>

          {/* Success / Error Messages */}
          {error && <div className="p-3 rounded-xl text-sm bg-red-500/10 border border-red-500/30 text-red-500">{error}</div>}
          {success && <div className="p-3 rounded-xl text-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">{success}</div>}

          <form onSubmit={isForgotMode ? handleForgotPassword : handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium" style={{ color: "hsl(0 0% 70%)" }}>Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tecnoindustries.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-orange-500/50"
              />
            </div>

            {!isForgotMode && (
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium" style={{ color: "hsl(0 0% 70%)" }}>Password</label>
                  <button 
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    className="text-xs text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-orange-500/50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-xl font-semibold hover:brightness-110 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : isForgotMode ? "Send Reset Link" : "Sign in to Dashboard"}
            </button>

            {isForgotMode && (
              <button 
                type="button"
                onClick={() => setIsForgotMode(false)}
                className="w-full text-sm text-white/50 hover:text-white"
              >
                Back to Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
