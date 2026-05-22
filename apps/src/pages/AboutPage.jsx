import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Target, Users, Zap } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import profileImage from '@/assets/photo.jpg';
import TypewriterTitle from '../components/TypewriterTitle';

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
        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <TypewriterTitle prefix="About " highlight="Us" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Professional chartered accountant services built on trust, expertise, and personalized attention
                </p>
              </motion.div>
            </div>
          </section>

          <section id="background" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-4xl mx-auto">
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0" 
                >
                  <img 
                    src={profileImage} 
                    alt="Rupesh Sakhi - Professional Chartered Accountant"
                    className="rounded-2xl shadow-xl w-[219px] h-[295px] object-cover border border-border/50"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex-1 text-center md:text-left"
                >
                  <h2 className="mb-6 text-4xl md:text-5xl font-bold text-foreground">
                      Professional background
                  </h2>
                  
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      With over 13 years of professional experience, Rupesh Sakhi delivers meticulous tax, audit, and advisory services. By partnering closely with clients—from startups to established enterprises—he ensures absolute confidence in navigating complex financial landscapes.
                    </p>
                    <p>
                      As a solo practitioner, the firm offers a distinct advantage: direct access to senior-level expertise. Every client receives personalized, strategic attention tailored specifically to their long-term business goals.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="solo-practice" className="py-20 bg-muted">
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
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

          <section id="expertise" className="py-20 transition-colors duration-1000 ease-out target:bg-secondary/20 target:border-secondary/50 rounded-2xl border border-transparent">
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
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}
                    className="bg-muted rounded-xl p-6 text-center"
                  >
                    <p className="font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] shadow-xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-slate-400/40 dark:via-slate-500/30 to-transparent" />
              
              <div className="relative z-10 px-6 py-12 md:py-14 text-center">
                <div className="mx-auto w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Award className="w-7 h-7" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-foreground">
                  Commitment to excellence
                </h2>
                
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Every client relationship is built on trust, transparency, and a commitment to delivering exceptional service. Your financial success is the measure of our success.
                </p>
              </div>
            </motion.div>
          </section>
        </main>

      </div>
    </>
  );
}

export default AboutPage;