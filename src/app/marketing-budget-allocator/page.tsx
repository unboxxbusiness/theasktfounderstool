
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
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';

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
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
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
    params.set('name', name);
    params.set('company', company);
    params.set('totalBudget', String(totalBudget));
    params.set('goal', goal);
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [name, company, totalBudget, goal, shareUrl]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
                  <Megaphone className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  Marketing Budget Allocator
                </CardTitle>
                <CardDescription>Get a recommended marketing mix based on your startup's primary goal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Acme Inc." />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalBudget">Total Monthly Marketing Budget</Label>
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
                        <Label>Primary Marketing Goal</Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">Your primary goal will influence which channels get more budget.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                  <RadioGroup defaultValue={goal} onValueChange={(value: MarketingGoal) => setGoal(value)} className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
                    <div>
                      <RadioGroupItem value="brand" id="brand" className="peer sr-only" />
                      <Label htmlFor="brand" className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Brand Awareness
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="leads" id="leads" className="peer sr-only" />
                      <Label htmlFor="leads" className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Lead Generation
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="sales" id="sales" className="peer sr-only" />
                      <Label htmlFor="sales" className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Sales/Conversions
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
                <CardTitle className="text-lg md:text-xl">Budget Allocation</CardTitle>
                <CardDescription>A visual breakdown of your recommended marketing mix.</CardDescription>
              </CardHeader>
              <CardContent>
                 <ReportHeader name={name} company={company} />
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
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-sm">
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
                text={`Here's the marketing budget allocation for ${company || 'my startup'}! Calculated via TheASKT.org.`}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
