import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Send, Loader2, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/' + import.meta.env.VITE_FORMSPREE_FORM_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success('Message sent successfully. We will contact you within 24 hours.');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ message }) => (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          className="text-sm text-destructive mt-1.5 ml-1 font-medium"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <Label htmlFor="name" className="text-sm font-semibold transition-colors group-focus-within:text-primary">
            Full name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="pl-10 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-primary/50"
              placeholder="John Doe"
            />
          </div>
          <ErrorMessage message={errors.name?.message} />
        </div>

        <div className="space-y-2 group">
          <Label htmlFor="email" className="text-sm font-semibold transition-colors group-focus-within:text-primary">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="pl-10 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-primary/50"
              placeholder="john@example.com"
            />
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <Label htmlFor="phone" className="text-sm font-semibold transition-colors group-focus-within:text-primary">
            Phone number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="pl-10 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-primary/50"
              placeholder="+91 98765 43210"
            />
          </div>
          <ErrorMessage message={errors.phone?.message} />
        </div>

        <div className="space-y-2 group">
          <Label htmlFor="serviceType" className="text-sm font-semibold transition-colors group-focus-within:text-primary">
            Service type
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 z-10 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Select onValueChange={(value) => setValue('serviceType', value)}>
              <SelectTrigger className="pl-10 text-foreground transition-all duration-300 focus:ring-primary/50 relative">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tax-planning">Tax planning & compliance</SelectItem>
                <SelectItem value="gst-indirect">GST Planning and compliance</SelectItem>
                <SelectItem value="company-law">Company Law Services</SelectItem>
                <SelectItem value="llp-services">LLP Services</SelectItem>
                <SelectItem value="rera-services">RERA Services</SelectItem>
                <SelectItem value="fema-nri">FEMA & NRI Advisory</SelectItem>
                <SelectItem value="audit-services">Audit services</SelectItem>
                <SelectItem value="financial-consulting">Financial consulting</SelectItem>
                <SelectItem value="bookkeeping-accounting">Bookkeeping & accounting</SelectItem>
                <SelectItem value="business-advisory">Business advisory</SelectItem>
                <SelectItem value="financial-statement">Financial statement preparation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <input type="hidden" {...register('serviceType', { required: 'Please select a service type' })} />
          <ErrorMessage message={errors.serviceType?.message} />
        </div>
      </div>

      <div className="space-y-2 group">
        <Label htmlFor="message" className="text-sm font-semibold transition-colors group-focus-within:text-primary">
          Message
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            className="pl-10 min-h-[160px] resize-y text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-visible:ring-primary/50"
            placeholder="Tell us about your requirements, timeline, or any specific questions..."
          />
        </div>
        <ErrorMessage message={errors.message?.message} />
      </div>

      <Button 
        type="submit" 
        size="lg"
        className="w-full relative overflow-hidden transition-all duration-300 active:scale-[0.98] bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
        disabled={isSubmitting}
      >
        <span className="flex items-center justify-center font-semibold tracking-wide">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              Send Message
            </>
          )}
        </span>
      </Button>
    </form>
  );
}

export default ContactForm;