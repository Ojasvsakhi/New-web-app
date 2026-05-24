import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Search, ArrowLeft, Clock, ChevronRight, TrendingUp, X, ChevronDown, Check } from 'lucide-react';
import TypewriterTitle from '../components/TypewriterTitle';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [isMobileReaderOpen, setIsMobileReaderOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const contentRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* <span className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Market Insights</span>
            </span> */}
            <TypewriterTitle prefix="Financial " highlight="Briefing" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Daily updates, tax strategies, and regulatory shifts curated specifically for growing businesses and professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={contentRef} className="pb-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
                  
                  <div className="relative flex-1" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full flex items-center justify-between pl-9 pr-4 py-2.5 bg-muted/50 hover:bg-muted border rounded-xl transition-all outline-none text-sm font-medium ${
                        isDropdownOpen 
                          ? 'bg-background border-blue-500 ring-2 ring-blue-500/20 text-foreground' 
                          : 'border-transparent text-foreground'
                      }`}
                    >
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground absolute left-3 pointer-events-none" />
                        <span className="truncate">
                          {selectedArchive === 'all' 
                            ? 'All Publications' 
                            : availableArchives.find(a => a.value === selectedArchive)?.label || 'All Publications'}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                        >
                          <div className="max-h-[240px] overflow-y-auto custom-scrollbar p-1.5 flex flex-col gap-1">
                            <button
                              onClick={() => {
                                setSelectedArchive('all');
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                selectedArchive === 'all' 
                                  ? 'bg-blue-50 text-blue-700' 
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              }`}
                            >
                              All Publications
                              {selectedArchive === 'all' && <Check className="w-4 h-4 text-blue-600" />}
                            </button>
                            
                            {availableArchives.map((archive) => {
                              const isSelected = selectedArchive === archive.value;
                              return (
                                <button
                                  key={archive.value}
                                  onClick={() => {
                                    setSelectedArchive(archive.value);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    isSelected 
                                      ? 'bg-blue-50 text-blue-700' 
                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                  }`}
                                >
                                  {archive.label}
                                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                  {(searchQuery || selectedArchive !== 'all') && !loading && (
                      <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {filteredBlogs.length} found
                      </span>
                  )}
                </div>
                
                <div className="space-y-3 max-h-[calc(100vh-380px)] overflow-y-auto custom-scrollbar pr-2 pl-2 -ml-2 pb-12">
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full p-5 rounded-2xl border border-border bg-card animate-pulse">
                          <div className="h-3 w-24 bg-muted rounded mb-3"></div>
                          <div className="h-5 w-full bg-muted rounded mb-2"></div>
                          <div className="h-5 w-2/3 bg-muted rounded mb-4"></div>
                          <div className="h-4 w-20 bg-muted rounded mt-auto"></div>
                        </div>
                      ))}
                    </div>
                  ) : filteredBlogs.length === 0 ? (
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
                {loading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-card rounded-[2rem] border border-border shadow-lg overflow-hidden flex flex-col h-fit animate-pulse"
                  >
                    <div className="p-8 md:p-12 lg:p-16">
                      <div className="flex items-center space-x-2 mb-8">
                        <div className="h-5 w-5 bg-muted rounded"></div>
                        <div className="h-4 w-32 bg-muted rounded"></div>
                      </div>
                      <div className="space-y-4 mb-10">
                        <div className="h-10 w-full bg-muted rounded"></div>
                        <div className="h-10 w-4/5 bg-muted rounded"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-11/12 bg-muted rounded"></div>
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-4/5 bg-muted rounded"></div>
                      </div>
                    </div>
                  </motion.div>
                ) : selectedBlog ? (
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
                ) : (
                  <div className="bg-card rounded-[2rem] p-12 text-center border border-border shadow-sm flex flex-col items-center justify-center h-full min-h-[400px]">
                    <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No updates yet</h3>
                    <p className="text-muted-foreground">Check back later for today's market insights.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}