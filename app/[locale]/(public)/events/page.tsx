"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { API_BASE_URL, publicFetch } from "@/lib/api-client";
import { encodeUrlPathSegments } from "@/lib/utils";
import { ScrollReveal, TextReveal } from "@/components/ScrollReveal";

interface Event {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageCover: string;
  date: string;
  StallNo: string;
  isHidden: string;
}

export default function EventsPage() {
  const t = useTranslations("Events");
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = (await publicFetch("/api/v1/events?limit=200&sort=-date")) as {
          status: string;
          data?: { data?: Event[] };
        };

        const allEvents: Event[] = res.data?.data || [];
        const visibleEvents = allEvents.filter(e => e.isHidden !== "true");

        const now = new Date();
        const upcoming: Event[] = [];
        const past: Event[] = [];

        visibleEvents.forEach(event => {
          const eventDate = new Date(event.date);
          eventDate.setHours(23, 59, 59, 999);
          if (eventDate >= now) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Failed to load events", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const heroEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const otherUpcomingEvents = upcomingEvents.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading exhibitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 text-black bg-slate-50">
      {/* Full-width Image Hero Section */}
      <section className="w-full mb-16">
        <img
          src="/hero-slide-3.jpg"
          alt="TECNO Exhibitions"
          className="w-full h-auto block object-cover max-h-[60vh]"
        />
      </section>

      {/* Page Title Below Image */}
      <div className="section-container mb-20 text-center flex flex-col items-center">
        <ScrollReveal>
          <p className="text-primary uppercase tracking-widest text-sm mb-4 font-bold flex items-center justify-center gap-2">
            {t("badge")}
          </p>
          <TextReveal className="font-display text-4xl md:text-5xl font-black mb-6 text-foreground">
            {t("title")}
          </TextReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </ScrollReveal>
      </div>

      <div className="section-container mt-12 space-y-24">
        {/* HERO EVENT MODULE */}
        {heroEvent && (
          <ScrollReveal>
            <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl group flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 min-h-[400px] relative">
                <Image
                  src={
                    heroEvent.imageCover.startsWith("http")
                      ? encodeUrlPathSegments(heroEvent.imageCover)
                      : encodeUrlPathSegments(`${API_BASE_URL}/events/${heroEvent.imageCover}`)
                  }
                  alt={heroEvent.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/90 md:to-slate-900 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent md:hidden" />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {t("heroBadge")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">
                  {heroEvent.name}
                </h2>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 text-orange-200/90">
                    <Calendar className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="font-semibold text-lg">
                      {new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(new Date(heroEvent.date))}
                    </span>
                  </div>
                  {heroEvent.StallNo && (
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                      <span className="font-medium text-lg">
                        {t("stall")} {heroEvent.StallNo}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-slate-400 leading-relaxed">
                  {heroEvent.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* OTHER UPCOMING EVENTS */}
        {otherUpcomingEvents.length > 0 && (
          <section>
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {t("upcomingTitle")}
                </h2>
                <div className="h-px bg-slate-200 flex-1 ml-6"></div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherUpcomingEvents.map((evt, idx) => (
                <EventCard key={evt._id} event={evt} t={t} delay={idx * 0.1} />
              ))}
            </div>
          </section>
        )}

        {/* FALLBACK IF NO UPCOMING EVENTS */}
        {upcomingEvents.length === 0 && (
          <ScrollReveal>
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
              <Calendar className="w-12 h-12 text-slate-300" />
              <p className="text-lg font-medium text-slate-600 max-w-xl mx-auto">
                {t("noUpcoming")}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* PAST EVENTS */}
        {pastEvents.length > 0 && (
          <section className="pt-8 relative">
            <ScrollReveal>
              <div className="flex items-center gap-6 mb-10 opacity-70">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-500">
                  {t("previousTitle")}
                </h2>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((evt, idx) => (
                <div key={evt._id} className="opacity-90 grayscale-[0.2] hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <EventCard event={evt} t={t} delay={idx * 0.05} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// Separate component for standard card
function EventCard({ event, t, delay }: { event: Event; t: any; delay: number }) {
  return (
    <ScrollReveal>
      <div className="glass-card bg-white rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col h-full">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={
              event.imageCover.startsWith("http")
                ? encodeUrlPathSegments(event.imageCover)
                : encodeUrlPathSegments(`${API_BASE_URL}/events/${event.imageCover}`)
            }
            alt={event.name}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Calendar className="w-3 h-3 text-orange-400" />
              {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(event.date))}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {event.name}
          </h3>

          {event.StallNo && (
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-slate-500">
              <MapPin className="w-4 h-4 text-orange-500" />
              {t("stall")} <span className="text-slate-700">{event.StallNo}</span>
            </div>
          )}

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {event.description}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
