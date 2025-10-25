
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Megaphone, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

export const metadata: Metadata = {
    title: "Startup Marketing Budget Allocator | Free Tool by TheASKT",
    description: "Get a recommended marketing budget allocation based on your startup's #1 goal (brand, leads, or sales). Stop wasting money and get results with a data-driven plan.",
};

const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];
const CHANNELS = ['Google Ads', 'Meta Ads', 'SEO/Content', 'Events'];

type MarketingGoal = 'brand' | 'leads' | 'sales';

const allocationPresets: Record<MarketingGoal, number[]> = {
  brand: [30, 40, 20, 10], // Google, Meta, SEO, Events
  leads: [40, 25, 25, 10],
  sales: [50, 20, 20, 10],
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function MarketingBudgetAllocatorPage() {
  const searchParams = useSearchParams();
  const [totalBudget, setTotalBudget] = useState(Number(searchParams.get('totalBudget')) || 50000);
  const [goal, setGoal] = useState<MarketingGoal>((searchParams.get('goal') as MarketingGoal) || 'leads');
  const [shareUrl, setShareUrl] = useState('');

  const allocationData = useMemo(() => {
    const percentages = allocationPresets[goal];
    return CHANNELS.map((name, index) => ({
      name,
      value: percentages[index],
      amount: (totalBudget * percentages[index]) / 100,
    }));
  }, [totalBudget, goal]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('totalBudget', String(totalBudget));
    params.set('goal', goal);
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [totalBudget, goal, shareUrl]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
                  <Megaphone className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  Marketing Budget Allocator
                </CardTitle>
                <CardDescription>Get a recommended marketing mix based on your startup's #1 goal. Stop wasting money and start getting results.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="totalBudget">What's your total monthly marketing budget?</Label>
                  <Input
                    id="totalBudget"
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    step={1000}
                  />
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Label>What's your primary marketing goal right now?</Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">Your main goal determines where you should focus your budget for the biggest impact.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                  <RadioGroup defaultValue={goal} onValueChange={(value: MarketingGoal) => setGoal(value)} className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
                    <div>
                      <RadioGroupItem value="brand" id="brand" className="peer sr-only" />
                      <Label htmlFor="brand" className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Build My Brand
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="leads" id="leads" className="peer sr-only" />
                      <Label htmlFor="leads" className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Get More Leads
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="sales" id="sales" className="peer sr-only" />
                      <Label htmlFor="sales" className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Drive Sales
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Your Recommended Budget</CardTitle>
                <CardDescription>Here's how you should think about allocating your marketing dollars.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 md:h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={allocationData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value, name, props) => [`${value}% (${formatCurrency(props.payload.amount)})`, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                 <Card className="bg-muted/50 mt-4">
                    <CardHeader>
                        <CardTitle className="text-md md:text-lg">Channel Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-sm pt-4">
                        {allocationData.map(channel => (
                             <div key={channel.name} className="flex justify-between items-center">
                                <span className="font-semibold">{channel.name}</span>
                                <span>{formatCurrency(channel.amount)} <Badge variant="secondary" className="ml-1">{channel.value}%</Badge></span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
              </CardContent>
            </Card>
            <SocialShare 
                shareUrl={shareUrl}
                text={`Here's the marketing budget allocation I generated for my startup with TheASKT's free toolkit!`}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
