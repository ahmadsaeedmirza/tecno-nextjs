"use client";

import { Leaf, Recycle, Droplet, Zap } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import Link from "next/link";

const initiatives = [
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    description:
      "We source sustainable materials and minimize waste in our manufacturing processes, reducing our environmental footprint while maintaining the highest quality standards for surgical instruments.",
    image: "/images/sustainability/materials.png",
  },
  {
    icon: Recycle,
    title: "Recyclable Packaging",
    description:
      "All our packaging materials are recyclable and biodegradable. We are committed to reducing plastic use and promoting circular economy principles throughout our supply chain.",
    image: "/images/sustainability/packaging.png",
  },
  {
    icon: Droplet,
    title: "Water Conservation",
    description:
      "Our state-of-the-art manufacturing facilities incorporate advanced water recycling systems, reducing consumption by 40% compared to industry standards and protecting this vital resource.",
    image: "/images/sustainability/water.png",
  },
  {
    icon: Zap,
    title: "Solar Energy",
    description:
      "We have invested in renewable energy infrastructure, with solar panels powering 60% of our manufacturing operations, significantly reducing our carbon footprint.",
    image: "/images/sustainability/solar.png",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Full-width Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[450px] flex flex-col justify-center overflow-hidden mb-16">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-factory.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/65" /> {/* Dark Overlay */}

        <div className="section-container relative z-10 text-center flex flex-col items-center pt-24">
          <StaggerContainer staggerChildren={0.2} delayChildren={0.3}>
            <StaggerItem>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4 font-bold">
                  ECO-FRIENDLY
                </p>
                <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-white drop-shadow-lg">
                  Sustainability
                </h1>
                <p className="text-white/80 text-xl drop-shadow-md">
                  Our commitment to environmental responsibility and sustainable
                  manufacturing practices
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
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
            <h2 className="text-4xl font-bold text-black">Our Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "40%", label: "Water Reduction" },
              { value: "60%", label: "Solar Powered" },
              { value: "100%", label: "Recyclable Packaging" },
              { value: "ISO 14001", label: "Certified" },
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
                  Join Our Mission
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-muted-foreground text-lg mb-10">
                  To advance surgical excellence by providing cutting-edge electrosurgical instruments that enhance precision, safety, and
                  efficiency—empowering medical professionals to deliver superior patient outcomes worldwide.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="gradient-button px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Get In Touch
                  </Link>
                  <Link
                    href="/products"
                    className="px-8 py-3 rounded-lg font-semibold border border-border text-foreground hover:bg-muted transition-all"
                  >
                    Explore Products
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
