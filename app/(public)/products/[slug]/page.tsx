"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import InstrumentViewer3D from "@/components/InstrumentViewer3D";

// Sample products - replace with actual data from products.ts
const allProducts = [
  {
    id: "1",
    slug: "surgical-scissors-straight",
    name: "Surgical Scissors - Straight",
    category: "Surgical",
    categorySlug: "surgical",
    description:
      "Premium stainless steel surgical scissors with precise cutting edge. Designed for accuracy and durability in surgical environments.",
    material: "German Stainless Steel",
    image: "/images/product-1.jpg",
    features: [
      "Razor-sharp cutting edge maintained through 500+ autoclave cycles",
      "Ergonomic handle design for reduced hand fatigue",
      "Nylon-coated for improved grip control",
      "Available in multiple sizes and styles",
      "ISO certified and CE approved",
      "Free lifetime sharpening service",
    ],
  },
  {
    id: "2",
    slug: "surgical-forceps",
    name: "Surgical Forceps",
    category: "Surgical",
    categorySlug: "surgical",
    description:
      "Precision-engineered surgical forceps for delicate procedures requiring exceptional control and visibility.",
    material: "Japanese Steel",
    image: "/images/product-2.jpg",
    features: [
      "Fine, aligned tips for precise tissue handling",
      "Anti-glare finish for better visualization",
      "Smooth locking mechanism",
      "Works seamlessly in minimally invasive surgery",
      "Fully autoclavable design",
      "Tungsten carbide inserts available",
    ],
  },
  {
    id: "3",
    slug: "needle-holder",
    name: "Needle Holder",
    category: "Surgical",
    categorySlug: "surgical",
    description:
      "Ergonomic needle holder with precision engineered locking mechanism for surgical suturing.",
    material: "Hardened Steel",
    image: "/images/product-3.jpg",
    features: [
      "Secure needle grip with carbide inserts",
      "Smooth locking action preventing needle slippage",
      "Comfortable, non-slip handle",
      "Suitable for all suture types",
      "Tested on 5000+ procedures",
      "Lifetime warranty on locking mechanism",
    ],
  },
  {
    id: "4",
    slug: "dental-mirror",
    name: "Dental Mirror",
    category: "Dental",
    categorySlug: "dental",
    description:
      "High-quality reflective dental examination mirror for enhanced visibility in dental procedures.",
    material: "Stainless Steel",
    image: "/images/product-4.jpg",
    features: [
      "Anti-fog coating for clarity",
      "Distortion-free reflection",
      "Comfortable handle reduces hand strain",
      "Available in multiple head sizes",
      "Scratch-resistant optical surface",
      "Easy to clean and sterilize",
    ],
  },
  {
    id: "5",
    slug: "dental-explorer",
    name: "Dental Explorer",
    category: "Dental",
    categorySlug: "dental",
    description:
      "Precision dental explorer for cavity detection and assessment during dental examinations.",
    material: "Stainless Steel",
    image: "/images/product-5.jpg",
    features: [
      "Ultra-fine, sharp tip for cavity detection",
      "Flexible yet durable shaft",
      "Comfortable, ergonomic grip",
      "Perfect for interproximal and occlusal surfaces",
      "Autoclavable to 900°F",
      "Lifetime sharpness guarantee",
    ],
  },
];

const ProductDetail = () => {
  const params = useParams();
  const slug = params.slug as string;

  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="section-container pt-28 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">
          Product Not Found
        </h1>
        <Link href="/products" className="text-primary hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <Link
          href={`/products/${product.categorySlug}`}
          className="text-muted-foreground text-sm hover:text-primary inline-flex items-center gap-1 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to {product.category}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden bg-secondary/30 border border-border/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="mt-6 glass-card rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border/10">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                  Interactive 3D Preview
                </p>
              </div>
              <Suspense
                fallback={
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                }
              >
                <div className="h-[300px]">
                  <InstrumentViewer3D />
                </div>
              </Suspense>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-black mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            <div className="glass-card p-6 mb-6 rounded-xl">
              <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] mb-3 text-muted-foreground">
                Material
              </h3>
              <p className="text-foreground font-display font-semibold text-lg">
                {product.material}
              </p>
            </div>

            <div className="glass-card p-6 mb-8 rounded-xl">
              <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] mb-4 text-muted-foreground">
                Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((f, idx) => (
                  <li
                    key={idx}
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

            <Link
              href={`/inquiry?product=${encodeURIComponent(product.name)}`}
              className="gradient-button px-10 py-4 text-base inline-flex items-center gap-2 group"
            >
              Send Inquiry
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
