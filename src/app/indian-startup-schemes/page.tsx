
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ExternalLink, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Indian Government Startup Schemes | Browse All Schemes | TheASKT",
    description: "Explore a comprehensive list of all central and state government schemes available for startups in India, curated for founders.",
};

interface Scheme {
    sno: number;
    schemeName: string;
    agency: string;
    schemeDescription: string;
    link: string;
    isForWomen?: boolean;
}

const schemes: Scheme[] = [
    {
        sno: 1,
        schemeName: "Startup India Seed Fund Scheme",
        agency: "Department for Promotion of Industry and Internal Trade (DPIIT)",
        schemeDescription: "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
        link: "https://www.startupindia.gov.in/content/sih/en/funding/seed-fund-scheme.html",
        isForWomen: false,
    },
    {
        sno: 2,
        schemeName: "TIDE 2.0 Scheme",
        agency: "Ministry of Electronics and Information Technology (MeitY)",
        schemeDescription: "A scheme to promote tech entrepreneurship through financial and technical support in areas of national concern like AI, IoT, Blockchain, and Robotics.",
        link: "https://meitystartuphub.in/schemes/tide-2-0/",
        isForWomen: false,
    },
    {
        sno: 3,
        schemeName: "Stand-Up India Scheme",
        agency: "Small Industries Development Bank of India (SIDBI)",
        schemeDescription: "Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
        link: "https://www.standupmitra.in/",
        isForWomen: true,
    },
    {
        sno: 4,
        schemeName: "SAMRIDH Scheme",
        agency: "Ministry of Electronics and Information Technology (MeitY)",
        schemeDescription: "Supports existing and upcoming accelerators to select and accelerate potential software product-based startups to scale.",
        link: "https://meitystartuphub.in/schemes/samridh-scheme",
        isForWomen: false,
    },
    {
        sno: 5,
        schemeName: "Mudra Yojana (PMMY)",
        agency: "Micro Units Development and Refinance Agency (MUDRA)",
        schemeDescription: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro-enterprises. These loans are given by Commercial Banks, RRBs, Small Finance Banks, MFIs and NBFCs.",
        link: "https://www.mudra.org.in/",
        isForWomen: true,
    },
     {
        sno: 6,
        schemeName: "Udyogini Scheme",
        agency: "Women Development Corporation (under Government of India)",
        schemeDescription: "Offers subsidized loans to aspiring women entrepreneurs from rural and underdeveloped areas, encouraging business ownership and financial independence.",
        link: "https://wcd.nic.in/schemes/udyogini-scheme",
        isForWomen: true,
    },
];

export default function StartupSchemesPage() {
  const womenSchemes = schemes.filter(scheme => scheme.isForWomen);

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
            A curated list of key central and state government schemes available to Indian startups. All links point to official government websites.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                               <CardDescription className="text-xs pt-1">
                                By {scheme.agency}
                            </CardDescription>
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

            <h2 className="text-xl md:text-2xl font-bold pt-4">All Key Startup Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
