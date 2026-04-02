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
    {/* Full-width Hero Image */}
    <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/tech-cnc.jpg')" }}
      />
    </section>

    {/* Hero Text */}
    <section className="section-container pt-16 pb-8 flex flex-col items-center w-full">
      <SectionReveal>
        <div className="mx-auto text-center mb-8">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-bold">
            Innovation
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-foreground">
            Technology & Manufacturing
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
            Our state-of-the-art facility in Sialkot combines decades of artisan
            expertise with modern CNC machining, ensuring every instrument meets the
            highest international standards.
          </p>
        </div>
      </SectionReveal>
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
