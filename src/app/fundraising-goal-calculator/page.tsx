
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Landmark, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';
import { BackButton } from '@/components/back-button';

// Note: Metadata is defined here but will be overridden by the page component's export.
// This is a placeholder for static analysis.
const metadata: Metadata = {
    title: "Startup Fundraising Goal Calculator | How Much To Raise | TheASKT",
    description: "Calculate a strategic fundraising goal. Stop guessing and use our free tool to determine how much cash you need to raise based on runway and burn rate.",
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function FundraisingGoalCalculatorPage() {
  const searchParams = useSearchParams();
  const [monthlyBurn, setMonthlyBurn] = useState(Number(searchParams.get('monthlyBurn')) || 50000);
  const [targetRunway, setTargetRunway] = useState(Number(searchParams.get('targetRunway')) || 18);
  const [buffer, setBuffer] = useState(Number(searchParams.get('buffer')) || 25);
  const [shareUrl, setShareUrl] = useState('');

  const fundingGoal = useMemo(() => {
    const totalBurn = monthlyBurn * targetRunway;
    const goal = totalBurn * (1 + buffer / 100);
    return isNaN(goal) ? 0 : goal;
  }, [monthlyBurn, targetRunway, buffer]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('monthlyBurn', String(monthlyBurn));
    params.set('targetRunway', String(targetRunway));
    params.set('buffer', String(buffer));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [monthlyBurn, targetRunway, buffer, shareUrl]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
        <BackButton />
        <Card>
          <CardHeader>
            <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
              <Landmark className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Fundraising Goal Calculator
            </CardTitle>
            <CardDescription>
              Stop pulling numbers out of thin air. Calculate a strategic fundraising goal that gives you enough runway to hit your next milestones.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyBurn">What's your estimated monthly burn rate (after funding)?</Label>
                  <Input
                    id="monthlyBurn"
                    type="number"
                    value={monthlyBurn}
                    onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                    step="5000"
                    placeholder="e.g., 50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetRunway">How many months of runway do you want?</Label>
                  <Input
                    id="targetRunway"
                    type="number"
                    value={targetRunway}
                    onChange={(e) => setTargetRunway(Number(e.target.value))}
                    step="1"
                    placeholder="e.g., 18"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Label htmlFor="buffer">How big of a safety buffer do you want? (%)</Label>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">A 20-30% buffer is smart. It covers unexpected costs and lets you jump on surprise opportunities without worry.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <Input
                  id="buffer"
                  type="number"
                  value={buffer}
                  onChange={(e) => setBuffer(Number(e.target.value))}
                  step="5"
                  placeholder="e.g., 25"
                />
              </div>
            </div>
            
            <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
              <Label className="text-md md:text-lg text-zinc-400">Your Ideal Funding Goal Is</Label>
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {formatCurrency(fundingGoal)}
              </div>
              <p className="text-sm md:text-base text-zinc-400">
                This would give you {targetRunway} months of runway with a {buffer}% safety buffer.
              </p>
            </div>

            <SocialShare 
                shareUrl={shareUrl}
                text={`Our next fundraising goal is ${formatCurrency(fundingGoal)}! Calculated our target with TheASKT's free toolkit.`}
            />

          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
