
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Parser from 'rss-parser';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "Top Startup News | Daily News for Founders | TheASKT",
    description: "Get the latest top stories in the startup and tech world from TechCrunch, VentureBeat, and more. Stay informed with TheASKT's free founder toolkit.",
};

// This tells Next.js to re-fetch the news every hour (3600 seconds)
export const revalidate = 3600; 

interface FeedItem extends Parser.Item {
  feedTitle?: string;
}

const feedUrls = [
  { title: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { title: 'VentureBeat', url: 'https://feeds.feedburner.com/venturebeat/SZYF' },
  { title: 'Wired Business', url: 'https://www.wired.com/feed/category/business/latest/rss' },
];

async function getNewsFromFeeds(): Promise<{ items?: FeedItem[]; error?: string }> {
  const parser: Parser<any, FeedItem> = new Parser({
    customFields: {
        item: ['feedTitle']
    }
  });

  try {
    const feedPromises = feedUrls.map(feedInfo =>
      parser.parseURL(feedInfo.url).then(feed => {
        // Add the feed title to each item for context
        feed.items.forEach(item => {
          item.feedTitle = feedInfo.title;
        });
        return feed.items;
      })
    );

    const allItems = (await Promise.all(feedPromises)).flat();

    // Sort by publication date, descending
    allItems.sort((a, b) => {
      const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dateB - dateA;
    });

    return { items: allItems.slice(0, 15) };

  } catch (error) {
    console.error("Error fetching or parsing RSS feeds:", error);
    return {
      error: 'Could not fetch startup news at this time. Please try again later.'
    };
  }
}

function getDomainFromUrl(url: string | undefined): string {
    if (!url) return '';
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return '';
    }
}

export default async function NewsPage() {
  const { items, error } = await getNewsFromFeeds();

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Newspaper className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Top Startup News
          </CardTitle>
          <CardDescription>
            The latest top stories from the startup world, served fresh from leading tech publications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {error ? (
                 <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg text-destructive">{error}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items?.map((item, index) => (
                        <Card key={item.guid || item.link || index} className="p-4">
                            <CardHeader className="p-0">
                                <CardDescription className="text-xs text-primary font-bold">
                                    {item.feedTitle || getDomainFromUrl(item.link)}
                                </CardDescription>
                                <CardTitle as="h2" className="text-lg md:text-xl font-semibold pt-1">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {item.title}
                                    </a>
                                </CardTitle>
                                <CardDescription className="text-sm pt-2">
                                    {item.contentSnippet?.substring(0, 150)}{item.contentSnippet && item.contentSnippet.length > 150 ? '...' : ''}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-0 pt-3 flex justify-between items-center text-sm text-zinc-400">
                                <span className="text-xs">
                                    {item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}) : ''}
                                </span>
                                <Button asChild variant="ghost" size="sm">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        Read More <ExternalLink className="ml-2 h-4 w-4" />
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
