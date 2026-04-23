"use client";

import React, { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api-client";
import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import { 
  Package, 
  Layers, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  Star,
  Activity,
  ArrowRight,
  Loader2,
  TrendingUp,
  Award
} from "lucide-react";
import { useSocket } from "@/hooks/use-socket";

export default function AdminDashboardOverview() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [prodRes, catRes, evRes, inqRes, fbRes] = await Promise.all([
          adminFetch("/api/v1/products?limit=10000"),
          adminFetch("/api/v1/categories?limit=1000"),
          adminFetch("/api/v1/events?limit=500"),
          adminFetch("/api/v1/inquiries?limit=5000"),
          adminFetch("/api/v1/feedbacks?limit=5000")
        ]);

        const products = prodRes.data.data || [];
        const categories = catRes.data.data || [];
        const events = evRes.data.data || [];
        const inquiries = inqRes.data.data || [];
        const feedbacks = fbRes.data.data || [];

        // Process Feedback Data
        const avgRating = feedbacks.length 
          ? (feedbacks.reduce((sum: number, f: any) => sum + (f.averageRating || 0), 0) / feedbacks.length).toFixed(1)
          : "N/A";

        // Process Inquiry Trends
        const categoryCounts: Record<string, number> = {};
        const productCounts: Record<string, number> = {};
        
        inquiries.forEach((inq: any) => {
          if (inq.category?.name) {
            categoryCounts[inq.category.name] = (categoryCounts[inq.category.name] || 0) + 1;
          }
          if (inq.product?.name) {
            productCounts[inq.product.name] = (productCounts[inq.product.name] || 0) + 1;
          }
        });

        const topCategories = Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);
          
        const topProducts = Object.entries(productCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4);

        // Sort Recent Activity
        const recentInquiries = [...inquiries]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
          
        const recentFeedbacks = [...feedbacks]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        setData({
          counts: {
            products: products.length,
            categories: categories.length,
            events: events.length,
            inquiries: inquiries.length,
            feedbacks: feedbacks.length,
            avgRating
          },
          categoryCounts, // Store full mapping for real-time updates
          productCounts,  // Store full mapping for real-time updates
          topCategories,
          topProducts,
          recentInquiries,
          recentFeedbacks
        });
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // Socket Listeners for Real-Time Updates
  useEffect(() => {
    if (!socket) return;

    const handleNewInquiry = (inquiry: any) => {
      setData((prev: any) => {
        if (!prev) return prev;
        
        // 1. Update full counts
        const newProdName = inquiry.product?.name;
        const newCatName = inquiry.category?.name;
        
        const updatedProdCounts = { ...prev.productCounts };
        if (newProdName) {
          updatedProdCounts[newProdName] = (updatedProdCounts[newProdName] || 0) + 1;
        }

        const updatedCatCounts = { ...prev.categoryCounts };
        if (newCatName) {
          updatedCatCounts[newCatName] = (updatedCatCounts[newCatName] || 0) + 1;
        }

        // 2. Re-calculate top lists
        const newTopProducts = Object.entries(updatedProdCounts)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 4);

        const newTopCategories = Object.entries(updatedCatCounts)
          .sort((a: any, b: any) => b[1] - a[1])
          .slice(0, 4);

        return {
          ...prev,
          counts: {
            ...prev.counts,
            inquiries: prev.counts.inquiries + 1
          },
          productCounts: updatedProdCounts,
          categoryCounts: updatedCatCounts,
          topProducts: newTopProducts,
          topCategories: newTopCategories,
          recentInquiries: [inquiry, ...prev.recentInquiries].slice(0, 5)
        };
      });
    };

    const handleNewFeedback = (feedback: any) => {
      setData((prev: any) => {
        if (!prev) return prev;
        const newTotal = prev.counts.feedbacks + 1;
        return {
          ...prev,
          counts: {
            ...prev.counts,
            feedbacks: newTotal
          },
          recentFeedbacks: [feedback, ...prev.recentFeedbacks].slice(0, 5)
        };
      });
    };

    socket.on("new-inquiry", handleNewInquiry);
    socket.on("new-feedback", handleNewFeedback);

    return () => {
      socket.off("new-inquiry", handleNewInquiry);
      socket.off("new-feedback", handleNewFeedback);
    };
  }, [socket]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard overview...</p>
      </div>
    );
  }

  if (!data) return <div className="text-red-500">Failed to load dashboard data.</div>;

  const statCards = [
    { label: "Total Products", value: data.counts.products, icon: Package, color: "blue", href: "/admin/dashboard/products" },
    { label: "Total Categories", value: data.counts.categories, icon: Layers, color: "indigo", href: "/admin/dashboard/categories" },
    { label: "Active Events", value: data.counts.events, icon: Calendar, color: "purple", href: "/admin/dashboard/events" },
    { label: "Total Inquiries", value: data.counts.inquiries, icon: ClipboardList, color: "orange", href: "/admin/dashboard/inquiries" },
    { label: "Feedback Responses", value: data.counts.feedbacks, icon: MessageSquare, color: "green", href: "/admin/dashboard/feedback" },
    { label: "Avg Customer Rating", value: data.counts.avgRating, icon: Star, color: "yellow", isRating: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Activity className="w-8 h-8 text-orange-600" />
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">High-level statistics and recent activity for your catalog</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          stat.href ? (
            <Link 
              key={idx} 
              href={stat.href}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 group hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className={`p-4 bg-${stat.color}-50 rounded-xl text-${stat.color}-600 transition-colors group-hover:scale-110 duration-300 ease-out`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-end justify-between">
                  {stat.isRating ? (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-3xl font-black text-slate-800">{stat.value}</span>
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mb-1" />
                    </div>
                  ) : (
                    <p className="text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ) : (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 group">
              <div className={`p-4 bg-${stat.color}-50 rounded-xl text-${stat.color}-600`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-800">{stat.value}</span>
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mb-1" />
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Middle Section: Trending Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-slate-800">Top Requested Products</h3>
          </div>
          <div className="p-2">
            {data.topProducts.length > 0 ? (
              data.topProducts.map(([name, count]: any, i: number) => (
                <div key={name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-xl gap-2">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm">
                        #{i + 1}
                      </div>
                      <span className="font-semibold text-slate-700">{name}</span>
                   </div>
                   <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider whitespace-nowrap">
                      {count} {count === 1 ? 'Inquiry' : 'Inquiries'}
                   </span>
                </div>
              ))
            ) : (
               <div className="p-8 text-center text-slate-400 font-medium">No inquiry data available</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-800">Most Popular Categories</h3>
          </div>
          <div className="p-2">
            {data.topCategories.length > 0 ? (
              data.topCategories.map(([name, count]: any, i: number) => (
                <div key={name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-xl gap-2">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                        #{i + 1}
                      </div>
                      <span className="font-semibold text-slate-700">{name}</span>
                   </div>
                   <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider whitespace-nowrap">
                      {count} {count === 1 ? 'Inquiry' : 'Inquiries'}
                   </span>
                </div>
              ))
            ) : (
               <div className="p-8 text-center text-slate-400 font-medium">No inquiry data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800">Recent Inquiries</h3>
            </div>
            <Link href="/admin/dashboard/inquiries" className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {data.recentInquiries.length > 0 ? (
              data.recentInquiries.map((inq: any) => (
                <div key={inq._id} className="p-5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <p className="font-bold text-slate-800 line-clamp-1">{inq.name}</p>
                    <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">
                      {format(new Date(inq.createdAt), "MMM d")}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 italic mb-3">"{inq.message}"</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded">
                      {inq.product?.name || "Product"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
               <div className="p-10 text-center text-slate-400 font-medium">No recent inquiries</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-slate-800">Recent Feedbacks</h3>
            </div>
            <Link href="/admin/dashboard/feedback" className="text-xs font-bold text-green-600 hover:text-green-700 uppercase tracking-wider">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
             {data.recentFeedbacks.length > 0 ? (
              data.recentFeedbacks.map((fb: any) => (
                <div key={fb._id} className="p-5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <p className="font-bold text-slate-800 line-clamp-1">{fb.name}</p>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded text-yellow-700 font-bold text-xs">
                      {fb.averageRating} <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 italic mb-3">"{fb.message}"</p>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {format(new Date(fb.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              ))
            ) : (
               <div className="p-10 text-center text-slate-400 font-medium">No recent feedbacks</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
