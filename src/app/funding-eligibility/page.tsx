'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles, AlertCircle, Search } from 'lucide-react';
import { checkFundingEligibility as getFundingEligibility } from '@/lib/actions';
import { fundingEligibilitySchema } from '@/lib/schemas';
import type { FundingEligibilityFormState, FundingEligibilityResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ventureStages = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];
const domains = ['SaaS', 'FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'Deep Tech', 'Climate Tech', 'Consumer Social', 'Developer Tools', 'Other'];

export default function FundingEligibilityPage() {
  const [result, setResult] = useState<FundingEligibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FundingEligibilityFormState>({
    resolver: zodResolver(fundingEligibilitySchema),
    defaultValues: {
      ventureStage: '',
      domain: '',
      ideaDescription: '',
    },
  });

  const onSubmit = async (data: FundingEligibilityFormState) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const eligibilityResult = await getFundingEligibility(data);
      setResult(eligibilityResult);
    } catch (e) {
      console.error(e);
      setError('An error occurred while checking for funding eligibility. Please try again.');
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
              <Search className="h-8 w-8 text-primary" />
              Funding Eligibility Checker
            </CardTitle>
            <CardDescription>
              Discover funding opportunities and investors tailored to your venture. Provide your details to get an AI-powered analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="ventureStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venture Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your current stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ventureStages.map(stage => (
                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain / Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {domains.map(domain => (
                            <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ideaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idea Description</FormLabel>
                      <FormDescription>
                        Briefly describe your business, target market, and what makes you unique.
                      </FormDescription>
                      <FormControl>
                        <Textarea placeholder="e.g., We are building a platform to connect..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : 'Check Eligibility'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Finding opportunities...</p>
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
                    Your Funding Opportunities
                </CardTitle>
                <CardDescription>
                    Based on your venture, here are some potential investors and funding sources to explore.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {result.opportunities.map((opp, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>
                                <div className="text-left">
                                    <p className="font-semibold">{opp.name}</p>
                                    <p className="text-sm text-muted-foreground">{opp.type}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                <p><span className="font-semibold">Focus:</span> {opp.description}</p>
                                <p className="text-green-700 dark:text-green-400"><span className="font-semibold">Why it's a fit:</span> {opp.suitability}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>AI Recommendations</AlertTitle>
                    <AlertDescription>
                        {result.recommendations}
                    </AlertDescription>
                </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
