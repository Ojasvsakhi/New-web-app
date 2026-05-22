import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Search, ArrowLeft, Clock, ChevronRight, TrendingUp, X, ChevronDown } from 'lucide-react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArchive, setSelectedArchive] = useState('all'); 
  
  const [isMobileReaderOpen, setIsMobileReaderOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, content, published_date')
        .lte('published_date', today)
        .order('published_date', { ascending: false });

      if (!error && data && data.length > 0) {
        setBlogs(data);
        setSelectedBlog(data[0]);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const availableArchives = useMemo(() => {
    if (!blogs.length) return [];
    
    const archives = new Map();
    
    blogs.forEach(blog => {
      const yearMonth = blog.published_date.substring(0, 7);
      
      if (!archives.has(yearMonth)) {
        const dateObj = new Date(`${yearMonth}-01T00:00:00`);
        const label = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        archives.set(yearMonth, label);
      }
    });

    return Array.from(archives.entries()).map(([value, label]) => ({ value, label }));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesText = debouncedSearch.trim() === '' || 
        blog.title.toLowerCase().includes(debouncedSearch.toLowerCase().trim());
      
      const matchesArchive = selectedArchive === 'all' || 
        blog.published_date.startsWith(selectedArchive);

      return matchesText && matchesArchive;
    });
  }, [blogs, debouncedSearch, selectedArchive]);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setIsMobileReaderOpen(true);
    
    if (contentRef.current) {
      const yOffset = -40; 
      const elementPosition = contentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + yOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedArchive('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center animate-pulse">
          <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
          <p className="text-muted-foreground font-medium tracking-wide">Curating insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-blue-50/20 to-transparent blur-3xl rounded-full" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Market Insights</span>
            </span>
            <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Financial <span className="text-blue-600">Briefing.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Daily updates, tax strategies, and regulatory shifts curated specifically for growing businesses and professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={contentRef} className="pb-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {blogs.length === 0 ? (
            <div className="bg-card rounded-3xl p-12 text-center border border-border shadow-sm">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No updates yet</h3>
              <p className="text-muted-foreground">Check back later for today's market insights.</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-full">
              
              <div className={`w-full lg:w-1/3 flex-shrink-0 flex flex-col space-y-6 ${isMobileReaderOpen ? 'hidden lg:flex' : 'flex'}`}>
                
                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3">
                  
                  <div className="relative flex items-center">
                    <Search className="h-4 w-4 text-muted-foreground absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-foreground placeholder:text-muted-foreground text-sm font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center flex-1">
                      <Calendar className="h-4 w-4 text-muted-foreground absolute left-3 pointer-events-none" />
                      
                      <select
                        value={selectedArchive}
                        onChange={(e) => setSelectedArchive(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-foreground text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option value="all">All Publications</option>
                        {availableArchives.map((archive) => (
                          <option key={archive.value} value={archive.value}>
                            {archive.label}
                          </option>
                        ))}
                      </select>
                      
                      <ChevronDown className="h-4 w-4 text-muted-foreground absolute right-3 pointer-events-none" />
                    </div>
                    
                    {(searchQuery || selectedArchive !== 'all') && (
                      <button 
                        onClick={clearFilters}
                        title="Clear filters"
                        className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors border border-red-100 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center text-sm font-bold text-foreground uppercase tracking-wider">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      {(searchQuery || selectedArchive !== 'all') ? 'Filtered Results' : 'All Publications'}
                    </div>
                    {(searchQuery || selectedArchive !== 'all') && (
                       <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                         {filteredBlogs.length} found
                       </span>
                    )}
                  </div>
                  
                  <div className="space-y-3 max-h-[calc(100vh-380px)] overflow-y-auto custom-scrollbar pr-2 pl-2 -ml-2 pb-12">
                    {filteredBlogs.length === 0 ? (
                      <div className="p-6 text-center bg-card rounded-2xl border border-border border-dashed">
                        <Search className="w-6 h-6 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm font-medium">No briefings match your criteria.</p>
                        <button onClick={clearFilters} className="mt-2 text-blue-600 text-sm font-semibold hover:underline">Clear filters</button>
                      </div>
                    ) : (
                      filteredBlogs.map((blog) => {
                        const isSelected = selectedBlog?.id === blog.id;
                        return (
                          <button
                            key={blog.id}
                            onClick={() => handleSelectBlog(blog)}
                            className={`w-full text-left group flex flex-col p-5 rounded-2xl transition-all duration-200 border ${
                              isSelected 
                                ? 'bg-blue-600 border-blue-600 shadow-md transform scale-[1.02]' 
                                : 'bg-card border-border hover:border-blue-300 hover:shadow-sm'
                            }`}
                          >
                            <span className={`text-xs font-semibold mb-2 ${isSelected ? 'text-blue-200' : 'text-muted-foreground'}`}>
                              {new Date(blog.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <h4 className={`text-base font-bold leading-snug mb-3 lining-nums ${isSelected ? 'text-white' : 'text-foreground group-hover:text-blue-700'}`}>
                              {blog.title}
                            </h4>
                            
                            <div className="mt-auto flex items-center h-5">
                              {isSelected ? (
                                 <span className="text-xs font-bold text-green-300 uppercase tracking-wider flex items-center">
                                   <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-2"></span>
                                   Reading
                                 </span>
                              ) : (
                                <>
                                  <span className="text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read Briefing
                                  </span>
                                  <ChevronRight className="w-4 h-4 ml-1 text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                </>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className={`w-full lg:w-2/3 ${!isMobileReaderOpen ? 'hidden lg:block' : 'block'}`}>
                <AnimatePresence mode="wait">
                  {selectedBlog && (
                    <motion.div
                      key={selectedBlog.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-[2rem] border border-border shadow-lg overflow-hidden flex flex-col h-fit"
                    >
                      <div className="lg:hidden p-4 border-b border-border bg-muted/30">
                        <button 
                          onClick={() => setIsMobileReaderOpen(false)}
                          className="flex items-center text-sm font-semibold text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to feed
                        </button>
                      </div>

                      <div className="p-8 md:p-12 lg:p-16">
                        <div className="flex items-center space-x-2 text-blue-600 mb-8">
                          <Calendar className="h-5 w-5" />
                          <span className="text-sm font-bold tracking-wider uppercase">
                            {new Date(selectedBlog.published_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5l lg:text-6l font-bold mb-5 text-foreground leading-[1.1] lining-nums">
                          {selectedBlog.title}
                        </h2>
                        
                        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {selectedBlog.content}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  );
}