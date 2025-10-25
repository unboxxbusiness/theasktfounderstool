
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SocialShare } from '@/components/social-share';
import { BackButton } from '@/components/back-button';

const industryMultiples: Record<string, number> = {
  SaaS: 8,
  EdTech: 6,
  FinTech: 10,
  HealthTech: 9,
  'E-commerce': 4,
  'Deep Tech': 12,
  'Climate Tech': 7,
  'Consumer Social': 5,
  'Developer Tools': 9,
  Other: 5,
};

const ventureStages: Record<string, number> = {
  'Pre-seed': 0.8,
  Seed: 1,
  'Series A': 1.5,
  'Series B+': 2,
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value);
};

export function ValuationCalculator() {
  const searchParams = useSearchParams();
  const [annualRevenue, setAnnualRevenue] = useState(Number(searchParams.get('annualRevenue')) || 100000);
  const [growthRate, setGrowthRate] = useState(Number(searchParams.get('growthRate')) || 50);
  const [industry, setIndustry] = useState(searchParams.get('industry') || 'SaaS');
  const [stage, setStage] = useState(searchParams.get('stage') || 'Seed');
  const [shareUrl, setShareUrl] = useState('');

  const valuation = useMemo(() => {
    const baseMultiple = industryMultiples[industry] || industryMultiples['Other'];
    const stageMultiplier = ventureStages[stage] || 1;
    const growthMultiplier = 1 + (growthRate / 100);
    const calculatedValuation = annualRevenue * baseMultiple * growthMultiplier * stageMultiplier;
    return isNaN(calculatedValuation) ? 0 : calculatedValuation;
  }, [annualRevenue, growthRate, industry, stage]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('annualRevenue', String(annualRevenue));
    params.set('growthRate', String(growthRate));
    params.set('industry', industry);
    params.set('stage', stage);
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [annualRevenue, growthRate, industry, stage, shareUrl]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
        <BackButton />
        <Card>
          <CardHeader>
            <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
              <Calculator className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Startup Valuation Calculator
            </CardTitle>
            <CardDescription>
              Get a data-driven valuation estimate in 60 seconds. Stop guessing and start negotiating with confidence.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">What's your current Annual Recurring Revenue (ARR)?</Label>
                  <Input
                    id="annualRevenue"
                    type="number"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                    step="10000"
                    placeholder="e.g., 100000"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="growthRate">What's your year-over-year growth rate? (%)</Label>
                   <Input
                    id="growthRate"
                    type="number"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(Number(e.target.value))}
                    step="10"
                    placeholder="e.g., 50"
                  />
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                    <Label htmlFor="industry">What industry are you in?</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                            <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(industryMultiples).map(key => (
                                <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stage">What's your current funding stage?</Label>
                    <Select value={stage} onValueChange={setStage}>
                        <SelectTrigger id="stage">
                            <SelectValue placeholder="Select Stage" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(ventureStages).map(key => (
                                <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
               </div>
            </div>
            
            <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
                <div className='flex items-center justify-center gap-2'>
                    <Label className="text-md md:text-lg text-zinc-400">Your Estimated Valuation Is</Label>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This is a simplified, high-level estimate. Your actual valuation will depend on your team, market, traction, and narrative.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
              <div className="text-4xl md:text-5xl font-bold text-primary">{formatCurrency(valuation)}</div>
            </div>

            <SocialShare 
                shareUrl={shareUrl}
                text={`Our estimated startup valuation is ${formatCurrency(valuation)}! I calculated it with TheASKT's free toolkit.`}
            />

          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
