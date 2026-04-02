"use client";

import { useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import { AlertTriangle, CheckCircle, Star } from "lucide-react";

const RECAPTCHA_SITE_KEY = "";

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  if (submitted) {
    return (
      <div className="section-container py-20 text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-muted-foreground">
          Your feedback has been received.
        </p>
      </div>
    );
  }

  return (
    <div className="section-container pt-24 pb-12 max-w-xl">
      <SectionReveal>
        <p className="text-primary uppercase tracking-widest text-sm mb-2">
          We Value Your Input
        </p>
        <h1 className="font-display text-4xl font-bold mb-8">Feedback</h1>
      </SectionReveal>

      {!RECAPTCHA_SITE_KEY && (
        <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 text-sm text-primary">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          Configure reCAPTCHA keys to enable submissions (demo mode active)
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (rating > 0) setSubmitted(true);
        }}
        className="glass-card p-8 space-y-5"
      >
        <input
          required
          placeholder="Your Name *"
          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          required
          type="email"
          placeholder="Email *"
          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <div>
          <p className="text-sm font-medium mb-2">Rating *</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className="p-1"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${n <= rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          required
          rows={4}
          placeholder="Your feedback... *"
          className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />

        <button
          type="submit"
          disabled={rating === 0}
          className="gradient-button px-8 py-3 text-base w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
