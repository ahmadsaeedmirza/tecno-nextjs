"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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

      // Store JWT in localStorage for API requests
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(24 85% 18%) 0%, hsl(0 0% 6%) 60%, hsl(32 60% 12%) 100%)",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(24 85% 48% / 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(32 90% 55% / 0.1) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/tecno-logo.png"
            alt="Tecno Industries"
            width={140}
            height={40}
            className="object-contain brightness-0 invert"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Center copy */}
        <div className="relative z-10 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "hsl(24 85% 48% / 0.15)",
              border: "1px solid hsl(24 85% 48% / 0.3)",
              color: "hsl(24 85% 65%)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Admin Control Panel
          </div>
          <h1
            className="text-4xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-outfit)", color: "#fff" }}
          >
            Manage your
            <span
              style={{
                display: "block",
                backgroundImage: "linear-gradient(135deg, hsl(24 85% 58%), hsl(32 90% 65%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              operations
            </span>
            with ease.
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 55%)" }}>
            Full control over products, categories, and events.
            <br />
            Secure, fast, and built for administrators only.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Products", "Categories", "Events"].map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "hsl(0 0% 100% / 0.05)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  color: "hsl(0 0% 70%)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer text */}
        <div className="relative z-10">
          <p className="text-xs" style={{ color: "hsl(0 0% 30%)" }}>
            © {new Date().getFullYear()} Tecno Industries. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-2">
            <Image
              src="/tecno-logo.png"
              alt="Tecno Industries"
              width={120}
              height={36}
              className="object-contain brightness-0 invert"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-outfit)", color: "#fff" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "hsl(0 0% 50%)" }}>
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
              style={{
                background: "hsl(0 72% 51% / 0.1)",
                border: "1px solid hsl(0 72% 51% / 0.3)",
                color: "hsl(0 72% 65%)",
              }}
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium"
                style={{ color: "hsl(0 0% 70%)" }}
              >
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tecnoindustries.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-[hsl(0,0%,30%)]"
                style={{
                  background: "hsl(0 0% 100% / 0.05)",
                  border: "1px solid hsl(0 0% 100% / 0.1)",
                  color: "#fff",
                  boxShadow: "none",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid hsl(24 85% 48% / 0.6)";
                  e.target.style.boxShadow = "0 0 0 3px hsl(24 85% 48% / 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid hsl(0 0% 100% / 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium"
                style={{ color: "hsl(0 0% 70%)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-[hsl(0,0%,30%)]"
                  style={{
                    background: "hsl(0 0% 100% / 0.05)",
                    border: "1px solid hsl(0 0% 100% / 0.1)",
                    color: "#fff",
                    boxShadow: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid hsl(24 85% 48% / 0.6)";
                    e.target.style.boxShadow = "0 0 0 3px hsl(24 85% 48% / 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid hsl(0 0% 100% / 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: "hsl(0 0% 40%)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(24 85% 48%), hsl(32 90% 55%))",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.target as HTMLButtonElement).style.filter = "brightness(1.1)";
                  (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
                  (e.target as HTMLButtonElement).style.boxShadow =
                    "0 8px 30px hsl(24 85% 48% / 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.filter = "none";
                (e.target as HTMLButtonElement).style.transform = "none";
                (e.target as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>

          {/* Divider hint */}
          <p className="text-center text-xs" style={{ color: "hsl(0 0% 28%)" }}>
            This panel is restricted to authorised administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
