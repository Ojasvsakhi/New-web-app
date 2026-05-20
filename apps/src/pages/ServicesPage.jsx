import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Shield, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  FileCheck,
  Building,
  Users,
  Home,
  Globe 
} from 'lucide-react';

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
      title: 'Direct Tax planning & compliance',
      items: [
        'Strategic tax planning and return preparation',
        'Advance tax calculations and year-round advisory',
        'Tax Audit & Compliance',
        'TDS/TCS Compliance'
      ],
      benefits: 'Reduce tax burden, avoid penalties, optimize deductions, and maintain compliance with changing tax laws.'
    },
    {
      id: 'gst-indirect',
      icon: FileText,
      title: 'Goods and services Tax (GST) Planning and compliance',
      items: [
        'GST registration, return preparation, and filing',
        'Input tax credit reconciliation and GST audits',
        'GST Litigation & Advisory',
        'GST Refund & Assessment Support'
      ],
      benefits: 'Timely compliance, maximized input tax credits, reduced audit risks, and expert guidance on GST regulations.'
    },
    {
      id: 'company-law',
      icon: Building,
      title: 'Company Law Services',
      items: [
        'Private Limited, OPC & Section 8 Company Registration',
        'ROC Compliance & Annual Filings',
        'Director KYC & DIN Related Services',
        'Share Allotment & Transfer Compliance',
        'Drafting of Board Resolutions & Minutes',
        'Increase in Authorized Share Capital & Change in Registered Office',
        'Strike Off / Closure of Companies',
        'Corporate Compliance Advisory'
      ],
      benefits: 'Seamless incorporation, strict regulatory adherence, and optimized corporate governance.'
    },
    {
      id: 'llp-services',
      icon: Users,
      title: 'LLP Services',
      items: [
        'LLP Incorporation & Agreement Drafting & Filing',
        'Annual Return & Statement of Accounts Filing',
        'Partner Admission / Resignation',
        'Change in LLP Name or Registered Office',
        'LLP Closure / Strike Off',
        'Compliance Advisory for LLPs'
      ],
      benefits: 'Hassle-free LLP management, legal compliance, and smooth structural transitions.'
    },
    {
      id: 'rera-services',
      icon: Home,
      title: 'RERA Services',
      items: [
        'RERA Registration for Projects & Agents',
        'Quarterly & Annual RERA Compliance',
        'CA Certification under RERA',
        'Project Fund Utilization Certification',
        'Advisory for Developers & Landowners'
      ],
      benefits: 'Ensure real estate regulatory compliance, project transparency, and builder credibility.'
    },
    {
      id: 'fema-nri',
      icon: Globe,
      title: 'FEMA & NRI Advisory',
      items: [
        'FEMA Compliance Advisory',
        'NRI Taxation Services',
        'FDI & RBI Compliance',
        'Overseas Investment Advisory',
        'Remittance & Repatriation Advisory',
        'FEMA Reporting Assistance'
      ],
      benefits: 'Smooth cross-border transactions, regulatory adherence, and optimized international tax planning.'
    },
    {
      id: 'audit-services',
      icon: Shield,
      title: 'Audit services',
      items: [
        'Statutory audits',
        'Internal audits',
        'Tax audits',
        'Thorough examination of financial records for accuracy and improvement'
      ],
      benefits: 'Enhanced credibility, improved internal controls, risk mitigation, and regulatory compliance.'
    },
    {
      id: 'financial-consulting',
      icon: TrendingUp,
      title: 'Financial consulting',
      items: [
        'Financial planning & budgeting',
        'Cash flow management',
        'Investment advisory',
        'Business valuation services'
      ],
      benefits: 'Better financial decisions, improved profitability, sustainable growth, and long-term financial stability.'
    },
    {
      id: 'bookkeeping-accounting',
      icon: BookOpen,
      title: 'Bookkeeping & accounting',
      items: [
        'Day-to-day transaction recording',
        'Bank reconciliation',
        'Accounts payable/receivable management',
        'Monthly financial reporting'
      ],
      benefits: 'Accurate records, time savings, better cash flow visibility, and informed business decisions.'
    },
    {
      id: 'business-advisory',
      icon: Briefcase,
      title: 'Business advisory',
      items: [
        'Business structure optimization',
        'Compliance management',
        'Financial restructuring',
        'Strategic planning'
      ],
      benefits: 'Strategic clarity, risk management, operational efficiency, and sustainable business growth.'
    },
    {
      id: 'financial-statement',
      icon: FileCheck,
      title: 'Financial statement preparation',
      items: [
        'Balance sheets preparation',
        'Profit & loss statements',
        'Cash flow statements',
        'Compliance with accounting standards'
      ],
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
                <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight">Our services</h1>
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
                    <div className="flex-1 space-y-6 w-full">
                      <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold transition-colors duration-1000">
                          {service.title}
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {service.items.map((item, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-default"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </span>
                        ))}
                      </div>

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
              <h2 className="mb-6 text-3xl font-bold">Need a customized solution?</h2>
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