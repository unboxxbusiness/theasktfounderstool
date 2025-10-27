
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
  const [quote, setQuote] = useState<Quote>(initialQuote);
  const [error, setError] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    const fetchQuote = async () => {
        try {
          // Using a CORS proxy to bypass browser restrictions on the ZenQuotes API
          const response = await fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random');
          if (!response.ok) {
            throw new Error(`Failed to fetch quote. Status: ${response.status}`);
          }
          const data = await response.json();
          const topQuote = data[0];
          if (!topQuote || !topQuote.q || !topQuote.a) {
            throw new Error('Invalid quote format received from the API.');
          }
          setQuote({ quote: topQuote.q, author: topQuote.a });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Could not fetch a new quote. Error: ${errorMessage}`);
            console.error("Error fetching quote:", err);
            // The initialQuote is already set, so we just show an error.
        }
      };

      fetchQuote();
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
           {error && (
                 <div className="text-center p-2 rounded-lg">
                    <p className="text-sm text-yellow-500">{error}</p>
                </div>
            )}
          <blockquote className="text-lg text-center italic text-foreground">
            "{quote.quote}"
          </blockquote>
          <p className="text-right text-sm text-zinc-400 font-medium mt-4">— {quote.author}</p>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
