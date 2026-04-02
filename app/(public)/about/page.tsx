"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import QualityPolicy from "@/components/QualityPolicy";

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "5000+", label: "Products" },
  { value: "80+", label: "Countries Served" },
  { value: "100%", label: "Quality Tested" },
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
    const duration = 1500; // Faster 1.5s duration

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

const About = () => (
  <div className="pb-12">
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
          OUR SLOGAN
        </p>
        <h1 className="font-display text-4xl text-black font-black mb-6 text-foreground">
          Shaping the Future of Surgery Through Innovation
        </h1>
        <p className="text-muted-foreground text-lg">
          Thank you for choosing TECNO products. TECNO is an industry leader in research, design, development and manufacturing of “electrosurgical instruments” with dependable quality that functions under the most demanding conditions.
          <br />
          Made with high quality stainless steels and coated with special unbreakable and nontoxic Nylon material. Our fine instruments are hand crafted for precision and durability. We are dedicated to producing the precision instruments that you demand at the cost effective price you require.
        </p>
      </SectionReveal>
    </div>

    {/* Stats */}
    <div className="section-container mb-24">
      <SectionReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
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
            <h2 className="font-display text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 1998 in Sialkot, Pakistan - the global hub for surgical
              instrument manufacturing - TECNO Instruments has grown from a
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
          <div className="p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To advance surgical excellence by providing cutting-edge electrosurgical instruments that enhance precision, safety, and
              efficiency - empowering medical professionals to deliver superior patient outcomes worldwide.
            </p>
          </div>
        </SectionReveal>
      </div>
    </div>

    {/* Quality Lab + Values */}
    <div className="section-container mb-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <SectionReveal>
          <div className="p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Our Vision
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To revolutionize surgical precision and patient care by delivering innovative, reliable, and safe electrosurgical devices
              that empower healthcare professionals worldwide.
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
    <div className="section-container mb-20">
      <SectionReveal>
        <div className="p-12 sm:p-20 text-center">
          <p className="text-primary uppercase tracking-widest text-sm mb-4 font-bold">
            WHAT DRIVE US
          </p>
          <h2 className="font-display text-4xl font-black mb-12 text-foreground">
            Our Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Precision", "Integrity", "Innovation", "Excellence"].map((v) => (
              <div key={v} className="p-4 flex flex-col items-center justify-center">
                <img src={`/${v}.png`} alt={v} className="w-16 h-16 object-contain mb-4 hover:scale-110 transition-transform duration-300" />
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {v}
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

export default About;
