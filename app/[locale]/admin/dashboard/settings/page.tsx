"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, KeyRound, ShieldCheck, Lock } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast({
        title: "Error",
        description: "New passwords do not match!",
        variant: "destructive",
      });
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/users/updatePassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      // Update token if returned
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }

      toast({
        title: "Success",
        description: "Password updated successfully!",
      });

      setFormData({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionReveal>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-2">Manage your admin account and security settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
                  <p className="text-sm text-slate-500">Update your account password regularly.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Current Password</label>
                  <input
                    type="password"
                    required
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">New Password</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min 8 characters"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tips Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8">
              <ShieldCheck className="w-10 h-10 text-orange-400 mb-6" />
              <h3 className="text-lg font-bold mb-3">Security Tips</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  Use a combination of letters, numbers, and symbols.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  Avoid reusing passwords from other websites.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  Don't share your password with anyone.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
