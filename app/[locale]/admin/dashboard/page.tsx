"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to products by default
    router.push("/admin/dashboard/products");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse">Loading dashboard charts...</p>
    </div>
  );
}
