
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ExternalLink, User } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "Quote of the Day | Daily Inspiration for Founders | TheASKT",
    description: "Get a fresh dose of inspiration every day to fuel your entrepreneurial journey. Your next big breakthrough could be a quote away.",
};

interface Quote {
    quote: string;
    author: string;
}

async function getQuoteOfTheDay(): Promise<{ quote?: Quote; error?: string }> {
  try {
    // ZenQuotes API has a CORS proxy, but we are fetching server-side so it's not an issue.
    // The API is free and doesn't require an API key.
    const response = await fetch('https://zenquotes.io/api/random', {
      cache: 'no-store', // Ensure we get a new quote every time
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch quote. Status: ${response.status}`);
    }

    const data = await response.json();
    const topQuote = data[0];

    if (!topQuote || !topQuote.q || !topQuote.a) {
      throw new Error('Invalid quote format received from the API.');
    }

    const quote: Quote = {
      quote: topQuote.q,
      author: topQuote.a,
    };

    return { quote };

  } catch (error) {
    console.error("Error fetching quote:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    // Fallback quote in case of API failure to ensure the page still has content for SEO
    const fallbackQuote: Quote = {
        quote: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    };
    return {
      quote: fallbackQuote,
      error: `Could not fetch a new quote, showing a classic instead. Error: ${errorMessage}`
    };
  }
}

export default async function IdeaOfTheDayPage() {
  const { quote, error } = await getQuoteOfTheDay();

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Lightbulb className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Quote of the Day
          </CardTitle>
          <CardDescription>
            A dose of daily inspiration for entrepreneurs and builders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {error && (
                 <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-yellow-500">{error}</p>
                </div>
            )}
            {quote ? (
                <Card className="bg-muted/30">
                    <CardContent className="p-6">
                        <blockquote className="text-xl md:text-2xl text-center italic">
                           "{quote.quote}"
                        </blockquote>
                    </CardContent>
                    <CardFooter className="flex justify-end items-center text-sm">
                        <p className="text-zinc-400 font-medium">— {quote.author}</p>
                    </CardFooter>
                </Card>
            ) : (
                !error && (
                    <div className="text-center p-8 bg-muted/50 rounded-lg">
                        <p className="text-lg">No quote found. Please check back later.</p>
                    </div>
                )
            )}
        </CardContent>
      </Card>
    </div>
  );
}
