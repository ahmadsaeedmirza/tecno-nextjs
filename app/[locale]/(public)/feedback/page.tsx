"use client";

import { useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import { CheckCircle, Star } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";

const getRatingQuestions = (t: any) => [
  { key: "quality", label: t("questions.quality") },
  { key: "packaging", label: t("questions.packaging") },
  { key: "reliability", label: t("questions.reliability") },
  { key: "onTime", label: t("questions.onTime") },
  { key: "shortage", label: t("questions.shortage") },
  { key: "damaged", label: t("questions.damaged") },
];

const Feedback = () => {
  const t = useTranslations("Feedback");
  const ratingQuestions = getRatingQuestions(t);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    country: "",
    message: ""
  });
  const [ratings, setRatings] = useState<Record<string, number>>({
    quality: 0,
    packaging: 0,
    reliability: 0,
    onTime: 0,
    shortage: 0,
    damaged: 0,
  });
  const [isHuman, setIsHuman] = useState(false);

  if (submitted) {
    return (
      <div className="section-container py-20 text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">{t("successTitle")}</h1>
        <p className="text-muted-foreground">
          {t("successDesc")}
        </p>
      </div>
    );
  }

  const handleRating = (key: string, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const allRated = Object.values(ratings).every((v) => v > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRated || !isHuman) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...ratings
        })
      });

      if (!res.ok) throw new Error("Failed to submit feedback");

      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 bg-white text-black min-h-screen">
      {/* Full-width Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/about-quality.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      {/* Hero Text */}
      <section className="section-container pt-16 pb-8 flex flex-col items-center w-full">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-bold">
              {t("badge")}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-foreground">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </SectionReveal>
      </section>

      <section className="section-container max-w-4xl">

      <form
        onSubmit={handleSubmit}
        className="glass-card p-8 space-y-8 shadow-xl"
      >
        <div className="flex flex-col gap-8 pt-2">
          <div className="relative">
            <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
              {t("nameLabel")}
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
              placeholder="Your Name"
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
              {t("emailLabel")}
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
              placeholder="Email"
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
              {t("companyLabel")}
            </label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
              placeholder="Company Name"
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
              {t("countryLabel")}
            </label>
            <Select 
              onValueChange={(val) => setFormData(prev => ({ ...prev, country: val }))}
              required
            >
              <SelectTrigger className="w-full px-4 py-[11px] min-h-[46px] rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:ring-1 focus:ring-primary focus:border-primary relative z-0 appearance-none">
                <SelectValue placeholder={<span className="text-muted-foreground">{t("selectCountry")}</span>} />
              </SelectTrigger>
              <SelectContent className="bg-white z-50 max-h-80">
                {countries.filter((c) => c.code !== "").map((c) => (
                  <SelectItem key={c.code} value={c.name} className="cursor-pointer focus:bg-primary focus:text-white transition-colors duration-150 group">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                        alt={c.name}
                        className="w-5 h-auto shadow-sm rounded-sm"
                      />
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-border mt-2">
          <h3 className="font-bold text-lg mb-4">{t("ratingTitle")}</h3>
          {ratingQuestions.map((q) => (
            <div key={q.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                <span className="text-red-500 mr-1">*</span>
                {q.label.replace('*', '')}
              </p>
              <div className="flex gap-1 bg-secondary rounded-full px-3 py-1 border border-border">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleRating(q.key, n)}
                    className="p-1 focus:outline-none hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 transition-colors ${n <= ratings[q.key] ? "text-primary fill-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border">
          <div className="relative mt-2">
            <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
              {t("messageLabel")}
            </label>
            <textarea
              required
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-5 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none relative z-0 placeholder-transparent"
              placeholder="Your feedback"
            />
          </div>
        </div>

        {/* Google reCAPTCHA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-4">
          <div className="relative overflow-hidden rounded-lg shadow-sm">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(val) => setIsHuman(!!val)}
            />
          </div>

          <button
            type="submit"
            disabled={!allRated || !isHuman || isSubmitting}
            className="gradient-button px-10 py-4 text-base font-bold w-full sm:w-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl rounded-xl"
          >
            {isSubmitting ? t("submittingBtn") : t("submitBtn")}
          </button>
        </div>
      </form>
      </section>
    </div>
  );
};

export default Feedback;
