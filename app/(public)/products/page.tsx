"use client";

import Link from "next/link";
import {
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";

// Sample categories - replace with actual data from products.ts
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
  {
    slug: "gynecology",
    name: "Gynecology Instruments",
    description: "Specialized gynecological examination instruments",
    productCount: 60,
    image: "/images/gynecology.jpg",
  },
];

const Products = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container mb-16">
        <TextReveal>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">
            Catalog
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black mb-6">
            Our Products
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg">
            Browse our complete range of surgical, dental, and beauty
            instruments by category.
          </p>
        </TextReveal>
      </div>

      <div className="section-container">
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/products/${cat.slug}`}
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
                    {cat.productCount} instruments →
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
