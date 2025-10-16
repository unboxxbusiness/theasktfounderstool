import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Banknote,
  Users,
  TrendingUp,
  Heart,
  Frown,
  Smile,
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
const beforeAfterImage = PlaceHolderImages.find((img) => img.id === 'before-after-image');
const communityImage = PlaceHolderImages.find((img) => img.id === 'community-image');

export default function Home() {
  const beforeItems = [
    { icon: <Frown className="h-6 w-6 text-destructive" />, text: "Uncertainty and self-doubt." },
    { icon: <Frown className="h-6 w-6 text-destructive" />, text: "Wasted time on unviable ideas." },
    { icon: <Frown className="h-6 w-6 text-destructive" />, text: "Confusing spreadsheets & financials." },
    { icon: <Frown className="h-6 w-6 text-destructive" />, text: "Fear of talking to investors." },
  ];

  const afterItems = [
    { icon: <Smile className="h-6 w-6 text-accent" />, text: "Data-driven confidence." },
    { icon: <Smile className="h-6 w-6 text-accent" />, text: "A clear path forward." },
    { icon: <Smile className="h-6 w-6 text-accent" />, text: "Mastery of your numbers." },
    { icon: <Smile className="h-6 w-6 text-accent" />, text: "A pitch deck that gets meetings." },
  ];

  const toolCategories = [
      {
          icon: <Lightbulb className="h-8 w-8 text-primary"/>,
          title: "Idea & Validation",
          tools: ["Idea Validator", "Branding Generator", "Funding Eligibility"]
      },
      {
          icon: <Banknote className="h-8 w-8 text-primary"/>,
          title: "Financial Tools",
          tools: ["Valuation Calculator", "Fundraising Goal", "Runway Calculator", "Break-Even Point", "CAC vs LTV", "Pricing Strategy", "Investor ROI"]
      },
      {
          icon: <Users className="h-8 w-8 text-primary"/>,
          title: "Team & Equity",
          tools: ["Equity Split", "Dilution Calculator"]
      },
      {
          icon: <TrendingUp className="h-8 w-8 text-primary"/>,
          title: "Growth Tools",
          tools: ["Revenue Projection", "Marketing Budget"]
      }
  ]

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
                The Founder's Toolkit for<br/>Building with Confidence.
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Stop guessing. Stop wasting money. Validate your idea, master your financials, and build a startup that’s built to last. For free.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
                <Link href="/validate">
                  Get Your Free Validation Score
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
                    className="font-semibold underline-offset-4 hover:underline"
                  >TheASKT.org</a> for the next generation of founders.
                </p>
            </div>
          </div>
        </section>

        <section id="before-after" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">From Chaos to Clarity</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">You're juggling a million things. Our toolkit brings order to the chaos so you can focus on what matters: building.</p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 items-center">
                    <Card className="border-destructive/20 border-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Before: The Founder's Mess</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {beforeItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="text-lg text-muted-foreground">{item.text}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card className="border-accent/20 border-2 bg-accent/5">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">After: The Confident Founder</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {afterItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    {item.icon}
                                    <span className="text-lg font-medium">{item.text}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                 {beforeAfterImage && (
                    <div className="mt-12">
                        <Image
                            alt="Before and After"
                            className="mx-auto rounded-xl object-cover"
                            data-ai-hint={beforeAfterImage.imageHint}
                            height="600"
                            src={beforeAfterImage.imageUrl}
                            width="1200"
                        />
                    </div>
                 )}
            </div>
        </section>
        
        <section id="tools" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Your Complete Startup Toolkit. <span className="text-primary">All Free.</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Why pay for expensive consultants or complicated software? Everything you need to plan, build, and grow is right here.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
                {toolCategories.map((category) => (
                    <Card key={category.title} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                {category.icon}
                                <CardTitle>{category.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {category.tools.map((tool) => (
                                    <li key={tool} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-accent" />
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>

        <section id="community" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Join the Community
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                  Built for Founders, by Founders.
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
                <p className="text-muted-foreground md:text-xl/relaxed">
                  These tools are just the beginning. Sign up to get access to our full platform, connect with other founders, and get the support you need to grow.
                </p>
                <Button asChild size="lg">
                  <a
                    href="https://theaskt.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Heart className="mr-2" />
                    Sign Up at TheASKT.org
                  </a>
                </Button>
              </div>
              {communityImage && (
                <div className="flex items-center justify-center">
                  <Image
                    alt="Community"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                    data-ai-hint={communityImage.imageHint}
                    height="550"
                    src={communityImage.imageUrl}
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
                <h2 className="text-4xl font-bold tracking-tighter md:text-5xl/tight">
                    Ready to build something amazing?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    The difference between success and failure can be one smart decision. Start making them now. Get your free, data-driven validation report and unlock the entire toolkit.
                </p>
                </div>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse text-lg px-8 py-6">
                        <Link href="/validate">
                        Start Validating Your Idea
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
