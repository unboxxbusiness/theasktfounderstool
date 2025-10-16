'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

export default function ValuationCalculatorPage() {
  const [annualRevenue, setAnnualRevenue] = useState(100000);
  const [growthRate, setGrowthRate] = useState(50);
  const [industry, setIndustry] = useState('SaaS');
  const [stage, setStage] = useState('Seed');

  const valuation = useMemo(() => {
    const baseMultiple = industryMultiples[industry] || industryMultiples['Other'];
    const stageMultiplier = ventureStages[stage] || 1;
    const growthMultiplier = 1 + (growthRate / 100);

    // Simplified valuation formula
    const calculatedValuation = annualRevenue * baseMultiple * growthMultiplier * stageMultiplier;
    
    return isNaN(calculatedValuation) ? 0 : calculatedValuation;
  }, [annualRevenue, growthRate, industry, stage]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              Startup Valuation Calculator
            </CardTitle>
            <CardDescription>
              What’s your startup worth today? Get a quick estimate based on standard multiples.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual Revenue (ARR)</Label>
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
                  <Label htmlFor="growthRate">Annual Growth Rate (%)</Label>
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
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
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
                    <Label htmlFor="stage">Venture Stage</Label>
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
                    <Label className="text-lg text-muted-foreground">Estimated Valuation</Label>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This is a simplified estimate for pre-revenue and early-stage startups. Actual valuations can vary significantly based on team, market, traction, and other factors.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
              <div className="text-5xl font-bold text-primary">{formatCurrency(valuation)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
