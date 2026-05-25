import React from 'react';
import { motion } from 'framer-motion';
import TypewriterTitle from '../components/TypewriterTitle';
import { Helmet } from 'react-helmet';

export default function PrivacyPage() {
  return (
    <>
    <Helmet>
      <title>Privacy Policies</title>
    </Helmet>
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <TypewriterTitle prefix="Privacy " highlight="Policy" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Effective Date: {new Date().toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3 lining-nums">1. Information We Collect</h2>
              <p className="mb-2">When you visit this website, we may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Information You Provide:</strong> When you use the "Contact Us" form on our website, you voluntarily provide personal information such as your name, email address, and the contents of your message.</li>
                <li><strong>Automatically Collected Information:</strong> Our hosting provider automatically logs standard technical information, such as your IP address, browser type, and access times, which is standard practice for maintaining website security and functionality.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3 lining-nums">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                The information collected through our contact form is used strictly to read and respond to your direct inquiries. We do not use this information for marketing purposes, and we do not sell or rent your personal information to any third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3 lining-nums">3. Third-Party Services</h2>
              <p className="mb-2">We utilize third-party services that may process your data:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>EmailJS:</strong> Our contact form utilizes EmailJS to securely transmit your message directly to our email inbox without storing it in an external database.</li>
                <li><strong>Vercel:</strong> This website is hosted on Vercel, which may collect basic server-level logs to monitor performance and ensure security.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3 lining-nums">4. Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to protect the information submitted via our site. However, please be aware that no method of transmission over the internet is completely secure, and we cannot guarantee absolute data security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3 lining-nums">5. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns about this Privacy Policy, please contact us via the form on our Contact page or directly at <a href="mailto:rupesh.sakhi@icai.org" ><strong>rupesh.sakhi@icai.org</strong></a>.
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  </>
  );
}