"use client";

import SectionReveal from "@/components/SectionReveal";
import { Cpu, Microscope, Wrench, Beaker } from "lucide-react";

const items = [
  {
    icon: Cpu,
    title: "CNC Precision Machining",
    desc: "Computer-controlled manufacturing ensures micron-level accuracy across every instrument batch.",
    image: "/tech-cnc.jpg",
  },
  {
    icon: Microscope,
    title: "Quality Inspection",
    desc: "Multi-stage inspection with digital measurement tools and visual quality control.",
    image: "/tech-inspection.jpg",
  },
  {
    icon: Wrench,
    title: "Nylon Coating Process",
    desc: "Proprietary coating withstands 500+ autoclave cycles and reduces hand fatigue.",
    image: "/tech-coating.jpg",
  },
  {
    icon: Beaker,
    title: "Material Testing",
    desc: "Every raw material lot is tested for composition, hardness, and corrosion resistance.",
    image: "/tech-testing.jpg",
  },
];

const Technology = () => (
  <div className="section-container pt-24 pb-12">
    <SectionReveal>
      <p className="text-primary uppercase tracking-widest text-sm mb-2">
        Innovation
      </p>
      <h1 className="font-display text-4xl font-bold mb-4">
        Technology & Manufacturing
      </h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Our state-of-the-art facility in Sialkot combines decades of artisan
        expertise with modern CNC machining, ensuring every instrument meets the
        highest international standards.
      </p>
    </SectionReveal>

    <div className="grid sm:grid-cols-2 gap-6 mb-16">
      {items.map((item, i) => (
        <SectionReveal key={i} delay={i * 0.1}>
          <div className="glass-card overflow-hidden hover:border-primary/20 transition-all duration-500">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display text-lg font-semibold mb-2">
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
      <div className="glass-card p-10 text-center">
        <h2 className="font-display text-2xl font-bold mb-3">Certifications</h2>
        <p className="text-muted-foreground">
          ISO 9001:2015 · ISO 13485:2016 · CE Marked · FDA Registered
        </p>
      </div>
    </SectionReveal>
  </div>
);

export default Technology;
