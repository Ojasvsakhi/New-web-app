import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calculator, Shield, FileText, TrendingUp, BookOpen, Briefcase, FileCheck } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function ServicesPage() {
  const services = [
    {
      icon: Calculator,
      title: 'Tax planning & compliance',
      description: 'Strategic tax planning services to minimize your tax liabilities while ensuring full compliance with income tax regulations. We provide comprehensive tax return preparation, advance tax calculations, and year-round tax advisory to help you make informed financial decisions.',
      benefits: 'Reduce tax burden, avoid penalties, optimize deductions, and maintain compliance with changing tax laws.'
    },
    {
      icon: Shield,
      title: 'Audit services',
      description: 'Professional audit and assurance services including statutory audits, internal audits, and tax audits. Our thorough examination of financial records ensures accuracy, identifies areas for improvement, and provides stakeholders with confidence in your financial reporting.',
      benefits: 'Enhanced credibility, improved internal controls, risk mitigation, and regulatory compliance.'
    },
    {
      icon: FileText,
      title: 'GST & indirect tax compliance',
      description: 'Complete GST services from registration to filing and compliance. We handle GST return preparation, input tax credit reconciliation, GST audits, and advisory on complex GST matters to keep your business compliant and efficient.',
      benefits: 'Timely compliance, maximized input tax credits, reduced audit risks, and expert guidance on GST regulations.'
    },
    {
      icon: TrendingUp,
      title: 'Financial consulting',
      description: 'Strategic financial advisory services to help your business grow. We provide financial planning, budgeting, cash flow management, investment advisory, and business valuation services tailored to your specific needs and goals.',
      benefits: 'Better financial decisions, improved profitability, sustainable growth, and long-term financial stability.'
    },
    {
      icon: BookOpen,
      title: 'Bookkeeping & accounting',
      description: 'Comprehensive bookkeeping and accounting services to maintain accurate financial records. We handle day-to-day transaction recording, bank reconciliation, accounts payable/receivable management, and monthly financial reporting.',
      benefits: 'Accurate records, time savings, better cash flow visibility, and informed business decisions.'
    },
    {
      icon: Briefcase,
      title: 'Business advisory',
      description: 'Expert business advisory services covering business structure optimization, compliance management, financial restructuring, and strategic planning. We help you navigate complex business decisions with confidence.',
      benefits: 'Strategic clarity, risk management, operational efficiency, and sustainable business growth.'
    },
    {
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
                <h1 className="mb-6">Our services</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Comprehensive chartered accountant services designed to support your business growth and ensure financial compliance
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-16">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-3xl">{service.title}</h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="bg-muted rounded-xl p-6">
                        <p className="text-sm font-medium mb-2">Key benefits:</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.benefits}
                        </p>
                      </div>
                    </div>
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl h-80 flex items-center justify-center">
                        <service.icon className="h-32 w-32 text-primary/20" />
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

        <Footer />
      </div>
    </>
  );
}

export default ServicesPage;