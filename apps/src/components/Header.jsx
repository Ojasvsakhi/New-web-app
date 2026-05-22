import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import QuickContactSheet from '@/components/QuickContactSheet.jsx';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [expandedMobileNav, setExpandedMobileNav] = useState(null);
  const isFirstRender = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  
  const [boxStyle, setBoxStyle] = useState({ left: 0, width: 0, top: 0, height: 0, opacity: 0 });
    const handleLinkClick = (path) => {
      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  const navLinks = [
    { 
      name: 'Home', 
      path: '/',
      dropdown: [
        { name: 'Core Services', hash: 'core-services' },
        { name: 'Why Choose Us', hash: 'why-choose-us' },
        { name: 'Testimonials', hash: 'testimonials' }
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        {name: 'Tax planning & compliance', hash: 'tax-planning'},
        {name: 'GST Planning and compliance', hash: 'gst-indirect'},
        {name: 'Company Law Services', hash: 'company-law'},
        {name: 'LLP Services', hash: 'llp-services'},
        {name: 'RERA Services', hash: 'rera-services'},
        {name: 'FEMA & NRI Advisory', hash: 'fema-nri'},
        {name: 'Audit services', hash: 'audit-services'},
        {name: 'Financial consulting', hash: 'financial-consulting'},
        {name: 'Bookkeeping & accounting', hash: 'bookkeeping-accounting'},
        {name: 'Business advisory', hash: 'business-advisory'},
        {name: 'Financial statement preparation', hash: 'financial-statement'}
      ]
    },
    { 
      name: 'About', 
      path: '/about',
      dropdown: [
        { name: 'Professional Background', hash: 'background' },
        { name: 'Why Solo Practice?', hash: 'solo-practice' },
        { name: 'Areas of Expertise', hash: 'expertise' }
      ]
    },
    { name: 'Contact', path: '/contact' },
    { 
      name: 'Useful Links', 
      path: '/links',
      dropdown: [
        { name: 'Professional Bodies', hash: 'professional-bodies' },
        { name: 'Taxation Authorities', hash: 'taxation' },
        { name: 'Financial Markets', hash: 'financial-markets' },
        { name: 'Insurance Sector', hash: 'insurance' },
        { name: 'Government Ministries', hash: 'government' },
        { name: 'Judiciary System', hash: 'judiciary' }
      ]
    },
  ];

  useEffect(() => {
    const updateBoxPosition = () => {
      if (!navRef.current) return;
      const activeElement = navRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        setBoxStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          top: activeElement.offsetTop,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
      } else {
        setBoxStyle((prev) => ({
          ...prev,
          opacity: 0,
        }));
      }
    };
    updateBoxPosition();
    if (isFirstRender.current) {
      setTimeout(() => {
        isFirstRender.current = false;
      }, 50); 
    }
    window.addEventListener('resize', updateBoxPosition);
    return () => window.removeEventListener('resize', updateBoxPosition);
  }, [location.pathname]);

  const scrollToHeading = (hash) => {
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    if (location.hash) {
      scrollToHeading(location.hash.replace('#', ''));
    }
  }, [location]);

  const handleDropdownClick = (e, path, hash) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen(false);
    setHoveredNav(null);
    navigate(`${path}#${hash}`);
    if (location.pathname === path) {
      scrollToHeading(hash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary" style={{ fontFamily: "'ClearAmpersand','Playfair Display, serif'" }}>
                Rupesh Sakhi & Co
              </span>
              <span className="text-xs text-muted-foreground tracking-wide uppercase">Chartered Accountants</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            <nav ref={navRef} className="flex items-center space-x-2 relative mr-6">
              
              <motion.div
                  className="absolute bg-primary rounded-lg pointer-events-none z-0"
                  animate={boxStyle}
                  transition={
                    isFirstRender.current 
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 120, damping: 20, mass: 1.2 }
                  }
              />

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <div
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    data-active={isActive}
                    className="relative inline-block"
                    onMouseEnter={() => setHoveredNav(link.name)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <Link
                      to={link.path}
                      className={`relative z-10 px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center rounded-lg ${
                        isActive 
                          ? 'text-white' 
                          : 'text-foreground hover:text-primary hover:bg-primary/10'
                      }`}
                    >
                      {link.name}
                      {link.dropdown && <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${hoveredNav === link.name ? 'rotate-180' : 'opacity-70'}`} />}
                    </Link>

                    <AnimatePresence>
                      {link.dropdown && hoveredNav === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute left-0 top-full mt-1 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 py-2"
                        >
                          {link.dropdown.map((item) => (
                            <a
                              key={item.hash}
                              href={`${link.path}#${item.hash}`}
                              onClick={(e) => handleDropdownClick(e, link.path, item.hash)}
                              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                            >
                              {item.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <QuickContactSheet>
              <Button className="rounded-full px-6 transition-all duration-200 hover:shadow-md">
                Let's talk
              </Button>
            </QuickContactSheet>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden"
            >
              <div className="flex flex-col space-y-1 py-4">
                {navLinks.map((link) => (
                  <div key={link.path} className="flex flex-col">
                    <div className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/50'
                    }`}>
                      <Link 
                        to={link.path} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 font-medium text-sm py-1"
                      >
                        {link.name}
                      </Link>
                      
                      {link.dropdown && (
                        <button 
                          onClick={() => setExpandedMobileNav(expandedMobileNav === link.name ? null : link.name)}
                          className="p-2"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedMobileNav === link.name ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {link.dropdown && expandedMobileNav === link.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col overflow-hidden bg-muted/30 rounded-lg mx-2 mt-1"
                        >
                          {link.dropdown.map((item) => (
                            <a
                              key={item.hash}
                              href={`${link.path}#${item.hash}`}
                              onClick={(e) => handleDropdownClick(e, link.path, item.hash)}
                              className="px-6 py-3 text-sm text-muted-foreground hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                            >
                              {item.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="px-4 pt-4">
                  <QuickContactSheet>
                    <Button className="w-full transition-all duration-200 active:scale-[0.98]">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule consultation
                    </Button>
                  </QuickContactSheet>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;