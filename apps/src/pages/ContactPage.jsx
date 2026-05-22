import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, HelpCircle, ChevronDown, MessageSquare, ArrowUpRight, Check } from 'lucide-react';
import ContactForm from '@/components/ContactForm.jsx';

function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopyPhone = (e, phoneNumber) => {
    e.preventDefault();
    navigator.clipboard.writeText(phoneNumber);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 1000);
  };

  const contactInfo = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      content: 'rupesh.sakhi@icai.org',
      link: 'mailto:rupesh.sakhi@icai.org',
      colSpan: 'col-span-1 md:col-span-1',
    },
    {
      id: 'phone',
      icon: Phone,
      title: 'Phone',
      content: '+91 9406649542',
      colSpan: 'col-span-1 md:col-span-1',
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Office Location',
      content: 'MSB 509, New Siyaganj, Patthar Godown Road, Indore-452001, MP, India',
      link: 'https://www.google.com/maps/@22.7236682,75.8661695,19.72z?entry=ttu&g_ep=EgoyMDI2MDUxMi4wIKXMDSoASAFQAw%3D%3D',
      colSpan: 'col-span-1 md:col-span-2',
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

      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-blue-50/20 to-transparent blur-3xl rounded-full" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>We're here to help</span>
            </span>
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              Let's start a <span className="text-blue-600">Conversation.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Whether you have a quick question, need technical support, or want to discuss a comprehensive financial strategy, our doors are open.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => {
                  
                  if (info.id === 'phone') {
                    return (
                      <div key={index} className={`bg-card p-6 rounded-2xl border border-border transition-colors duration-300 hover:bg-muted/30 ${info.colSpan}`}>
                        <button
                          onClick={(e) => handleCopyPhone(e, info.content)}
                          className="group text-left w-full h-full flex flex-col focus:outline-none"
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors grid [grid-template-areas:'stack'] ${phoneCopied ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50/50 text-blue-600 group-hover:bg-blue-50'}`}>
                            <Check className={`h-6 w-6 [grid-area:stack] transition-all duration-300 ${phoneCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                            <Phone className={`h-6 w-6 [grid-area:stack] transition-all duration-300 ${phoneCopied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          <span className="grid [grid-template-areas:'stack'] text-left overflow-hidden w-full">
                            <span className={`[grid-area:stack] transition-all duration-300 text-sm font-medium ${phoneCopied ? 'opacity-100 translate-y-0 text-emerald-600' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                              Copied to clipboard!
                            </span>
                            <span className={`[grid-area:stack] transition-all duration-300 text-sm text-muted-foreground group-hover:text-blue-600 ${phoneCopied ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                              {info.content}
                            </span>
                          </span>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={index}
                      className={`group bg-card p-6 rounded-2xl border border-border transition-colors duration-300 hover:bg-muted/30 ${info.colSpan}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-50/50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors duration-300">
                        <info.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-muted-foreground hover:text-blue-600 transition-colors text-sm"
                        >
                          <span>{info.content}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{info.content}</p>
                      )}
                    </div>
                  );
                })}

                <div className="bg-slate-900 text-white p-6 rounded-2xl md:col-span-2 border border-transparent hover:border-slate-800 transition-colors duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-300" />
                    </div>
                    <h3 className="text-lg font-semibold">Office Hours</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-white">10:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span>Saturday</span>
                      <span className="font-medium text-white">10:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-blue-300">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="bg-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
                <h2 className="text-2xl font-semibold mb-2">Send an Inquiry</h2>
                <p className="text-muted-foreground mb-8 text-sm">
                  Not ready to schedule a full consultation? Send us a quick message and our team will get back to you shortly.
                </p>
                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Find quick answers to common questions about our services.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`border rounded-xl bg-card overflow-hidden transition-all duration-300 ${isActive ? 'border-blue-200 ring-1 ring-blue-100 shadow-sm' : 'border-border hover:border-blue-100'}`}
                >
                  <button
                    onClick={() => setActiveFaq(isActive ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-center space-x-4">
                      <HelpCircle className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-muted-foreground'}`} />
                      <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isActive ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 pl-14 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;