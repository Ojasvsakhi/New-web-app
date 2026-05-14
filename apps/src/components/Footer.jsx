import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
function Footer() {
  const location = useLocation();
  const handleLinkClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-slate-900 text-slate-200 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-bold" style={{ fontFamily: '"CleanAmpersand", "Playfair Display", serif' }}>
              Rupesh Sakhi & Co
            </span>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Providing personalized chartered accountant services with 13 years of professional experience. Your trusted partner for tax planning, audit, and financial consulting.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-3 block text-slate-100">Quick links</span>
            <nav className="flex flex-col space-y-2">
              <Link to="/" onClick={() => handleLinkClick('/')} className="text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                Home
              </Link>
              <Link to="/services" onClick={() => handleLinkClick('/services')} className="text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                Services
              </Link>
              <Link to="/about" onClick={() => handleLinkClick('/about')} className="text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                About
              </Link>
              <Link to="/contact" onClick={() => handleLinkClick('/contact')} className="text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                Contact
              </Link>
              <Link to="/links" onClick={() => handleLinkClick('/links')} className="text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                Links
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-lg font-semibold mb-3 block text-slate-100">Contact information</span>
            <div className="flex flex-col space-y-3">
              <a href="mailto:rupesh.sakhi@icai.org" className="flex items-center space-x-3 text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>rupesh.sakhi@icai.org</span>
              </a>
              <a href="tel:+9406649542" className="flex items-center space-x-3 text-slate-400 hover:text-secondary transition-all duration-200 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 9406649542</span>
              </a>
              
              <a 
                href="https://www.google.com/maps/@22.7236682,75.8661695,19.72z?entry=ttu&g_ep=EgoyMDI2MDUxMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 text-slate-400 hover:text-secondary transition-all duration-200 text-sm"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>
                  MSB 509, New Siyaganj, Patthar Godown Road, <br />Indore-452001, Madhya Pradesh, India
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Rupesh Sakhi & Co. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-slate-400 hover:text-secondary transition-all duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-slate-400 hover:text-secondary transition-all duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed text-center md:text-left">
            Professional disclaimer: The information provided on this website is for general informational purposes only and does not constitute professional advice. Please consult with a qualified chartered accountant for specific guidance related to your financial matters.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;