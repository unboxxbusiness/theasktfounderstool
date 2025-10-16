import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart,
  ClipboardCheck,
  Lightbulb,
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

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Turn Your Idea into a Reality
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ValidateAI gives you the feedback you need. Get an
                    AI-powered validation score and a detailed report to pitch
                    your startup with confidence.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/validate">
                      Validate Your Idea Now
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
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple, three-step process to get comprehensive feedback on
                  your startup idea.
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
      </main>
    </div>
  );
}
