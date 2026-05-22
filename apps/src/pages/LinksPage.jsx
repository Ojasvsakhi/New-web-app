import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';
import { linksCategories } from '@/data/LinksData';

function LinksPage() {
  const location = useLocation();
  const [highlightedSection, setHighlightedSection] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setHighlightedSection(id);
      
      const timer = setTimeout(() => {
        setHighlightedSection(null);
      }, 700);
      
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.key]);

  return (
    <>
      <Helmet>
        <title>Useful Links - Rupesh Sakhi & Co</title>
      </Helmet>

      <div className="min-h-screen bg-background pb-24">
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 mb-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="mb-6 text-4xl md:text-5xl font-bold">Useful <span className="text-blue-600">Links</span></h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A curated directory of essential portals for Indian tax, legal, and financial regulatory bodies.
              </p>
            </motion.div>
          </div>
        </section>

        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              
              {linksCategories.map((category, index) => (
                <motion.div 
                  key={category.id} 
                  id={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`break-inside-avoid border rounded-2xl p-6 sm:p-8 scroll-mt-28 transition-all duration-700 ease-in-out ${
                    highlightedSection === category.id
                      ? 'bg-primary/10 shadow-2xl scale-[1.02] border-primary/30 z-10 relative ring-1 ring-primary/30'
                      : 'bg-card border-border shadow-sm scale-100 z-0'
                  }`}
                >
                  <h2 className="text-xl font-bold mb-6 flex items-center border-b border-border/50 pb-4">
                    <BookOpen className="mr-3 text-primary h-5 w-5 flex-shrink-0" />
                    {category.title}
                  </h2>
                  
                  <div className="flex flex-col space-y-6">
                    {category.subcategories.map((sub, idx) => (
                      <div key={idx}>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/80 mb-3 bg-primary/5 inline-block px-3 py-1 rounded-full">
                          {sub.name}
                        </h3>
                        <ul className="space-y-2.5">
                          {sub.links.map((link, lIdx) => (
                            <li key={lIdx}>
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-start text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                              >
                                <ExternalLink className="mr-2.5 h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{link.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LinksPage;