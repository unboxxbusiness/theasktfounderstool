
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';

const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SafeCalculatorPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [preMoneyValuation, setPreMoneyValuation] = useState(Number(searchParams.get('preMoneyValuation')) || 5000000);
  const [newMoney, setNewMoney] = useState(Number(searchParams.get('newMoney')) || 1000000);
  const [safeValuationCap, setSafeValuationCap] = useState(Number(searchParams.get('safeValuationCap')) || 8000000);
  const [safeDiscount, setSafeDiscount] = useState(Number(searchParams.get('safeDiscount')) || 20);
  const [safeInvestment, setSafeInvestment] = useState(Number(searchParams.get('safeInvestment')) || 500000);

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

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('company', company);
    params.set('preMoneyValuation', String(preMoneyValuation));
    params.set('newMoney', String(newMoney));
    params.set('safeValuationCap', String(safeValuationCap));
    params.set('safeDiscount', String(safeDiscount));
    params.set('safeInvestment', String(safeInvestment));
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, [name, company, preMoneyValuation, newMoney, safeValuationCap, safeDiscount, safeInvestment]);


  const chartData = [
    { name: 'Founders', value: founderOwnership },
    { name: 'New Investors', value: newInvestorOwnership },
    { name: 'SAFE Holders', value: safeInvestorOwnership },
  ].filter(d => d.value > 0);

  return (
    <TooltipProvider>
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline flex items-center gap-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        Post-Money SAFE Dilution Calculator
                    </CardTitle>
                    <CardDescription>
                        Model how a SAFE note converts and impacts your ownership in a priced round.
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
                    <Card className='bg-muted/30'>
                        <CardHeader><CardTitle className='text-lg'>Priced Round Details</CardTitle></CardHeader>
                        <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="preMoneyValuation">Pre-Money Valuation</Label>
                                <Input id="preMoneyValuation" type="number" value={preMoneyValuation} onChange={(e) => setPreMoneyValuation(Number(e.target.value))} step="500000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newMoney">New Investment in Round</Label>
                                <Input id="newMoney" type="number" value={newMoney} onChange={(e) => setNewMoney(Number(e.target.value))} step="100000" />
                            </div>
                        </CardContent>
                    </Card>
                     <Card className='bg-muted/30'>
                        <CardHeader><CardTitle className='text-lg'>SAFE Note Details</CardTitle></CardHeader>
                        <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="safeInvestment">SAFE Investment Amount</Label>
                                <Input id="safeInvestment" type="number" value={safeInvestment} onChange={(e) => setSafeInvestment(Number(e.target.value))} step="50000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="safeValuationCap">Valuation Cap</Label>
                                <Input id="safeValuationCap" type="number" value={safeValuationCap} onChange={(e) => setSafeValuationCap(Number(e.target.value))} step="1000000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="safeDiscount">Discount (%)</Label>
                                <Input id="safeDiscount" type="number" value={safeDiscount} onChange={(e) => setSafeDiscount(Number(e.target.value))} step="5" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-xl">Post-Conversion Summary</CardTitle>
                        </CardHeader>
                         <CardContent className="grid gap-4 text-sm">
                            <ReportHeader name={name} company={company} />
                             <div className="grid grid-cols-2 gap-4">
                                <div className="font-semibold">SAFE Effective Valuation:</div>
                                <div>{formatCurrency(effectiveValuation)}</div>
                                <div className="font-semibold">Founder Ownership:</div>
                                <div>{founderOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">New Investor Ownership:</div>
                                <div>{newInvestorOwnership.toFixed(2)}%</div>
                                <div className="font-semibold">SAFE Holder Ownership:</div>
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
                <CardTitle className="text-xl flex items-center gap-2">
                    Post-Round Cap Table
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs">This shows the ownership split after the SAFE converts and the new round closes.</p>
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
            <SocialShare 
              shareUrl={shareUrl}
              text={`I modeled our SAFE conversion using TheASKT's free toolkit. This is how it impacts our cap table.`}
            />
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
