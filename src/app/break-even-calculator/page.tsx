
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target, Info } from 'lucide-react';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Startup Break-Even Point Calculator | Free Tool for Founders",
    description: "Find out how many units you need to sell to become profitable. Our free break-even point calculator helps startups make smarter financial decisions.",
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function BreakEvenCalculatorPage() {
  const searchParams = useSearchParams();
  const [fixedCosts, setFixedCosts] = useState(Number(searchParams.get('fixedCosts')) || 20000);
  const [pricePerUnit, setPricePerUnit] = useState(Number(searchParams.get('pricePerUnit')) || 50);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(Number(searchParams.get('variableCostPerUnit')) || 15);
  const [shareUrl, setShareUrl] = useState('');

  const { breakEvenUnits, contributionMargin } = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    if (contributionMargin <= 0) return { breakEvenUnits: Infinity, contributionMargin: 0 };
    
    const units = fixedCosts / contributionMargin;
    return { breakEvenUnits: isNaN(units) ? 0 : units, contributionMargin };
  }, [fixedCosts, pricePerUnit, variableCostPerUnit]);
  
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('fixedCosts', String(fixedCosts));
    params.set('pricePerUnit', String(pricePerUnit));
    params.set('variableCostPerUnit', String(variableCostPerUnit));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (shareUrl !== newUrl) {
      setShareUrl(newUrl);
    }
  }, [fixedCosts, pricePerUnit, variableCostPerUnit, shareUrl]);


  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Target className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Break-Even Point Calculator
          </CardTitle>
          <CardDescription>
            Find the magic number of sales you need to cover all your costs and start making a profit.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fixedCosts">Total Monthly Fixed Costs (Rent, Salaries, etc.)</Label>
              <Input
                id="fixedCosts"
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                step="1000"
                placeholder="e.g., 20000"
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                    <Label htmlFor="pricePerUnit">Sale Price (Per Item or Subscription)</Label>
                    <Input
                        id="pricePerUnit"
                        type="number"
                        value={pricePerUnit}
                        onChange={(e) => setPricePerUnit(Number(e.target.value))}
                        step="5"
                        placeholder="e.g., 50"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="variableCostPerUnit">Variable Cost (Per Item or Subscription)</Label>
                    <Input
                        id="variableCostPerUnit"
                        type="number"
                        value={variableCostPerUnit}
                        onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                        step="1"
                        placeholder="e.g., 15"
                    />
                </div>
            </div>
          </div>
          
          <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
            <Label className="text-md md:text-lg text-zinc-400">Your Break-Even Point Is</Label>
            {breakEvenUnits === Infinity ? (
              <div className="text-4xl md:text-5xl font-bold text-destructive">Unprofitable</div>
            ) : (
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {Math.ceil(breakEvenUnits).toLocaleString()} <span className="text-2xl md:text-3xl">sales/month</span>
              </div>
            )}
            <p className="text-sm md:text-base text-zinc-400">
              This is based on a contribution margin of {formatCurrency(contributionMargin)} per sale.
            </p>
          </div>

          {breakEvenUnits === Infinity && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Pricing Alert!</AlertTitle>
              <AlertDescription>
                Your sale price must be higher than your variable cost per sale. Right now, you're losing money on every sale.
              </AlertDescription>
            </Alert>
          )}

           <SocialShare 
            shareUrl={shareUrl}
            text={`I need to make ${Math.ceil(breakEvenUnits).toLocaleString()} sales per month to be profitable! I just calculated my break-even point with TheASKT's free toolkit.`}
           />
        </CardContent>
      </Card>
    </div>
  );
}
