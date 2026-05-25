// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import { motion } from 'framer-motion';
// import { ExternalLink, BookOpen } from 'lucide-react';
// import { linksCategories } from '@/data/LinksData';
// import TypewriterTitle from '../components/TypewriterTitle';
// function LinksPage() {
//   const location = useLocation();
//   const [highlightedSection, setHighlightedSection] = useState(null);

//   useEffect(() => {
//     if (location.hash) {
//       const id = location.hash.replace('#', '');
//       setHighlightedSection(id);
      
//       const timer = setTimeout(() => {
//         setHighlightedSection(null);
//       }, 700);
      
//       return () => clearTimeout(timer);
//     }
//   }, [location.hash, location.key]);

//   return (
//     <>
//       <Helmet>
//         <title>Useful Links</title>
//       </Helmet>

//       <div className="min-h-screen bg-background pb-24">
//         <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
//           <div className="max-w-7xl mx-auto px-4 text-center">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="text-center max-w-3xl mx-auto"
//             >
//               <TypewriterTitle prefix="Useful " highlight="Links" />
//               <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
//                 Important resources and government portals for your financial needs
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         <section>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
//             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              
//               {linksCategories.map((category, index) => (
//                 <motion.div 
//                   key={category.id} 
//                   id={category.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   className={`break-inside-avoid border rounded-2xl p-6 sm:p-8 scroll-mt-28 transition-all duration-700 ease-in-out ${
//                     highlightedSection === category.id
//                       ? 'bg-primary/10 shadow-2xl scale-[1.02] border-primary/30 z-10 relative ring-1 ring-primary/30'
//                       : 'bg-card border-border shadow-sm scale-100 z-0'
//                   }`}
//                 >
//                   <h2 className="text-xl font-bold mb-6 flex items-center border-b border-border/50 pb-4">
//                     <BookOpen className="mr-3 text-primary h-5 w-5 flex-shrink-0" />
//                     {category.title}
//                   </h2>
                  
//                   <div className="flex flex-col space-y-6">
//                     {category.subcategories.map((sub, idx) => (
//                       <div key={idx}>
//                         <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/80 mb-3 bg-primary/5 inline-block px-3 py-1 rounded-full">
//                           {sub.name}
//                         </h3>
//                         <ul className="space-y-2.5">
//                           {sub.links.map((link, lIdx) => (
//                             <li key={lIdx}>
//                               <a 
//                                 href={link.url} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="group flex items-start text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
//                               >
//                                 <ExternalLink className="mr-2.5 h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
//                                 <span className="leading-snug">{link.name}</span>
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}

//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// export default LinksPage;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { linksCategories } from '@/data/LinksData';
import TypewriterTitle from '../components/TypewriterTitle';

function totalLinks(category) {
  return category.subcategories.reduce((sum, sub) => sum + sub.links.length, 0);
}

