"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/ScrollReveal";

export interface Review {
  _id: string;
  name: string;
  role?: string;
  country?: string;
  averageRating: number;
  message: string;
  createdAt?: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < rating
          ? "fill-primary text-primary"
          : "fill-muted text-muted-foreground/20"
          }`}
      />
    ))}
  </div>
);

interface ReviewsSectionProps {
  feedbacks: Review[];
}

const ReviewsSection = ({ feedbacks }: ReviewsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!feedbacks || feedbacks.length === 0) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  // Get 3 items for desktop view, wrapping if necessary
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(feedbacks[(currentIndex + i) % feedbacks.length]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative">
        <TextReveal>
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-2">
              Testimonials
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black mb-4">
              Trusted <span className="gradient-text">Worldwide</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
        </TextReveal>

        <div className="relative px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((feedback, idx) => (
                <motion.div
                  key={`${feedback._id}-${currentIndex}-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`glass-card p-6 md:p-8 relative overflow-hidden group border-primary/5 flex flex-col justify-between h-full ${
                    idx > 0 ? "hidden md:flex" : "flex"
                  }`}
                >
                  <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <StarRating rating={Math.round(feedback.averageRating)} />
                    
                    <p className="text-sm md:text-base text-foreground font-medium leading-relaxed my-6 font-serif italic">
                      "{feedback.message}"
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto pt-6 border-t border-border/40">
                    <p className="font-display font-bold text-sm text-foreground tracking-tight">
                      {feedback.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                      {feedback.role} {feedback.role && feedback.country ? "·" : ""} {feedback.country}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border/50 bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-lg shadow-black/5 z-20 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border/50 bg-white/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-lg shadow-black/5 z-20 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {feedbacks.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
