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
  <div className="pb-12">
    {/* Full-width Hero Section */}
    <section className="relative w-full h-[50vh] min-h-[450px] flex flex-col justify-center overflow-hidden mb-16">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/tech-cnc.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/65" /> {/* Dark Overlay */}

      <div className="section-container relative z-10 text-center flex flex-col items-center pt-24">
        <SectionReveal>
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4 font-bold">
            Innovation
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-white drop-shadow-lg">
            Technology & Manufacturing
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg drop-shadow-md">
            Our state-of-the-art facility in Sialkot combines decades of artisan
            expertise with modern CNC machining, ensuring every instrument meets the
            highest international standards.
          </p>
        </SectionReveal>
      </div>
    </section>

    <div className="section-container">
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

export default Technology;
