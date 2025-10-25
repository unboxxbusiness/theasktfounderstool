
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Startup Idea of the Day | Daily Inspiration for Founders | TheASKT",
    description: "Get a fresh, AI-curated startup idea every day, sourced from top entrepreneurial communities. Your next big idea is one click away.",
};

interface RedditPost {
  data: {
    title: string;
    selftext: string;
    author: string;
    permalink: string;
    ups: number;
    num_comments: number;
    created_utc: number;
  }
}

async function getStartupIdea() {
    try {
        // Fetch top post from the last 24 hours from r/startup_ideas
        const response = await fetch('https://www.reddit.com/r/startup_ideas/top.json?t=day&limit=1', {
            next: {
                // Revalidate every 6 hours to get a new idea
                revalidate: 21600 
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch ideas from Reddit.');
        }

        const listing = await response.json();
        const topPost: RedditPost | undefined = listing.data.children[0];

        if (!topPost) {
            return {
                error: 'No ideas found for today. Please check back later.'
            }
        }
        
        return {
            title: topPost.data.title.replace(/\[.*?\]/g, '').trim(),
            description: topPost.data.selftext,
            author: topPost.data.author,
            url: `https://www.reddit.com${topPost.data.permalink}`,
            votes: topPost.data.ups,
            comments: topPost.data.num_comments,
            createdAt: new Date(topPost.data.created_utc * 1000).toLocaleDateString(),
        }

    } catch (error) {
        console.error("Error fetching startup idea:", error);
        return {
            error: 'Could not fetch a startup idea at this time. The community might be quiet! Please try again later.'
        }
    }
}


export default async function IdeaOfTheDayPage() {
  const idea = await getStartupIdea();

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Lightbulb className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Startup Idea of the Day
          </CardTitle>
          <CardDescription>
            A fresh idea from the r/startup_ideas community, served daily.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {idea.error ? (
                 <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg text-destructive">{idea.error}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold font-headline">{idea.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>by /u/{idea.author}</span>
                        <span>{idea.votes} upvotes</span>
                        <span>{idea.comments} comments</span>
                        <span>Posted on {idea.createdAt}</span>
                    </div>
                    {idea.description ? (
                         <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                            {idea.description}
                        </div>
                    ) : (
                        <p className="text-zinc-400 italic">No description provided for this idea.</p>
                    )}
                    <Button asChild className="mt-4">
                        <a href={idea.url} target="_blank" rel="noopener noreferrer">
                            View on Reddit
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
