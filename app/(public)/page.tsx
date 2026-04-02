"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, Suspense, useEffect } from "react";
import {
  ScrollReveal,
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/ScrollReveal";
import {
  Zap,
  Shield,
  Globe,
  Award,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import InstrumentViewer3D from "@/components/InstrumentViewer3D";

// Sample categories data - replace with actual data
const categories = [
  {
    slug: "surgical",
    name: "Surgical Instruments",
    productCount: 150,
    image: "/images/surgical.jpg",
  },
  {
    slug: "dental",
    name: "Dental Instruments",
    productCount: 120,
    image: "/images/dental.jpg",
  },
  {
    slug: "beauty",
    name: "Beauty Instruments",
    productCount: 80,
    image: "/images/beauty.jpg",
  },
  {
    slug: "gynecology",
    name: "Gynecology",
    productCount: 60,
    image: "/images/gynecology.jpg",
  },
];

// Sample featured products - replace with actual data
const featuredProducts = [
  {
    id: "1",
    slug: "surgical-scissors-straight",
    name: "Surgical Scissors - Straight",
    category: "Surgical",
    categorySlug: "surgical",
    description:
      "Premium stainless steel surgical scissors with precise cutting edge",
    material: "German Stainless Steel",
    image: "/images/product-1.jpg",
    features: [
      "Precision cutting edge",
      "Ergonomic design",
      "Corrosion resistant",
    ],
  },
  {
    id: "2",
    slug: "surgical-forceps",
    name: "Surgical Forceps",
    category: "Surgical",
    categorySlug: "surgical",
    description:
      "Precision-engineered surgical forceps for delicate procedures",
    material: "Japanese Steel",
    image: "/images/product-2.jpg",
    features: ["Fine tip precision", "Non-slip grip", "Autoclavable"],
  },
  {
    id: "3",
    slug: "needle-holder",
    name: "Needle Holder",
    category: "Surgical",
    categorySlug: "surgical",
    description: "Ergonomic needle holder with locking mechanism",
    material: "Hardened Steel",
    image: "/images/product-3.jpg",
    features: ["Locking mechanism", "Ergonomic grip", "Smooth operation"],
  },
];

const heroSlides = [
  {
    image: "/hero-slide-1.jpg",
    title: "Our Manufacturing Facility",
    subtitle: "State-of-the-art production in Sialkot, Pakistan",
  },
  {
    image: "/hero-slide-2.jpg",
    title: "Precision Instruments",
    subtitle: "Crafted with German & Japanese surgical steel",
  },
  {
    image: "/hero-slide-3.jpg",
    title: "Artisan Craftsmanship",
    subtitle: "Decades of expertise in every instrument",
  },
  {
    image: "/hero-slide-4.jpg",
    title: "Global Distribution",
    subtitle: "Trusted in 80+ countries worldwide",
  },
];

// Double the slides for seamless infinite loop
const infiniteSlides = [...heroSlides, ...heroSlides];

const Index = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Marquee animation duration
  const marqueeSpeed = 24; // seconds for one full cycle

  // Attempt to play video on mount (handles mobile autoplay restrictions)
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked on mobile — skip to logo
          setVideoEnded(true);
        });
      }
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO VIDEO (plays once, then shows logo) ===== */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-[hsl(var(--muted))]">
        {!videoEnded ? (
          <video
            ref={videoRef}
            src="/tecno-hero-video.webm"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setVideoEnded(true)}
            onError={() => setVideoEnded(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ background: "hsl(var(--muted))" }}
          >
            <motion.img
              src="/tecno-logo.webp"
              alt="TECNO Instruments"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-28 sm:h-40 w-auto"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 text-sm sm:text-xs tracking-[0.35em] uppercase text-muted-foreground font-medium"
            >
              High Frequency Innovation
            </motion.p>
          </motion.div>
        )}
      </section>

      {/* ===== INFINITE CARD CAROUSEL (MARQUEE) ===== */}
      <section className="py-10 relative bg-muted/20 overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex gap-5"
            animate={{ x: [0, `-${50}%`] }}
            transition={{
              x: {
                duration: marqueeSpeed,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
          >
            {infiniteSlides.map((slide, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[440px] rounded-xl overflow-hidden relative aspect-[16/10] shadow-lg"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-sm sm:text-base font-bold text-card mb-0.5">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-xs text-card/75">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 3D VIEWER ===== */}
      <section className="relative py-10">
        <div className="section-container text-center mb-4">
          <TextReveal>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-1">
              Interactive
            </p>
            <h2 className="font-display font-outfit text-xl sm:text-2xl text-black font-black mb-1">
              Explore in <span className="gradient-text">3D</span>
            </h2>
            <p className="text-black max-w-md mx-auto">
              Rotate and examine our surgical instruments in real-time.
            </p>
          </TextReveal>
        </div>
        <Suspense
          fallback={
            <div className="w-full h-[300px] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <InstrumentViewer3D />
        </Suspense>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-10 relative">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <TextReveal>
              <div>
                <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-2">
                  Innovation
                </p>
                <h2 className="font-display font-outfit text-xl text-black sm:text-2xl font-black leading-tight mb-3">
                  Nylon-Coated <span className="gradient-text">Precision</span>
                </h2>
                <p className="text-black leading-relaxed mb-2">
                  Our proprietary nylon coating technology provides superior
                  grip, reduced hand fatigue, and enhanced instrument longevity.
                </p>
                <p className="text-black leading-relaxed">
                  Every coating is tested to withstand 500+ autoclave cycles.
                </p>
              </div>
            </TextReveal>

            <StaggerContainer className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: Zap,
                  title: "Advanced Materials",
                  desc: "German & Japanese steel",
                },
                {
                  icon: Shield,
                  title: "ISO Certified",
                  desc: "CE & FDA compliant",
                },
                {
                  icon: Globe,
                  title: "Global Reach",
                  desc: "80+ countries served",
                },
                {
                  icon: Award,
                  title: "Premium Quality",
                  desc: "Lifetime warranty",
                },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="glass-card p-3 text-center group hover:border-primary/30 transition-all duration-500">
                    <item.icon className="w-6 h-6 text-primary mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-lg text-black font-semibold mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-md font-light text-black">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES (square boxes) ===== */}
      <section className="py-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
        <div className="section-container relative">
          <TextReveal>
            <div className="text-center mb-6">
              <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-1">
                Browse
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-black">
                Product Categories
              </h2>
            </div>
          </TextReveal>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="group block relative overflow-hidden rounded-xl aspect-square"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-display font-bold text-xs mb-0.5 text-card group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[9px] text-card/70">
                      {cat.productCount} instruments
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== EXHIBITION SECTION ===== */}
      <section className="py-16 relative bg-muted/10">
        <div className="section-container">
          <TextReveal>
            <div className="text-center mb-10">
              <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-1">
                Events
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-black">
                Our Exhibition
              </h2>
            </div>
          </TextReveal>

          <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
            <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
              <img
                src="/images/exhibition_booth.png"
                alt="Tecno Industries Exhibition Booth"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  <Globe className="w-3.5 h-3.5" /> Upcoming Event
                </div>
                <h3 className="text-2xl font-bold font-display mb-3">Global Medical Summit 2026</h3>
                <p className="text-muted-foreground mb-4">
                  Join us at the largest international gathering of medical professionals and
                  surgical instrument innovators. Discover our latest nylon-coated
                  instruments and precision innovations in person.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-8">
                  <span className="bg-muted px-2.5 py-1 rounded">Date:</span>
                  <span>1/2/2026</span>
                </div>
                <Link
                  href="/events"
                  className="gradient-button w-fit px-6 py-2.5 text-sm inline-flex items-center gap-2"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS (Best Sellers) ===== */}
      <section className="section-container py-10">
        <TextReveal>
          <div className="text-center mb-6">
            <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-1">
              Featured
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-black">
              Best Sellers
            </h2>
          </div>
        </TextReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredProducts.map((p) => (
            <StaggerItem key={p.id}>
              <Link href={`/product/${p.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="glass-card overflow-hidden"
                >
                  <div className="aspect-square bg-secondary overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-4">
                    <p className="text-[8px] uppercase tracking-[0.25em] text-primary mb-1">
                      {p.category}
                    </p>
                    <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-2">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground/60">
                        {p.material}
                      </span>
                      <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="flex justify-center mt-10">
          <Link
            href="/products"
            className="gradient-button px-6 py-2.5 text-sm inline-flex items-center gap-2"
          >
            View all Products
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <ReviewsSection />

      {/* ===== CTA ===== */}
      <section className="py-10">
        <ScrollReveal>
          <div className="section-container">
            <div className="relative rounded-2xl overflow-hidden p-6 sm:p-10 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
              <div className="absolute inset-0 border border-primary/10 rounded-2xl" />
              <div className="relative">
                <h2 className="font-display text-xl sm:text-2xl font-black mb-2">
                  Ready to Partner With Us?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-5 text-xs">
                  Whether you need a single prototype or bulk orders, our team
                  delivers precision instruments tailored to your
                  specifications.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/inquiry"
                    className="gradient-button px-6 py-2.5 text-sm inline-flex items-center gap-2"
                  >
                    Send Inquiry <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-2.5 text-sm font-semibold rounded-lg border border-border text-foreground hover:bg-muted transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FLOATING INQUIRE BUTTON ===== */}
      <Link
        href="/inquiry"
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm font-bold animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        <MessageCircle className="w-4 h-4" />
        Inquire Us
      </Link>
    </div>
  );
};

export default Index;
