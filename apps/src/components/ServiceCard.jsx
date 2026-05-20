import React from 'react';
import { motion } from 'framer-motion';

function ServiceCard({ icon: Icon, title, description, index, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-card rounded-2xl p-8 shadow-lg transition-all duration-300 transform border border-border will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:ring-1 group-hover:ring-primary/20 ${className}`}
      {...props}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-black/10 to-secondary/5 flex items-center justify-center transition-transform duration-300 transform group-hover:scale-110">
            <Icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 transition-colors duration-200 group-hover:text-black">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;