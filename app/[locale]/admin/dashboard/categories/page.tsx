"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api-client";
import {
  Layers,
  Plus,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Loader2,
  Upload,
  X,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Category {
  _id: string;
  name: string;
  description: string;
  isHidden: string;
  isFeatured: string;
  imageCover: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageCover: null as File | null,
  });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await adminFetch("/api/v1/categories");
      setCategories(res.data.data);
    } catch (err: any) {
      toast({
        title: "Error fetching categories",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.imageCover) data.append("imageCover", formData.imageCover);

      if (editingId) {
        await adminFetch(`/api/v1/categories/${editingId}`, {
          method: "PATCH",
          body: data,
        });
        toast({
          title: "Success",
          description: "Category updated successfully!",
        });
      } else {
        await adminFetch("/api/v1/categories", {
          method: "POST",
          body: data,
        });
        toast({
          title: "Success",
          description: "Category created successfully!",
        });
      }

      setIsAddModalOpen(false);
      setEditingId(null);
      setFormData({ name: "", description: "", imageCover: null });
      fetchCategories();
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

  const openEditModal = (category: Category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name || "",
      description: category.description || "",
      imageCover: null,
    });
    setIsAddModalOpen(true);
  };

  const closeAndResetModal = (isOpen: boolean) => {
    setIsAddModalOpen(isOpen);
    if (!isOpen) {
      setEditingId(null);
      setFormData({ name: "", description: "", imageCover: null });
    }
  };

  const handleToggleHide = async (category: Category) => {
    const newStatus = category.isHidden === "true" ? "false" : "true";
    try {
      await adminFetch(`/api/v1/categories/${category._id}`, {
        method: "PATCH",
        body: { isHidden: newStatus },
      });
      toast({
        title: `Category ${newStatus === "true" ? "hidden" : "visible"}`,
        description: `${category.name} has been updated.`,
      });
      fetchCategories();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Action failed",
        description: err.message,
      });
    }
  };

  const handleToggleFeature = async (category: Category) => {
    const newStatus = category.isFeatured === "true" ? "false" : "true";

    // Enforce limit of 4 featured categories
    if (newStatus === "true") {
      const featuredCount = categories.filter((c) => c.isFeatured === "true").length;
      if (featuredCount >= 4) {
        toast({
          title: "Limit reached",
          description: "You can only have a maximum of 4 featured categories.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await adminFetch(`/api/v1/categories/${category._id}`, {
        method: "PATCH",
        body: { isFeatured: newStatus },
      });
      toast({
        title: `Category ${newStatus === "true" ? "featured" : "unfeatured"}`,
        description: `${category.name} has been updated.`,
      });
      fetchCategories();
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
      await adminFetch(`/api/v1/categories/${deleteId}`, {
        method: "DELETE",
      });
      toast({
        title: "Category deleted",
        description: "The category has been removed.",
      });
      fetchCategories();
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

  const filteredCategories = categories.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = showOnlyFeatured ? c.isFeatured === "true" : true;
    return matchesSearch && matchesFeatured;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Categories</h1>
          <p className="text-slate-500 mt-1">
            Organize your products into logical groups
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={closeAndResetModal}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 gradient-button text-sm whitespace-nowrap"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", description: "", imageCover: null });
              }}
            >
              <Plus className="w-4 h-4" />
              Add New Category
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
            <div className="bg-white p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-orange-600" />
                  {editingId ? "Edit Category" : "Add New Category"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAddSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Category Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Industrial Tools"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter category description..."
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
                          : "Click to upload category image"}
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
                        ? "Updating Category..."
                        : "Creating Category..."}
                    </>
                  ) : editingId ? (
                    "Update Category"
                  ) : (
                    "Create Category"
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
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none transition-all duration-200 focus:border-orange-200 focus:ring-4 focus:ring-orange-50"
          />
        </div>

        <button
          onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 font-semibold text-sm whitespace-nowrap ${
            showOnlyFeatured
              ? "bg-orange-50 border-orange-200 text-orange-600 shadow-sm shadow-orange-100"
              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <Star className={`w-4 h-4 ${showOnlyFeatured ? "fill-orange-600" : ""}`} />
          {showOnlyFeatured ? "Showing Featured" : "Show Featured"}
        </button>
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Category
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
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Layers className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-400 font-medium">
                          No categories found
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                            <Image
                              src={
                                category.imageCover
                                  ? category.imageCover.startsWith("http")
                                    ? category.imageCover
                                    : `/categories/${category.imageCover}`
                                  : "https://placehold.co/100x100?text=Category"
                              }
                              alt={category.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1">
                              {category.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell max-w-xs">
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {category.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${category.isHidden === "true" ? "bg-amber-400" : "bg-emerald-500"}`}
                            />
                            <span
                              className={`text-xs font-semibold ${category.isHidden === "true" ? "text-amber-600" : "text-emerald-700"}`}
                            >
                              {category.isHidden === "true" ? "Hidden" : "Public"}
                            </span>
                          </div>
                          {category.isFeatured === "true" && (
                            <div className="flex items-center gap-1.5">
                              <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleToggleFeature(category)}
                            className={`p-2 rounded-lg transition-colors ${category.isFeatured === "true" ? "text-orange-600 hover:bg-orange-50" : "text-slate-400 hover:text-orange-500 hover:bg-slate-50"}`}
                            title={
                              category.isFeatured === "true"
                                ? "Unfeature Category"
                                : "Feature Category"
                            }
                          >
                            <Star className={`w-4 h-4 ${category.isFeatured === "true" ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={() => handleToggleHide(category)}
                            className={`p-2 rounded-lg transition-colors ${category.isHidden === "true" ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50"}`}
                            title={
                              category.isHidden === "true"
                                ? "Show Category"
                                : "Hide Category"
                            }
                          >
                            {category.isHidden === "true" ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Category"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(category._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Category"
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
        itemName={categories.find(c => c._id === deleteId)?.name || "this category"}
        loading={isDeleting}
      />
    </div>
  );
}
