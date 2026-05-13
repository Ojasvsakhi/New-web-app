import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Target, Users, Zap } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AboutPage() {
  const advantages = [
    {
      icon: Users,
      title: 'Personalized attention',
      description: 'As a solo practitioner, every client receives direct attention from an experienced CA, not junior staff or assistants.'
    },
    {
      icon: Zap,
      title: 'Cost-effective solutions',
      description: 'Lower overhead means competitive pricing without compromising on quality or expertise.'
    },
    {
      icon: Target,
      title: 'Direct access',
      description: 'Communicate directly with your CA for faster responses and better understanding of your business needs.'
    },
    {
      icon: Award,
      title: 'Proven expertise',
      description: '13 years of hands-on experience across diverse industries and business sizes.'
    }
  ];

  const expertise = [
    'Income tax planning and compliance',
    'Corporate and individual tax returns',
    'Statutory and internal audits',
    'GST registration and compliance',
    'Financial statement preparation',
    'Business advisory and consulting',
    'Bookkeeping and accounting',
    'Financial planning and analysis'
  ];

  return (
    <>
      <Helmet>
        <title>About Rupesh Sakhi - 13 years of professional CA experience</title>
        <meta name="description" content="Learn about Rupesh Sakhi, a chartered accountant with 13 years of experience providing personalized accounting, tax, and audit services to businesses across India." />
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
                <h1 className="mb-6">About Rupesh Sakhi & Co</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Professional chartered accountant services built on trust, expertise, and personalized attention
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1697638164340-6c5fc558bdf2" 
                    alt="Professional chartered accountant office with modern workspace and financial documents"
                    className="rounded-2xl shadow-xl w-full h-auto"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="mb-6">Professional background</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      With 13 years of professional experience as a chartered accountant, Rupesh Sakhi has built a reputation for delivering high-quality, personalized accounting services to businesses across various industries.
                    </p>
                    <p>
                      As a solo practitioner, Rupesh Sakhi & Co offers a unique advantage: every client receives direct attention from an experienced CA who understands their business inside and out. This personalized approach ensures that your financial matters are handled with the expertise and care they deserve.
                    </p>
                    <p>
                      The practice specializes in providing comprehensive CA services including tax planning, audit, GST compliance, and financial consulting. Whether you're a startup, small business, or established enterprise, you'll receive tailored solutions designed to meet your specific needs.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="mb-4">Why choose a solo practice?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The advantages of working with an experienced independent chartered accountant
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-8 shadow-lg border border-border"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <advantage.icon className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="mb-4">Areas of expertise</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive chartered accountant services across multiple domains
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-muted rounded-xl p-6 text-center"
                  >
                    <p className="font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-white mb-6">Commitment to excellence</h2>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Every client relationship is built on trust, transparency, and a commitment to delivering exceptional service. Your financial success is the measure of our success.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;