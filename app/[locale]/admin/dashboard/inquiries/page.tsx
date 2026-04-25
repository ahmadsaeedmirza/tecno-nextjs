"use client";

import React, { useEffect, useState, useMemo } from "react";
import { adminFetch } from "@/lib/api-client";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Eye, 
  EyeOff,
  Loader2,
  Calendar,
  User,
  Mail,
  Phone,
  Globe,
  Building2,
  Package,
  Layers,
  X,
  Check,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSocket } from "@/hooks/use-socket";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  country: string;
  message: string;
  category: { name: string };
  product: { name: string };
  createdAt: string;
  isRead: boolean;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  
  // New States for Pagination & Month Filter
  const [selectedMonth, setSelectedMonth] = useState<string>("current");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const ITEMS_PER_PAGE = 25;

  const { toast } = useToast();
  const { socket } = useSocket();

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const res = await adminFetch("/api/v1/inquiries");
      setInquiries(res.data.data);
    } catch (err: any) {
      toast({
        title: "Error fetching inquiries",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Socket Listener for real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleNewInquiry = (newInquiry: Inquiry) => {
      setInquiries(prev => [newInquiry, ...prev]);
      toast({
        title: "New Inquiry Received!",
        description: `Inquiry from ${newInquiry.name} for ${newInquiry.product?.name || "Product"} has been added.`,
      });
    };

    socket.on("new-inquiry", handleNewInquiry);

    return () => {
      socket.off("new-inquiry", handleNewInquiry);
    };
  }, [socket, toast]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      await adminFetch(`/api/v1/inquiries/${deleteId}`, { method: "DELETE" });
      toast({ title: "Inquiry deleted" });
      fetchInquiries();
      setDeleteId(null);
    } catch (err: any) {
      toast({ title: "Deletion failed", description: err.message, variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleRead = async (inquiry: Inquiry) => {
    try {
      await adminFetch(`/api/v1/inquiries/${inquiry._id}`, {
        method: "PATCH",
        body: { isRead: !inquiry.isRead },
      });
      toast({
        title: inquiry.isRead ? "Marked as unread" : "Marked as read",
      });
      fetchInquiries();
    } catch (err: any) {
      toast({
        title: "Action failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    inquiries.forEach(i => {
      if (i.createdAt) months.add(format(new Date(i.createdAt), "yyyy-MM"));
    });
    return Array.from(months).sort().reverse();
  }, [inquiries]);

  const processedInquiries = useMemo(() => {
    let result = inquiries.filter(i => {
      const matchesSearch = 
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (i.product?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      let matchesMonth = true;
      if (selectedMonth !== "all") {
        const itemMonth = i.createdAt ? format(new Date(i.createdAt), "yyyy-MM") : "";
        const targetMonth = selectedMonth === "current" ? format(new Date(), "yyyy-MM") : selectedMonth;
        matchesMonth = itemMonth === targetMonth;
      }

      let matchesStatus = true;
      if (statusFilter === "read") matchesStatus = !!i.isRead;
      if (statusFilter === "unread") matchesStatus = !i.isRead;

      return matchesSearch && matchesMonth && matchesStatus;
    });

    // Sort descending by date
    result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return result;
  }, [inquiries, searchTerm, selectedMonth, statusFilter]);

  const totalPages = Math.ceil(processedInquiries.length / ITEMS_PER_PAGE) || 1;
  const paginatedInquiries = processedInquiries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMonth, statusFilter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Inquiries</h1>
          <p className="text-slate-500 mt-1">Manage customer leads and product queries</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, email, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none transition-all duration-200 focus:border-orange-200 focus:ring-4 focus:ring-orange-50"
          />
        </div>
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all duration-200 cursor-pointer min-w-[140px]"
        >
          <option value="all">All Status</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Product / Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        {selectedMonth !== "all" && processedInquiries.length === 0 && inquiries.length > 0 ? (
                           <>
                              <Calendar className="w-12 h-12 text-slate-200" />
                              <p className="text-slate-400 font-medium">No inquiries found for the selected month</p>
                           </>
                        ) : (
                           <>
                              <MessageSquare className="w-12 h-12 text-slate-200" />
                              <p className="text-slate-400 font-medium">No inquiries found</p>
                           </>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedInquiries.map((inquiry, i) => {
                    const currentMonthStr = format(new Date(inquiry.createdAt), "MMMM yyyy");
                    const prevMonthStr = i > 0 ? format(new Date(paginatedInquiries[i-1].createdAt), "MMMM yyyy") : null;
                    const showHeader = currentMonthStr !== prevMonthStr;

                    return (
                      <React.Fragment key={inquiry._id}>
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
                        <tr className={`hover:bg-slate-50/50 transition-colors group ${inquiry.isRead ? 'bg-white' : 'bg-orange-50/80'}`}>
                          <td className="px-6 py-4 relative">
                            {!inquiry.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />}
                            <div className="space-y-1">
                              <p className={`line-clamp-1 ${inquiry.isRead ? 'font-semibold text-slate-800' : 'font-black text-slate-950'}`}>{inquiry.name}</p>
                              <p className="text-xs text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {inquiry.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                                <Package className="w-3.5 h-3.5 text-orange-500" />
                                {inquiry.product?.name || "Unknown Product"}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                                <Layers className="w-3 h-3" />
                                {inquiry.category?.name || "Uncategorized"}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Calendar className="w-4 h-4 text-slate-300" />
                              {format(new Date(inquiry.createdAt), "MMM d, yyyy")}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2 whitespace-nowrap relative z-10">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInquiry(inquiry);
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View Message"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleRead(inquiry);
                                }}
                                className={`p-2 rounded-lg transition-colors ${inquiry.isRead ? 'text-slate-400 hover:bg-slate-100' : 'text-emerald-600 hover:bg-emerald-50'}`}
                                title={inquiry.isRead ? "Mark as Unread" : "Mark as Read"}
                              >
                                {inquiry.isRead ? <RotateCcw className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                              </button>
                              <button 
                                onClick={() => setDeleteId(inquiry._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const subject = `Re: Inquiry about ${inquiry.product?.name || "TECNO Instruments"}`;
                                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${inquiry.email}&su=${encodeURIComponent(subject)}`;
                                    
                                    try {
                                      navigator.clipboard.writeText(inquiry.email);
                                    } catch (err) {}
                                    
                                    window.open(gmailUrl, '_blank');

                                    toast({
                                      title: "Opening Gmail",
                                      description: `Redirecting to compose mail to ${inquiry.email}`,
                                    });
                                  }}
                                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                                  title="Copy Email & Reply"
                                >
                                  <Mail className="w-4 h-4" />
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

      {/* Inquiry Detail Modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-white">
            <DialogHeader className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <MessageSquare className="w-7 h-7 text-orange-600" />
                  Inquiry Details
                </DialogTitle>
              </div>
            </DialogHeader>

            {selectedInquiry && (
              <div className="p-6 sm:p-8 space-y-8 h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                      <User className="w-3 h-3" /> Customer Name
                    </p>
                    <p className="text-sm font-semibold text-slate-700">{selectedInquiry.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email Address
                    </p>
                    <p className="text-sm font-semibold text-slate-700">{selectedInquiry.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Phone Number
                    </p>
                    <p className="text-sm font-semibold text-slate-700">{selectedInquiry.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Country
                    </p>
                    <p className="text-sm font-semibold text-slate-700">{selectedInquiry.country}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> Company
                    </p>
                    <p className="text-sm font-semibold text-slate-700">{selectedInquiry.companyName || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Submitted On
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {format(new Date(selectedInquiry.createdAt), "PPP p")}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Categories & Products */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex-1 min-w-[140px]">
                    <p className="text-[9px] uppercase font-black text-orange-400 tracking-widest mb-1 flex items-center gap-1">
                      <Package className="w-3 h-3" /> Product Requested
                    </p>
                    <p className="text-sm font-bold text-orange-900">{selectedInquiry.product?.name}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex-1 min-w-[140px]">
                    <p className="text-[9px] uppercase font-black text-blue-400 tracking-widest mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> Category
                    </p>
                    <p className="text-sm font-bold text-blue-900">{selectedInquiry.category?.name}</p>
                  </div>
                </div>

                {/* Message Box */}
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Message Body</p>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                      "{selectedInquiry.message}"
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-slate-900 transition-colors mt-4"
                >
                  Close Inquiry
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        itemName="this inquiry"
        loading={isDeleting}
      />
    </div>
  );
}
