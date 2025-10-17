
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Banknote,
  Users,
  TrendingUp,
  Heart,
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

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Home() {
  const beforeItems = [
    { text: "Guessing your valuation" },
    { text: "Confusing cap tables" },
    { text: "Fear of dilution" },
    { text: "Unclear financial future" },
  ];

  const afterItems = [
    { text: "Data-driven decisions" },
    { text: "Clarity on ownership" },
    { text: "Investor-ready numbers" },
    { text: "A clear path to growth" },
  ];

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
        <section className="w-full py-24 md:py-32 lg:py-48 text-center relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse"
            aria-hidden="true"
          />
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
                Stop Guessing. Start Building.
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                The ultimate free toolkit for founders. Master your financials, make data-driven decisions, and build a startup that’s investor-ready from day one.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30">
                <Link href="/valuation-calculator">
                  Explore Calculators
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
             <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                    A free, non-profit project by <a
                    href="https://theaskt.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline-offset-4 hover:underline text-foreground"
                  >TheASKT.org</a> for the next generation of founders.
                </p>
            </div>
          </div>
        </section>

        <section id="before-after" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From Founder Chaos to Financial Clarity</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">Go from spreadsheets and uncertainty to a clear, fundable plan. </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 items-center max-w-4xl mx-auto">
                    <div className="rounded-xl bg-card p-8 border">
                        <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">Before</h3>
                        <ul className="space-y-3">
                            {beforeItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Frown className="h-5 w-5 text-destructive" />
                                    <span className="text-lg text-muted-foreground">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="rounded-xl bg-card p-8 border-2 border-primary/50 shadow-2xl shadow-primary/20">
                        <h3 className="text-2xl font-semibold mb-4 text-foreground">After</h3>
                        <ul className="space-y-3">
                             {afterItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Smile className="h-5 w-5 text-primary" />
                                    <span className="text-lg font-medium text-foreground">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="tools" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary">The Toolkit</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need. <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Nothing You Don't.</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ditch the complex software and expensive consultants. These simple, powerful calculators are all you need to plan, build, and grow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
                {tools.map((tool) => (
                    <Card key={tool.title} className="flex flex-col hover:border-primary/50 hover:bg-muted/30 transition-all duration-200">
                        <CardHeader>
                            {tool.icon}
                            <CardTitle>{tool.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{tool.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button asChild variant="link" className="p-0">
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

        <section id="community" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary">
                  For Founders, By Founders
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  You're Not Alone on This Journey.
                </h2>
                 <p className="text-muted-foreground md:text-xl/relaxed">
                  This toolkit is a free project from{" "}
                  <a
                    href="https://theaskt.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    TheASKT.org
                  </a>
                  , a non-profit dedicated to providing resources, mentorship, and community for early-stage entrepreneurs. We believe every founder deserves a fair shot at success.
                </p>
                <Button asChild size="lg">
                  <a
                    href="https://theaskt.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Heart className="mr-2" />
                    Join TheASKT Founders Group
                  </a>
                </Button>
              </div>
               {heroImage && (
                    <div className="flex items-center justify-center">
                    <Image
                        alt="Community"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                        data-ai-hint="abstract network"
                        height="550"
                        src={heroImage.imageUrl}
                        width="555"
                    />
                    </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="w-full py-20 md:py-32 bg-card">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter md:text-5xl/tight font-headline">
                    Ready to build something amazing?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    The difference between an idea and a business is a plan. Start building yours now.
                </p>
                </div>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 animate-pulse">
                        <Link href="/valuation-calculator">
                        Start Planning for Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
