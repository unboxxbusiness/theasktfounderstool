
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';
import Parser from 'rss-parser';

export const metadata: Metadata = {
    title: "Indian Government Startup Scheme News | Latest Updates | TheASKT",
    description: "Get the latest news and updates on government schemes and funding opportunities for startups in India, sourced from official government news feeds.",
};

export const revalidate = 3600 * 4; // Re-fetch every 4 hours

interface SchemeNewsItem extends Parser.Item {
  // rss-parser will add other fields, we primarily care about these
}

async function getSchemeNews(): Promise<{ items?: SchemeNewsItem[]; error?: string }> {
  const parser: Parser = new Parser();
  const feedUrl = 'https://www.investindia.gov.in/rss/all-news-and-updates.xml';

  try {
    const feed = await parser.parseURL(feedUrl);
    
    if (!feed || !Array.isArray(feed.items)) {
         throw new Error('Invalid data structure from RSS feed.');
    }

    // Filter for items that are relevant to schemes, policies, or startups if possible
    const relevantItems = feed.items.filter(item => 
        item.title?.toLowerCase().includes('startup') || 
        item.title?.toLowerCase().includes('scheme') ||
        item.title?.toLowerCase().includes('policy') ||
        item.content?.toLowerCase().includes('startup')
    ).slice(0, 15); // Take the top 15 most relevant

    return { items: relevantItems };

  } catch (error) {
    console.error("Error fetching or parsing scheme news RSS feed:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      error: `Could not fetch startup scheme news at this time. Error: ${errorMessage}`
    };
  }
}

export default async function StartupSchemesPage() {
  const { items, error } = await getSchemeNews();

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Building className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Indian Government Startup Scheme News
          </CardTitle>
          <CardDescription>
            The latest news and updates on schemes, funding, and policies for Indian startups, from official government sources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {error ? (
                 <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg text-destructive">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items?.map((item, index) => (
                        <Card key={item.guid || item.link || index} className="flex flex-col p-4">
                           <CardHeader className="p-0">
                                <CardTitle as="h2" className="text-lg font-semibold pt-1">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                      {item.title}
                                    </a>
                                </CardTitle>
                                <CardDescription className="text-sm pt-2 line-clamp-3">
                                    {item.contentSnippet?.substring(0, 160)}...
                                </CardDescription>
                            </CardHeader>
                             <CardFooter className="p-0 pt-4 mt-auto flex justify-between items-center text-xs text-zinc-400">
                               <span>{item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}) : ''}</span>
                                <Button asChild variant="outline" size="sm">
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
