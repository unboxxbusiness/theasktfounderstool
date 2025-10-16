'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DollarSign, Percent, Users, Scale } from 'lucide-react';

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
  const [marketingSpend, setMarketingSpend] = useState(10000);
  const [customersAcquired, setCustomersAcquired] = useState(500);
  const [avgMonthlySpend, setAvgMonthlySpend] = useState(50);
  const [grossMargin, setGrossMargin] = useState(80);
  const [monthlyChurn, setMonthlyChurn] = useState(5);

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

  const getRatioMessage = () => {
    if (ratio >= 3) {
      return {
        title: 'Healthy Business Model',
        description: 'Your LTV:CAC ratio is in a great spot, indicating a very healthy and profitable customer acquisition strategy. Keep it up!',
        variant: 'default',
        color: 'text-green-500'
      };
    }
    if (ratio >= 1) {
      return {
        title: 'Needs Improvement',
        description: 'Your LTV is higher than your CAC, which is good. However, a ratio below 3:1 suggests there is room to improve profitability. Focus on increasing LTV or decreasing CAC.',
        variant: 'default',
        color: 'text-yellow-500'
      };
    }
    return {
      title: 'Action Required',
      description: 'Your Customer Acquisition Cost is higher than your Lifetime Value. This is an unsustainable model. You need to urgently find ways to either increase LTV or drastically reduce CAC.',
      variant: 'destructive',
      color: ''
    };
  };
  
  const ratioAlert = getRatioMessage();

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline flex items-center gap-2">
                <Scale className="h-8 w-8 text-primary" />
                CAC vs. LTV Calculator
              </CardTitle>
              <CardDescription>
                Is your startup profitable per customer? Analyze the relationship between Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="marketingSpend">Total Marketing & Sales Spend</Label>
                <Input
                  id="marketingSpend"
                  type="number"
                  value={marketingSpend}
                  onChange={(e) => setMarketingSpend(Number(e.target.value))}
                  step="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customersAcquired">New Customers Acquired</Label>
                <Input
                  id="customersAcquired"
                  type="number"
                  value={customersAcquired}
                  onChange={(e) => setCustomersAcquired(Number(e.target.value))}
                  step="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgMonthlySpend">Average Revenue Per User (ARPU, Monthly)</Label>
                <Input
                  id="avgMonthlySpend"
                  type="number"
                  value={avgMonthlySpend}
                  onChange={(e) => setAvgMonthlySpend(Number(e.target.value))}
                  step="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grossMargin">Gross Margin (%)</Label>
                <Input
                  id="grossMargin"
                  type="number"
                  value={grossMargin}
                  onChange={(e) => setGrossMargin(Number(e.target.value))}
                  step="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyChurn">Monthly Churn Rate (%)</Label>
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
                <CardTitle className="text-xl">Key Metrics</CardTitle>
                <CardDescription>Your calculated CAC, LTV, and the all-important ratio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className='flex items-center gap-2'>
                        <DollarSign className='h-5 w-5 text-muted-foreground'/>
                        <span className="font-semibold">Customer Acquisition Cost (CAC)</span>
                    </div>
                    <span className="text-2xl font-bold">{formatCurrency(cac)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className='flex items-center gap-2'>
                        <Users className='h-5 w-5 text-muted-foreground'/>
                        <span className="font-semibold">Customer Lifetime Value (LTV)</span>
                    </div>
                    <span className="text-2xl font-bold">{formatCurrency(ltv)}</span>
                </div>
                 <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className='flex items-center gap-2'>
                        <Percent className='h-5 w-5 text-muted-foreground'/>
                        <span className="font-semibold">LTV to CAC Ratio</span>
                    </div>
                    <span className={`text-2xl font-bold ${ratioAlert.color}`}>{ratio.toFixed(2)} : 1</span>
                </div>
              </CardContent>
            </Card>
             <Alert variant={ratioAlert.variant} className={!ratioAlert.color ? '' : `${ratioAlert.color} border-current/50`}>
              <Scale className="h-4 w-4" />
              <AlertTitle>{ratioAlert.title}</AlertTitle>
              <AlertDescription>{ratioAlert.description}</AlertDescription>
            </Alert>
        </div>
      </div>
    </div>
  );
}
