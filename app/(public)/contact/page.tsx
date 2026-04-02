"use client";

import SectionReveal from "@/components/SectionReveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => (
  <div className="section-container pt-24 pb-12">
    <SectionReveal>
      <p className="text-primary uppercase tracking-widest text-sm mb-2">
        Get In Touch
      </p>
      <h1 className="font-display text-4xl font-bold mb-8">Contact Us</h1>
    </SectionReveal>

    <div className="grid md:grid-cols-2 gap-10">
      <SectionReveal>
        <div className="space-y-6">
          {[
            {
              icon: MapPin,
              label: "Address",
              value: "Industrial Estate, Sialkot 51310, Pakistan",
            },
            { icon: Phone, label: "Phone", value: "+92 52 1234567" },
            { icon: Mail, label: "Email", value: "info@tecnoinstruments.com" },
            {
              icon: Clock,
              label: "Hours",
              value: "Mon–Sat, 9:00 AM – 6:00 PM (PKT)",
            },
          ].map((c, i) => (
            <div key={i} className="glass-card p-5 flex items-start gap-4">
              <c.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-semibold text-sm mb-1">
                  {c.label}
                </p>
                <p className="text-muted-foreground text-sm">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Demo mode: Message received!");
          }}
          className="glass-card p-8 space-y-4"
        >
          <h2 className="font-display text-xl font-bold mb-2">
            Send a Message
          </h2>
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
          <input
            required
            placeholder="Subject *"
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <textarea
            required
            rows={4}
            placeholder="Message *"
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          <button
            type="submit"
            className="gradient-button px-6 py-2.5 text-sm w-full"
          >
            Send Message
          </button>
        </form>
      </SectionReveal>
    </div>

    {/* Full-width styled map */}
    <SectionReveal>
      <div className="mt-12">
        <h2 className="font-display text-lg font-bold mb-4">Our Location</h2>
        <div className="rounded-2xl overflow-hidden border border-border/30 shadow-md bg-card">
          <iframe
            title="TECNO Instruments Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54200.0!2d74.52!3d32.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eea7a5074f781%3A0x75dc4ed3b1e6e0a1!2sSialkot%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </SectionReveal>
  </div>
);

export default Contact;
