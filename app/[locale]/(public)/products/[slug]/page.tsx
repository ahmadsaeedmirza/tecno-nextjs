"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { API_BASE_URL, publicFetch } from "@/lib/api-client";
import { encodeUrlPathSegments } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

type BackendProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  code?: string;
  tip?: string[];
  size?: string[];
  imageCover: string;
  isHidden?: "true" | "false" | boolean;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
};

type ApiOneResponse<T> = {
  status: string;
  data?: {
    data?: T;
  };
};

type ApiListResponse<T> = {
  status: string;
  data?: {
    data?: T[];
  };
};

const ProductDetail = () => {
  const t = useTranslations("Products");
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) {
        setProduct(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = (await publicFetch(
          `/api/v1/products/slug/${encodeURIComponent(slug)}`,
        )) as ApiOneResponse<BackendProduct>;

        const found = res?.data?.data ?? null;
        if (!cancelled) setProduct(found);
      } catch {
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const features = useMemo(() => {
    const items = [...(product?.tip ?? []), ...(product?.size ?? [])]
      .map((s) => (typeof s === "string" ? s.trim() : ""))
      .filter(Boolean);
    return Array.from(new Set(items));
  }, [product]);

  const imageSrc = useMemo(() => {
    if (!product?.imageCover) return "/products/dummy.jpg";
    return encodeUrlPathSegments(
      `${API_BASE_URL}/products/${product.imageCover}`,
    );
  }, [product]);

  const categoryName = product?.category?.name || "";
  const categorySlug = product?.category?.slug || "";
  const categoryId = product?.category?._id || "";

  const contactHref = useMemo(() => {
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId);
    if (product?._id) params.set("product", product._id);
    const qs = params.toString();
    return `/contact${qs ? `?${qs}` : ""}`;
  }, [categoryId, product?._id]);

  useEffect(() => {
    let cancelled = false;

    async function loadRelated() {
      if (!product?._id || !categorySlug) {
        setRelatedProducts([]);
        return;
      }

      try {
        const res = (await publicFetch(
          `/api/v1/categories/${encodeURIComponent(categorySlug)}/products?limit=10`,
        )) as ApiListResponse<BackendProduct>;

        const items = (res?.data?.data ?? [])
          .filter((p) => p && p._id !== product._id)
          .filter((p) => p.isHidden !== "true" && p.isHidden !== true)
          .slice(0, 3)
          .map<Product>((p) => ({
            id: p._id,
            slug: p.slug,
            name: p.name,
            category: p.category?.name || "",
            categorySlug: p.category?.slug || "",
            description: p.description,
            image: p.imageCover
              ? encodeUrlPathSegments(
                  `${API_BASE_URL}/products/${p.imageCover}`,
                )
              : "/products/dummy.jpg",
            features: [],
            material: p.code || "",
          }));

        if (!cancelled) setRelatedProducts(items);
      } catch {
        if (!cancelled) setRelatedProducts([]);
      }
    }

    loadRelated();
    return () => {
      cancelled = true;
    };
  }, [product?._id, categorySlug]);

  if (!isLoading && !product) {
    return (
      <div className="section-container pt-28 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">
          {t("notFoundTitle")}
        </h1>
        <Link href="/products" className="text-primary hover:underline">
          ← {t("backToProducts")}
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="section-container pt-28 pb-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <Link
          href={`/products/category/${encodeURIComponent(categorySlug)}`}
          className="text-muted-foreground text-sm hover:text-primary inline-flex items-center gap-1 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> {t("backTo")} {categoryName}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden bg-secondary/30 border border-border/10">
              <img
                src={imageSrc}
                alt={product?.name || ""}
                className="w-full aspect-square object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {categoryName ? (
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">
                {categoryName}
              </p>
            ) : null}
            <h1 className="font-display text-4xl sm:text-5xl font-black mb-6 leading-tight">
              {product?.name || ""}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {product?.description || ""}
            </p>

            <div className="glass-card p-6 mb-6 rounded-xl">
              <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] mb-3 text-muted-foreground">
                {t("codeLabel")}
              </h3>
              <p className="text-foreground font-display font-semibold text-lg">
                {product?.code || "—"}
              </p>
            </div>

            {features.length ? (
              <div className="glass-card p-6 mb-8 rounded-xl">
                <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] mb-4 text-muted-foreground">
                  {t("featuresLabel")}
                </h3>
                <ul className="space-y-3">
                  {features.map((f, idx) => (
                    <li
                      key={`${f}-${idx}`}
                      className="flex items-center gap-3 text-sm text-foreground/80"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Link
              href={contactHref}
              className="gradient-button px-10 py-4 text-base inline-flex items-center gap-2 group"
            >
              {t("sendInquiry")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {relatedProducts.length ? (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">
              You may also like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetail;
