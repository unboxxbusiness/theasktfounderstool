
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DollarSign, Percent, Users, Scale } from 'lucide-react';
import { SocialShare } from '@/components/social-share';

const formatCurrency = (value: number) => {
  if (value === Infinity || isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function CacLtvCalculatorPage() {
  const searchParams = useSearchParams();
  const [marketingSpend, setMarketingSpend] = useState(Number(searchParams.get('marketingSpend')) || 10000);
  const [customersAcquired, setCustomersAcquired] = useState(Number(searchParams.get('customersAcquired')) || 500);
  const [avgMonthlySpend, setAvgMonthlySpend] = useState(Number(searchParams.get('avgMonthlySpend')) || 50);
  const [grossMargin, setGrossMargin] = useState(Number(searchParams.get('grossMargin')) || 80);
  const [monthlyChurn, setMonthlyChurn] = useState(Number(searchParams.get('monthlyChurn')) || 5);
  const [shareUrl, setShareUrl] = useState('');

  const { cac, ltv, ratio } = useMemo(() => {
    const cac = customersAcquired > 0 ? marketingSpend / customersAcquired : 0;
    const monthlyChurnRate = monthlyChurn / 100;
    const grossMarginRate = grossMargin / 100;
    const ltv = monthlyChurnRate > 0 ? (avgMonthlySpend * grossMarginRate) / monthlyChurnRate : 0;
    const ratio = cac > 0 ? ltv / cac : 0;
    return { 
        cac: isNaN(cac) ? 0 : cac, 
        ltv: isNaN(ltv) ? 0 : ltv, 
        ratio: isNaN(ratio) ? 0 : ratio 
    };
  }, [marketingSpend, customersAcquired, avgMonthlySpend, grossMargin, monthlyChurn]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('marketingSpend', String(marketingSpend));
    params.set('customersAcquired', String(customersAcquired));
    params.set('avgMonthlySpend', String(avgMonthlySpend));
    params.set('grossMargin', String(grossMargin));
    params.set('monthlyChurn', String(monthlyChurn));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if(newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [marketingSpend, customersAcquired, avgMonthlySpend, grossMargin, monthlyChurn, shareUrl]);

  const getRatioMessage = () => {
    if (ratio >= 3) {
      return {
        title: "You've Got a Great Business Model!",
        description: "Your LTV to CAC ratio is fantastic. This means your customer acquisition strategy is highly profitable and sustainable. Keep doing what you're doing!",
        variant: 'default',
        color: 'text-green-500'
      };
    }
    if (ratio >= 1) {
      return {
        title: 'You are on the Right Track, but Could Improve',
        description: "It's good that you're making more from customers than you spend to get them, but a ratio below 3:1 suggests there's room to boost profitability. Try to increase your customer LTV or lower your CAC.",
        variant: 'default',
        color: 'text-yellow-500'
      };
    }
    return {
      title: 'Warning: Unsustainable Business Model',
      description: "You're spending more to acquire customers than they're worth to your business. This is a red flag. You must find ways to increase LTV or drastically reduce your CAC.",
      variant: 'destructive',
      color: ''
    };
  };
  
  const ratioAlert = getRatioMessage();

  return (
    <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
                <Scale className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                Are Your Customers Actually Profitable? (LTV vs CAC)
              </CardTitle>
              <CardDescription>
                Quickly analyze the relationship between your Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC) to see if your business model is sustainable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="marketingSpend">Total Marketing & Sales Spend (in one month)</Label>
                <Input
                  id="marketingSpend"
                  type="number"
                  value={marketingSpend}
                  onChange={(e) => setMarketingSpend(Number(e.target.value))}
                  step="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customersAcquired">New Customers Acquired (in that month)</Label>
                <Input
                  id="customersAcquired"
                  type="number"
                  value={customersAcquired}
                  onChange={(e) => setCustomersAcquired(Number(e.target.value))}
                  step="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgMonthlySpend">How much does a customer pay you per month?</Label>
                <Input
                  id="avgMonthlySpend"
                  type="number"
                  value={avgMonthlySpend}
                  onChange={(e) => setAvgMonthlySpend(Number(e.target.value))}
                  step="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grossMargin">What's your Gross Margin? (%)</Label>
                <Input
                  id="grossMargin"
                  type="number"
                  value={grossMargin}
                  onChange={(e) => setGrossMargin(Number(e.target.value))}
                  step="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyChurn">What percentage of customers cancel each month?</Label>
                <Input
                  id="monthlyChurn"
                  type="number"
                  value={monthlyChurn}
                  onChange={(e) => setMonthlyChurn(Number(e.target.value))}
                  step="0.5"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
           <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Key Growth Metrics</CardTitle>
                <CardDescription>Here's your calculated CAC, LTV, and the all-important ratio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 md:p-4 bg-muted/50 rounded-lg">
                    <div className='flex items-center gap-2'>
                        <DollarSign className='h-5 w-5 text-zinc-400'/>
                        <span className="font-semibold text-sm md:text-base">Customer Acquisition Cost (CAC)</span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold">{formatCurrency(cac)}</span>
                </div>
                <div className="flex justify-between items-center p-3 md:p-4 bg-muted/50 rounded-lg">
                    <div className='flex items-center gap-2'>
                        <Users className='h-5 w-5 text-zinc-400'/>
                        <span className="font-semibold text-sm md:text-base">Customer Lifetime Value (LTV)</span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold">{formatCurrency(ltv)}</span>
                </div>
                 <div className="flex justify-between items-center p-3 md:p-4 bg-muted/50 rounded-lg">
                    <div className='flex items-center gap-2'>
                        <Percent className='h-5 w-5 text-zinc-400'/>
                        <span className="font-semibold text-sm md:text-base">LTV to CAC Ratio</span>
                    </div>
                    <span className={`text-xl md:text-2xl font-bold ${ratioAlert.color}`}>{ratio.toFixed(2)} : 1</span>
                </div>
              </CardContent>
            </Card>
             <Alert variant={ratioAlert.variant} className={!ratioAlert.color ? '' : `${ratioAlert.color} border-current/50`}>
              <Scale className="h-4 w-4" />
              <AlertTitle>{ratioAlert.title}</AlertTitle>
              <AlertDescription>{ratioAlert.description}</AlertDescription>
            </Alert>
             <SocialShare 
                shareUrl={shareUrl}
                text={`My startup's LTV:CAC ratio is ${ratio.toFixed(2)}:1! I analyzed it with TheASKT's free toolkit.`}
            />
        </div>
      </div>
    </div>
  );
}
