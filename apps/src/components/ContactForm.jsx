import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-sm font-medium mb-2 block">
          Full name
        </Label>
        <Input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="text-gray-900 placeholder:text-gray-400"
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium mb-2 block">
          Email address
        </Label>
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
          className="text-gray-900 placeholder:text-gray-400"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
          Phone number
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone', { required: 'Phone number is required' })}
          className="text-gray-900 placeholder:text-gray-400"
          placeholder="+91 98765 43210"
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="serviceType" className="text-sm font-medium mb-2 block">
          Service type
        </Label>
        <Select onValueChange={(value) => setValue('serviceType', value)}>
          <SelectTrigger className="text-gray-900">
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
        <input type="hidden" {...register('serviceType', { required: 'Please select a service type' })} />
        {errors.serviceType && (
          <p className="text-sm text-destructive mt-1">{errors.serviceType.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium mb-2 block">
          Message
        </Label>
        <Textarea
          id="message"
          {...register('message', { required: 'Message is required' })}
          className="min-h-[150px] text-gray-900 placeholder:text-gray-400"
          placeholder="Tell us about your requirements..."
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full transition-all duration-200 active:scale-[0.98]"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}

export default ContactForm;