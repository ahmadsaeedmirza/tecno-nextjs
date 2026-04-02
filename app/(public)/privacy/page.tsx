"use client";

import SectionReveal from "@/components/SectionReveal";

const Privacy = () => (
  <div className="section-container pt-24 pb-12 max-w-3xl">
    <SectionReveal>
      <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-muted-foreground">
        <p className="text-sm">Last updated: March 2026</p>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Information We Collect
          </h2>
          <p className="text-sm leading-relaxed">
            We collect information you provide directly, such as your name,
            email, company, and inquiry details when you submit forms on our
            website. This may include contact information, company details,
            product preferences, and communication preferences.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            How We Use Your Information
          </h2>
          <p className="text-sm leading-relaxed">
            Your information is used to respond to inquiries, process orders,
            and improve our services. We may also use it to send you updates
            about our products and services, provided you have opted in to
            receive such communications. We do not sell your personal data to
            third parties.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Data Security
          </h2>
          <p className="text-sm leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            or destruction. However, no method of transmission over the Internet
            is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Cookies and Tracking
          </h2>
          <p className="text-sm leading-relaxed">
            Our website may use cookies and similar tracking technologies to
            enhance your browsing experience and understand how you use our
            site. You can control cookie preferences through your browser
            settings.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Third-Party Links
          </h2>
          <p className="text-sm leading-relaxed">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites. We
            encourage you to review their privacy policies.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Your Rights
          </h2>
          <p className="text-sm leading-relaxed">
            Depending on your location, you may have rights regarding your
            personal data, including the right to access, correct, or delete
            your information. Please contact us to exercise these rights.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Contact
          </h2>
          <p className="text-sm leading-relaxed">
            For privacy-related inquiries or to exercise your data rights,
            contact us at{" "}
            <a
              href="mailto:privacy@tecnoinstruments.com"
              className="text-primary hover:underline"
            >
              privacy@tecnoinstruments.com
            </a>{" "}
            or through our contact form.
          </p>
        </div>

        <div className="pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground/60">
            This Privacy Policy may be updated from time to time. We will notify
            you of any significant changes by updating the "Last updated" date
            above.
          </p>
        </div>
      </div>
    </SectionReveal>
  </div>
);

export default Privacy;
