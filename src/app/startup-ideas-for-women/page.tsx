
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "AI & Digital Marketing Startup Ideas for Women | TheASKT",
    description: "Get inspired with our curated list of AI and digital marketing startup ideas focusing on markets and problems relevant to women and girls.",
};

interface Idea {
    title: string;
    description: string;
}

const ideas: Idea[] = [
    {
        title: "AI-Powered Career Coaching Platform for Women",
        description: "An online platform that uses AI to provide personalized career coaching, mentorship matching, salary negotiation advice, and leadership training specifically for women in the corporate world."
    },
    {
        title: "Digital Marketing Agency for Women-Owned Businesses",
        description: "A specialized digital marketing agency that focuses on providing SEO, social media marketing, and content strategy services for businesses founded and run by women."
    },
    {
        title: "AI-Powered Mental Wellness & Burnout Prevention App",
        description: "A mobile app using AI to track stress indicators and provide personalized recommendations, guided meditations, and coaching to help professional women manage and prevent burnout."
    },
    {
        title: "Niche Influencer Marketing Platform for 'Mompreneurs'",
        description: "A digital platform connecting brands with a network of mom-influencers and bloggers, streamlining campaign management, and providing analytics for family and child-focused products."
    },
    {
        title: "AI Tool for Analyzing Gender Bias in Marketing Copy",
        description: "A SaaS tool that uses natural language processing (NLP) to analyze marketing and job description copy, identify unconscious gender bias, and suggest more inclusive language to improve audience reach."
    },
    {
        title: "A Niche Community & Networking App for Women in Tech",
        description: "A mobile-first platform for women in STEM fields to network, find mentors, share opportunities, and collaborate on projects in a supportive, harassment-free environment."
    }
];

export default function StartupIdeasPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Lightbulb className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            AI & Digital Marketing Startup Ideas for Women
          </CardTitle>
          <CardDescription>
            A curated list of business ideas in AI and digital marketing, focused on solving problems and creating value for female-centric markets.
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
