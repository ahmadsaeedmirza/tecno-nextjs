"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api-client";
import { 
  Calendar, 
  Plus, 
  Search, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit,
  Loader2,
  MapPin,
  Upload,
  X,
  Calendar as CalendarIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  _id: string;
  name: string;
  description: string;
  isHidden: string;
  imageCover: string;
  date: string;
  StallNo?: string;
  slug: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    StallNo: "",
    imageCover: null as File | null,
  });

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await adminFetch("/api/v1/events");
      setEvents(res.data.data);
    } catch (err: any) {
      toast({
        title: "Error fetching events",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("date", formData.date);
      if (formData.StallNo) data.append("StallNo", formData.StallNo);
      if (formData.imageCover) data.append("imageCover", formData.imageCover);

      await adminFetch("/api/v1/events", {
        method: "POST",
        body: data,
      });

      toast({ title: "Success", description: "Event created successfully!" });
      setIsAddModalOpen(false);
      setFormData({ name: "", description: "", date: "", StallNo: "", imageCover: null });
      fetchEvents();
    } catch (err: any) {
      toast({ title: "Creation failed", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleHide = async (event: Event) => {
    const newStatus = event.isHidden === "true" ? "false" : "true";
    try {
      await adminFetch(`/api/v1/events/${event._id}`, {
        method: "PATCH",
        body: { isHidden: newStatus },
      });
      toast({
        title: `Event ${newStatus === "true" ? "hidden" : "visible"}`,
        description: `${event.name} has been updated.`,
      });
      fetchEvents();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Action failed",
        description: err.message,
      });
    }
  };

  const handleDelete = async (event: Event) => {
    if (!confirm(`Are you sure you want to delete ${event.name}?`)) return;
    
    try {
      await adminFetch(`/api/v1/events/${event._id}`, {
        method: "DELETE",
      });
      toast({
        title: "Event deleted",
        description: `${event.name} has been removed.`,
      });
      fetchEvents();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: err.message,
      });
    }
  };

  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Events</h1>
          <p className="text-slate-500 mt-1">Manage exhibitions, trade shows, and company events</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-2 px-6 py-3 gradient-button text-sm whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Add New Event
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
            <div className="bg-white p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-orange-600" />
                  Add New Event
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAddSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Event Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Arab Health 2026"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Date</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Stall Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B-40"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                      value={formData.StallNo}
                      onChange={(e) => setFormData({...formData, StallNo: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Enter event details..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Cover Image</label>
                  <div className="relative group cursor-pointer">
                    <input 
                      required={!formData.imageCover}
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFormData({...formData, imageCover: e.target.files?.[0] || null})}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className={`
                      w-full py-6 px-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2
                      ${formData.imageCover ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-slate-50 group-hover:border-orange-300 group-hover:bg-white"}
                    `}>
                      <Upload className={`w-6 h-6 ${formData.imageCover ? "text-orange-600" : "text-slate-400"}`} />
                      <p className={`text-xs font-medium ${formData.imageCover ? "text-orange-700" : "text-slate-500"}`}>
                        {formData.imageCover ? formData.imageCover.name : "Click to upload event banner"}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 gradient-button font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-lg shadow-orange-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Event...
                    </>
                  ) : (
                    "Create Event"
                  )}
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none transition-all duration-200 focus:border-orange-200 focus:ring-4 focus:ring-orange-50"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Date & Venue</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Calendar className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-400 font-medium">No events found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => (
                    <tr key={event._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                            <Image 
                              src={event.imageCover ? (event.imageCover.startsWith('http') ? event.imageCover : `http://localhost:8000/img/events/${event.imageCover}`) : 'https://placehold.co/100x100?text=Event'}
                              alt={event.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1">{event.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-700">
                            {format(new Date(event.date), "PPP")}
                          </p>
                          {event.StallNo && (
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <MapPin className="w-3 h-3" />
                              Stall: {event.StallNo}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${event.isHidden === "true" ? "bg-amber-400" : "bg-emerald-500"}`} />
                          <span className={`text-xs font-semibold ${event.isHidden === "true" ? "text-amber-600" : "text-emerald-700"}`}>
                            {event.isHidden === "true" ? "Hidden" : "Public"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleToggleHide(event)}
                            className={`p-2 rounded-lg transition-colors ${event.isHidden === "true" ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50"}`}
                            title={event.isHidden === "true" ? "Show Event" : "Hide Event"}
                          >
                            {event.isHidden === "true" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(event)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
