"use client";

import React, { useEffect, useState, useMemo } from "react";
import { adminFetch } from "@/lib/api-client";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Eye, 
  Package,
  Calendar,
  User,
  Mail,
  Star,
  StarHalf,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Truck,
  Layers,
  ShieldCheck,
  Clock,
  Loader2,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Feedback {
  _id: string;
  name: string;
  email: string;
  companyName?: string;
  country?: string;
  quality: number;
  packaging: number;
  reliability: number;
  onTime: number;
  shortage: number;
  damaged: number;
  averageRating: number;
  message: string;
  createdAt: string;
}

type FilterType = "all" | "positive" | "negative";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  
  // New States for Pagination & Month Filter
  const [selectedMonth, setSelectedMonth] = useState<string>("current");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;

  const { toast } = useToast();

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const res = await adminFetch("/api/v1/feedbacks");
      setFeedbacks(res.data.data);
    } catch (err: any) {
      toast({
        title: "Error fetching feedback",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await adminFetch(`/api/v1/feedbacks/${id}`, { method: "DELETE" });
      toast({ title: "Feedback deleted" });
      fetchFeedbacks();
    } catch (err: any) {
      toast({ title: "Deletion failed", description: err.message, variant: "destructive" });
    }
  };

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    feedbacks.forEach(f => {
      if (f.createdAt) months.add(format(new Date(f.createdAt), "yyyy-MM"));
    });
    return Array.from(months).sort().reverse();
  }, [feedbacks]);

  const processedFeedbacks = useMemo(() => {
    let result = feedbacks.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            f.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = true;
      if (filterType === "positive") matchesFilter = f.averageRating > 3;
      if (filterType === "negative") matchesFilter = f.averageRating <= 3;
      
      let matchesMonth = true;
      if (selectedMonth !== "all") {
        const itemMonth = f.createdAt ? format(new Date(f.createdAt), "yyyy-MM") : "";
        const targetMonth = selectedMonth === "current" ? format(new Date(), "yyyy-MM") : selectedMonth;
        matchesMonth = itemMonth === targetMonth;
      }

      return matchesSearch && matchesFilter && matchesMonth;
    });

    // Sort descending by date
    result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return result;
  }, [feedbacks, searchTerm, filterType, selectedMonth]);

  const totalPages = Math.ceil(processedFeedbacks.length / ITEMS_PER_PAGE) || 1;
  const paginatedFeedbacks = processedFeedbacks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, selectedMonth]);

  const RatingStars = ({ rating, size = "w-4 h-4" }: { rating: number, size?: string }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) return <Star key={i} className={`${size} fill-orange-500 text-orange-500`} />;
          if (i === fullStars && hasHalfStar) return <StarHalf key={i} className={`${size} fill-orange-500 text-orange-500`} />;
          return <Star key={i} className={`${size} text-slate-200`} />;
        })}
        <span className="ml-1.5 text-sm font-bold text-slate-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Customer Feedback</h1>
          <p className="text-slate-500 mt-1">Monitor satisfy, ratings, and customer testimonials</p>
        </div>
      </div>

      {/* Stats Summary */}
      {!isLoading && feedbacks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 group hover:border-orange-200 transition-all">
            <div className="p-4 bg-orange-50 rounded-xl text-orange-600 transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Average Satisfaction</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">
                  {(feedbacks.reduce((acc, f) => acc + f.averageRating, 0) / feedbacks.length).toFixed(1)}
                </span>
                <span className="text-sm text-slate-400">/ 5.0</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 group hover:border-blue-200 transition-all">
            <div className="p-4 bg-blue-50 rounded-xl text-blue-600 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Reviews</p>
              <p className="text-2xl font-bold text-slate-800">{feedbacks.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 group hover:border-green-200 transition-all">
            <div className="p-4 bg-green-50 rounded-xl text-green-600 transition-colors">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Field Breakdown</p>
              <p className="text-sm font-bold text-slate-800">Quality, Service, Delivery, Value</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none transition-all duration-200 focus:border-orange-200 focus:ring-4 focus:ring-orange-50"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
          className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all duration-200 cursor-pointer min-w-[160px]"
        >
          <option value="all">All Feedback</option>
          <option value="positive">Positive (Avg &gt; 3)</option>
          <option value="negative">Negative (Avg ≤ 3)</option>
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all duration-200 cursor-pointer min-w-[170px]"
        >
          <option value="current">Current Month</option>
          <option value="all">All Months</option>
          {availableMonths.map(m => {
            const date = parseISO(`${m}-01`);
            return (
              <option key={m} value={m}>
                {format(date, "MMMM yyyy")}
              </option>
            );
          })}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Overall Rating</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell text-center">Summary</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                         {selectedMonth !== "all" && processedFeedbacks.length === 0 && feedbacks.length > 0 ? (
                            <>
                              <Calendar className="w-12 h-12 text-slate-200" />
                              <p className="text-slate-400 font-medium">No feedback entries found for the selected month</p>
                            </>
                         ) : (
                            <>
                              <Star className="w-12 h-12 text-slate-200" />
                              <p className="text-slate-400 font-medium">No feedback entries found</p>
                            </>
                         )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedFeedbacks.map((f, i) => {
                    const currentMonthStr = format(new Date(f.createdAt), "MMMM yyyy");
                    const prevMonthStr = i > 0 ? format(new Date(paginatedFeedbacks[i-1].createdAt), "MMMM yyyy") : null;
                    const showHeader = currentMonthStr !== prevMonthStr;

                    return (
                      <React.Fragment key={f._id}>
                        {showHeader && (
                          <tr className="bg-orange-50/30 border-y border-orange-100/50">
                            <td colSpan={4} className="px-6 py-2.5">
                              <div className="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase tracking-widest">
                                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                                {currentMonthStr}
                              </div>
                            </td>
                          </tr>
                        )}
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <p className="font-semibold text-slate-800 line-clamp-1">{f.name}</p>
                              <p className="text-xs text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {f.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <RatingStars rating={f.averageRating} />
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell max-w-xs">
                            <p className="text-sm text-slate-500 line-clamp-1 italic">
                              "{f.message}"
                            </p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => setSelectedFeedback(f)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Feedback Breakdown"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(f._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Feedback"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Feedback Detail Modal */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-white">
            <DialogHeader className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Star className="w-7 h-7 text-orange-500 fill-orange-500" />
                  Feedback Breakdown
                </DialogTitle>
              </div>
            </DialogHeader>

            {selectedFeedback && (
              <div className="p-6 sm:p-8 space-y-8 h-[80vh] overflow-y-auto custom-scrollbar">
                {/* Customer Details */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedFeedback.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{selectedFeedback.name}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3.5 h-3.5" /> {selectedFeedback.email}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                      {selectedFeedback.companyName} | {selectedFeedback.country}
                    </p>
                  </div>
                  <div className="ml-auto text-right border-l border-slate-200 pl-4">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Overall Avg</p>
                    <div className="flex items-center gap-2">
                       <span className="text-2xl font-black text-orange-600">{selectedFeedback.averageRating.toFixed(1)}</span>
                       <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Star Breakdown */}
                <div className="space-y-4">
                   <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Detailed Ratings</h5>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Product Quality", value: selectedFeedback.quality, icon: Package, color: "orange" },
                        { label: "Packaging", value: selectedFeedback.packaging, icon: Layers, color: "blue" },
                        { label: "Reliability", value: selectedFeedback.reliability, icon: ShieldCheck, color: "purple" },
                        { label: "On-Time Delivery", value: selectedFeedback.onTime, icon: Clock, color: "green" },
                        { label: "Quantity Shortage", value: selectedFeedback.shortage, icon: Star, color: "red" },
                        { label: "Product Damage", value: selectedFeedback.damaged, icon: StarHalf, color: "rose" },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 border border-slate-100 rounded-2xl space-y-3 hover:border-slate-200 transition-colors">
                           <div className="flex items-center justify-between">
                             <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                             <span className="text-lg font-black text-slate-800">{item.value}/5</span>
                           </div>
                           <p className="text-xs font-bold text-slate-500 uppercase">{item.label}</p>
                           <RatingStars rating={item.value} size="w-3 h-3" />
                        </div>
                      ))}
                   </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                   <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Full Message</h5>
                   <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative">
                      <MessageSquare className="absolute top-4 right-4 w-12 h-12 text-slate-200/50" />
                      <p className="text-slate-700 leading-relaxed relative z-10 whitespace-pre-wrap italic">
                        "{selectedFeedback.message}"
                      </p>
                   </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-widest pt-4">
                   <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Submitted: {format(new Date(selectedFeedback.createdAt), "PPP")}
                   </div>
                   <button 
                    onClick={() => setSelectedFeedback(null)}
                    className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 transition-colors"
                   >
                     Done <ChevronRight className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
