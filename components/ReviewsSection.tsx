import { Star } from "lucide-react";
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export interface Review {
  id: string;
  author: string;
  role: string;
  country: string;
  rating: number;
  text: string;
  date: string;
  source?: "google" | "manual";
}

// Demo reviews — designed to be replaced by dynamic Google Reviews data
const demoReviews: Review[] = [
  {
    id: "1",
    author: "Dr. Hans Weber",
    role: "Chief Surgeon",
    country: "Germany",
    rating: 5,
    text: "We have been sourcing instruments from TECNO for over five years. The nylon-coated forceps are outstanding — superior grip, excellent durability through hundreds of autoclave cycles. Their quality control is genuinely world-class.",
    date: "2025-12-14",
    source: "google",
  },
  {
    id: "2",
    author: "Sarah Mitchell",
    role: "Procurement Director",
    country: "United Kingdom",
    rating: 5,
    text: "TECNO Instruments consistently delivers on time with impeccable packaging. The craftsmanship is evident in every piece. Their team is responsive and professional — a reliable partner for any medical distributor.",
    date: "2026-01-22",
    source: "google",
  },
  {
    id: "3",
    author: "Dr. Ahmed Al-Rashid",
    role: "Orthopedic Specialist",
    country: "UAE",
    rating: 5,
    text: "The precision and finish of TECNO's bone rongeurs and needle holders are comparable to top European brands at a fraction of the cost. Exceptional value without compromising on quality.",
    date: "2026-02-08",
    source: "google",
  },
];

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
  reviews?: Review[];
}

const ReviewsSection = ({ reviews = demoReviews }: ReviewsSectionProps) => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="section-container relative">
        <TextReveal>
          <div className="text-center mb-10">
            <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-1">
              Testimonials
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-black">
              Trusted <span className="gradient-text">Worldwide</span>
            </h2>
            <p className="text-muted-foreground text-xs mt-2 max-w-md mx-auto">
              What our clients and partners say about TECNO Instruments
            </p>
          </div>
        </TextReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <div className="glass-card p-6 h-full flex flex-col justify-between hover:border-primary/20 transition-all duration-500">
                <div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-foreground/85 leading-relaxed mt-4 mb-5">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-border/30 pt-4">
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">
                      {review.author}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {review.role} · {review.country}
                    </p>
                  </div>
                  {review.source === "google" && (
                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground/50 uppercase tracking-wider">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ReviewsSection;
