"use client";

import SectionReveal from "@/components/SectionReveal";
import { useTranslations } from "next-intl";

const Privacy = () => {
  const t = useTranslations("Privacy");
  return (
    <div className="section-container pt-24 pb-12 max-w-3xl text-black">
      <SectionReveal>
        <h1 className="font-display text-4xl font-bold mb-8">{t("title")}</h1>
        <div className="space-y-6 text-muted-foreground">
          <p className="text-sm">{t("lastUpdated")}</p>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("collectTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("collectDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("useTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("useDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("securityTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("securityDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("cookiesTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("cookiesDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("linksTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("linksDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("rightsTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("rightsDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("contactTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("contactDesc")}
            </p>
          </div>

          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground/60">
              {t("footerText")}
            </p>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
};

export default Privacy;
