
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DollarSign, HelpCircle } from 'lucide-react';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function PricingStrategyCalculatorPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [costPerUnit, setCostPerUnit] = useState(Number(searchParams.get('costPerUnit')) || 15);
  const [desiredMargin, setDesiredMargin] = useState(Number(searchParams.get('desiredMargin')) || 70);
  const [competitorPrice, setCompetitorPrice] = useState(Number(searchParams.get('competitorPrice')) || 60);
  const [shareUrl, setShareUrl] = useState('');

  const pricingTiers = useMemo(() => {
    const costPlusPrice = desiredMargin < 100 ? costPerUnit / (1 - desiredMargin / 100) : Infinity;
    const competitivePrice = competitorPrice * 0.95; // Slightly undercut
    const premiumPrice = competitorPrice * 1.2; // Premium positioning
    return {
      costPlus: isNaN(costPlusPrice) ? 0 : costPlusPrice,
      competitive: isNaN(competitivePrice) ? 0 : competitivePrice,
      premium: isNaN(premiumPrice) ? 0 : premiumPrice,
    };
  }, [costPerUnit, desiredMargin, competitorPrice]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('company', company);
    params.set('costPerUnit', String(costPerUnit));
    params.set('desiredMargin', String(desiredMargin));
    params.set('competitorPrice', String(competitorPrice));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [name, company, costPerUnit, desiredMargin, competitorPrice, shareUrl]);


  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
              <DollarSign className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Pricing Strategy Calculator
            </CardTitle>
            <CardDescription>
              Find your ideal price point by analyzing costs, margins, and competitor pricing.
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
                  <Label htmlFor="costPerUnit">Cost Per Unit (Fully-loaded)</Label>
                  <Input
                    id="costPerUnit"
                    type="number"
                    value={costPerUnit}
                    onChange={(e) => setCostPerUnit(Number(e.target.value))}
                    step="1"
                    placeholder="e.g., 15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desiredMargin">Desired Gross Margin (%)</Label>
                  <Input
                    id="desiredMargin"
                    type="number"
                    value={desiredMargin}
                    onChange={(e) => setDesiredMargin(Number(e.target.value))}
                    step="5"
                    max="99"
                    placeholder="e.g., 70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="competitorPrice">Main Competitor's Price</Label>
                <Input
                  id="competitorPrice"
                  type="number"
                  value={competitorPrice}
                  onChange={(e) => setCompetitorPrice(Number(e.target.value))}
                  step="5"
                  placeholder="e.g., 60"
                />
              </div>
            </div>
            
            <ReportHeader name={name} company={company} />

            <div className="space-y-6">
               <div className='flex items-center justify-center gap-2'>
                    <Label className="text-md md:text-lg text-muted-foreground">Recommended Price Points</Label>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">These are suggestions based on different pricing strategies. Your final price may vary based on market positioning, brand, and other factors.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <CardHeader className="p-2">
                      <CardTitle className="text-lg md:text-xl">Cost-Plus</CardTitle>
                      <CardDescription className="text-sm">Margin-based</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-3xl md:text-4xl font-bold">{pricingTiers.costPlus === Infinity ? 'N/A' : formatCurrency(pricingTiers.costPlus)}</p>
                      <Badge variant="outline" className="mt-2">Your Target</Badge>
                    </CardContent>
                  </Card>
                  <Card className="text-center border-primary/50 ring-1 ring-primary/20 p-4">
                     <CardHeader className="p-2">
                      <CardTitle className="text-lg md:text-xl">Competitive</CardTitle>
                      <CardDescription className="text-sm">Market-based</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(pricingTiers.competitive)}</p>
                       <Badge variant="default" className="mt-2">Recommended</Badge>
                    </CardContent>
                  </Card>
                   <Card className="text-center p-4">
                     <CardHeader className="p-2">
                      <CardTitle className="text-lg md:text-xl">Premium</CardTitle>
                      <CardDescription className="text-sm">Value-based</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-3xl md:text-4xl font-bold">{formatCurrency(pricingTiers.premium)}</p>
                      <Badge variant="outline" className="mt-2">High-End</Badge>
                    </CardContent>
                  </Card>
                </div>
            </div>
            <SocialShare 
                shareUrl={shareUrl}
                text={`We're exploring pricing strategies for ${company || 'our startup'} with TheASKT's free toolkit.`}
            />
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
