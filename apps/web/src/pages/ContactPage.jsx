import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';

function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@rupeshsakhi.com',
      link: 'mailto:contact@rupeshsakhi.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Professional CA Practice, India',
      link: null
    },
    {
      icon: Clock,
      title: 'Response time',
      content: 'Within 24 hours',
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact us - Rupesh Sakhi & Co</title>
        <meta name="description" content="Get in touch with Rupesh Sakhi & Co for professional chartered accountant services. Schedule a consultation for tax planning, audit, GST compliance, and financial consulting." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="mb-6">Get in touch</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Ready to discuss your accounting needs? Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="mb-6">Contact information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We're here to help with all your chartered accountant needs. Whether you have a question about our services or want to schedule a consultation, we'd love to hear from you.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">{info.title}</p>
                          {info.link ? (
                            <a 
                              href={info.link} 
                              className="text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{info.content}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12 bg-muted rounded-2xl p-8">
                    <h3 className="text-xl font-semibold mb-4">What to expect</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>We'll review your inquiry within 24 hours</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Initial consultation to understand your needs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Customized service proposal tailored to your business</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Transparent pricing with no hidden fees</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
                    <h2 className="mb-6">Send us a message</h2>
                    <ContactForm />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="mb-6">Professional and confidential</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                All communications are treated with strict confidentiality. Your financial information and business details are secure with us, in accordance with professional CA ethics and standards.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ContactPage;