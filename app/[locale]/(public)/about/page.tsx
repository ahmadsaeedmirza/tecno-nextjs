"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import QualityPolicy from "@/components/QualityPolicy";
import { useTranslations } from "next-intl";

const stats = (t: any) => [
  { value: "25+", label: t("stats.years") },
  { value: "5000+", label: t("stats.products") },
  { value: "80+", label: t("stats.countries") },
  { value: "100%", label: t("stats.quality") },
];

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numericMatch[1], 10);
    const suffix = value.replace(numericMatch[1], "");

    let startTimestamp: number;
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayValue(Math.floor(easeProgress * target).toString() + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target.toString() + suffix);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div ref={ref} className="relative text-center p-8 rounded-2xl overflow-hidden group h-full flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent group-hover:from-primary/20 transition-colors duration-500" />
      <div className="absolute inset-0 border border-primary/20 rounded-2xl" />
      <div className="relative">
        <p className="font-display text-4xl font-black text-primary mb-3">
          {displayValue}
        </p>
        <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}

const About = () => {
  const t = useTranslations("About");
  const aboutStats = stats(t);

  return (
    <div className="pb-12 text-black">
      {/* Full-width Image Hero Section */}
      <section className="w-full mb-16">
        <img
          src="/tecno-factory.webp"
          alt="TECNO Instruments"
          className="w-full h-auto block object-cover max-h-screen"
        />
      </section>

      {/* Page Title Below Image */}
      <div className="section-container mb-20 text-center flex flex-col items-center">
        <SectionReveal>
          <p className="text-primary uppercase tracking-widest text-sm mb-4 font-bold">
            {t("sloganHeader")}
          </p>
          <h1 className="font-display text-4xl font-black mb-6 text-foreground">
            {t("title")}
          </h1>
          <div className="text-muted-foreground text-lg max-w-4xl">
            <p className="mb-4">{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
        </SectionReveal>
      </div>

      {/* Stats */}
      <div className="section-container mb-24">
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutStats.map((s, i) => (
              <div key={i} className="h-full">
                <AnimatedStat value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* Story + Factory Image */}
      <div className="section-container mb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <SectionReveal>
            <div className="p-8">
              <h2 className="font-display text-2xl font-bold mb-4">{t("storyTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("storyDesc1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("storyDesc2")}
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img
                src="/about-factory.jpg"
                alt="TECNO manufacturing facility"
                className="w-full h-full object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Craftsman Image + Mission */}
      <div className="section-container mb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <SectionReveal className="order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img
                src="/about-craftsman.jpg"
                alt="Craftsman polishing"
                className="w-full h-full object-cover"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15} className="order-1 md:order-2">
            <div className="p-8">
              <h2 className="font-display text-2xl font-bold mb-4">
                {t("missionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("missionDesc")}
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Vision */}
      <div className="section-container mb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <SectionReveal>
            <div className="p-8">
              <h2 className="font-display text-2xl font-bold mb-4">
                {t("visionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("visionDesc")}
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img
                src="/about-quality.jpg"
                alt="Quality Lab"
                className="w-full h-full object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Values */}
      <div className="section-container mb-20 bg-muted/30 py-20 rounded-3xl">
        <SectionReveal>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-primary uppercase tracking-widest text-sm mb-4 font-bold">
              {t("valuesHeader")}
            </p>
            <h2 className="font-display text-4xl font-black mb-12 text-foreground">
              {t("valuesTitle")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { key: "Precision", label: t("precision") },
                { key: "Integrity", label: t("integrity") },
                { key: "Innovation", label: t("innovation") },
                { key: "Excellence", label: t("excellence") },
              ].map(({ key, label }) => (
                <div key={key} className="p-4 flex flex-col items-center justify-center group">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <img
                      src={`/${key}.png`}
                      alt={label}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <p className="font-display text-lg font-bold text-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>

      <QualityPolicy />
    </div>
  );
};

export default About;
