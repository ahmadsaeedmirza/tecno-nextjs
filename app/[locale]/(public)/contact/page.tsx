"use client";

import SectionReveal from "@/components/SectionReveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import { useState, useEffect } from "react";
import { adminFetch } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  category: string | { _id: string };
}

const Contact = () => {
  const t = useTranslations("Contact");
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didApplyPrefill, setDidApplyPrefill] = useState(false);
  const [pendingPrefillProductId, setPendingPrefillProductId] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
    category: "",
    product: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [catRes, prodRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/categories`,
          ).then((r) => r.json()),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/products`,
          ).then((r) => r.json()),
        ]);
        setCategories(catRes.data.data);
        setProducts(prodRes.data.data);
      } catch (err) {
        console.error("Failed to fetch contact data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Prefill category/product from query params: /contact?category=<id>&product=<id>
  useEffect(() => {
    if (didApplyPrefill) return;
    if (!categories.length || !products.length) return;

    const prefillCat = searchParams.get("category") || "";
    const prefillProd = searchParams.get("product") || "";

    if (!prefillCat && !prefillProd) return;

    const matchedProduct = prefillProd
      ? products.find((p) => p._id === prefillProd)
      : undefined;

    const catIdFromProduct = matchedProduct
      ? typeof matchedProduct.category === "string"
        ? matchedProduct.category
        : matchedProduct.category?._id || ""
      : "";

    const nextCat = prefillCat || catIdFromProduct;

    setFormData((prev) => ({
      ...prev,
      category: nextCat || prev.category,
    }));

    if (prefillProd) setPendingPrefillProductId(prefillProd);
    setDidApplyPrefill(true);
  }, [
    categories.length,
    products.length,
    didApplyPrefill,
    searchParams,
    products,
  ]);

  // Apply product selection only after products are filtered by the chosen category.
  useEffect(() => {
    if (!pendingPrefillProductId) return;
    if (!formData.category) return;
    if (!filteredProducts.length) return;

    const existsInCategory = filteredProducts.some(
      (p) => p._id === pendingPrefillProductId,
    );
    if (!existsInCategory) return;

    setFormData((prev) => ({
      ...prev,
      product: pendingPrefillProductId,
    }));
    setPendingPrefillProductId("");
  }, [pendingPrefillProductId, filteredProducts, formData.category]);

  // Filter products when category changes
  useEffect(() => {
    if (formData.category) {
      const filtered = products.filter((p) => {
        const catId =
          typeof p.category === "string" ? p.category : p.category?._id;
        return catId === formData.category;
      });
      setFilteredProducts(filtered);
      // Reset product if it's not in the new category
      if (!filtered.find((p) => p._id === formData.product)) {
        setFormData((prev) => ({ ...prev, product: "" }));
      }
    } else {
      setFilteredProducts([]);
    }
  }, [formData.category, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/inquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) throw new Error(t("errorTitle"));

      toast({
        title: t("successTitle"),
        description: t("successDesc"),
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        country: "",
        category: "",
        product: "",
        message: "",
      });
    } catch (err: any) {
      toast({
        title: t("errorTitle"),
        description: err.message,
        variant: "destructive",
      });
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
          style={{ backgroundImage: "url('/about-factory.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* Hero Text */}
      <section className="section-container pt-16 pb-12 flex flex-col items-center w-full">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-bold">
              {t("getInTouch")}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-black mb-6 text-foreground">
              {t("contactUs")}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </SectionReveal>
      </section>

      <section className="section-container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <SectionReveal className="h-full">
            <div className="flex flex-col h-full justify-between gap-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-bold mb-6">
                  {t("infoTitle")}
                </h2>
                {[
                  {
                    icon: MapPin,
                    label: t("addressLabel"),
                    value: "Industrial Estate, Sialkot 51310, Pakistan",
                  },
                  {
                    icon: Phone,
                    label: t("phoneInfoLabel"),
                    value: "+92 52 1234567",
                  },
                  {
                    icon: Mail,
                    label: t("emailInfoLabel"),
                    value: "info@tecnoinstruments.com",
                  },
                  {
                    icon: Clock,
                    label: t("hoursLabel"),
                    value: "Mon–Sat, 9:00 AM – 6:00 PM (PKT)",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="glass-card p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <c.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display font-bold text-base mb-1 text-foreground">
                        {c.label}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {c.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 glass-card shadow-sm border-t-4 border-t-primary/80 flex flex-col justify-center">
                <h3 className="font-display font-bold text-xl mb-3 text-foreground">
                  {t("connectTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {t("connectDesc")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 p-3 rounded-xl border border-border/50 bg-secondary hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] transition-all group"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="w-5 h-5 text-muted-foreground group-hover:text-[#0A66C2] transition-all"
                    />
                    <span className="text-sm font-semibold">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 p-3 rounded-xl border border-border/50 bg-secondary hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 hover:text-[#1877F2] transition-all group"
                  >
                    <FontAwesomeIcon
                      icon={faFacebookSquare}
                      className="w-5 h-5 text-muted-foreground group-hover:text-[#1877F2] transition-all"
                    />
                    <span className="text-sm font-semibold">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 p-3 rounded-xl border border-border/50 bg-secondary hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30 hover:text-[#E4405F] transition-all group"
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="w-5 h-5 text-muted-foreground group-hover:text-[#E4405F] transition-all"
                    />
                    <span className="text-sm font-semibold">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15} className="h-full">
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 shadow-xl h-full flex flex-col"
            >
              <h2 className="font-display text-2xl font-bold mb-8">
                {t("formTitle")}
              </h2>

              <div className="flex flex-col gap-7">
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("nameLabel")}
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("emailLabel")}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("phoneLabel")}
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("companyLabel")}
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-0 placeholder-transparent"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("countryLabel")}
                  </label>
                  <Select
                    required
                    value={formData.country}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, country: val }))
                    }
                  >
                    <SelectTrigger className="w-full px-4 py-[11px] min-h-[46px] rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:ring-1 focus:ring-primary focus:border-primary relative z-0 appearance-none">
                      <SelectValue
                        placeholder={
                          <span className="text-muted-foreground">
                            {t("selectCountry")}
                          </span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 max-h-80">
                      {countries
                        .filter((c) => c.code !== "")
                        .map((c) => (
                          <SelectItem
                            key={c.code}
                            value={c.code}
                            className="cursor-pointer focus:bg-primary focus:text-white transition-colors duration-150 group"
                          >
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

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("categoryLabel")}
                  </label>
                  <Select
                    required
                    value={formData.category}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, category: val }))
                    }
                  >
                    <SelectTrigger className="w-full px-4 py-[11px] min-h-[46px] rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:ring-1 focus:ring-primary focus:border-primary relative z-0 appearance-none">
                      <SelectValue
                        placeholder={
                          <span className="text-muted-foreground">
                            {t("selectCategory")}
                          </span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 max-h-80">
                      {categories.map((c) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("productLabel")}
                  </label>
                  <Select
                    required
                    value={formData.product}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, product: val }))
                    }
                    disabled={!formData.category}
                  >
                    <SelectTrigger className="w-full px-4 py-[11px] min-h-[46px] rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:ring-1 focus:ring-primary focus:border-primary relative z-0 appearance-none">
                      <SelectValue
                        placeholder={
                          <span className="text-muted-foreground">
                            {t("selectProduct")}
                          </span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 max-h-80">
                      {filteredProducts.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 px-1 bg-[#F6F5F4CC] text-xs font-bold text-muted-foreground z-10 backdrop-blur-sm rounded">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none relative z-0 placeholder-transparent"
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="gradient-button px-6 py-4 mt-auto text-base font-bold w-full rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("sending")}
                  </div>
                ) : (
                  t("sendMessage")
                )}
              </button>
            </form>
          </SectionReveal>
        </div>

        {/* Full-width styled map */}
        <SectionReveal>
          <div className="mt-12">
            <h2 className="font-display text-lg font-bold mb-4">
              Our Location
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-md bg-card">
              <iframe
                title="TECNO Instruments Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.611286605991!2d74.5124137754471!3d32.48308727378782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eea11dab744af%3A0x2cf09b245491b477!2sTecno%20Instruments%20(Pvt)%20Ltd.!5e0!3m2!1sen!2s!4v1775151664103!5m2!1sen!2s"
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
      </section>
    </div>
  );
};
export default Contact;
