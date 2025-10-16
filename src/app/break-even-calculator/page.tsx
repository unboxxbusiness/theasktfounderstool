'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target, Info } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function BreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState(20000);
  const [pricePerUnit, setPricePerUnit] = useState(50);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(15);

  const { breakEvenUnits, contributionMargin } = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    if (contributionMargin <= 0) return { breakEvenUnits: Infinity, contributionMargin: 0 };
    
    const units = fixedCosts / contributionMargin;
    return { breakEvenUnits: isNaN(units) ? 0 : units, contributionMargin };
  }, [fixedCosts, pricePerUnit, variableCostPerUnit]);

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Break-Even Calculator
          </CardTitle>
          <CardDescription>
            Find out how many units you need to sell to cover your costs and start making a profit.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fixedCosts">Total Monthly Fixed Costs</Label>
              <Input
                id="fixedCosts"
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                step="1000"
                placeholder="e.g., 20000"
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="pricePerUnit">Sale Price Per Unit</Label>
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
                    <Label htmlFor="variableCostPerUnit">Variable Cost Per Unit</Label>
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
            <Label className="text-lg text-muted-foreground">Units to Break Even</Label>
            {breakEvenUnits === Infinity ? (
              <div className="text-5xl font-bold text-destructive">Unprofitable</div>
            ) : (
              <div className="text-5xl font-bold text-primary">
                {Math.ceil(breakEvenUnits).toLocaleString()} <span className="text-3xl">units/month</span>
              </div>
            )}
            <p className="text-muted-foreground">
              Your contribution margin is {formatCurrency(contributionMargin)} per unit.
            </p>
          </div>

          {breakEvenUnits === Infinity && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Pricing Alert</AlertTitle>
              <AlertDescription>
                Your price per unit must be greater than your variable cost per unit to be profitable.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
