import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart,
  ClipboardCheck,
  Lightbulb,
  Calculator,
  Users,
  TrendingUp,
  Banknote
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

const placeholderImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

export default function Home() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-accent" />,
      title: "Submit Your Idea",
      description:
        "Our guided questionnaire makes it easy to detail your business concept, covering all the crucial aspects venture capitalists look for.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent" />,
      title: "Get Instant Validation",
      description:
        "Our AI analyzes your idea against thousands of data points to provide an instant validation score on market viability, technical feasibility, and funding readiness.",
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-accent" />,
      title: "Receive Actionable Insights",
      description:
        "Get a detailed, shareable report outlining your idea's strengths, weaknesses, and a roadmap with actionable steps for improvement.",
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
                  <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                    Free for founders, by TheASKT.org
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Your All-in-One Startup Toolkit
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    From idea validation to financial projections, get free access to a full suite of AI-powered tools designed to help you plan, build, and grow your startup.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/validate">
                      Validate Your Idea for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              {placeholderImage &&
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  data-ai-hint={placeholderImage.imageHint}
                  height="550"
                  src={placeholderImage.imageUrl}
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Start with AI-Powered Validation
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple, three-step process to get comprehensive feedback on your startup idea.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index}>
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
                  A Full Suite of Founder Tools
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to make smarter decisions, from financial models to growth strategies.
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
        
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to Build with Confidence?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get started with our AI idea validator and unlock the full suite of tools. It’s 100% free.
                </p>
                </div>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/validate">
                        Get Your Free Validation Report
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

// Helper component
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
