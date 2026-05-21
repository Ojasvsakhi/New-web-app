import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Clock, ArrowRight, TrendingUp } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .lte('published_date', today)
        .order('published_date', { ascending: false });

      if (!error && data) {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [blogs.length, isHovered]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <BookOpen className="h-10 w-10 text-blue-300 mb-4 animate-bounce" />
          <p className="text-muted-foreground font-medium">Loading today's insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/60 blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-16">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Market Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            The Financial <span className="text-blue-600">Briefing </span>
          </h1>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl">
            Daily updates, tax strategies, and regulatory shifts curated specifically for growing businesses and professionals.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-lg">No updates available for today. Please check back tomorrow.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div 
              className="lg:col-span-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative h-[500px] md:h-[550px] w-full overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col"
                  >
                    <div className="flex items-center space-x-2 text-blue-600 mb-6">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-bold tracking-wider uppercase">
                        {new Date(blogs[currentIndex].published_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {blogs[currentIndex].title}
                    </h2>
                    
                    <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap flex-grow">
                      {blogs[currentIndex].content}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100">
                  <motion.div 
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "0%" : "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-8 ml-4">
                {blogs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Briefings
                </h3>
                
                <div className="space-y-2">
                  {blogs.slice(0, 5).map((blog, idx) => (
                    <button
                      key={blog.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-full text-left group flex flex-col p-4 rounded-2xl transition-all duration-300 border ${
                        idx === currentIndex 
                          ? 'bg-blue-50 border-blue-100 shadow-sm' 
                          : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'
                      }`}
                    >
                      <span className={`text-xs font-semibold mb-2 ${idx === currentIndex ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-600'}`}>
                        {new Date(blog.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <h4 className={`text-sm font-semibold line-clamp-2 leading-snug ${idx === currentIndex ? 'text-blue-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {blog.title}
                      </h4>
                      
                      {idx === currentIndex && (
                        <ArrowRight className="w-4 h-4 text-blue-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}