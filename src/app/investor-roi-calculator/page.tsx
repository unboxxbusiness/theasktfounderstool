
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PiggyBank } from '@/components/icons';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';

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
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [investmentAmount, setInvestmentAmount] = useState(Number(searchParams.get('investmentAmount')) || 250000);
  const [equityPercentage, setEquityPercentage] = useState(Number(searchParams.get('equityPercentage')) || 10);
  const [exitValuation, setExitValuation] = useState(Number(searchParams.get('exitValuation')) || 100000000);
  const [shareUrl, setShareUrl] = useState('');

  const { payout, roiMultiple } = useMemo(() => {
    if (investmentAmount <= 0 || equityPercentage <= 0 || exitValuation <= 0) {
        return { payout: 0, roiMultiple: 0 };
    }
    const payout = exitValuation * (equityPercentage / 100);
    const roiMultiple = payout / investmentAmount;
    return { payout, roiMultiple };
  }, [investmentAmount, equityPercentage, exitValuation]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('company', company);
    params.set('investmentAmount', String(investmentAmount));
    params.set('equityPercentage', String(equityPercentage));
    params.set('exitValuation', String(exitValuation));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if(newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [name, company, investmentAmount, equityPercentage, exitValuation, shareUrl]);

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
            <PiggyBank className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            What Could Your Investors Make? (ROI Calculator)
          </CardTitle>
          <CardDescription>
            Show investors their potential return with this simple ROI calculator. It's a great way to get them excited about your vision.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Acme Inc." />
                </div>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount">How much is the investor putting in?</Label>
                <Input
                  id="investmentAmount"
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  step="50000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equityPercentage">What percentage of the company are they getting?</Label>
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
                <Label htmlFor="exitValuation">What's your dream exit valuation for the company?</Label>
              <Input
                id="exitValuation"
                type="number"
                value={exitValuation}
                onChange={(e) => setExitValuation(Number(e.target.value))}
                step="10000000"
              />
            </div>
          </div>
          
          <ReportHeader name={name} company={company} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
                  <Label className="text-md md:text-lg text-zinc-400">Potential Investor Payout</Label>
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                      {formatCompactCurrency(payout)}
                  </div>
              </div>
              <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
                  <Label className="text-md md:text-lg text-zinc-400">Potential Return on Investment</Label>
                  <div className="text-4xl md:text-5xl font-bold text-primary">
                      {roiMultiple.toFixed(1)}x
                  </div>
              </div>
          </div>

          <SocialShare 
            shareUrl={shareUrl}
            text={`A ${formatCurrency(investmentAmount)} investment in our startup could yield a ${roiMultiple.toFixed(1)}x return! I modeled it with TheASKT's free toolkit.`}
           />
        </CardContent>
      </Card>
    </div>
  );
}
