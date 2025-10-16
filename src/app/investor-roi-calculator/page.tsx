'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PiggyBank, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const formatCurrency = (value: number) => {
  if (isNaN(value) || !isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCompactCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value);
};


export default function InvestorROICalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState(250000);
  const [equityPercentage, setEquityPercentage] = useState(10);
  const [exitValuation, setExitValuation] = useState(100000000);

  const { payout, roiMultiple } = useMemo(() => {
    if (investmentAmount <= 0 || equityPercentage <= 0 || exitValuation <= 0) {
        return { payout: 0, roiMultiple: 0 };
    }
    const payout = exitValuation * (equityPercentage / 100);
    const roiMultiple = payout / investmentAmount;
    return { payout, roiMultiple };
  }, [investmentAmount, equityPercentage, exitValuation]);

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <PiggyBank className="h-8 w-8 text-primary" />
              Investor ROI Calculator
            </CardTitle>
            <CardDescription>
              Estimate the potential return on investment for your investors based on a future exit valuation. See what your investors could make.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="investmentAmount">Investment Amount</Label>
                  <Input
                    id="investmentAmount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    step="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equityPercentage">Equity Percentage (%)</Label>
                  <Input
                    id="equityPercentage"
                    type="number"
                    value={equityPercentage}
                    onChange={(e) => setEquityPercentage(Number(e.target.value))}
                    step="1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                 <Label htmlFor="exitValuation">Projected Exit Valuation</Label>
                <Input
                  id="exitValuation"
                  type="number"
                  value={exitValuation}
                  onChange={(e) => setExitValuation(Number(e.target.value))}
                  step="10000000"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
                    <Label className="text-lg text-muted-foreground">Investor Payout at Exit</Label>
                    <div className="text-5xl font-bold text-primary">
                        {formatCompactCurrency(payout)}
                    </div>
                </div>
                <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
                    <Label className="text-lg text-muted-foreground">Return on Investment (ROI)</Label>
                    <div className="text-5xl font-bold text-accent">
                        {roiMultiple.toFixed(1)}x
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
