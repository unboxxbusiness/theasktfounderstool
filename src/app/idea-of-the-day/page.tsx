
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ExternalLink, User } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "Startup Idea of the Day | Daily Inspiration for Founders | TheASKT",
    description: "Get a fresh, top-voted startup idea every day from the web's most creative communities. Your next big idea could be here.",
};

export const revalidate = 3600 * 6; // Re-fetch every 6 hours

interface RedditPost {
    title: string;
    selftext: string;
    author: string;
    permalink: string;
    score: number;
    num_comments: number;
}

async function getStartupIdea(): Promise<{ idea?: RedditPost; error?: string }> {
  try {
    const response = await fetch('https://www.reddit.com/r/startup_ideas/top.json?t=day&limit=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 3600 * 6 } // Cache for 6 hours
    });

    if (!response.ok) {
        throw new Error('Failed to fetch ideas from Reddit.');
    }

    const listing = await response.json();
    const topPost = listing.data?.children?.[0]?.data;

    if (!topPost) {
      throw new Error('No posts found in the response from Reddit.');
    }

    const idea: RedditPost = {
      title: topPost.title,
      selftext: topPost.selftext,
      author: topPost.author,
      permalink: `https://www.reddit.com${topPost.permalink}`,
      score: topPost.score,
      num_comments: topPost.num_comments,
    };

    return { idea };

  } catch (error) {
    console.error("Error fetching startup idea:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      error: `Could not fetch a startup idea at this time. Error: ${errorMessage}`
    };
  }
}

export default async function IdeaOfTheDayPage() {
  const { idea, error } = await getStartupIdea();

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Lightbulb className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Startup Idea of the Day
          </CardTitle>
          <CardDescription>
            Today's top-voted startup idea from the r/startup_ideas community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {error ? (
                 <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg text-destructive">{error}</p>
                </div>
            ) : idea ? (
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle as="h2" className="text-xl md:text-2xl">{idea.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 pt-2 text-xs">
                           <User className="h-3 w-3" /> By {idea.author}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base text-zinc-300 whitespace-pre-wrap">{idea.selftext || 'No description provided.'}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm">
                        <div className="flex gap-4 text-zinc-400">
                             <span>👍 {idea.score} Upvotes</span>
                             <span>💬 {idea.num_comments} Comments</span>
                        </div>
                        <Button asChild variant="outline">
                            <a href={idea.permalink} target="_blank" rel="noopener noreferrer">
                                Discuss on Reddit <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg">No idea found. Please check back later.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
