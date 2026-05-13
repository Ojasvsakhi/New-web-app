import React from 'react';
import { Star } from 'lucide-react';

function TestimonialCard({ name, role, content, rating }) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
        ))}
      </div>
      <p className="text-foreground leading-relaxed mb-4 italic">"{content}"</p>
      <div>
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;