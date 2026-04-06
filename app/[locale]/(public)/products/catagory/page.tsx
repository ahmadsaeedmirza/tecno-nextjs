"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TextReveal } from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, publicFetch } from "@/lib/api-client";
import { encodeUrlPathSegments } from "@/lib/utils";
import type { Product } from "@/data/products";

type BackendCategory = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageCover: string;
  isHidden?: "true" | "false";
};

type BackendProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  code?: string;
  imageCover: string;
  isHidden?: "true" | "false" | boolean;
  catagory?: {
    _id: string;
    name: string;
    slug: string;
  };
};

type ApiListResponse<T> = {
  status: string;
  data?: {
    data?: T[];
  };
};

type ApiOneResponse<T> = {
  status: string;
  data?: {
    data?: T;
  };
};

const ProductCategory = () => {
  const t = useTranslations("Products");
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") || "";

  const [category, setCategory] = useState<BackendCategory | null>(null);
  const [backendProducts, setBackendProducts] = useState<BackendProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!categorySlug) {
        setCategory(null);
        setBackendProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const categoryRes = (await publicFetch(
          `/api/v1/catagories/slug/${encodeURIComponent(categorySlug)}`,
        )) as ApiOneResponse<BackendCategory>;

        const found = categoryRes?.data?.data ?? null;

        if (!found) {
          if (!cancelled) {
            setCategory(null);
            setBackendProducts([]);
          }
          return;
        }

        const productsRes = (await publicFetch(
          `/api/v1/catagories/${encodeURIComponent(found.slug)}/products?limit=5000`,
        )) as ApiListResponse<BackendProduct>;

        const productsForCategory = productsRes?.data?.data ?? [];

        if (!cancelled) {
          setCategory(found);
          setBackendProducts(productsForCategory);
        }
      } catch {
        if (!cancelled) {
          setCategory(null);
          setBackendProducts([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  const products = useMemo<Product[]>(() => {
    const visibleProducts = backendProducts.filter(
      (p) => p.isHidden !== "true" && p.isHidden !== true,
    );

    return visibleProducts.map((p) => ({
      id: p._id,
      slug: p.slug,
      name: p.name,
      category: p.catagory?.name || "",
      categorySlug: p.catagory?.slug || "",
      description: p.description,
      image: p.imageCover
        ? encodeUrlPathSegments(`${API_BASE_URL}/products/${p.imageCover}`)
        : "/products/dummy.jpg",
      features: [],
      material: p.code || "",
    }));
  }, [backendProducts]);

  if (!isLoading && !category) {
    return (
      <div className="section-container pt-28 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">
          {t("catNotFoundTitle")}
        </h1>
        <Link href="/products" className="text-primary hover:underline">
          ← {t("backToProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <TextReveal>
          <Link
            href="/products"
            className="text-primary text-sm hover:underline mb-6 inline-block"
          >
            ← {t("backToCategories")}
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-2">
            {category?.name || ""}
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            {category?.description || ""}
          </p>
        </TextReveal>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-20">Loading...</p>
        ) : null}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {!isLoading && products.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            {t("noProducts")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
