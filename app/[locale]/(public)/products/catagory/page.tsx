"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";

// Sample categories - replace with actual data
const categories = [
  {
    slug: "surgical",
    name: "Surgical Instruments",
    description:
      "Premium surgical instruments for precision medical procedures",
    productCount: 150,
    image: "/images/surgical.jpg",
  },
  {
    slug: "dental",
    name: "Dental Instruments",
    description: "Professional dental tools and instruments",
    productCount: 120,
    image: "/images/dental.jpg",
  },
  {
    slug: "beauty",
    name: "Beauty Instruments",
    description: "Cosmetic and beauty procedure instruments",
    productCount: 80,
    image: "/images/beauty.jpg",
  },
];

// Sample products - replace with actual data
const allProducts = [
  {
    id: "1",
    slug: "surgical-scissors-straight",
    name: "Surgical Scissors - Straight",
    category: "Surgical",
    description:
      "Premium stainless steel surgical scissors with precise cutting edge",
    material: "German Stainless Steel",
    image: "/images/product-1.jpg",
    categorySlug: "surgical",
    features: [
      "Precision cutting edge",
      "Ergonomic design",
      "Corrosion resistant",
    ],
  },
  {
    id: "2",
    slug: "surgical-forceps",
    name: "Surgical Forceps",
    category: "Surgical",
    description:
      "Precision-engineered surgical forceps for delicate procedures",
    material: "Japanese Steel",
    image: "/images/product-2.jpg",
    categorySlug: "surgical",
    features: ["Fine tip precision", "Non-slip grip", "Autoclavable"],
  },
  {
    id: "3",
    slug: "needle-holder",
    name: "Needle Holder",
    category: "Surgical",
    description: "Ergonomic needle holder with locking mechanism",
    material: "Hardened Steel",
    image: "/images/product-3.jpg",
    categorySlug: "surgical",
    features: ["Locking mechanism", "Ergonomic grip", "Smooth operation"],
  },
  {
    id: "4",
    slug: "dental-mirror",
    name: "Dental Mirror",
    category: "Dental",
    description: "Reflective dental examination mirror",
    material: "Stainless Steel",
    image: "/images/product-4.jpg",
    categorySlug: "dental",
    features: [
      "Anti-fog coating",
      "Wide viewing angle",
      "Durable reflective surface",
    ],
  },
  {
    id: "5",
    slug: "dental-explorer",
    name: "Dental Explorer",
    category: "Dental",
    description: "Precision dental explorer for cavity detection",
    material: "Stainless Steel",
    image: "/images/product-5.jpg",
    categorySlug: "dental",
    features: ["Double-ended tip", "Sensitive detection", "Comfortable handle"],
  },
];

const ProductCategory = () => {
  const t = useTranslations("Products");
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") || "";

  const category = categories.find((c) => c.slug === categorySlug);
  const products = allProducts.filter((p) => p.categorySlug === categorySlug);

  if (!category) {
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
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            {category.description}
          </p>
        </TextReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {products.length === 0 && (
          <p className="text-center text-muted-foreground py-20">
            {t("noProducts")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
