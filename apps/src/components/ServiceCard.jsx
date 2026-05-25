import React from 'react';
import { motion } from 'framer-motion';

function ServiceCard({ icon: Icon, title, description, index, theme, className = '', ...props }) {
  const t = theme || { 
    bgLight: 'bg-primary/10', 
    hoverBg: 'hover:bg-primary/10', 
    ring: 'ring-primary/30', 
    text: 'text-primary', 
    bg: 'bg-primary', 
    gradientFrom: 'from-primary/20' 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative bg-card rounded-2xl p-8 shadow-lg transition-all duration-300 transform border border-border will-change-transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${className}`}
      {...props}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradientFrom} to-transparent opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none`} />

      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${t.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex items-start space-x-4">
        <div className="flex-shrink-0">
          
          <div className="relative">
            <div className={`absolute -inset-2 bg-gradient-to-tr ${t.gradientFrom} to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
            <div className={`relative w-14 h-14 rounded-xl ${t.bgLight} border border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md group-hover:-rotate-3`}>
              <Icon className={`h-7 w-7 ${t.text} transition-transform duration-300`} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-foreground transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;