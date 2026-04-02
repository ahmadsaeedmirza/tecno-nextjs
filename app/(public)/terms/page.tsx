"use client";

import SectionReveal from "@/components/SectionReveal";

const Terms = () => (
  <div className="section-container pt-24 pb-12 max-w-3xl">
    <SectionReveal>
      <h1 className="font-display text-4xl font-bold mb-8">
        Terms & Conditions
      </h1>
      <div className="space-y-6 text-muted-foreground">
        <p className="text-sm">Last updated: March 2026</p>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Use of Website
          </h2>
          <p className="text-sm leading-relaxed">
            This website is for informational purposes. Product specifications
            are subject to change without notice. By accessing and using this
            website, you agree to comply with these terms and conditions.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Intellectual Property
          </h2>
          <p className="text-sm leading-relaxed">
            All content, images, logos, and branding on this website are the
            exclusive property of TECNO Instruments and may not be reproduced,
            distributed, or transmitted without prior written permission.
            Unauthorized use may violate copyright, trademark, and other
            applicable laws.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Product Information
          </h2>
          <p className="text-sm leading-relaxed">
            While we strive to provide accurate product information, we do not
            warrant that product descriptions, images, or specifications are
            error-free or complete. We reserve the right to modify product
            specifications, designs, and availability at any time.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed">
            TECNO Instruments shall not be liable for any indirect, incidental,
            special, or consequential damages arising from the use of or
            inability to use this website, including but not limited to loss of
            data, lost profits, or business interruption.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Third-Party Links
          </h2>
          <p className="text-sm leading-relaxed">
            This website may contain links to third-party websites. We are not
            responsible for the content, accuracy, or practices of external
            sites. Your use of third-party websites is at your own risk and
            subject to their terms and conditions.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Product Warranties
          </h2>
          <p className="text-sm leading-relaxed">
            All TECNO instruments come with a standard warranty against
            manufacturing defects. Warranty terms vary by product category. For
            specific warranty information, please refer to your product
            documentation or contact our sales team.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            User Conduct
          </h2>
          <p className="text-sm leading-relaxed">
            By using this website, you agree not to engage in any unlawful or
            prohibited activities, including but not limited to harassment,
            hacking, or transmitting malicious code.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Governing Law
          </h2>
          <p className="text-sm leading-relaxed">
            These terms and conditions are governed by and construed in
            accordance with the laws of Pakistan, without regard to its conflict
            of law provisions.
          </p>
        </div>

        <div className="pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground/60">
            If you have any questions about these Terms & Conditions, please
            contact us at{" "}
            <a
              href="mailto:legal@tecnoinstruments.com"
              className="text-primary hover:underline"
            >
              legal@tecnoinstruments.com
            </a>
          </p>
        </div>
      </div>
    </SectionReveal>
  </div>
);

export default Terms;
