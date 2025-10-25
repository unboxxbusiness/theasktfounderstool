
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "Top Startup Ideas for Women & Girls | TheASKT",
    description: "Get inspired with our curated list of startup ideas focusing on markets and problems relevant to women and girls.",
};

interface Idea {
    title: string;
    description: string;
}

const ideas: Idea[] = [
    {
        title: "Subscription Box for New Mothers",
        description: "A curated subscription box service that delivers essential, high-quality products for both postpartum mothers and their newborn babies, focusing on organic, sustainable, and women-owned brands."
    },
    {
        title: "AI-Powered Career Coaching Platform for Women",
        description: "An online platform that uses AI to provide personalized career coaching, mentorship matching, salary negotiation advice, and leadership training specifically for women in the corporate world."
    },
    {
        title: "Sustainable & Innovative Menstrual Health Products",
        description: "An e-commerce brand offering eco-friendly menstrual products (like reusable cups, biodegradable pads) combined with an educational platform to promote menstrual health awareness."
    },
    {
        title: "Personal Safety Wearable Tech",
        description: "Designing and selling stylish smart jewelry (bracelets, necklaces) with integrated personal safety features like an SOS button, location tracking, and emergency contact alerts."
    },
    {
        title: "A Niche Community & Networking App for Women in Tech",
        description: "A mobile-first platform for women in STEM fields to network, find mentors, share opportunities, and collaborate on projects in a supportive, harassment-free environment."
    },
    {
        title: "Virtual Wellness & Mental Health Clinic for Women",
        description: "A telehealth service offering access to therapists, gynecologists, and wellness coaches specializing in women's health issues, from hormonal health to mental well-being."
    }
];

export default function StartupSchemesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Lightbulb className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Startup Ideas for Women & Girls
          </CardTitle>
          <CardDescription>
            A curated list of business ideas focused on solving problems and creating value for female-centric markets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ideas.map((idea) => (
                    <Card key={idea.title} className="flex flex-col">
                       <CardHeader>
                            <CardTitle as="h2" className="text-lg font-semibold">{idea.title}</CardTitle>
                        </CardHeader>
                         <CardContent className="flex-grow">
                            <p className="text-sm">{idea.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
