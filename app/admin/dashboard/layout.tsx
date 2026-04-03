"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Calendar, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  MessageSquare,
  ClipboardList
} from "lucide-react";
import Image from "next/image";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Basic auth check
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  if (!isMounted) return null;

  const navItems = [
    { name: "Products", href: "/admin/dashboard/products", icon: Package },
    { name: "Categories", href: "/admin/dashboard/categories", icon: Layers },
    { name: "Events", href: "/admin/dashboard/events", icon: Calendar },
    { name: "Inquiries", href: "/admin/dashboard/inquiries", icon: ClipboardList },
    { name: "Feedback", href: "/admin/dashboard/feedback", icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">Admin Panel</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? "bg-orange-50 text-orange-600 font-semibold shadow-sm shadow-orange-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Admin</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Super Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <span className="text-sm font-bold text-slate-600">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
