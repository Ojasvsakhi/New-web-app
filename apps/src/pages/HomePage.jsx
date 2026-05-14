import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Calculator, TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import QuickContactSheet from '../components/QuickContactSheet';
import ServiceCard from '@/components/ServiceCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
function HomePage() {
  const services = [{
    icon: Calculator,
    title: 'Tax planning & compliance',
    description: 'Strategic tax planning to minimize liabilities while ensuring full compliance with current regulations.'
  }, {
    icon: Shield,
    title: 'Audit services',
    description: 'Comprehensive audit and assurance services to maintain financial integrity and regulatory compliance.'
  }, {
    icon: FileText,
    title: 'GST compliance',
    description: 'Expert guidance on GST registration, filing, and compliance to keep your business on track.'
  }, {
    icon: TrendingUp,
    title: 'Financial consulting',
    description: 'Strategic financial advice to help your business grow and achieve long-term financial goals.'
  }];
  const testimonials = [{
    name: 'Priya Sharma',
    role: 'Business owner, retail sector',
    content: 'Working with Rupesh has transformed how we handle our finances. His personalized approach and deep expertise have saved us significant costs.',
    rating: 5
  }, {
    name: 'Vikram Patel',
    role: 'Managing director, manufacturing',
    content: 'The audit services provided were thorough and professional. Rupesh identified areas for improvement that we had overlooked for years.',
    rating: 5
  }, {
    name: 'Anjali Reddy',
    role: 'Founder, tech startup',
    content: 'As a startup, we needed cost-effective yet professional CA services. Rupesh delivered exactly that with exceptional attention to detail.',
    rating: 5
  }];
  const trustFactors = [{
    icon: Award,
    text: '13 years of professional experience'
  }, {
    icon: CheckCircle2,
    text: 'Personalized attention to every client'
  }, {
    icon: Shield,
    text: 'Complete confidentiality and trust'
  }, {
    icon: TrendingUp,
    text: 'Proven track record of client success'
  }];
  return <>
      <Helmet>
        <title>Rupesh Sakhi & Co - Professional CA services with 13 years of experience</title>
        <meta name="description" content="Expert chartered accountant services including tax planning, audit, GST compliance, and financial consulting. Personalized solutions for your business growth." />
      </Helmet>

      <div className="min-h-screen flex flex-col">

        <main className="flex-1">
          <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1584346881556-19b8804d414f" alt="Professional office environment with modern workspace" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-3xl">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6
              }}>
                  <h1 className="text-white mb-6">
                    Professional CA services
                  </h1>
                  <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                    Personalized accounting solutions tailored to your business needs. From tax planning to financial consulting, get expert guidance you can trust.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <QuickContactSheet>
                      <Button size="lg" className="text-base transition-all duration-200 active:scale-[0.98] group">
                        Schedule consultation
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </QuickContactSheet>
                    <Link to="/services">
                      <Button size="lg" variant="outline" className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200 active:scale-[0.98]">
                        View services
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="core-services" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="mb-4">Core services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive chartered accountant services designed to support your business at every stage
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => <ServiceCard key={index} {...service} index={index} />)}
              </div>

              <div className="text-center mt-12">
                <Link to="/services">
                  <Button variant="outline" size="lg" className="transition-all duration-200 active:scale-[0.98]">
                    View all services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section id="why-choose-us" className="py-24 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="mb-4">Why clients choose us</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professional expertise combined with personalized service
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {trustFactors.map((factor, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: index * 0.1
              }} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <factor.icon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium">{factor.text}</p>
                  </motion.div>)}
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="mb-4">Client testimonials</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from businesses we've helped grow
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => <TestimonialCard key={index} {...testimonial} />)}
              </div>
            </div>
          </section>

          <section className="py-24 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-white mb-6">Ready to get started?</h2>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Schedule a consultation today and discover how personalized CA services can benefit your business
              </p>
              <QuickContactSheet>
                <Button size="lg" variant="secondary" className="text-base transition-all duration-200 active:scale-[0.98]">
                  Contact us today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </QuickContactSheet>
            </div>
          </section>
        </main>

      </div>
    </>;
}
export default HomePage;