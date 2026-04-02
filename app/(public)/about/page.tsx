"use client";

import SectionReveal from "@/components/SectionReveal";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "5000+", label: "Products" },
  { value: "80+", label: "Countries Served" },
  { value: "100%", label: "Quality Tested" },
];

const About = () => (
  <div className="pt-28 pb-12">
    {/* Hero */}
    <div className="section-container mb-20">
      <SectionReveal>
        <p className="text-primary uppercase tracking-widest text-sm mb-2">
          Who We Are
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-black mb-6">
          About <span className="gradient-text">TECNO Instruments</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Founded in 1998 in Sialkot, Pakistan — the global hub for surgical
          instrument manufacturing.
        </p>
      </SectionReveal>
    </div>

    {/* Stats */}
    <div className="section-container mb-24">
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <StaggerItem key={i}>
            <div className="text-center glass-card p-8">
              <p className="font-display text-5xl sm:text-6xl font-black gradient-text mb-3">
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
                {s.label}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>

    {/* Story + Factory Image */}
    <div className="section-container mb-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <SectionReveal>
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 1998 in Sialkot, Pakistan — the global hub for surgical
              instrument manufacturing — TECNO Instruments has grown from a
              small workshop to a leading international exporter.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a team of 200+ skilled artisans and engineers, we produce
              over 5,000 different surgical, dental, and beauty instruments,
              serving hospitals, clinics, and distributors in more than 80
              countries.
            </p>
          </div>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="rounded-2xl overflow-hidden">
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
        <SectionReveal>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/about-craftsman.jpg"
              alt="Craftsman polishing surgical instrument"
              className="w-full h-full object-cover"
            />
          </div>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To deliver precision-engineered surgical instruments that surgeons
              can trust — combining the best of traditional craftsmanship with
              cutting-edge technology.
            </p>
            <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be the most trusted name in surgical instruments worldwide,
              known for quality, innovation, and ethical manufacturing
              practices.
            </p>
          </div>
        </SectionReveal>
      </div>
    </div>

    {/* Quality Lab + Values */}
    <div className="section-container mb-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <SectionReveal>
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Quality Assurance
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every instrument undergoes rigorous multi-stage inspection in our
              ISO-certified quality control lab. From raw material testing to
              final autoclave validation, precision is non-negotiable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We hold CE and FDA certifications, and each product batch is
              traceable from forging to packaging.
            </p>
          </div>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="/about-quality.jpg"
              alt="Quality control laboratory"
              className="w-full h-full object-cover"
            />
          </div>
        </SectionReveal>
      </div>
    </div>

    {/* Values */}
    <div className="section-container">
      <SectionReveal>
        <div className="glass-card p-10 text-center">
          <h2 className="font-display text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Precision", "Integrity", "Innovation", "Excellence"].map((v) => (
              <div key={v} className="p-4">
                <p className="font-display text-xl font-bold text-primary">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  </div>
);

export default About;
