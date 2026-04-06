"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const tecnoLogo = "/tecno-logo.webp";

const Footer = () => {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");

  return (
    <footer className="bg-muted/50 border-t border-border/30 pt-14 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand + Contact Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src={tecnoLogo} alt="TECNO" className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t("description")}
            </p>

            <div className="flex items-center gap-6 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className="text-muted-foreground hover:text-[#1877F2] transition-colors duration-300 cursor-pointer h-10 w-10"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-muted-foreground hover:text-[#E4405F] transition-colors duration-300 cursor-pointer h-10 w-10"
                />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-muted-foreground hover:text-[#0A66C2] transition-colors duration-300 cursor-pointer h-10 w-10"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-4">
              {t("links")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                [navT("products"), "/products"],
                [navT("technology"), "/technology"],
                [navT("sustainability"), "/sustainability"],
                [navT("about"), "/about"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-primary transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                [navT("contact"), "/contact"],
                ["Inquiry", "/inquiry"],
                [navT("feedback"), "/feedback"],
                ["Privacy Policy", "/privacy"],
                ["Terms", "/terms"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="hover:text-primary transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-4">
            Contact
          </h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Industrial Estate, Sialkot 51310, Pakistan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+92 52 1234567</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span>info@tecnoinstruments.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Mon–Sat, 9 AM – 6 PM (PKT)</span>
            </div>
          </div>
        </div>

        {/* Newsletter + Map */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-foreground mb-4">
            Newsletter
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Stay updated with our latest innovations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="gradient-button px-4 py-2 text-sm w-full"
            >
              Subscribe
            </button>
          </form>

          {/* Map */}
          <div className="mt-4 rounded-lg overflow-hidden border border-border/30">
            <iframe
              title="TECNO Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.611286605991!2d74.5124137754471!3d32.48308727378782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eea11dab744af%3A0x2cf09b245491b477!2sTecno%20Instruments%20(Pvt)%20Ltd.!5e0!3m2!1sen!2s!4v1775151664103!5m2!1sen!2s"
              width="100%"
              height="120"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/20 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} TECNO Instruments. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
