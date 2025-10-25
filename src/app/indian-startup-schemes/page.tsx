
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Indian Government Startup Schemes | Startup India | TheASKT",
    description: "Browse a comprehensive list of government schemes for startup funding and support in India. Data sourced directly from the official Startup India portal.",
};

export const revalidate = 3600 * 24; // Re-fetch once a day

interface Scheme {
    sno: string;
    schemeName: string;
    schemeLink: string;
    sponsoringAgency: string;
    description: string;
}

async function getStartupSchemes(): Promise<{ schemes?: Scheme[]; error?: string }> {
  try {
    const response = await fetch('https://api.startupindia.gov.in/public/rest/getAllSchemes', {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 * 24 } // Cache for 24 hours
    });

    if (!response.ok) {
        console.error("API Response Error:", response.status, await response.text());
        throw new Error('Failed to fetch schemes from Startup India.');
    }
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data.schemes)) {
         throw new Error('Invalid data structure from API.');
    }

    // Sort schemes alphabetically by name
    const sortedSchemes = data.schemes.sort((a: Scheme, b: Scheme) => a.schemeName.localeCompare(b.schemeName));

    return { schemes: sortedSchemes };

  } catch (error) {
    console.error("Error fetching or parsing startup schemes:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      error: `Could not fetch startup schemes at this time. Error: ${errorMessage}`
    };
  }
}

export default async function StartupSchemesPage() {
  const { schemes, error } = await getStartupSchemes();

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Building className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Indian Government Startup Schemes
          </CardTitle>
          <CardDescription>
            A comprehensive list of central and state government schemes available to Indian startups, powered by the official Startup India API.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {error ? (
                 <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <p className="text-lg text-destructive">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schemes?.map((scheme) => (
                        <Card key={scheme.sno} className="flex flex-col p-4">
                            <CardHeader className="p-0">
                                <CardDescription className="text-xs text-primary font-bold">
                                    {scheme.sponsoringAgency}
                                </CardDescription>
                                <CardTitle as="h2" className="text-lg font-semibold pt-1">
                                    {scheme.schemeName}
                                </CardTitle>
                                <CardDescription className="text-sm pt-2 line-clamp-4">
                                    {scheme.description}
                                </CardDescription>
                            </CardHeader>
                             <CardFooter className="p-0 pt-4 mt-auto">
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <a href={scheme.schemeLink} target="_blank" rel="noopener noreferrer">
                                        View Details <ExternalLink className="ml-2 h-4 w-4" />
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
