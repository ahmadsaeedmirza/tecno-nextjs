"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SectionReveal from "@/components/SectionReveal";
import { AlertTriangle, CheckCircle } from "lucide-react";

const RECAPTCHA_SITE_KEY = "";

// Sample products - replace with actual data from products.ts
const products = [
  { id: "1", name: "Surgical Scissors - Straight" },
  { id: "2", name: "Surgical Scissors - Curved" },
  { id: "3", name: "Surgical Forceps" },
  { id: "4", name: "Needle Holder" },
  { id: "5", name: "Dental Mirror" },
  { id: "6", name: "Scalpel Handle" },
  { id: "7", name: "Retractor" },
  { id: "8", name: "Clamp" },
];

const Inquiry = () => {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product") || "";
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    if (preselected) {
      setSelectedProducts([preselected]);
    }
  }, [preselected]);

  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    website: "",
    details: "",
  });

  const toggleProduct = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const isFormValid =
    form.company &&
    form.contact &&
    form.email &&
    form.phone &&
    form.country &&
    form.city &&
    form.details &&
    consent &&
    selectedProducts.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="section-container py-20 text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">
          Inquiry Submitted!
        </h1>
        <p className="text-muted-foreground">
          Thank you. Our team will get back to you within 24-48 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="section-container pt-24 pb-12 max-w-3xl">
      <SectionReveal>
        <p className="text-primary uppercase tracking-widest text-sm mb-2">
          Request a Quote
        </p>
        <h1 className="font-display text-4xl font-bold mb-8">Inquiry Form</h1>
      </SectionReveal>

      {!RECAPTCHA_SITE_KEY && (
        <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 text-sm text-primary">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          Configure reCAPTCHA keys to enable submissions (demo mode active)
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
        <h2 className="font-display text-lg font-bold">Company Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Company Name *"
            value={form.company}
            onChange={(e) =>
              setForm((f) => ({ ...f, company: e.target.value }))
            }
            className={inputClass}
          />
          <input
            required
            placeholder="Contact Person *"
            value={form.contact}
            onChange={(e) =>
              setForm((f) => ({ ...f, contact: e.target.value }))
            }
            className={inputClass}
          />
          <input
            required
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
          <input
            required
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClass}
          />
          <input
            required
            placeholder="Country *"
            value={form.country}
            onChange={(e) =>
              setForm((f) => ({ ...f, country: e.target.value }))
            }
            className={inputClass}
          />
          <input
            required
            placeholder="City *"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className={inputClass}
          />
        </div>
        <input
          placeholder="Website (optional)"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className={inputClass}
        />

        <h2 className="font-display text-lg font-bold pt-4">
          Select Products *
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
          {products.map((p) => (
            <label
              key={p.id}
              className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer transition-colors ${selectedProducts.includes(p.name) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(p.name)}
                onChange={() => toggleProduct(p.name)}
                className="accent-primary"
              />
              {p.name}
            </label>
          ))}
        </div>

        <h2 className="font-display text-lg font-bold pt-4">
          Additional Details
        </h2>
        <textarea
          required
          rows={4}
          placeholder="Describe your requirements, quantities, specifications... *"
          value={form.details}
          onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
          className={`${inputClass} resize-none`}
        />

        <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="accent-primary mt-0.5"
          />
          <span>
            I consent to TECNO Instruments processing my data for the purpose of
            this inquiry. *
          </span>
        </label>

        <button
          type="submit"
          disabled={!isFormValid}
          className="gradient-button px-8 py-3 text-base w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default Inquiry;
