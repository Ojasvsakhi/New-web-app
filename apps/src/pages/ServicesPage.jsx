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
import TypewriterTitle from '../components/TypewriterTitle';

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
      theme: { bgLight: 'bg-blue-500/10', hoverBg: 'hover:bg-blue-500/10', ring: 'ring-blue-500/30', text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500', gradientFrom: 'from-blue-500/30' },
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
      theme: { bgLight: 'bg-emerald-500/10', hoverBg: 'hover:bg-emerald-500/10', ring: 'ring-emerald-500/30', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500', gradientFrom: 'from-emerald-500/30' },
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
      theme: { bgLight: 'bg-violet-500/10', hoverBg: 'hover:bg-violet-500/10', ring: 'ring-violet-500/30', text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500', gradientFrom: 'from-violet-500/30' },
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
      theme: { bgLight: 'bg-amber-500/10', hoverBg: 'hover:bg-amber-500/10', ring: 'ring-amber-500/30', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500', gradientFrom: 'from-amber-500/30' },
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
      theme: { bgLight: 'bg-rose-500/10', hoverBg: 'hover:bg-rose-500/10', ring: 'ring-rose-500/30', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500', gradientFrom: 'from-rose-500/30' },
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
      theme: { bgLight: 'bg-cyan-500/10', hoverBg: 'hover:bg-cyan-500/10', ring: 'ring-cyan-500/30', text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500', gradientFrom: 'from-cyan-500/30' },
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
      theme: { bgLight: 'bg-indigo-500/10', hoverBg: 'hover:bg-indigo-500/10', ring: 'ring-indigo-500/30', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500', gradientFrom: 'from-indigo-500/30' },
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
      theme: { bgLight: 'bg-teal-500/10', hoverBg: 'hover:bg-teal-500/10', ring: 'ring-teal-500/30', text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500', gradientFrom: 'from-teal-500/30' },
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
      theme: { bgLight: 'bg-fuchsia-500/10', hoverBg: 'hover:bg-fuchsia-500/10', ring: 'ring-fuchsia-500/30', text: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-500', gradientFrom: 'from-fuchsia-500/30' },
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
      theme: { bgLight: 'bg-orange-500/10', hoverBg: 'hover:bg-orange-500/10', ring: 'ring-orange-500/30', text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500', gradientFrom: 'from-orange-500/30' },
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
      theme: { bgLight: 'bg-sky-500/10', hoverBg: 'hover:bg-sky-500/10', ring: 'ring-sky-500/30', text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500', gradientFrom: 'from-sky-500/30' },
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6 }} 
                className="text-center max-w-3xl mx-auto"
              >
                <TypewriterTitle prefix="Core " highlight="Services" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Comprehensive chartered accountant services designed to support your business growth and ensure financial compliance
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-12">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group relative flex flex-col md:flex-row items-center gap-10 lg:gap-12 p-8 lg:p-10 rounded-[2.5rem] border border-border shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300 dark:hover:border-slate-700 ${
                      index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    } ${
                      highlightedSection === service.id 
                        ? `${service.theme.bgLight} ring-2 ${service.theme.ring} scale-[1.02] shadow-2xl z-10` 
                        : 'bg-card z-0'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.theme.gradientFrom} to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-[2.5rem] pointer-events-none`} />

                    <div className="flex-1 space-y-6 w-full relative z-10">
                      <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground transition-colors duration-500">
                          {service.title}
                        </h2>
                      </div>
                      
                      <div className="flex flex-wrap gap-2.5">
                        {service.items.map((item, idx) => (
                          <span 
                            key={idx} 
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background border border-border text-sm font-medium text-foreground/80 transition-colors duration-300 ${service.theme.hoverBg}`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${service.theme.bg}`} />
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-muted/40 border border-border transition-colors duration-300 group-hover:bg-background">
                          <p className="text-xs font-bold text-secondary uppercase mb-1">Impact</p>
                          <p className="text-sm text-foreground/80 leading-snug">{service.benefits}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/40 border border-border transition-colors duration-300 group-hover:bg-background">
                          <p className="text-xs font-bold text-secondary uppercase mb-1">Expertise</p>
                          <p className="text-sm text-foreground/80 leading-snug">Direct handling by CA with 13+ years experience.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 w-full max-w-md relative z-10">
                      <div className="relative group/image">
                        <div className={`absolute -inset-8 bg-gradient-to-tr ${service.theme.gradientFrom} to-transparent rounded-[2.5rem] blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                        
                        <div className="relative h-72 lg:h-80 w-full rounded-[2rem] border border-border bg-background/50 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-lg">
                          <service.icon className={`absolute -bottom-8 -right-8 h-64 w-64 ${service.theme.text} opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110`} />
                          
                          <div className="relative p-6 lg:p-8 rounded-3xl bg-background shadow-xl border border-border transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                            <service.icon className={`h-16 w-16 lg:h-20 lg:w-20 ${service.theme.text}`} />
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