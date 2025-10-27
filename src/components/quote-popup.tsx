
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';

export interface Quote {
  quote: string;
  author: string;
}

interface QuotePopupProps {
  initialQuote: Quote;
}

const SESSION_STORAGE_KEY = 'quotePopupShown';

export function QuotePopup({ initialQuote }: QuotePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      }, 1500); // Delay popup just a bit
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
             <Lightbulb className="h-6 w-6 text-primary" />
            Quote of the Day
          </DialogTitle>
          <DialogDescription>A dose of daily inspiration for your journey.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <blockquote className="text-lg text-center italic text-foreground">
            "{initialQuote.quote}"
          </blockquote>
          <p className="text-right text-sm text-zinc-400 font-medium mt-4">— {initialQuote.author}</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
