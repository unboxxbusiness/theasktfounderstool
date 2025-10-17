
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingDown, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';


const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCompactCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export default function DilutionCalculatorPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [founderShares, setFounderShares] = useState(Number(searchParams.get('founderShares')) || 1000000);
  const [preMoneyValuation, setPreMoneyValuation] = useState(Number(searchParams.get('preMoneyValuation')) || 5000000);
  const [investment, setInvestment] = useState(Number(searchParams.get('investment')) || 1000000);
  const [shareUrl, setShareUrl] = useState('');

  const { postMoneyValuation, postMoneyShares, investorOwnership, founderOwnership } = useMemo(() => {
    if (preMoneyValuation <= 0 || investment <= 0 || founderShares <= 0) {
      return { postMoneyValuation: 0, postMoneyShares: 0, investorOwnership: 0, founderOwnership: 100 };
    }

    const postMoneyValuation = preMoneyValuation + investment;
    const investorOwnership = (investment / postMoneyValuation) * 100;
    const founderOwnership = 100 - investorOwnership;

    const pricePerShare = preMoneyValuation / founderShares;
    const newShares = investment / pricePerShare;
    const postMoneyShares = founderShares + newShares;
    
    return { postMoneyValuation, postMoneyShares, investorOwnership, founderOwnership };
  }, [founderShares, preMoneyValuation, investment]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('company', company);
    params.set('founderShares', String(founderShares));
    params.set('preMoneyValuation', String(preMoneyValuation));
    params.set('investment', String(investment));
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [name, company, founderShares, preMoneyValuation, investment]);

  const chartData = [
    { name: 'Founder(s)', value: founderOwnership },
    { name: 'New Investor(s)', value: investorOwnership },
  ];

  return (
    <TooltipProvider>
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline flex items-center gap-2">
                        <TrendingDown className="h-8 w-8 text-primary" />
                        Funding Round Dilution Calculator
                    </CardTitle>
                    <CardDescription>
                        See how much equity you’ll lose in your next round. Model the impact of a new investment on your cap table.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Acme Inc." />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="founderShares">Current Total Shares (Founder Pool)</Label>
                        <Input
                            id="founderShares"
                            type="number"
                            value={founderShares}
                            onChange={(e) => setFounderShares(Number(e.target.value))}
                            step="100000"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="preMoneyValuation">Pre-Money Valuation</Label>
                        <Input
                            id="preMoneyValuation"
                            type="number"
                            value={preMoneyValuation}
                            onChange={(e) => setPreMoneyValuation(Number(e.target.value))}
                            step="100000"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="investment">New Investment Amount</Label>
                        <Input
                            id="investment"
                            type="number"
                            value={investment}
                            onChange={(e) => setInvestment(Number(e.target.value))}
                            step="100000"
                        />
                    </div>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-xl">Post-Funding Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <ReportHeader name={name} company={company} />
                             <div className="grid grid-cols-2 gap-4">
                                <div className="font-semibold">Post-Money Valuation:</div>
                                <div>{formatCurrency(postMoneyValuation)}</div>
                                <div className="font-semibold">Founder Ownership:</div>
                                <div>{founderOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">Investor Ownership:</div>
                                <div>{investorOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">Total Shares:</div>
                                <div>{Math.round(postMoneyShares).toLocaleString()}</div>
                             </div>
                        </CardContent>
                    </Card>
                     <SocialShare 
                        shareUrl={shareUrl}
                        text={`I modeled my next funding round with TheASKT's free dilution calculator. Check out the potential impact on your cap table.`}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
           <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    Post-Funding Cap Table
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This shows the ownership split after the new investment.</p>
                        </TooltipContent>
                    </Tooltip>
                </CardTitle>
                <CardDescription>A visual representation of the new equity distribution.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
