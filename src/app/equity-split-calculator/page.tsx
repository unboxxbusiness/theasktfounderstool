
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Scale, HelpCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Co-Founder Equity Split Calculator | Fair Equity Distribution | TheASKT",
    description: "How should you split equity with your co-founders? Use our free, data-driven calculator based on the 'Slicing Pie' model for a fair negotiation.",
};

const founderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  idea: z.number().min(0).max(100),
  time: z.number().min(0).max(100),
  money: z.number().min(0).max(100),
});

const formSchema = z.object({
  founders: z.array(founderSchema).min(1, 'At least one founder is required'),
});

type FounderFormState = z.infer<typeof formSchema>;

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const getDefaultFounders = (searchParams: URLSearchParams) => {
    const foundersParam = searchParams.get('founders');
    if (foundersParam) {
        try {
            const decodedFounders = JSON.parse(decodeURIComponent(foundersParam));
            if (Array.isArray(decodedFounders) && decodedFounders.length > 0) {
                return decodedFounders;
            }
        } catch (e) {
            console.error("Failed to parse founders from URL", e);
        }
    }
    return [{ name: 'Founder 1', idea: 50, time: 50, money: 50 }];
}


export default function EquitySplitCalculatorPage() {
  const searchParams = useSearchParams();
  const [weights, setWeights] = useState({ 
      idea: Number(searchParams.get('weightIdea')) || 40, 
      time: Number(searchParams.get('weightTime')) || 40, 
      money: Number(searchParams.get('weightMoney')) || 20 
  });
  const [shareUrl, setShareUrl] = useState('');
  
  const form = useForm<FounderFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      founders: getDefaultFounders(searchParams),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'founders',
  });

  const founderData = form.watch('founders');

  const equitySplit = useMemo(() => {
    const totalContributions = founderData.map(f => {
        return (f.idea / 100) * weights.idea + (f.time / 100) * weights.time + (f.money / 100) * weights.money;
    });
    const totalScore = totalContributions.reduce((acc, score) => acc + score, 0);
    if (totalScore === 0) {
        return founderData.map(f => ({ name: f.name, value: 100 / founderData.length }));
    }
    return founderData.map((f, index) => ({
      name: f.name,
      value: (totalContributions[index] / totalScore) * 100,
    }));
  }, [founderData, weights]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('weightIdea', String(weights.idea));
    params.set('weightTime', String(weights.time));
    params.set('weightMoney', String(weights.money));
    params.set('founders', encodeURIComponent(JSON.stringify(founderData)));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [weights, founderData, shareUrl]);


  const handleWeightChange = (category: 'idea' | 'time' | 'money', value: number) => {
    setWeights(prev => ({ ...prev, [category]: value }));
  };

  const addNewFounder = () => {
    append({ name: `Founder ${fields.length + 1}`, idea: 50, time: 50, money: 50 });
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
                  <Scale className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  Co-Founder Equity Split Calculator
                </CardTitle>
                <CardDescription>
                  Use this proven model to have a fair, data-driven conversation about who gets how much of the company.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className='text-lg md:text-xl'>Step 1: How important is each category?</CardTitle>
                         <CardDescription>Adjust the weight of each contribution category to your startup.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>Idea / Intellectual Property ({weights.idea}%)</Label>
                          <Slider value={[weights.idea]} onValueChange={([v]) => handleWeightChange('idea', v)} max={100} step={5} />
                        </div>
                        <div className="space-y-2">
                          <Label>Time & Effort ({weights.time}%)</Label>
                          <Slider value={[weights.time]} onValueChange={([v]) => handleWeightChange('time', v)} max={100} step={5} />
                        </div>
                        <div className="space-y-2">
                          <Label>Capital & Money Invested ({weights.money}%)</Label>
                          <Slider value={[weights.money]} onValueChange={([v]) => handleWeightChange('money', v)} max={100} step={5} />
                        </div>
                      </CardContent>
                    </Card>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-4">Step 2: How much is each founder contributing?</h3>
                      {fields.map((field, index) => (
                        <Card key={field.id} className="mb-4">
                          <CardHeader className='flex-row items-center justify-between'>
                            <FormField
                                control={form.control}
                                name={`founders.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className='flex-grow'>
                                    <FormControl>
                                        <Input {...field} className='text-lg md:text-xl font-semibold border-0 bg-transparent -ml-2 !ring-0 !shadow-none' />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <Button variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-zinc-400">On a scale of 0-100, how much is this founder contributing in each area relative to others?</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name={`founders.${index}.idea`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Idea</FormLabel>
                                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`founders.${index}.time`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`founders.${index}.money`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Money</FormLabel>
                                        <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button type="button" variant="outline" onClick={addNewFounder}>
                      <PlusCircle className="mr-2" /> Add Another Founder
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    Your Recommended Equity Split
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This is a suggested equity split based on the popular "Slicing Pie" model. It's a starting point for your conversation.</p>
                        </TooltipContent>
                    </Tooltip>
                </CardTitle>
                <CardDescription>The final, data-driven result of your inputs.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 md:h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={equitySplit}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        fill="#8884d8"
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      >
                        {equitySplit.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
             <SocialShare 
                shareUrl={shareUrl}
                text={`We figured out our co-founder equity split! We used TheASKT's free calculator to have a fair, data-driven conversation.`}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
