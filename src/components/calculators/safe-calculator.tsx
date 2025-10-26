'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from '@/components/icons';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SocialShare } from '@/components/social-share';
import { BackButton } from '@/components/back-button';

const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function SafeCalculator() {
  const searchParams = useSearchParams();
  const [preMoneyValuation, setPreMoneyValuation] = useState(5000000);
  const [newMoney, setNewMoney] = useState(1000000);
  const [safeValuationCap, setSafeValuationCap] = useState(8000000);
  const [safeDiscount, setSafeDiscount] = useState(20);
  const [safeInvestment, setSafeInvestment] = useState(500000);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setPreMoneyValuation(Number(searchParams.get('preMoneyValuation')) || 5000000);
    setNewMoney(Number(searchParams.get('newMoney')) || 1000000);
    setSafeValuationCap(Number(searchParams.get('safeValuationCap')) || 8000000);
    setSafeDiscount(Number(searchParams.get('safeDiscount')) || 20);
    setSafeInvestment(Number(searchParams.get('safeInvestment')) || 500000);
  }, [searchParams]);

  const {
    postMoneyValuation,
    pricePerShare,
    founderOwnership,
    newInvestorOwnership,
    safeInvestorOwnership,
    effectiveValuation,
  } = useMemo(() => {
    if (preMoneyValuation <= 0 || newMoney <= 0) {
      return { postMoneyValuation: 0, pricePerShare: 0, founderOwnership: 100, newInvestorOwnership: 0, safeInvestorOwnership: 0, effectiveValuation: 0 };
    }

    const conversionValuation = Math.min(safeValuationCap, preMoneyValuation * (1 - safeDiscount / 100));
    const safeInvestorOwnership = (safeInvestment / (preMoneyValuation + safeInvestment)) * 100;

    const remainingOwnershipForPricedRound = 100 - safeInvestorOwnership;
    const newInvestorOwnership = (newMoney / (preMoneyValuation + newMoney)) * remainingOwnershipForPricedRound;
    
    const founderOwnership = 100 - safeInvestorOwnership - newInvestorOwnership;

    const postMoneyValuation = preMoneyValuation + newMoney + safeInvestment;
    const pricePerShare = preMoneyValuation / 1000000; // Assuming 1M founder shares

    return {
      postMoneyValuation,
      pricePerShare,
      founderOwnership: Math.max(0, founderOwnership),
      newInvestorOwnership,
      safeInvestorOwnership,
      effectiveValuation: conversionValuation,
    };
  }, [preMoneyValuation, newMoney, safeValuationCap, safeDiscount, safeInvestment]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('preMoneyValuation', String(preMoneyValuation));
    params.set('newMoney', String(newMoney));
    params.set('safeValuationCap', String(safeValuationCap));
    params.set('safeDiscount', String(safeDiscount));
    params.set('safeInvestment', String(safeInvestment));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [preMoneyValuation, newMoney, safeValuationCap, safeDiscount, safeInvestment, shareUrl]);


  const chartData = [
    { name: 'Founders', value: founderOwnership },
    { name: 'New Investors', value: newInvestorOwnership },
    { name: 'SAFE Holders', value: safeInvestorOwnership },
  ].filter(d => d.value > 0);

  return (
    <TooltipProvider>
    <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle as="h1" className="text-2xl md:text-3xl flex items-center gap-2">
                        <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                        SAFE Note Dilution Calculator
                    </CardTitle>
                    <CardDescription>
                        Don't get surprised. Model exactly how your SAFE notes will convert and impact your ownership in a priced funding round.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Card className='bg-muted/30'>
                        <CardHeader><CardTitle className='text-lg md:text-xl'>Your Next Funding Round</CardTitle></CardHeader>
                        <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
                            <div className="space-y-2">
                                <Label htmlFor="preMoneyValuation">What's the Pre-Money Valuation of the round?</Label>
                                <Input id="preMoneyValuation" type="number" value={preMoneyValuation} onChange={(e) => setPreMoneyValuation(Number(e.target.value))} step="500000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newMoney">How much new money is being invested?</Label>
                                <Input id="newMoney" type="number" value={newMoney} onChange={(e) => setNewMoney(Number(e.target.value))} step="100000" />
                            </div>
                        </CardContent>
                    </Card>
                     <Card className='bg-muted/30'>
                        <CardHeader><CardTitle className='text-lg md:text-xl'>Your SAFE Note Details</CardTitle></CardHeader>
                        <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-4'>
                            <div className="space-y-2">
                                <Label htmlFor="safeInvestment">Total SAFE Investment</Label>
                                <Input id="safeInvestment" type="number" value={safeInvestment} onChange={(e) => setSafeInvestment(Number(e.target.value))} step="50000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="safeValuationCap">SAFE Valuation Cap</Label>
                                <Input id="safeValuationCap" type="number" value={safeValuationCap} onChange={(e) => setSafeValuationCap(Number(e.target.value))} step="1000000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="safeDiscount">SAFE Discount (%)</Label>
                                <Input id="safeDiscount" type="number" value={safeDiscount} onChange={(e) => setSafeDiscount(Number(e.target.value))} step="5" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl">Post-Conversion Summary</CardTitle>
                        </CardHeader>
                         <CardContent className="grid gap-4 text-sm pt-4">
                             <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div className="font-semibold">SAFE Conversion Valuation:</div>
                                <div>{formatCurrency(effectiveValuation)}</div>
                                <div className="font-semibold">Your New Founder Ownership:</div>
                                <div>{founderOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">New Priced Round Investor Ownership:</div>
                                <div>{newInvestorOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">SAFE Investor Ownership:</div>
                                <div>{safeInvestorOwnership.toFixed(2)}%</div>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
           <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                    Your New Cap Table
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This is what your ownership structure looks like after the SAFE converts and the new funding round closes.</p>
                        </TooltipContent>
                    </Tooltip>
                </CardTitle>
                <CardDescription>A visual breakdown of the new equity distribution.</CardDescription>
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
            <SocialShare 
              shareUrl={shareUrl}
              text={`I just modeled our SAFE conversion and upcoming funding round with TheASKT's free dilution calculator. Game changer!`}
            />
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
