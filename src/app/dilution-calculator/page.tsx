
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingDown, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Startup Funding Dilution Calculator | Model Your Cap Table | TheASKT",
    description: "How much of your company will you give away? Model the impact of a new investment on your cap table with our free funding dilution calculator for founders.",
};


const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function DilutionCalculatorPage() {
  const searchParams = useSearchParams();
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
    params.set('founderShares', String(founderShares));
    params.set('preMoneyValuation', String(preMoneyValuation));
    params.set('investment', String(investment));

    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [founderShares, preMoneyValuation, investment, shareUrl]);

  const chartData = [
    { name: 'Your (Founders) Ownership', value: founderOwnership },
    { name: 'New Investor Ownership', value: investorOwnership },
  ];

  return (
    <TooltipProvider>
    <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle as="h1" className="text-2xl md:text-3xl font-headline flex items-center gap-2">
                        <TrendingDown className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                        Funding Round Dilution Calculator
                    </CardTitle>
                    <CardDescription>
                        Model the impact of a new investment on your cap table and see exactly how much of your company you'll be giving away.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="founderShares">How many shares do you (and co-founders) own now?</Label>
                        <Input
                            id="founderShares"
                            type="number"
                            value={founderShares}
                            onChange={(e) => setFounderShares(Number(e.target.value))}
                            step="100000"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="preMoneyValuation">What is your Pre-Money Valuation?</Label>
                        <Input
                            id="preMoneyValuation"
                            type="number"
                            value={preMoneyValuation}
                            onChange={(e) => setPreMoneyValuation(Number(e.target.value))}
                            step="100000"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="investment">How much money are you raising?</Label>
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
                            <CardTitle className="text-lg md:text-xl">Your Post-Funding Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm pt-4">
                             <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div className="font-semibold">New Post-Money Valuation:</div>
                                <div>{formatCurrency(postMoneyValuation)}</div>
                                <div className="font-semibold">Your New Ownership:</div>
                                <div>{founderOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">Investor's New Ownership:</div>
                                <div>{investorOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">New Total Shares:</div>
                                <div>{Math.round(postMoneyShares).toLocaleString()}</div>
                             </div>
                        </CardContent>
                    </Card>
                     <SocialShare 
                        shareUrl={shareUrl}
                        text={`After our next round, my ownership will be ${founderOwnership.toFixed(2)}%. I modeled my dilution with TheASKT's free toolkit.`}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
           <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    Post-Funding Ownership
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This chart shows the ownership split AFTER the new investment is complete.</p>
                        </TooltipContent>
                    </Tooltip>
                </CardTitle>
                <CardDescription>A visual breakdown of your new cap table.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 md:h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        label={({ name, value }) => `${value.toFixed(1)}%`}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]} />
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
