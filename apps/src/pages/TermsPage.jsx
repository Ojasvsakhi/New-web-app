import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-500">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Use of the Website</h2>
            <p className="text-muted-foreground">
              You agree to use this site only for lawful purposes. When utilizing the site's features, such as the contact form, you agree not to submit any harmful, abusive, spam, or malicious content. We reserve the right to ignore or block communications that violate these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website contains a dedicated "Links" section and may otherwise include external links to third-party websites or resources. These links are provided purely for your convenience. We have no control over the content, security, or privacy policies of those external sites. Accessing any third-party link is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, design elements, text, graphics, and underlying code on this website are the intellectual property of the website owner unless otherwise stated. You may not reproduce, distribute, or modify any part of this site without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">5. Disclaimer & Limitation of Liability</h2>
            <p className="text-muted-foreground">
              This website is provided on an "as-is" and "as-available" basis. To the maximum extent permitted by law, we shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, this website or any of the external links provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">6. Changes to These Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to update or modify these Terms of Service at any time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}