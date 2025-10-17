
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
  CheckCircle,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, PiggyBank } from "@/components/icons";

export default function Home() {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 mr-2 text-primary" />,
      text: "Stop guessing. Get data-driven answers.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 mr-2 text-primary" />,
      text: "Impress investors with clear financial models.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 mr-2 text-primary" />,
      text: "Make smarter decisions, faster.",
    },
  ];

  const tools = [
      {
          icon: <Calculator className="h-8 w-8 text-primary"/>,
          title: "Valuation Calculator",
          description: "Get a data-backed estimate of your startup's worth.",
          link: "/valuation-calculator"
      },
      {
          icon: <Scale className="h-8 w-8 text-primary"/>,
          title: "Equity Split Calculator",
          description: "Define a fair equity split for your co-founders.",
           link: "/equity-split-calculator"
      },
      {
          icon: <TrendingUp className="h-8 w-8 text-primary"/>,
          title: "Revenue Projection",
          description: "Visualize your next 12 months of growth.",
          link: "/revenue-projection-calculator"
      },
      {
          icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
          title: "SAFE Calculator",
          description: "Model how a SAFE note impacts your ownership.",
          link: "/safe-calculator"
      },
      {
          icon: <TrendingDown className="h-8 w-8 text-primary"/>,
          title: "Dilution Calculator",
          description: "Understand the impact of a new funding round.",
          link: "/dilution-calculator"
      },
      {
          icon: <Banknote className="h-8 w-8 text-primary"/>,
          title: "CAC & LTV Calculator",
          description: "Analyze your customer acquisition economics.",
          link: "/cac-ltv-calculator"
      },
      {
        icon: <Hourglass className="h-8 w-8 text-primary" />,
        title: 'Runway Calculator',
        description: 'See how long your cash will last.',
        link: '/runway-calculator',
      },
      {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: 'Break-Even Analysis',
        description: 'Find your point of profitability.',
        link: '/break-even-calculator',
      },
      {
        icon: <Landmark className="h-8 w-8 text-primary" />,
        title: 'Fundraising Goal',
        description: 'Determine how much you should raise.',
        link: '/fundraising-goal-calculator',
      },
       {
        icon: <PiggyBank className="h-8 w-8 text-primary" />,
        title: 'Investor ROI Calculator',
        description: 'Estimate the potential return for your investors.',
        link: '/investor-roi-calculator',
      },
      {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: 'Pricing Strategy',
        description: 'Find your ideal product price point.',
        link: '/pricing-strategy-calculator',
      },
      {
        icon: <Megaphone className="h-8 w-8 text-primary" />,
        title: 'Marketing Budget',
        description: 'Allocate your marketing spend effectively.',
        link: '/marketing-budget-allocator',
      },
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <p className="text-primary font-bold">ATTENTION: STARTUP FOUNDERS</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline max-w-4xl">
                The Financial Blind Spots That Are Secretly Killing Your Startup
              </h1>
              <p className="max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl">
                Finally! A complete (and 100% free) toolkit of financial calculators to give you the clarity you need to build, grow, and fund your business like a pro.
              </p>
              <div className="flex flex-col gap-4">
                 <Button asChild size="lg" className="mt-4 !text-lg !py-7 !px-10">
                    <Link href="#tools">
                        Get FREE Instant Access To The Calculators
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
                <p className="text-xs text-muted-foreground">No sign-up required. Ever.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="tools" className="w-full py-20 md:py-24">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-headline">
                    Your Secret Financial Toolkit
                 </h2>
                 <p className="max-w-[700px] mx-auto text-muted-foreground text-base sm:text-lg md:text-xl mt-4">
                    From valuation to dilution, get the answers you need in seconds. Stop guessing and start knowing.
                 </p>
            </div>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Link href={tool.link} key={tool.title} className="flex flex-col group">
                        <Card className="flex-grow flex flex-col bg-card border-2 border-transparent hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                            <CardHeader className="flex flex-col items-center text-center gap-4">
                                {tool.icon}
                                <CardTitle className="text-xl">{tool.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow text-center">
                                <p className="text-muted-foreground">{tool.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
          </div>
        </section>

         <section className="w-full py-20 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-headline max-w-3xl">
                Don't Let Bad Math Kill Your Dream
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg">
                This toolkit was built by founders, for founders, because we got tired of seeing great ideas fail due to simple, avoidable financial mistakes. We're making it free to give every founder a fighting chance.
              </p>
              <div className="w-full max-w-md space-y-3">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-center text-left p-3 bg-background/50 rounded-lg">
                        {feature.icon}
                        <span className="text-foreground">{feature.text}</span>
                    </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-6 !text-lg !py-7 !px-10">
                <Link href="#tools">
                    Use The FREE Calculators Now
                    <ArrowRight className="ml-2 h-5 w-5"/>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    