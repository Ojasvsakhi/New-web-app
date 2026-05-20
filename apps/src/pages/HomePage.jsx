import React, { useRef, useEffect } from 'react';
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
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  const services = [{
    icon: Calculator,
    title: 'Tax planning & compliance',
    hash: 'tax-planning',
    description: 'Strategic tax planning to minimize liabilities while ensuring full compliance with current regulations.'
  }, {
    icon: Shield,
    title: 'Audit services',
    hash: 'audit-services',
    description: 'Comprehensive audit and assurance services to maintain financial integrity and regulatory compliance.'
  }, {
    icon: FileText,
    title: 'GST compliance',
    hash: 'gst-indirect',
    description: 'Expert guidance on GST registration, filing, and compliance to keep your business on track.'
  }, {
    icon: TrendingUp,
    title: 'Financial consulting',
    hash: 'financial-consulting',
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

  const updateSpotlight = () => {
    if (!heroRef.current || !overlayRef.current || !isHoveringRef.current) return;
    
    const mouseX = mousePosRef.current.x;
    const mouseY = mousePosRef.current.y;
    
    const heroRect = heroRef.current.getBoundingClientRect();
    const bgX = mouseX - heroRect.left;
    const bgY = mouseY - heroRect.top;

    const mask = `radial-gradient(circle 150px at ${bgX}px ${bgY}px, transparent 0%, black 100%)`;
    overlayRef.current.style.maskImage = mask;
    overlayRef.current.style.webkitMaskImage = mask;
    
    const applyDynamicGradient = (ref, highlightColor, baseColor, radius = 150) => {
      if (!ref.current) return;
      const elRect = ref.current.getBoundingClientRect();
      const elX = mouseX - elRect.left;
      const elY = mouseY - elRect.top;
      
      ref.current.style.backgroundImage = `radial-gradient(circle ${radius}px at ${elX}px ${elY}px, ${highlightColor} 0%, ${baseColor} 100%)`;
    }; 

    applyDynamicGradient(headingRef, '#fbbf24', '#ffffff'); 
    applyDynamicGradient(paragraphRef, '#fcd34d', '#e2e8f0'); 
    
    applyDynamicGradient(btn1Ref, '#24e2fb', '#1b4498', 120);
    applyDynamicGradient(btn2Ref, 'rgba(251, 191, 36, 0.3)', 'transparent', 120);
  };

  const handleMouseMove = (e) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    isHoveringRef.current = true;
    updateSpotlight();
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (!overlayRef.current) return;
    const mask = `radial-gradient(circle 0px at 0px 0px, transparent 0%, black 100%)`;
    overlayRef.current.style.maskImage = mask;
    overlayRef.current.style.webkitMaskImage = mask;

    const resetGradient = (ref, defaultState) => {
      if (ref.current) ref.current.style.backgroundImage = defaultState;
    };

    resetGradient(headingRef, `linear-gradient(#ffffff, #ffffff)`);
    resetGradient(paragraphRef, `linear-gradient(#e2e8f0, #e2e8f0)`);
    resetGradient(btn1Ref, 'none');
    resetGradient(btn2Ref, 'none');
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (isHoveringRef.current) {
        requestAnimationFrame(updateSpotlight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Rupesh Sakhi & Co</title>
        <meta name="description" content="Expert chartered accountant services including tax planning, audit, GST compliance, and financial consulting. Personalized solutions for your business growth." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          
          <section 
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1584346881556-19b8804d414f?auto=format&w=1920&q=50" 
                alt="Professional office environment with modern workspace" 
                className="w-full h-full object-cover" 
              />
              
              <div className="absolute inset-0 bg-slate-900/40"></div>

              <div 
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70 transition-[mask-image] duration-200 ease-out"
                style={{
                  maskImage: 'radial-gradient(circle 0px at 0px 0px, transparent 0%, black 100%)',
                  WebkitMaskImage: 'radial-gradient(circle 0px at 0px 0px, transparent 0%, black 100%)'
                }}
              ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pointer-events-none">
              <div className="max-w-3xl pointer-events-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }}
                >
                  <h1 
                    ref={headingRef}
                    className="mb-6 text-transparent bg-clip-text transition-[background-image] duration-75"
                    style={{ backgroundImage: 'linear-gradient(#ffffff, #ffffff)' }}
                  >
                    Professional CA services
                  </h1>
                  
                  <p 
                    ref={paragraphRef}
                    className="text-xl mb-8 leading-relaxed text-transparent bg-clip-text transition-[background-image] duration-75"
                    style={{ backgroundImage: 'linear-gradient(#e2e8f0, #e2e8f0)' }}
                  >
                    Personalized accounting solutions tailored to your business needs. From tax planning to financial consulting, get expert guidance you can trust.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <QuickContactSheet>
                      <Button 
                        ref={btn1Ref}
                        size="lg" 
                        className="text-base transition-all duration-200 active:scale-[0.98] group bg-[#1b4498] hover:bg-[#1b4498]/90 text-white hover:text-white border-0"
                        style={{ transition: 'background-image 0.1s ease' }}
                      >
                        Schedule consultation
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </QuickContactSheet>
                    
                    <Button
                      asChild
                      ref={btn2Ref}
                      size="lg"
                      variant="outline"
                      className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-200 active:scale-[0.98]"
                      style={{ transition: 'background-image 0.1s ease' }}
                    >
                      <Link to="/services">View services</Link>
                    </Button>
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
                {services.map((service, index) => (
                  <Link key={service.hash || index} to={`/services#${service.hash}`} className="group">
                    <ServiceCard {...service} index={index} className="cursor-pointer" />
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg" className="transition-all duration-200 active:scale-[0.98]">
                  <Link to="/services">
                    View all services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
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

          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-slate-800 bg-primary shadow-2xl">
            
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />

              <div className="relative z-10 px-6 py-10 md:py-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3 tracking-tight">
                  Ready to get started?
                </h2>
                
                <p className="text-base md:text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Schedule a consultation today and discover how personalized CA services can benefit your business.
                </p>
                
                <QuickContactSheet>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="rounded-full px-8 text-base font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]"
                  >
                    Contact us today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </QuickContactSheet>
              </div>
              
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
export default HomePage;