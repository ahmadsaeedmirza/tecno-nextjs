"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api-client";
import {
  Package,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  ExternalLink,
  Loader2,
  X,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
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
}

interface Product {
  _id: string;
  name: string;
  code?: string;
  description: string;
  isHidden: string;
  imageCover: string;
  catagory?: Category;
  slug: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    catagory: "",
    imageCover: null as File | null,
  });

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        adminFetch("/api/v1/products"),
        adminFetch("/api/v1/catagories"),
      ]);
      setProducts(productsRes.data.data);
      setCategories(categoriesRes.data.data);
    } catch (err: any) {
      toast({
        title: "Error loading data",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.code) data.append("code", formData.code);
      if (formData.catagory) data.append("catagory", formData.catagory);
      if (formData.imageCover) data.append("imageCover", formData.imageCover);

      if (editingId) {
        await adminFetch(`/api/v1/products/${editingId}`, {
          method: "PATCH",
          body: data,
        });
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
      } else {
        await adminFetch("/api/v1/products", {
          method: "POST",
          body: data,
        });
        toast({
          title: "Success",
          description: "Product created successfully!",
        });
      }

      setIsAddModalOpen(false);
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        code: "",
        catagory: "",
        imageCover: null,
      });
      fetchInitialData();
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

  const openEditModal = (product: Product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      code: product.code || "",
      catagory: product.catagory?._id || "",
      imageCover: null,
    });
    setIsAddModalOpen(true);
  };

  const closeAndResetModal = (isOpen: boolean) => {
    setIsAddModalOpen(isOpen);
    if (!isOpen) {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        code: "",
        catagory: "",
        imageCover: null,
      });
    }
  };

  const handleToggleHide = async (product: Product) => {
    const newStatus = product.isHidden === "true" ? "false" : "true";
    try {
      await adminFetch(`/api/v1/products/${product._id}`, {
        method: "PATCH",
        body: { isHidden: newStatus },
      });
      toast({
        title: `Product ${newStatus === "true" ? "hidden" : "visible"}`,
        description: `${product.name} has been updated.`,
      });
      fetchInitialData();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Action failed",
        description: err.message,
      });
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;

    try {
      await adminFetch(`/api/v1/products/${product._id}`, {
        method: "DELETE",
      });
      toast({
        title: "Product deleted",
        description: `${product.name} has been removed.`,
      });
      fetchInitialData();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: err.message,
      });
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>
          <p className="text-slate-500 mt-1">
            Manage and update your inventory
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={closeAndResetModal}>
          <DialogTrigger asChild>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 gradient-button text-sm whitespace-nowrap"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  description: "",
                  code: "",
                  catagory: "",
                  imageCover: null,
                });
              }}
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
            <div className="bg-white p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Package className="w-6 h-6 text-orange-600" />
                  {editingId ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAddSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Product Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Industrial Drill X1"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Product Code
                    </label>
                    <input
                      type="text"
                      placeholder="TEC-123"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Category
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-50 text-sm appearance-none"
                      value={formData.catagory}
                      onChange={(e) =>
                        setFormData({ ...formData, catagory: e.target.value })
                      }
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter detailed product description..."
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
                          : "Click to upload product image"}
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
                        ? "Updating Product..."
                        : "Creating Product..."}
                    </>
                  ) : editingId ? (
                    "Update Product"
                  ) : (
                    "Create Product"
                  )}
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Search products by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none transition-all duration-200 focus:border-orange-200 focus:ring-4 focus:ring-orange-50"
          />
        </div>
      </div>

      {/* Products Table */}
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
                    Product
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                    Category
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
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="w-12 h-12 text-slate-200" />
                        <p className="text-slate-400 font-medium">
                          No products found
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                            <Image
                              src={
                                product.imageCover
                                  ? product.imageCover.startsWith("http")
                                    ? product.imageCover
                                    : `/products/${product.imageCover}`
                                  : "https://placehold.co/100x100?text=Product"
                              }
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {product.code || "No code"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {product.catagory?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${product.isHidden === "true" ? "bg-amber-400" : "bg-emerald-500"}`}
                          />
                          <span
                            className={`text-xs font-semibold ${product.isHidden === "true" ? "text-amber-600" : "text-emerald-700"}`}
                          >
                            {product.isHidden === "true" ? "Hidden" : "Public"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleToggleHide(product)}
                            className={`p-2 rounded-lg transition-colors ${product.isHidden === "true" ? "text-emerald-600 hover:bg-emerald-50" : "text-amber-600 hover:bg-amber-50"}`}
                            title={
                              product.isHidden === "true"
                                ? "Show Product"
                                : "Hide Product"
                            }
                          >
                            {product.isHidden === "true" ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
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
