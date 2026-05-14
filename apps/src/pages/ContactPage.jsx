import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import ContactForm from '@/components/ContactForm.jsx';

function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'rupesh.sakhi@icai.org',
      link: 'mailto:rupesh.sakhi@icai.org'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9406649542',
      link: 'tel:+919406649542'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      content: 'MSB 509, New Siyaganj, Patthar Godown Road, Indore-452001, Madhya Pradesh, India',
      link: 'https://www.google.com/maps/search/?api=1&query=MSB,+New+Siyaganj,+Patthar+Godown+Road,+Indore,+Madhya+Pradesh,+India'
    }
  ];

  const faqs = [
    {
      question: "Do you offer remote or virtual consultations?",
      answer: "Yes, we fully support remote consultations via Zoom or Google Meet for clients across India, ensuring seamless communication regardless of your location."
    },
    {
      question: "What documents should I prepare for our first meeting?",
      answer: "For tax planning, please have your previous year's return and current financial statements ready. For business advisory, a brief overview of your company's financial health is helpful."
    },
    {
      question: "How are your fees structured?",
      answer: "Our fees vary depending on the complexity of the service. We provide a transparent, upfront fee quote after our initial consultation before any work begins."
    },
    {
      question: "Can you help me register a new company or startup?",
      answer: "Absolutely. We provide end-to-end services for startup registration, GST compliance, and initial financial structuring."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact & Support - Rupesh Sakhi & Co</title>
        <meta name="description" content="Get in touch with us for professional chartered accountant services. Find our office hours, location, and answers to frequently asked questions." />
      </Helmet>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6 text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Connect with us
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you have a quick question, need technical support, or want to drop off documents, we are here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-10"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-4">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <info.icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.title}</p>
                        {info.link ? (
                          <a href={info.link} className="text-muted-foreground hover:text-blue-600 transition-colors">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-2xl p-8 border border-border">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">Office Hours</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-border/50 pb-2">
                    <span>Saturday</span>
                    <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-card rounded-2xl shadow-lg p-8 sm:p-10 border border-border">
                <h2 className="text-2xl font-semibold mb-2">Send a General Inquiry</h2>
                <p className="text-muted-foreground mb-8 text-sm">
                  Not ready to schedule a full consultation? Send us a quick message and our team will get back to you shortly.
                </p>
                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Find quick answers to common questions about our services.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default ContactPage;