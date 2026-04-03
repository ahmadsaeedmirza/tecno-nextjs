"use client";

import { Leaf, Recycle, Droplet, Zap } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const getInitiatives = (t: any) => [
  {
    icon: Leaf,
    title: t("initiatives.materialsTitle"),
    description: t("initiatives.materialsDesc"),
    image: "/images/sustainability/materials.png",
  },
  {
    icon: Recycle,
    title: t("initiatives.packagingTitle"),
    description: t("initiatives.packagingDesc"),
    image: "/images/sustainability/packaging.png",
  },
  {
    icon: Droplet,
    title: t("initiatives.waterTitle"),
    description: t("initiatives.waterDesc"),
    image: "/images/sustainability/water.png",
  },
  {
    icon: Zap,
    title: t("initiatives.solarTitle"),
    description: t("initiatives.solarDesc"),
    image: "/images/sustainability/solar.png",
  },
];

export default function SustainabilityPage() {
  const t = useTranslations("Sustainability");
  const initiatives = getInitiatives(t);

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Full-width Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/solars.jpg')" }}
        />
      </section>

      {/* Hero Text */}
      <section className="section-container pt-16 pb-8 flex flex-col items-center w-full">
        <StaggerContainer staggerChildren={0.2} delayChildren={0.1}>
          <StaggerItem>
            <div className="max-w-3xl mx-auto text-center mb-8">
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-bold">
                {t("badge")}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-foreground">
                {t("title")}
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Initiatives Zig Zag Rows */}
      <section className="section-container py-16">
        <div className="flex flex-col gap-16 max-w-6xl mx-auto">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            const isEven = index % 2 === 0;
            return (
              <StaggerContainer key={index} staggerChildren={0.2} delayChildren={0.1}>
                <div className={`flex flex-col md:flex-row items-stretch gap-10 ${isEven ? "" : "md:flex-row-reverse"}`}>
                  {/* Text Half */}
                  <StaggerItem className="w-full md:w-1/2 flex">
                    <div className="flex flex-col justify-center h-full w-full rounded-2xl group transition-all duration-300">
                      <div className="mb-6">
                        <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="font-display text-3xl font-bold mb-4 text-foreground">
                        {initiative.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {initiative.description}
                      </p>
                    </div>
                  </StaggerItem>

                  {/* Image Half */}
                  <StaggerItem className="w-full md:w-1/2 flex">
                    <div className="rounded-2xl overflow-hidden shadow-2xl w-full h-[400px]">
                      <img
                        src={initiative.image}
                        alt={initiative.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            );
          })}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-container py-16 border-t border-orange-500/20">
        <StaggerContainer staggerChildren={0.1} delayChildren={0.3}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black">{t("impactTitle")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "40%", label: t("stats.water") },
              { value: "60%", label: t("stats.solar") },
              { value: "100%", label: t("stats.packaging") },
              { value: "ISO 14001", label: t("stats.certified") },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <div className="relative p-6 rounded-2xl overflow-hidden text-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent group-hover:from-primary/20 transition-colors duration-500" />
                  <div className="absolute inset-0 border border-primary/20 rounded-2xl" />
                  <div className="relative">
                    <div className="text-3xl font-display font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="section-container py-16">
        <StaggerContainer staggerChildren={0.1} delayChildren={0.2}>
          <div className="relative w-full text-center p-12 sm:p-20 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
            <div className="absolute inset-0 border border-primary/20 rounded-2xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <StaggerItem>
                <h2 className="font-display text-4xl font-black font-bold mb-6 text-foreground">
                  {t("ctaTitle")}
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-muted-foreground text-lg mb-10">
                  {t("ctaDesc")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="gradient-button px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {t("ctaContact")}
                  </Link>
                  <Link
                    href="/products"
                    className="px-8 py-3 rounded-lg font-semibold border border-border text-foreground hover:bg-muted transition-all"
                  >
                    {t("ctaProducts")}
                  </Link>
                </div>
              </StaggerItem>
            </div>
          </div>
        </StaggerContainer>
      </section>
    </div>
  );
}