function LinksPage() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [highlightedSection, setHighlightedSection] = useState(null);

  const filteredCategories = linksCategories.map(category => {
    const term = searchTerm.toLowerCase();
    const categoryMatches = category.title.toLowerCase().includes(term);

    const filteredSubcategories = category.subcategories.map(sub => {
      const subMatches = sub.name.toLowerCase().includes(term);
      const filteredLinks = sub.links.filter(link =>
        categoryMatches ||
        subMatches ||
        link.name.toLowerCase().includes(term)
      );
      return { ...sub, links: filteredLinks };
    }).filter(sub => sub.links.length > 0);

    return { ...category, subcategories: filteredSubcategories };
  }).filter(category => category.subcategories.length > 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    linksCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setHighlightedSection(id);
          const timer = setTimeout(() => setHighlightedSection(null), 1500);
          return () => clearTimeout(timer);
        }
      }, 100);
    }
  }, [location.hash, location.key]);

  return (
    <>
      <Helmet>
        <title>Useful Links - Rupesh Sakhi & Co</title>
        <meta name="description" content="Important regulatory, tax, and financial links curated by Rupesh Sakhi & Co for quick access." />
      </Helmet>

      <div className="min-h-screen bg-background pb-32">

        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-b border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <TypewriterTitle prefix="Useful " highlight="Links" />
              <p className="text-lg text-muted-foreground leading-relaxed mt-6 mb-10">
                Quick access to important government portals, regulatory bodies, and financial resources.
              </p>

              <div className="relative max-w-xl mx-auto group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for a portal, act, or resource..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-6 py-7 rounded-full bg-card border-border shadow-md hover:shadow-lg text-base focus-visible:ring-primary/50 transition-all hover:border-primary/30"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 mt-14">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16 items-start">

            <div className="hidden md:flex flex-col w-56 shrink-0 sticky top-32 gap-1">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/60 mb-3 px-3">
                Directory
              </p>
              {linksCategories.map((category, i) => {
                const isFiltered = searchTerm && !filteredCategories.find(c => c.id === category.id);
                const isFirstMatch = searchTerm && filteredCategories[0]?.id === category.id;
                const isActive = searchTerm ? isFirstMatch : activeSection === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(category.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                        setHighlightedSection(category.id);
                        setTimeout(() => setHighlightedSection(null), 1500);
                      }
                    }}
                    className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isFiltered
                        ? 'opacity-25 pointer-events-none'
                        : isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className={`text-[10px] font-mono tabular-nums shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground/40'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate leading-snug">{category.title}</span>
                    </span>
                    <span className={`text-[10px] tabular-nums shrink-0 px-1.5 py-0.5 rounded-md font-medium transition-colors ${
                      isActive ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground/50 group-hover:bg-muted/80'
                    }`}>
                      {totalLinks(category)}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="flex-1 min-w-0 w-full">

              {filteredCategories.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24 rounded-3xl border border-dashed border-border bg-muted/10"
                >
                  <Search className="h-8 w-8 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-base text-muted-foreground">
                    No results for <span className="font-semibold text-foreground">"{searchTerm}"</span>
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-primary text-sm mt-3 font-medium hover:underline"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-20">
                  {filteredCategories.map((category, catIdx) => (
                    <motion.section
                      key={category.id}
                      id={category.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.45, delay: catIdx * 0.05 }}
                      className="scroll-mt-32 relative"
                    >
                      <div className={`absolute -inset-6 md:-inset-8 rounded-[2rem] transition-all duration-700 pointer-events-none ${
                        highlightedSection === category.id
                          ? 'bg-primary/5 ring-1 ring-primary/20 shadow-lg opacity-100'
                          : 'opacity-0'
                      }`} />

                      <div className="relative z-10">

                        <div className="flex items-end gap-5 mb-8">
                          <span className="text-[11px] font-mono text-muted-foreground/35 mb-1 tabular-nums">
                            {String(linksCategories.findIndex(c => c.id === category.id) + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-tight">
                              {category.title}
                            </h2>
                          </div>
                          <div className="flex-1 h-px bg-border mb-1.5 hidden sm:block" />
                          <span className="text-xs text-muted-foreground/50 mb-1 tabular-nums shrink-0">
                            {filteredCategories.find(c => c.id === category.id)
                              ? filteredCategories.find(c => c.id === category.id).subcategories.reduce((s, sub) => s + sub.links.length, 0)
                              : 0} links
                          </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {category.subcategories.map((sub, subIdx) => (
                            <div
                              key={subIdx}
                              className="group/card relative rounded-2xl border border-border/70 bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/20 group-hover/card:bg-primary/50 transition-colors duration-300 rounded-l-2xl" />

                              <div className="pl-5 pr-4 pt-4 pb-3">
                                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary/70 mb-3">
                                  {sub.name}
                                </p>

                                <ul className="divide-y divide-border/40">
                                  {sub.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                      <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/link flex items-center justify-between gap-3 py-2.5 transition-colors duration-200"
                                      >
                                        <span className="text-sm text-foreground/75 group-hover/link:text-primary leading-snug transition-colors duration-200 flex-1">
                                          {link.name}
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground/0 group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-200" />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LinksPage;