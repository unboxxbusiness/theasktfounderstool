
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Banknote,
  Users,
  TrendingUp,
  Frown,
  Smile,
  ShieldCheck,
  Scale,
  Calculator,
  Target,
  Hourglass,
  Landmark,
  DollarSign,
  Megaphone,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((img) => img.id === 'community-image');

export default function Home() {

  const tools = [
      {
          icon: <Calculator className="h-6 w-6 mb-2 text-primary"/>,
          title: "Valuation Calculator",
          description: "Get a data-backed estimate of your startup's worth.",
          link: "/valuation-calculator"
      },
      {
          icon: <Scale className="h-6 w-6 mb-2 text-primary"/>,
          title: "Equity Split",
          description: "Define a fair equity split for your co-founders.",
           link: "/equity-split-calculator"
      },
      {
          icon: <TrendingUp className="h-6 w-6 mb-2 text-primary"/>,
          title: "Revenue Projection",
          description: "Visualize your next 12 months of growth.",
          link: "/revenue-projection-calculator"
      },
      {
          icon: <ShieldCheck className="h-6 w-6 mb-2 text-primary"/>,
          title: "SAFE Calculator",
          description: "Model how a SAFE note impacts your ownership.",
          link: "/safe-calculator"
      },
      {
          icon: <Users className="h-6 w-6 mb-2 text-primary"/>,
          title: "Dilution Calculator",
          description: "Understand the impact of a new funding round.",
          link: "/dilution-calculator"
      },
      {
          icon: <Banknote className="h-6 w-6 mb-2 text-primary"/>,
          title: "CAC & LTV",
          description: "Analyze your customer acquisition economics.",
          link: "/cac-ltv-calculator"
      },
      {
        icon: <Hourglass className="h-6 w-6 mb-2 text-primary" />,
        title: 'Runway Calculator',
        description: 'See how long your cash will last.',
        link: '/runway-calculator',
      },
      {
        icon: <Target className="h-6 w-6 mb-2 text-primary" />,
        title: 'Break-Even Analysis',
        description: 'Find your point of profitability.',
        link: '/break-even-calculator',
      },
      {
        icon: <Landmark className="h-6 w-6 mb-2 text-primary" />,
        title: 'Fundraising Goal',
        description: 'Determine how much you should raise.',
        link: '/fundraising-goal-calculator',
      },
       {
        icon: <DollarSign className="h-6 w-6 mb-2 text-primary" />,
        title: 'Investor ROI',
        description: 'Estimate the potential return for your investors.',
        link: '/investor-roi-calculator',
      },
      {
        icon: <DollarSign className="h-6 w-6 mb-2 text-primary" />,
        title: 'Pricing Strategy',
        description: 'Find your ideal product price point.',
        link: '/pricing-strategy-calculator',
      },
      {
        icon: <Megaphone className="h-6 w-6 mb-2 text-primary" />,
        title: 'Marketing Budget',
        description: 'Allocate your marketing spend effectively.',
        link: '/marketing-budget-allocator',
      },
  ]

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-20 md:py-24 text-center relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] "
            aria-hidden="true"
          />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter font-headline bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground leading-tight">
                The Founder's Financial Toolkit
              </h1>
              <p className="max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl">
                Free, simple, and powerful calculators to help you plan, build, and grow your startup. No spreadsheets required.
              </p>
            </div>
             <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                    A free, non-profit project by <a
                    href="https://theaskt.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline-offset-4 hover:underline text-foreground"
                  >TheASKT.org</a>
                </p>
            </div>
          </div>
        </section>
        
        <section id="tools" className="w-full pb-12 md:pb-24 lg:pb-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Card key={tool.title} className="flex flex-col hover:border-primary/50 hover:bg-muted/30 transition-all duration-200">
                        <CardHeader>
                            {tool.icon}
                            <CardTitle>{tool.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm">{tool.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button asChild variant="link" className="p-0 text-sm">
                                <Link href={tool.link}>
                                    Use Calculator <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
