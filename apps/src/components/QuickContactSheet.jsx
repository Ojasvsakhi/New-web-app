import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ContactForm from '@/components/ContactForm.jsx';

export default function QuickContactSheet({ children }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-[400px] sm:w-[540px]">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Request a Consultation
          </SheetTitle>
          <SheetDescription>
            Fill out your details below. We prioritize consultation requests and will respond within 24 hours.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 pb-8">
          <ContactForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}