'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator } from 'lucide-react';

// Berkus Method Factors
const valuationFactors = [
  { id: 'idea', label: 'Sound Idea', weight: 500000 },
  { id: 'prototype', label: 'Prototype', weight: 500000 },
  { id: 'team', label: 'Quality Management Team', weight: 500000 },
  { id: 'strategic', label: 'Strategic Relationships', weight: 500000 },
  { id: 'rollout', label: 'Product Rollout/Sales', weight: 500000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function EquityCalculatorPage() {
  const [factorValues, setFactorValues] = useState(
    valuationFactors.reduce((acc, factor) => ({ ...acc, [factor.id]: 2.5 }), {} as Record<string, number>)
  );
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [optionPool, setOptionPool] = useState(15);

  const handleSliderChange = (id: string, value: number[]) => {
    setFactorValues((prev) => ({ ...prev, [id]: value[0] }));
  };

  const preMoneyValuation = useMemo(() => {
    return valuationFactors.reduce((total, factor) => {
      const factorValue = factorValues[factor.id] / 5; // Normalize 0-5 scale to 0-1
      return total + (factor.weight * factorValue);
    }, 0);
  }, [factorValues]);

  const postMoneyValuation = preMoneyValuation + investmentAmount;
  
  const founderEquity = preMoneyValuation / postMoneyValuation;
  const investorEquity = investmentAmount / postMoneyValuation;

  const founderFinalPct = (1 - (optionPool / 100)) * founderEquity * 100;
  const investorFinalPct = (1 - (optionPool / 100)) * investorEquity * 100;
  const optionPoolPct = optionPool;

  const chartData = [
    { name: 'Founders', value: founderFinalPct, color: 'hsl(var(--primary))' },
    { name: 'New Investors', value: investorFinalPct, color: 'hsl(var(--accent))' },
    { name: 'Option Pool', value: optionPoolPct, color: 'hsl(var(--secondary))' },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-2">
            <Calculator className="h-8 w-8 text-primary" />
            Startup Equity & Valuation Calculator
          </CardTitle>
          <CardDescription>
            Estimate your startup's pre-money valuation using a simplified Berkus Method and see how a new investment could affect your equity structure.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <CardTitle>Valuation Factors</CardTitle>
            {valuationFactors.map((factor) => (
              <div key={factor.id} className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={factor.id}>{factor.label}</Label>
                  <span className="text-sm text-muted-foreground">Value: {formatCurrency( (factor.weight * (factorValues[factor.id] / 5)))}</span>
                </div>
                <div className='flex items-center gap-4'>
                    <span className='text-xs text-muted-foreground'>0</span>
                    <Slider
                        id={factor.id}
                        min={0}
                        max={5}
                        step={0.5}
                        value={[factorValues[factor.id]]}
                        onValueChange={(value) => handleSliderChange(factor.id, value)}
                    />
                    <span className='text-xs text-muted-foreground'>5</span>
                </div>
              </div>
            ))}
             <div className="space-y-2">
                <Label htmlFor="investmentAmount">New Investment Amount</Label>
                <Input
                    id="investmentAmount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    step="50000"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="optionPool">Employee Option Pool (%)</Label>
                <div className="flex items-center gap-4">
                <Slider
                    id="optionPool"
                    min={0}
                    max={30}
                    step={1}
                    value={[optionPool]}
                    onValueChange={(value) => setOptionPool(value[0])}
                />
                <span className="text-sm font-medium w-12 text-right">{optionPool}%</span>
                </div>
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-full text-center space-y-2">
                <CardTitle>Estimated Valuation</CardTitle>
                <div className="text-4xl font-bold text-primary">{formatCurrency(preMoneyValuation)}</div>
                <div className="text-muted-foreground">Pre-Money Valuation</div>
            </div>
             <div className="w-full text-center space-y-2">
                <div className="text-2xl font-bold">{formatCurrency(postMoneyValuation)}</div>
                <div className="text-muted-foreground">Post-Money Valuation</div>
            </div>
            <div className="w-full h-[300px]">
              <CardTitle className="text-center mb-4">Post-Investment Equity Split</CardTitle>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
