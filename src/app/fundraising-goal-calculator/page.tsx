
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Landmark, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';

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
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
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
    params.set('name', name);
    params.set('company', company);
    params.set('monthlyBurn', String(monthlyBurn));
    params.set('targetRunway', String(targetRunway));
    params.set('buffer', String(buffer));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [name, company, monthlyBurn, targetRunway, buffer, shareUrl]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
              <Landmark className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Fundraising Goal Calculator
            </CardTitle>
            <CardDescription>
              How much should you really raise? Calculate your ideal seed or pre-seed funding amount.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyBurn">Current Monthly Burn Rate</Label>
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
                  <Label htmlFor="targetRunway">Target Runway (Months)</Label>
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
                    <Label htmlFor="buffer">Contingency Buffer (%)</Label>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">A 20-30% buffer is recommended to cover unexpected expenses and provide capital for growth opportunities.</p>
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
            
            <ReportHeader name={name} company={company} />
            
            <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
              <Label className="text-md md:text-lg text-muted-foreground">Ideal Funding Goal</Label>
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {formatCurrency(fundingGoal)}
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                This gives you {targetRunway} months of runway with a {buffer}% buffer.
              </p>
            </div>

            <SocialShare 
                shareUrl={shareUrl}
                text={`Our fundraising goal is ${formatCurrency(fundingGoal)}! Calculated with TheASKT's free startup toolkit.`}
            />

          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
