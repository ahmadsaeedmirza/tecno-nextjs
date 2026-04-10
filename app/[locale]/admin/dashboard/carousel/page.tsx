"use client";

import { useEffect, useState } from "react";
import { adminFetch, API_BASE_URL } from "@/lib/api-client";
import { encodeUrlPathSegments } from "@/lib/utils";
import {
  MonitorPlay,
  Plus,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Loader2,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CarouselItem {
  _id: string;
  title: string;
  description: string;
  isHidden: string;
  imageCover: string;
  createdAt: string;
}

export default function AdminCarouselPage() {
  const [carousels, setCarousels] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageCover: null as File | null,
  });

  const fetchCarousels = async () => {
    try {
      setIsLoading(true);
      const res = await adminFetch("/api/v1/carousels?limit=100&sort=-createdAt");
      setCarousels(res.data.data || []);
    } catch (err: any) {
      toast({
        title: "Error fetching carousels",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.imageCover) data.append("imageCover", formData.imageCover);

      if (editingId) {
        await adminFetch(`/api/v1/carousels/${editingId}`, {
          method: "PATCH",
          body: data,
        });
        toast({
          title: "Success",
          description: "Carousel slide updated successfully!",
        });
      } else {
        await adminFetch("/api/v1/carousels", {
          method: "POST",
          body: data,
        });
        toast({
          title: "Success",
          description: "Carousel slide created successfully!",
        });
      }

      setIsAddModalOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", imageCover: null });
      fetchCarousels();
    } catch (err: any) {
      toast({
        title: editingId ? "Update failed" : "Creation failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (carousel: CarouselItem) => {
    setEditingId(carousel._id);
    setFormData({
      title: carousel.title || "",
      description: carousel.description || "",
      imageCover: null,
    });
    setIsAddModalOpen(true);
  };

  const closeAndResetModal = (isOpen: boolean) => {
    setIsAddModalOpen(isOpen);
    if (!isOpen) {
      setEditingId(null);
      setFormData({ title: "", description: "", imageCover: null });
    }
  };

  const handleToggleHide = async (carousel: CarouselItem) => {
    const newStatus = carousel.isHidden === "true" ? "false" : "true";
    try {
      await adminFetch(`/api/v1/carousels/${carousel._id}`, {
        method: "PATCH",
        body: { isHidden: newStatus },
      });
      toast({
        title: `Slide ${newStatus === "true" ? "hidden" : "visible"}`,
        description: `${carousel.title} has been updated.`,
      });
      fetchCarousels();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Action failed",
        description: err.message,
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      await adminFetch(`/api/v1/carousels/${deleteId}`, {
        method: "DELETE",
      });
      toast({
        title: "Slide deleted",
        description: "The carousel slide has been removed.",
      });
      fetchCarousels();
      setDeleteId(null);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: err.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCarousels = carousels.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hero Carousel</h1>
          <p className="text-slate-500 mt-1">
            Manage the hero slides appearing on the homepage marquee
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={closeAndResetModal}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 gradient-button text-sm whitespace-nowrap"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", description: "", imageCover: null });
              }}
            >
              <Plus className="w-4 h-4" />
              Add New Slide
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
            <div className="bg-white p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <MonitorPlay className="w-6 h-6 text-orange-600" />
                  {editingId ? "Edit Slide" : "Add New Slide"}
                </DialogTitle>
                <DialogDescription className="text-slate-500">
                  {editingId ? "Update the details of your hero slide." : "Fill in the details to add a new slide to your homepage marquee."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Slide Title
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Premium Manufacturing"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Subtitle / Description
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Enter slide subtitle..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Cover Image
                  </label>
                  <div className="relative group cursor-pointer">
                    <input
                      required={!editingId && !formData.imageCover}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          imageCover: e.target.files?.[0] || null,
                        })
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className={`
                      w-full py-6 px-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2
                      ${formData.imageCover ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-slate-50 group-hover:border-orange-300 group-hover:bg-white"}
                    `}
                    >
                      <Upload
                        className={`w-6 h-6 ${formData.imageCover ? "text-orange-600" : "text-slate-400"}`}
                      />
                      <p
                        className={`text-xs font-medium ${formData.imageCover ? "text-orange-700" : "text-slate-500"}`}
                      >
                        {formData.imageCover
                          ? formData.imageCover.name
                          : "Click to upload slide image"}
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
                      {editingId
                        ? "Updating Slide..."
                        : "Creating Slide..."}
                    </>
                  ) : editingId ? (
                    "Update Slide"
                  ) : (
                    "Create Slide"
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
            placeholder="Search slides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none transition-all duration-200 focus:border-orange-200 focus:ring-4 focus:ring-orange-50"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Slide
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCarousels.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <MonitorPlay className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-400 font-medium">
                          No slides found
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCarousels.map((carousel) => (
                    <tr
                      key={carousel._id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                            <Image
                              src={
                                carousel.imageCover
                                  ? carousel.imageCover.startsWith("http")
                                    ? carousel.imageCover
                                    : encodeUrlPathSegments(`${API_BASE_URL}/carousels/${carousel.imageCover}`)
                                  : "https://placehold.co/200x100?text=Slide"
                              }
                              alt={carousel.title}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1 w-48">
                              {carousel.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell max-w-xs">
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {carousel.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${carousel.isHidden === "true" ? "bg-amber-400" : "bg-emerald-500"}`}
                            />
                            <span
                              className={`text-xs font-semibold ${carousel.isHidden === "true" ? "text-amber-600" : "text-emerald-700"}`}
                            >
                              {carousel.isHidden === "true" ? "Hidden" : "Active"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleToggleHide(carousel)}
                            className={`p-2 rounded-lg transition-colors ${carousel.isHidden === "true" ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50"}`}
                            title={
                              carousel.isHidden === "true"
                                ? "Show Slide"
                                : "Hide Slide"
                            }
                          >
                            {carousel.isHidden === "true" ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditModal(carousel)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Slide"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(carousel._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Slide"
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
      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        itemName={carousels.find(c => c._id === deleteId)?.title || "this slide"}
        loading={isDeleting}
      />
    </div>
  );
}
