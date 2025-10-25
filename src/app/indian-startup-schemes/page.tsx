
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "Government Startup Schemes for Women Entrepreneurs in India | TheASKT",
    description: "Explore a comprehensive list of government schemes and funds specifically for women and girl-focused startups in India.",
};

interface Scheme {
    sno: number;
    schemeName: string;
    agency: string;
    schemeDescription: string;
    link: string;
}

const schemes: Scheme[] = [
    {
        sno: 3,
        schemeName: "Stand-Up India Scheme",
        agency: "Small Industries Development Bank of India (SIDBI)",
        schemeDescription: "Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
        link: "https://www.standupmitra.in/",
    },
    {
        sno: 5,
        schemeName: "Mudra Yojana (PMMY)",
        agency: "Micro Units Development and Refinance Agency (MUDRA)",
        schemeDescription: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro-enterprises. These loans are given by Commercial Banks, RRBs, Small Finance Banks, MFIs and NBFCs, with special provisions and interest rates for women borrowers.",
        link: "https://www.mudra.org.in/",
    },
     {
        sno: 6,
        schemeName: "Udyogini Scheme",
        agency: "Women Development Corporation",
        schemeDescription: "Offers subsidized loans up to ₹3 lakh to aspiring women entrepreneurs from rural and underdeveloped areas, encouraging business ownership and financial independence.",
        link: "https://wcd.nic.in/schemes-listing/2499",
    },
];

export default function StartupSchemesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Building className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Startup Funds for Women Entrepreneurs in India
          </CardTitle>
          <CardDescription>
            A curated list of key government schemes available to women and girl-focused startups in India. All links point to official government websites.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schemes.map((scheme) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
