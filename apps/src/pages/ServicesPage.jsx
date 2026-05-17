import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calculator, Shield, FileText, TrendingUp, BookOpen, Briefcase, FileCheck } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function ServicesPage() {
  const location = useLocation();
  const [highlightedSection, setHighlightedSection] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      let clearTimer;
      let observer;

      const initialTimer = setTimeout(() => {
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            
            if (entry.isIntersecting) {
              
              setHighlightedSection(id);
              
              clearTimer = setTimeout(() => {
                setHighlightedSection(null);
              }, 800);

              observer.disconnect(); 
            }
          }, {
            threshold: 0.5 
          });

          observer.observe(element);
        }
      }, 100);

      return () => {
        clearTimeout(initialTimer);
        if (clearTimer) clearTimeout(clearTimer);
        if (observer) observer.disconnect();
      };
    }
  }, [location.hash, location.key]);

  const services = [
    {
      id: 'tax-planning',
      icon: Calculator,
      title: 'Tax planning & compliance',
      description: 'Strategic tax planning services to minimize your tax liabilities while ensuring full compliance with income tax regulations. We provide comprehensive tax return preparation, advance tax calculations, and year-round tax advisory to help you make informed financial decisions.',
      benefits: 'Reduce tax burden, avoid penalties, optimize deductions, and maintain compliance with changing tax laws.'
    },
    {
      id: 'audit-services',
      icon: Shield,
      title: 'Audit services',
      description: 'Professional audit and assurance services including statutory audits, internal audits, and tax audits. Our thorough examination of financial records ensures accuracy, identifies areas for improvement, and provides stakeholders with confidence in your financial reporting.',
      benefits: 'Enhanced credibility, improved internal controls, risk mitigation, and regulatory compliance.'
    },
    {
      id: 'gst-indirect',
      icon: FileText,
      title: 'GST & indirect tax compliance',
      description: 'Complete GST services from registration to filing and compliance. We handle GST return preparation, input tax credit reconciliation, GST audits, and advisory on complex GST matters to keep your business compliant and efficient.',
      benefits: 'Timely compliance, maximized input tax credits, reduced audit risks, and expert guidance on GST regulations.'
    },
    {
      id: 'financial-consulting',
      icon: TrendingUp,
      title: 'Financial consulting',
      description: 'Strategic financial advisory services to help your business grow. We provide financial planning, budgeting, cash flow management, investment advisory, and business valuation services tailored to your specific needs and goals.',
      benefits: 'Better financial decisions, improved profitability, sustainable growth, and long-term financial stability.'
    },
    {
      id: 'bookkeeping-accounting',
      icon: BookOpen,
      title: 'Bookkeeping & accounting',
      description: 'Comprehensive bookkeeping and accounting services to maintain accurate financial records. We handle day-to-day transaction recording, bank reconciliation, accounts payable/receivable management, and monthly financial reporting.',
      benefits: 'Accurate records, time savings, better cash flow visibility, and informed business decisions.'
    },
    {
      id: 'business-advisory',
      icon: Briefcase,
      title: 'Business advisory',
      description: 'Expert business advisory services covering business structure optimization, compliance management, financial restructuring, and strategic planning. We help you navigate complex business decisions with confidence.',
      benefits: 'Strategic clarity, risk management, operational efficiency, and sustainable business growth.'
    },
    {
      id: 'financial-statement',
      icon: FileCheck,
      title: 'Financial statement preparation',
      description: 'Professional preparation of financial statements including balance sheets, profit & loss statements, and cash flow statements. We ensure your financial statements are accurate, compliant, and provide meaningful insights into your business performance.',
      benefits: 'Accurate reporting, stakeholder confidence, compliance with accounting standards, and better financial analysis.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Professional CA services - Rupesh Sakhi & Co</title>
        <meta name="description" content="Comprehensive chartered accountant services including tax planning, audit, GST compliance, financial consulting, bookkeeping, and business advisory. Expert solutions for your business." />
      </Helmet>

      <div className="min-h-screen flex flex-col">

        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="mb-6">Our services</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Comprehensive chartered accountant services designed to support your business growth and ensure financial compliance
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-16">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 p-6 rounded-[2rem] transition-all duration-700 ease-in-out ${
                      index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    } ${
                      highlightedSection === service.id 
                        ? 'bg-primary/10 shadow-2xl scale-[1.02] ring-1 ring-primary/30 z-10 relative' 
                        : 'bg-transparent scale-100 z-0'
                    }`}
                  >
                    <div className="flex-1 space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold transition-colors duration-1000">
                          {service.title}
                        </h2>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 transition-hover duration-300 hover:border-secondary/30">
                          <p className="text-xs font-bold text-secondary uppercase mb-1">Impact</p>
                          <p className="text-sm text-foreground/80 leading-snug">{service.benefits}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                          <p className="text-xs font-bold text-secondary uppercase mb-1">Expertise</p>
                          <p className="text-sm text-foreground/80 leading-snug">Direct handling by CA with 13+ years experience.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 w-full max-w-md">
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                        
                        <div className="relative h-80 w-full rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">
                          <service.icon className="absolute -bottom-8 -right-8 h-64 w-64 text-slate-200/30 dark:text-slate-800/20 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110" />
                          
                          <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                            <service.icon className="h-20 w-20 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="mb-6">Need a customized solution?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every business is unique. Contact us to discuss how we can tailor our services to meet your specific requirements.
              </p>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}

export default ServicesPage;