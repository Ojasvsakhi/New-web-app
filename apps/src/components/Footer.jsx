import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Rupesh Sakhi & Co
            </span>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Providing personalized chartered accountant services with 13 years of professional experience. Your trusted partner for tax planning, audit, and financial consulting.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Quick links</span>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-slate-300 hover:text-secondary transition-all duration-200 text-sm">
                Home
              </Link>
              <Link to="/services" className="text-slate-300 hover:text-secondary transition-all duration-200 text-sm">
                Services
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-secondary transition-all duration-200 text-sm">
                About
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-secondary transition-all duration-200 text-sm">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Contact information</span>
            <div className="flex flex-col space-y-3">
              <a href="mailto:contact@rupeshsakhi.com" className="flex items-center space-x-3 text-slate-300 hover:text-secondary transition-all duration-200 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contact@rupeshsakhi.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center space-x-3 text-slate-300 hover:text-secondary transition-all duration-200 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start space-x-3 text-slate-300 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>Professional CA Practice<br />India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
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
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Professional disclaimer: The information provided on this website is for general informational purposes only and does not constitute professional advice. Please consult with a qualified chartered accountant for specific guidance related to your financial matters.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;