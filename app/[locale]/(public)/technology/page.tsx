"use client";

import SectionReveal from "@/components/SectionReveal";
import { Cpu, Microscope, Wrench, Beaker } from "lucide-react";
import { useTranslations } from "next-intl";

const getItems = (t: any) => [
  {
    icon: Cpu,
    title: t("items.cncTitle"),
    desc: t("items.cncDesc"),
    image: "/tech-cnc.jpg",
  },
  {
    icon: Microscope,
    title: t("items.inspectionTitle"),
    desc: t("items.inspectionDesc"),
    image: "/tech-inspection.jpg",
  },
  {
    icon: Wrench,
    title: t("items.coatingTitle"),
    desc: t("items.coatingDesc"),
    image: "/tech-coating.jpg",
  },
  {
    icon: Beaker,
    title: t("items.testingTitle"),
    desc: t("items.testingDesc"),
    image: "/tech-testing.jpg",
  },
];

const Technology = () => {
  const t = useTranslations("Technology");
  const techItems = getItems(t);

  return (
    <div className="pb-12 text-black">
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/tech-cnc.jpg')" }}
        />
      </section>

      <section className="section-container pt-16 pb-8 flex flex-col items-center w-full">
        <SectionReveal>
          <div className="mx-auto text-center mb-8">
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-bold">
              {t("badge")}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-foreground">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </SectionReveal>
      </section>

      <div className="section-container">
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {techItems.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="glass-card overflow-hidden hover:border-primary/20 transition-all duration-500 rounded-2xl border border-border shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display text-lg font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="glass-card p-10 text-center rounded-2xl border border-border bg-muted/20">
            <h2 className="font-display text-2xl font-bold mb-3">{t("certificationsTitle")}</h2>
            <div className="flex flex-wrap items-center justify-evenly gap-10 mt-8">
              <img src="/iso.png" alt="ISO 13485" className="w-[100px] h-[100px] object-contain" />
              <img src="/sfda.svg" alt="SFDA" className="w-[100px] h-[100px] object-contain" />
              <img src="/ce-mark-official.png" alt="CE Mark" className="w-[100px] h-[100px] object-contain" />
              <img src="/fda.png" alt="FDA" className="w-[100px] h-[100px] object-contain" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
};

export default Technology;
