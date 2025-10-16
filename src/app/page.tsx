import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart,
  ClipboardCheck,
  Lightbulb,
  CheckCircle,
  Banknote,
  Users,
  TrendingUp,
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

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');
const communityImage = PlaceHolderImages.find((img) => img.id === 'community-image');

export default function Home() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Stop Guessing. Start Validating.",
      description:
        "Our guided questionnaire helps you articulate your vision. Our AI then stress-tests it, giving you an instant, unbiased score on its viability.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent" />,
      title: "Master Your Financials.",
      description:
        "From calculating your burn rate to projecting revenue, our calculators turn your biggest financial questions into clear, actionable numbers.",
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-accent" />,
      title: "Pitch with Unshakeable Confidence.",
      description:
        "Receive a detailed report and an AI-generated pitch deck, giving you the clarity and materials you need to impress investors and mentors.",
    },
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                   <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Is Your Startup Idea Actually Good?
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Stop wasting time and money on a business that's doomed to fail. Get the data-driven answers you need with a full suite of FREE AI-powered tools for founders.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/validate">
                      Get Your Free Validation Score
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                 <p className="text-xs text-muted-foreground">
                    100% Free for founders, from TheASKT.org
                  </p>
              </div>
              {heroImage &&
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  data-ai-hint={heroImage.imageHint}
                  height="550"
                  src={heroImage.imageUrl}
                  width="550"
                />
              }
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                 <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                   The Founder's Secret Weapon
                  </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Go From "Idea" to "Investable" in Minutes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  You have the vision. We provide the clarity. This isn't just another set of tools; it's a guided path to building a business that works.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 border-transparent hover:border-primary transition-all">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                    width="550"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to Build with Unfair Confidence?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The difference between success and failure can be one smart decision. Start making them now. Get your free, data-driven validation report and unlock the entire toolkit, brought to you by TheASKT.org.
                </p>
                </div>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse">
                        <Link href="/validate">
                        Get My Free Report & Unlock All Tools
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
