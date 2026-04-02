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
  },
  {
    icon: Recycle,
    title: "Recyclable Packaging",
    description:
      "All our packaging materials are recyclable and biodegradable. We are committed to reducing plastic use and promoting circular economy principles throughout our supply chain.",
  },
  {
    icon: Droplet,
    title: "Water Conservation",
    description:
      "Our state-of-the-art manufacturing facilities incorporate advanced water recycling systems, reducing consumption by 40% compared to industry standards and protecting this vital resource.",
  },
  {
    icon: Zap,
    title: "Solar Energy",
    description:
      "We have invested in renewable energy infrastructure, with solar panels powering 60% of our manufacturing operations, significantly reducing our carbon footprint.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="section-container pt-20 pb-12">
        <StaggerContainer staggerChildren={0.2} delayChildren={0.3}>
          <StaggerItem>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Sustainability
              </h1>
              <p className="text-xl text-gray-300">
                Our commitment to environmental responsibility and sustainable
                manufacturing practices
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Initiatives Grid */}
      <section className="section-container py-16">
        <StaggerContainer staggerChildren={0.1} delayChildren={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <StaggerItem key={index}>
                  <div className="glass-card p-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 group">
                    <div className="mb-6">
                      <Icon className="w-12 h-12 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </section>

      {/* Impact Stats */}
      <section className="section-container py-16 border-t border-orange-500/20">
        <StaggerContainer staggerChildren={0.1} delayChildren={0.3}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text">Our Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "40%", label: "Water Reduction" },
              { value: "60%", label: "Solar Powered" },
              { value: "100%", label: "Recyclable Packaging" },
              { value: "ISO 14001", label: "Certified" },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <div className="glass-card p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="section-container py-16">
        <StaggerContainer staggerChildren={0.1} delayChildren={0.2}>
          <div className="max-w-2xl mx-auto text-center glass-card p-12 rounded-lg">
            <StaggerItem>
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-gray-300 mb-8">
                We believe in manufacturing with purpose. Partner with us to
                support sustainable surgical instrument production.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/contact"
                  className="gradient-button px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-3 rounded-lg font-semibold border border-orange-400 hover:bg-orange-400/10 transition-all"
                >
                  Explore Products
                </Link>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </section>
    </div>
  );
}
