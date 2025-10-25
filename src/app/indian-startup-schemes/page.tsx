
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ExternalLink, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Indian Government Startup Schemes | Browse All Schemes | TheASKT",
    description: "Explore a comprehensive list of all central and state government schemes available for startups in India, powered by the official Startup India API.",
};

export const revalidate = 3600 * 24; // Re-fetch once a day

interface Scheme {
    sno: number;
    schemeName: string;
    agency: string;
    schemeDescription: string;
    link: string;
}

async function getStartupSchemes(): Promise<{ schemes?: Scheme[]; error?: string }> {
  try {
    const response = await fetch('https://api.startupindia.gov.in/public/rest/getAllSchemes', {
        headers: {
            'Accept': 'application/json'
        },
        next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch schemes from Startup India API. Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data.schemes)) {
         throw new Error('Invalid data structure from Startup India API.');
    }

    return { schemes: data.schemes };

  } catch (error) {
    console.error("Error fetching startup schemes:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      error: `Could not fetch startup schemes at this time. The API might be temporarily unavailable. Error: ${errorMessage}`
    };
  }
}

export default async function StartupSchemesPage() {
  const { schemes, error } = await getStartupSchemes();

  const womenSchemes = schemes?.filter(scheme => 
    scheme.schemeName.toLowerCase().includes('women') || 
    scheme.schemeDescription.toLowerCase().includes('women') ||
    scheme.schemeName.toLowerCase().includes('woman') ||
    scheme.schemeDescription.toLowerCase().includes('woman') ||
    scheme.schemeName.toLowerCase().includes('her') ||
    scheme.schemeDescription.toLowerCase().includes('her') ||
    scheme.schemeName.toLowerCase().includes('she') ||
    scheme.schemeDescription.toLowerCase().includes('she')
  ) || [];

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
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
                <>
                {womenSchemes.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="women-schemes">
                      <AccordionTrigger className="text-lg md:text-xl font-semibold text-primary hover:no-underline">
                        Top Government Schemes for Women Entrepreneurs
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          {womenSchemes.map((scheme) => (
                             <Card key={scheme.sno} className="bg-muted/50">
                               <CardHeader>
                                   <CardTitle as="h3" className="text-md font-semibold">{scheme.schemeName}</CardTitle>
                               </CardHeader>
                                <CardContent>
                                   <p className="text-sm line-clamp-3">{scheme.schemeDescription}</p>
                               </CardContent>
                                <CardFooter>
                                   <Button asChild variant="link" size="sm" className="p-0 h-auto">
                                       <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                                           Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                       </a>
                                   </Button>
                               </CardFooter>
                           </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <h2 className="text-xl md:text-2xl font-bold pt-4">All Startup Schemes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schemes?.map((scheme) => (
                        <Card key={scheme.sno} className="flex flex-col">
                           <CardHeader>
                                <CardTitle as="h2" className="text-lg font-semibold">{scheme.schemeName}</CardTitle>
                                <CardDescription className="text-xs pt-1">
                                    By {scheme.agency}
                                </CardDescription>
                            </CardHeader>
                             <CardContent className="flex-grow">
                                <p className="text-sm line-clamp-4">{scheme.schemeDescription}</p>
                            </CardContent>
                             <CardFooter>
                                <Button asChild variant="outline" size="sm">
                                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                                        View Scheme <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                </>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
