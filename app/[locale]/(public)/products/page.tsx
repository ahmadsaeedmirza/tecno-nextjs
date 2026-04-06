"use client";

import {
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, publicFetch } from "@/lib/api-client";

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
  isHidden?: "true" | "false";
  catagory?: {
    _id: string;
    slug: string;
  };
};

type ApiListResponse<T> = {
  status: string;
  data?: {
    data?: T[];
  };
};

const Products = () => {
  const t = useTranslations("Products");

  const [backendCategories, setBackendCategories] = useState<BackendCategory[]>(
    [],
  );
  const [productCounts, setProductCounts] = useState<Record<string, number>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const [categoriesRes, productsRes] = await Promise.all([
          publicFetch(
            "/api/v1/catagories?isHidden=false&limit=1000&sort=name",
          ) as Promise<ApiListResponse<BackendCategory>>,
          publicFetch("/api/v1/products?isHidden=false&limit=5000") as Promise<
            ApiListResponse<BackendProduct>
          >,
        ]);

        const categories = categoriesRes?.data?.data ?? [];
        const products = productsRes?.data?.data ?? [];

        const counts: Record<string, number> = {};
        for (const product of products) {
          const catSlug = product.catagory?.slug;
          if (!catSlug) continue;
          counts[catSlug] = (counts[catSlug] || 0) + 1;
        }

        if (!cancelled) {
          setBackendCategories(categories);
          setProductCounts(counts);
        }
      } catch {
        if (!cancelled) {
          setBackendCategories([]);
          setProductCounts({});
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    return backendCategories.map((cat) => {
      const image = cat.imageCover
        ? `${API_BASE_URL}/categories/${cat.imageCover}`
        : "/categories/dummy.jpg";

      return {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image,
        productCount: productCounts[cat.slug] ?? 0,
      };
    });
  }, [backendCategories, productCounts]);

  return (
    <div className="pb-20 text-black">
      {/* Complete Height Looping Video */}
      <section className="w-full mb-16">
        <video
          src="/tecno-hero-video.webm"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto block"
        />
      </section>

      {/* Page Title */}
      <div className="section-container mb-16 text-center flex flex-col items-center">
        <TextReveal>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4 font-bold">
            {t("badge")}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-foreground">
            {t("title")}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </TextReveal>
      </div>

      <div className="section-container">
        {isLoading && categories.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Loading...</p>
        ) : null}

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/products/catagory?category=${encodeURIComponent(cat.slug)}`}
                className="group block relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {cat.description}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {cat.productCount} {t("viewSuffix")}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};

export default Products;
