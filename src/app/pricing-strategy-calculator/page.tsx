
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DollarSign, HelpCircle } from 'lucide-react';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Startup Pricing Strategy Calculator | Find Your Price Point",
    description: "What should you charge for your product? Use our free calculator to analyze cost-plus, competitive, and value-based pricing strategies.",
};

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function PricingStrategyCalculatorPage() {
  const searchParams = useSearchParams();
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
    params.set('costPerUnit', String(costPerUnit));
    params.set('desiredMargin', String(desiredMargin));
    params.set('competitorPrice', String(competitorPrice));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [costPerUnit, desiredMargin, competitorPrice, shareUrl]);


  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
              <DollarSign className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Product Pricing Strategy Calculator
            </CardTitle>
            <CardDescription>
              Stop guessing on price. Use this calculator to analyze your costs, desired margin, and competitor pricing to find your sweet spot.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="costPerUnit">What's your total cost to deliver one unit?</Label>
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
                  <Label htmlFor="desiredMargin">What's your target profit margin? (%)</Label>
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
                <Label htmlFor="competitorPrice">How much does your main competitor charge?</Label>
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
            
            <div className="space-y-6">
               <div className='flex items-center justify-center gap-2'>
                    <Label className="text-md md:text-lg text-zinc-400">Your Recommended Price Points</Label>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">These are data-driven suggestions based on different strategies. Your final price depends on your brand, market, and goals.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <CardHeader className="p-2">
                      <CardTitle className="text-lg md:text-xl">Cost-Plus</CardTitle>
                      <CardDescription className="text-sm">Based on your margin</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-3xl md:text-4xl font-bold">{pricingTiers.costPlus === Infinity ? 'N/A' : formatCurrency(pricingTiers.costPlus)}</p>
                      <Badge variant="outline" className="mt-2">Your Target</Badge>
                    </CardContent>
                  </Card>
                  <Card className="text-center border-primary/50 ring-1 ring-primary/20 p-4">
                     <CardHeader className="p-2">
                      <CardTitle className="text-lg md:text-xl">Competitive</CardTitle>
                      <CardDescription className="text-sm">Based on market</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(pricingTiers.competitive)}</p>
                       <Badge variant="default" className="mt-2">Recommended</Badge>
                    </CardContent>
                  </Card>
                   <Card className="text-center p-4">
                     <CardHeader className="p-2">
                      <CardTitle className="text-lg md:text-xl">Premium</CardTitle>
                      <CardDescription className="text-sm">Based on value</CardDescription>
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
                text={`I'm using TheASKT's free toolkit to figure out my pricing strategy for my startup.`}
            />
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
