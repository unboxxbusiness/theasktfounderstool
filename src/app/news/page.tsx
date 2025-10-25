
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, ExternalLink, ArrowUp, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Top Startup News | Daily News for Founders | TheASKT",
    description: "Get the latest top stories in the startup and tech world, powered by the Hacker News API. Stay informed with TheASKT's free founder toolkit.",
};

interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  descendants?: number;
  time: number;
}

async function getTopStories(): Promise<{ stories?: Story[]; error?: string }> {
    try {
        const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!topStoriesResponse.ok) {
            throw new Error('Failed to fetch top story IDs from Hacker News.');
        }

        const topStoryIds = await topStoriesResponse.json();
        const storiesToFetch = topStoryIds.slice(0, 10);

        const storyPromises = storiesToFetch.map((id: number) => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );

        const stories = await Promise.all(storyPromises);

        return { stories };

    } catch (error) {
        console.error("Error fetching startup news:", error);
        return {
            error: 'Could not fetch startup news at this time. Please try again later.'
        }
    }
}

function getDomainFromUrl(url: string | undefined): string {
    if (!url) return 'news.ycombinator.com';
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return 'news.ycombinator.com';
    }
}

export default async function NewsPage() {
  const { stories, error } = await getTopStories();

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Newspaper className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Top Startup News
          </CardTitle>
          <CardDescription>
            The latest top stories from the Hacker News community, served fresh.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {error ? (
                 <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg text-destructive">{error}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {stories?.map((story) => (
                        <Card key={story.id} className="p-4">
                            <CardHeader className="p-0">
                                <CardTitle as="h2" className="text-lg md:text-xl font-semibold">
                                    <a href={story.url || `https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {story.title}
                                    </a>
                                </CardTitle>
                                <CardDescription className="text-xs pt-1">
                                    ({getDomainFromUrl(story.url)})
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-0 pt-3 flex justify-between items-center text-sm text-zinc-400">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <ArrowUp className="h-4 w-4" /> {story.score}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4" /> {story.descendants || 0}
                                    </span>
                                    <span>by {story.by}</span>
                                </div>
                                <Button asChild variant="ghost" size="sm">
                                    <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener noreferrer">
                                        Discuss <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
