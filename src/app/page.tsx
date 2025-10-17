
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Users,
  TrendingUp,
  Scale,
  Calculator,
  Target,
  Hourglass,
  Landmark,
  DollarSign,
  Megaphone,
  Share2,
  Zap,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 mb-2 text-primary" />,
      title: "Instant Answers",
      description: "Get immediate calculations without wrestling with complex spreadsheets or formulas.",
    },
    {
      icon: <Share2 className="h-8 w-8 mb-2 text-primary" />,
      title: "Shareable Reports",
      description: "Generate a unique link for your calculations to share with co-founders, advisors, or investors.",
    },
    {
      icon: <Gift className="h-8 w-8 mb-2 text-primary" />,
      title: "Completely Free",
      description: "All tools are 100% free, built as a non-profit project to help founders succeed.",
    },
  ];

  const tools = [
      {
          icon: <Calculator className="h-6 w-6 text-primary"/>,
          title: "Valuation Calculator",
          description: "Get a data-backed estimate of your startup's worth.",
          link: "/valuation-calculator"
      },
      {
          icon: <Scale className="h-6 w-6 text-primary"/>,
          title: "Equity Split",
          description: "Define a fair equity split for your co-founders.",
           link: "/equity-split-calculator"
      },
      {
          icon: <TrendingUp className="h-6 w-6 text-primary"/>,
          title: "Revenue Projection",
          description: "Visualize your next 12 months of growth.",
          link: "/revenue-projection-calculator"
      },
      {
          icon: <Scale className="h-6 w-6 text-primary"/>,
          title: "SAFE Calculator",
          description: "Model how a SAFE note impacts your ownership.",
          link: "/safe-calculator"
      },
      {
          icon: <Users className="h-6 w-6 text-primary"/>,
          title: "Dilution Calculator",
          description: "Understand the impact of a new funding round.",
          link: "/dilution-calculator"
      },
      {
          icon: <Banknote className="h-6 w-6 text-primary"/>,
          title: "CAC & LTV",
          description: "Analyze your customer acquisition economics.",
          link: "/cac-ltv-calculator"
      },
      {
        icon: <Hourglass className="h-6 w-6 text-primary" />,
        title: 'Runway Calculator',
        description: 'See how long your cash will last.',
        link: '/runway-calculator',
      },
      {
        icon: <Target className="h-6 w-6 text-primary" />,
        title: 'Break-Even Analysis',
        description: 'Find your point of profitability.',
        link: '/break-even-calculator',
      },
      {
        icon: <Landmark className="h-6 w-6 text-primary" />,
        title: 'Fundraising Goal',
        description: 'Determine how much you should raise.',
        link: '/fundraising-goal-calculator',
      },
       {
        icon: <DollarSign className="h-6 w-6 text-primary" />,
        title: 'Investor ROI',
        description: 'Estimate the potential return for your investors.',
        link: '/investor-roi-calculator',
      },
      {
        icon: <DollarSign className="h-6 w-6 text-primary" />,
        title: 'Pricing Strategy',
        description: 'Find your ideal product price point.',
        link: '/pricing-strategy-calculator',
      },
      {
        icon: <Megaphone className="h-6 w-6 text-primary" />,
        title: 'Marketing Budget',
        description: 'Allocate your marketing spend effectively.',
        link: '/marketing-budget-allocator',
      },
  ]

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline max-w-4xl">
                Free Financial Calculators for Ambitious Startups
              </h1>
              <p className="max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl">
                Powerful, simple, and shareable tools to help you plan, build, and grow your business. No spreadsheets required.
              </p>
               <Button asChild size="lg" className="mt-4 shadow-lg shadow-primary/30">
                  <Link href="#tools">
                      Explore All Calculators
                  </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="text-center flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mt-1">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="tools" className="w-full py-20 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-headline">
                    Financial Modeling, Made Simple
                 </h2>
                 <p className="max-w-[700px] mx-auto text-muted-foreground text-base sm:text-lg md:text-xl mt-4">
                    From valuation to dilution, get the answers you need in seconds.
                 </p>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Link href={tool.link} key={tool.title} className="flex flex-col group">
                        <Card className="flex-grow flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                            <CardHeader className="flex-row items-center gap-4 pb-4">
                                {tool.icon}
                                <CardTitle className="text-lg">{tool.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm">{tool.description}</p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <div className="flex items-center text-primary text-sm font-medium">
                                    Use Calculator <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"/>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
          </div>
        </section>

         <section className="w-full py-12 md:py-16 border-t">
          <div className="container px-4 md:px-6 text-center">
             <p className="text-sm text-muted-foreground">
                    A free, non-profit project by <a
                    href="https://theaskt.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline-offset-4 hover:underline text-primary"
                  >TheASKT.org</a>
                </p>
          </div>
        </section>
      </main>
    </div>
  );
}
