'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles, AlertCircle, Paintbrush } from 'lucide-react';
import { generateBranding } from '@/lib/actions';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const brandingSchema = z.object({
  ideaDescription: z.string().min(20, { message: 'Please provide a description of at least 20 characters.' }),
});

type BrandingFormState = z.infer<typeof brandingSchema>;

type BrandingResult = {
    names: string[];
    slogans: string[];
    logoDataUri: string;
}

export default function BrandingPage() {
  const [result, setResult] = useState<BrandingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<BrandingFormState>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      ideaDescription: '',
    },
  });

  const onSubmit = async (data: BrandingFormState) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const brandingResult = await generateBranding(data);
      setResult(brandingResult);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating branding assets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="grid gap-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <Paintbrush className="h-8 w-8 text-primary" />
              Business Name & Branding Generator
            </CardTitle>
            <CardDescription>
              Describe your startup idea and get instant AI-powered suggestions for names, slogans, and a logo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="ideaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idea Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A platform that connects local artists with buyers using augmented reality previews." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : 'Generate Branding'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your branding assets...</p>
            <p className="text-sm text-muted-foreground">(This might take a moment)</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {result && (
          <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Your Branding Kit
                </CardTitle>
                <CardDescription>
                    Here are some creative ideas to get you started.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-4">Generated Logo</h3>
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden border shadow-md">
                         <Image src={result.logoDataUri} alt="Generated Logo" layout="fill" objectFit="cover" />
                        </div>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Name Suggestions</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {result.names.map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold mb-4">Slogan Ideas</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {result.slogans.map((slogan, index) => (
                                    <li key={index}>{slogan}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
