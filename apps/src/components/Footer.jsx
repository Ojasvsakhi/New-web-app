import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Check } from 'lucide-react';

function Footer() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const handleLinkClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('9406649542');
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <footer className="bg-[#0f172a] text-slate-300 mt-auto border-t border-slate-800 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12">
          
          <div className="md:w-2/5 flex flex-col space-y-3">
            <Link to="/" onClick={() => handleLinkClick('/')} className="w-fit">
              <span className="text-2xl font-bold text-slate-100 tracking-tight" style={{ fontFamily: '"CleanAmpersand", "Playfair Display", serif' }}>
                Rupesh Sakhi & Co
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Providing personalized chartered accountant services with 13 years of professional experience. Your trusted partner for tax planning, audit, and financial consulting.
            </p>
          </div>

          <div className="md:w-1/5">
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link to="/" onClick={() => handleLinkClick('/')} className={`group flex items-center text-sm transition-all duration-200 w-fit ${location.pathname === '/' ? 'text-secondary' : 'text-slate-400 hover:text-secondary'}`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-secondary transition-all duration-300 ${location.pathname === '/' ? 'opacity-100 mr-2' : 'opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2'}`}></span>
                Home
              </Link>
              <Link to="/services" onClick={() => handleLinkClick('/services')} className={`group flex items-center text-sm transition-all duration-200 w-fit ${location.pathname === '/services' ? 'text-secondary' : 'text-slate-400 hover:text-secondary'}`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-secondary transition-all duration-300 ${location.pathname === '/services' ? 'opacity-100 mr-2' : 'opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2'}`}></span>
                Services
              </Link>
              <Link to="/about" onClick={() => handleLinkClick('/about')} className={`group flex items-center text-sm transition-all duration-200 w-fit ${location.pathname === '/about' ? 'text-secondary' : 'text-slate-400 hover:text-secondary'}`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-secondary transition-all duration-300 ${location.pathname === '/about' ? 'opacity-100 mr-2' : 'opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2'}`}></span>
                About
              </Link>
              <Link to="/contact" onClick={() => handleLinkClick('/contact')} className={`group flex items-center text-sm transition-all duration-200 w-fit ${location.pathname === '/contact' ? 'text-secondary' : 'text-slate-400 hover:text-secondary'}`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-secondary transition-all duration-300 ${location.pathname === '/contact' ? 'opacity-100 mr-2' : 'opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2'}`}></span>
                Contact
              </Link>
              <Link to="/links" onClick={() => handleLinkClick('/links')} className={`group flex items-center text-sm transition-all duration-200 w-fit ${location.pathname === '/links' ? 'text-secondary' : 'text-slate-400 hover:text-secondary'}`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-secondary transition-all duration-300 ${location.pathname === '/links' ? 'opacity-100 mr-2' : 'opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-2'}`}></span>
                Links
              </Link>
            </nav>
          </div>

          <div className="md:w-2/5">
            <h3 className="text-sm font-semibold text-slate-100 tracking-wider uppercase mb-4">Reach Out</h3>
            <div className="flex flex-col space-y-3.5">
              
              <a href="mailto:rupesh.sakhi@icai.org" className="group flex items-center space-x-3 text-sm text-slate-400 hover:text-slate-200 transition-colors w-fit">
                <div className="p-2 bg-slate-800/60 rounded-md group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>rupesh.sakhi@icai.org</span>
              </a>
              
              <button 
                  onClick={handleCopyPhone}
                  className="group flex items-center space-x-3 text-sm text-slate-400 hover:text-slate-200 transition-colors w-fit text-left"
                >
                  <div className={`p-2 rounded-md transition-colors grid [grid-template-areas:'stack'] place-items-center ${copied ? 'bg-green-500/20 text-green-500' : 'bg-slate-800/60 group-hover:bg-secondary/20 group-hover:text-secondary'}`}>
                    <Check className={`h-4 w-4 [grid-area:stack] transition-all duration-300 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                    <Phone className={`h-4 w-4 [grid-area:stack] transition-all duration-300 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
                  </div>
                  <span className="grid [grid-template-areas:'stack'] text-left overflow-hidden">
                    <span className={`[grid-area:stack] transition-all duration-300 ${copied ? 'opacity-100 translate-y-0 text-green-500' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      Copied to clipboard!
                    </span>
                    <span className={`[grid-area:stack] transition-all duration-300 ${copied ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                      +91 9406649542
                    </span>
                  </span>
                </button>
              
              <a 
                href="https://www.google.com/maps/@22.7236682,75.8661695,19.72z?entry=ttu&g_ep=EgoyMDI2MDUxMi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-start space-x-3 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                <div className="p-2 bg-slate-800/60 rounded-md group-hover:bg-secondary/20 group-hover:text-secondary transition-colors shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed mt-1">
                  MSB 509, New Siyaganj, Patthar Godown Road,<br />
                  Indore-452001, Madhya Pradesh, India
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-sm text-slate-400 order-2 md:order-1">
              © {new Date().getFullYear()} Rupesh Sakhi & Co. All rights reserved.
            </p>
            <div className="flex space-x-6 order-1 md:order-2">
              <Link 
                to="/privacy" 
                onClick={() => handleLinkClick('/privacy')}
                className={`text-sm transition-colors ${location.pathname === '/privacy' ? 'text-secondary font-medium' : 'text-slate-400 hover:text-secondary'}`}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                onClick={() => handleLinkClick('/terms')}
                className={`text-sm transition-colors ${location.pathname === '/terms' ? 'text-secondary font-medium' : 'text-slate-400 hover:text-secondary'}`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-[11px] text-slate-500/70 leading-relaxed text-center md:text-left border-t border-slate-800/30 pt-4 max-w-full">
            Professional disclaimer: The information provided on this website is for general informational purposes only and does not constitute formal professional advice. Please contact us directly for specific guidance tailored to your unique financial matters.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;