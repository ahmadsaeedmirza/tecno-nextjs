"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ChevronDown, Globe } from "lucide-react";
import { categories } from "@/data/products";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

const tecnoLogo = "/tecno-logo.webp";



const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products"), hasDropdown: true },
    { href: "/technology", label: t("technology") },
    { href: "/sustainability", label: t("sustainability") },
    { href: "/about", label: t("about") },
    { href: "/feedback", label: t("feedback") },
    { href: "/contact", label: t("contact") },
  ];

  const dropdownTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const langTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleProductsEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setShowProducts(true);
  };
  const handleProductsLeave = () => {
    dropdownTimeout.current = setTimeout(() => setShowProducts(false), 200);
  };

  const handleLangEnter = () => {
    clearTimeout(langTimeout.current);
    setShowLang(true);
  };
  const handleLangLeave = () => {
    langTimeout.current = setTimeout(() => setShowLang(false), 200);
  };

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 bg-white py-4 shadow-sm transition-all duration-500"
    >
      <div className="section-container flex items-center justify-between h-20">
        <Link href="/" className="flex items-center">
          <img
            src={tecnoLogo}
            alt="TECNO Instruments"
            className="h-20 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <div
              key={l.href}
              className="relative"
              onMouseEnter={l.hasDropdown ? handleProductsEnter : undefined}
              onMouseLeave={l.hasDropdown ? handleProductsLeave : undefined}
            >
              <Link
                href={l.href}
                className={`px-3 py-2 text-[15px] font-bold rounded-md transition-all duration-300 inline-flex items-center gap-1 ${pathname === l.href ||
                  (l.hasDropdown && pathname.startsWith("/products"))
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
                  }`}
              >
                {l.label}
                {l.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>

              {/* Products Mega Dropdown */}
              {l.hasDropdown && showProducts && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] bg-background/95 backdrop-blur-2xl border border-border/50 rounded-xl shadow-xl p-4 grid grid-cols-2 gap-1"
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={handleProductsLeave}
                >
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      onClick={() => setShowProducts(false)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {cat.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {cat.productCount} {t("instruments")}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => setShowProducts(false)}
                    className="col-span-2 text-center text-xs font-bold text-primary hover:underline mt-2 py-1"
                  >
                    {t('viewAll')}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search + Language */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all duration-500 blur-md" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="relative w-36 focus:w-52 pl-9 pr-3 py-1.5 text-xs font-bold rounded-full bg-primary/5 border border-primary/20 text-foreground placeholder:text-primary/40 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-primary/10 transition-all duration-500 ease-out"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-medium text-primary/30 group-focus-within:opacity-0 transition-opacity pointer-events-none">
              ⌘K
            </div>
          </div>

          {/* Language Selector */}
          <div
            className="relative"
            onMouseEnter={handleLangEnter}
            onMouseLeave={handleLangLeave}
          >
            <button className="flex items-center gap-1 px-2 py-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors rounded-md">
              <Globe className="w-4 h-4" />
              {locale.toUpperCase()}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLang && (
              <div
                className="absolute top-full right-0 mt-1 w-36 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-lg shadow-xl py-1"
                onMouseEnter={handleLangEnter}
                onMouseLeave={handleLangLeave}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      router.push(pathname, { locale: lang.code });
                      setShowLang(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${locale === lang.code
                      ? "text-primary font-bold"
                      : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-t border-border/20 pb-6">
          <nav className="section-container flex flex-col gap-0.5 pt-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text-sm font-bold rounded-md transition-colors ${pathname === l.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
                  }`}
              >
                {l.label}
              </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="mt-4 pt-4 border-t border-border/20">
              <p className="px-3 text-xs font-bold text-muted-foreground uppercase mb-2">
                {t("language")}
              </p>
              <div className="grid grid-cols-2 gap-1 px-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      router.push(pathname, { locale: lang.code });
                      setOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-md transition-colors ${locale === lang.code
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                  >
                    <span className="text-[10px] opacity-70">{lang.code.toUpperCase()}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
