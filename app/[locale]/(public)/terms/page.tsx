"use client";

import SectionReveal from "@/components/SectionReveal";
import { useTranslations } from "next-intl";

const Terms = () => {
  const t = useTranslations("Terms");
  return (
    <div className="section-container pt-24 pb-12 max-w-3xl text-black">
      <SectionReveal>
        <h1 className="font-display text-4xl font-bold mb-8">
          {t("title")}
        </h1>
        <div className="space-y-6 text-muted-foreground">
          <p className="text-sm">{t("lastUpdated")}</p>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("usageTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("usageDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("ipTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("ipDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("productInfoTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("productInfoDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("liabilityTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("liabilityDesc")}
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
              {t("warrantyTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("warrantyDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("conductTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("conductDesc")}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {t("governingTitle")}
            </h2>
            <p className="text-sm leading-relaxed">
              {t("governingDesc")}
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

export default Terms;
