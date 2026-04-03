"use client";

import {
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { categories } from "@/data/products";

const Products = () => {
  const t = useTranslations("Products");
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
