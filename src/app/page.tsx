
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
  Lightbulb,
  Newspaper,
  Building,
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
import { QuotePopup, type Quote } from "@/components/quote-popup";


async function getQuoteOfTheDay(): Promise<{ quote?: Quote; error?: string }> {
  try {
    const response = await fetch('https://zenquotes.io/api/random', {
      cache: 'no-store', 
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch quote. Status: ${response.status}`);
    }

    const data = await response.json();
    const topQuote = data[0];

    if (!topQuote || !topQuote.q || !topQuote.a) {
      throw new Error('Invalid quote format received from the API.');
    }

    const quote: Quote = {
      quote: topQuote.q,
      author: topQuote.a,
    };

    return { quote };

  } catch (error) {
    console.error("Error fetching quote:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    const fallbackQuote: Quote = {
        quote: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    };
    return {
      quote: fallbackQuote,
      error: `Could not fetch a new quote, showing a classic instead. Error: ${errorMessage}`
    };
  }
}


export default async function Home() {
  const { quote, error } = await getQuoteOfTheDay();

  const tools = [
      {
          icon: <Newspaper className="h-8 w-8 text-primary"/>,
          title: "Top Startup News",
          description: "Get the latest top stories from the startup world.",
          link: "/news"
      },
      {
          icon: <Building className="h-8 w-8 text-primary" />,
          title: "Indian Startup Schemes",
          description: "Browse official government funding schemes for startups.",
          link: "/indian-startup-schemes",
      },
      {
          icon: <Calculator className="h-8 w-8 text-primary"/>,
          title: "What's Your Startup Worth?",
          description: "Get a data-backed valuation estimate in seconds.",
          link: "/valuation-calculator"
      },
      {
          icon: <Scale className="h-8 w-8 text-primary"/>,
          title: "How Should You Split Equity?",
          description: "Define a fair equity split for your co-founders.",
           link: "/equity-split-calculator"
      },
      {
          icon: <TrendingUp className="h-8 w-8 text-primary"/>,
          title: "How Fast Will You Grow?",
          description: "Project your next 12 months of revenue and users.",
          link: "/revenue-projection-calculator"
      },
      {
          icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
          title: "What's That SAFE Note Costing You?",
          description: "Model how a SAFE note impacts your ownership.",
          link: "/safe-calculator"
      },
      {
          icon: <TrendingDown className="h-8 w-8 text-primary"/>,
          title: "How Much Will New Funding Dilute You?",
          description: "See the true impact of a new funding round.",
          link: "/dilution-calculator"
      },
      {
          icon: <Banknote className="h-8 w-8 text-primary"/>,
          title: "Are Your Customers Profitable?",
          description: "Analyze your LTV:CAC ratio and acquisition economics.",
          link: "/cac-ltv-calculator"
      },
      {
        icon: <Hourglass className="h-8 w-8 text-primary" />,
        title: 'How Long Until You Run Out of Money?',
        description: 'Calculate your cash runway and "zero cash" date.',
        link: '/runway-calculator',
      },
      {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: 'How Many Sales Do You Need to Be Profitable?',
        description: 'Find your break-even point in units and revenue.',
        link: '/break-even-calculator',
      },
      {
        icon: <Landmark className="h-8 w-8 text-primary" />,
        title: 'How Much Money Should You Raise?',
        description: 'Set a smart fundraising goal based on your burn.',
        link: '/fundraising-goal-calculator',
      },
       {
        icon: <PiggyBank className="h-8 w-8 text-primary" />,
        title: 'What Could Your Investors Make?',
        description: 'Estimate the potential ROI for your investors.',
        link: '/investor-roi-calculator',
      },
      {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: 'What Should You Charge for Your Product?',
        description: 'Find your ideal price point with data-driven models.',
        link: '/pricing-strategy-calculator',
      },
      {
        icon: <Megaphone className="h-8 w-8 text-primary" />,
        title: 'Where Should Your Marketing Dollars Go?',
        description: 'Allocate your marketing spend for maximum results.',
        link: '/marketing-budget-allocator',
      },
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      {quote && <QuotePopup quote={quote} error={error} />}
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <p className="text-primary font-bold">FOR STARTUP FOUNDERS WHO HATE GUESSING</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-headline max-w-4xl">
                The Financial Clarity You Need To Build An Empire
              </h1>
              <p className="max-w-[700px] text-zinc-300 text-base sm:text-lg md:text-xl">
                This 100% free toolkit of battle-tested financial calculators gives you the power to <strong className="text-primary">stop guessing</strong> and <strong className="text-primary">start knowing</strong> your numbers—so you can build, grow, and fund your business like a seasoned pro.
              </p>
              <div className="flex flex-col gap-4">
                 <Button asChild size="lg" className="mt-4 !text-lg !py-7 !px-10">
                    <Link href="#tools">
                        Access All Calculators
                        <ArrowRight className="ml-2 h-5 w-5"/>
                    </Link>
                </Button>
                <p className="text-xs text-zinc-400">No catch. No sign-up. No credit card. Ever.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="tools" className="w-full py-20 md:py-24">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-headline">
                    Your Secret Financial Weapon
                 </h2>
                 <p className="max-w-[700px] mx-auto text-zinc-400 text-base sm:text-lg md:text-xl mt-4">
                    From valuation to dilution, get the mission-critical answers you need in seconds.
                 </p>
            </div>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool) => (
                    <Link href={tool.link} key={tool.title} className="flex flex-col group">
                        <Card className="flex-grow flex flex-col bg-card border-2 border-input hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                            <CardHeader className="flex flex-col items-center text-center gap-4">
                                {tool.icon}
                                <CardTitle className="text-xl">{tool.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow text-center">
                                <p className="text-zinc-400">{tool.description}</p>
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
                Don't Let Bad Math Kill Your Startup
              </h2>
              <p className="max-w-[600px] text-zinc-400 text-lg">
                This toolkit was built by founders who got tired of seeing great ideas fail from avoidable financial mistakes. We're making these tools free to give you a fighting chance.
              </p>
              <div className="w-full max-w-md space-y-3">
                    <div className="flex items-center text-left p-3 bg-background/50 rounded-lg">
                        <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                        <span className="text-foreground">Stop guessing and get data-driven answers.</span>
                    </div>
                    <div className="flex items-center text-left p-3 bg-background/50 rounded-lg">
                        <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                        <span className="text-foreground">Impress investors with clear financial models.</span>
                    </div>
                    <div className="flex items-center text-left p-3 bg-background/50 rounded-lg">
                        <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                        <span className="text-foreground">Make smarter, faster, and more profitable decisions.</span>
                    </div>
              </div>
              <Button asChild size="lg" className="mt-6 !text-lg !py-7 !px-10">
                <Link href="#tools">
                    Explore The Toolkit
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
