import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, LogOut, PenTool, CheckCircle2, Trash2, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [existingBlogs, setExistingBlogs] = useState([]);
  
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [2, 3, false] }], 
      ['bold', 'italic', 'underline'], 
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  }), []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) {
      fetchBlogs();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      const addTooltips = () => {
        const tooltips = {
          '.ql-bold': 'Bold',
          '.ql-italic': 'Italic',
          '.ql-underline': 'Underline',
          '.ql-list[value="ordered"]': 'Numbered List',
          '.ql-list[value="bullet"]': 'Bullet List',
          '.ql-link': 'Insert Link',
          '.ql-clean': 'Clear Formatting'
        };

        Object.entries(tooltips).forEach(([selector, text]) => {
          const button = document.querySelector(selector);
          if (button) button.setAttribute('title', text);
        });

        const headerDropdown = document.querySelector('.ql-header .ql-picker-label');
        if (headerDropdown) headerDropdown.setAttribute('title', 'Text Size');
      };

      const timeout = setTimeout(addTooltips, 200);
      return () => clearTimeout(timeout);
    }
  }, [session]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, published_date')
      .order('published_date', { ascending: true });

    if (!error && data) {
      setExistingBlogs(data);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setStatus({ type: 'error', message: error.message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || content === '<p><br></p>') {
      setStatus({ type: 'error', message: 'Content cannot be empty.' });
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
      return;
    }

    setStatus({ type: 'loading', message: 'Publishing securely...' });
    
    const { error } = await supabase
      .from('blogs')
      .insert([{ title, content, published_date: publishDate }]);

    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: 'Blog Published Successfully!' });
      setTitle('');
      setContent('');
      fetchBlogs();
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this post?")) return;

    setStatus({ type: 'loading', message: 'Deleting...' });
    
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      setStatus({ type: 'error', message: error.message });
    } else {
      setStatus({ type: 'success', message: 'Post deleted successfully.' });
      setExistingBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 relative z-10"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-blue-600 h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center text-slate-900">Admin Portal</h2>
            <p className="text-sm text-slate-500 text-center mb-8">Secure login for authorized authors only.</p>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 h-12"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 h-12"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              {status.message && (
                <p className="text-red-500 text-sm font-medium text-center">{status.message}</p>
              )}
              <Button type="submit" className="w-full h-12 text-base font-medium shadow-md">
                Secure Login
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <PenTool className="text-white h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">Publisher <span className='text-blue-600'>Dashboard</span></span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()} className="text-slate-500 hover:text-slate-900">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-12 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Write an Update</h1>
          <p className="text-sm text-slate-500 mb-6">Draft your daily insight. It will automatically appear on the blog feed.</p>
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-1.5 block">Post Title</label>
                  <Input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="h-12 text-base font-medium placeholder:font-normal bg-slate-50/50"
                    placeholder="Enter an engaging title..." 
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-1.5 block">Publication Date</label>
                  <Input 
                    type="date" 
                    value={publishDate} 
                    onChange={(e) => setPublishDate(e.target.value)} 
                    required 
                    className="h-12 w-full bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-1.5 block">Main Content</label>
                  <div className="bg-white rounded-md">
                    <ReactQuill 
                      theme="snow" 
                      value={content} 
                      onChange={setContent}
                      modules={quillModules}
                      className="h-64 mb-12"
                      placeholder="Start typing your insight here..." 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={status.type === 'loading'}
                  className="w-full shadow-md"
                >
                  {status.type === 'loading' && status.message !== 'Deleting...' ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-5">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Cleanup Old Posts</h2>
          <p className="text-sm text-slate-500 mb-6">Least recent updates are shown at the top. Delete them to save database space.</p>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            {existingBlogs.length === 0 ? (
              <p className="text-center text-slate-400 py-8 text-sm">No existing posts found.</p>
            ) : (
              <div className="space-y-3">
                {existingBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-colors hover:border-slate-200">
                    <div className="pr-4">
                      <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 mb-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{new Date(blog.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-700 line-clamp-2">{blog.title}</h4>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Delete Post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className={`mt-4 p-4 rounded-xl flex items-center space-x-2 text-sm font-medium border ${
                  status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                  status.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}
              >
                {status.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
                <span>{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </main>
    </div>
  );
}