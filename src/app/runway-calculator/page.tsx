
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/componentsui/alert';
import { Hourglass, AlertTriangle, TrendingDown } from 'lucide-react';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';


const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function RunwayCalculatorPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [currentFunds, setCurrentFunds] = useState(Number(searchParams.get('currentFunds')) || 500000);
  const [monthlyBurn, setMonthlyBurn] = useState(Number(searchParams.get('monthlyBurn')) || 50000);
  const [shareUrl, setShareUrl] = useState('');

  const runwayMonths = useMemo(() => {
    if (monthlyBurn <= 0) return Infinity;
    const runway = currentFunds / monthlyBurn;
    return isNaN(runway) ? 0 : runway;
  }, [currentFunds, monthlyBurn]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('company', company);
    params.set('currentFunds', String(currentFunds));
    params.set('monthlyBurn', String(monthlyBurn));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
    
  }, [name, company, currentFunds, monthlyBurn, shareUrl]);

  const isLowRunway = runwayMonths <= 6;
  const isVeryLowRunway = runwayMonths <= 3;

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <Hourglass className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Startup Runway Calculator
          </CardTitle>
          <CardDescription>
            See how long your startup can survive with your current cash and burn rate.
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
                <Label htmlFor="currentFunds">Current Funds</Label>
                <Input
                  id="currentFunds"
                  type="number"
                  value={currentFunds}
                  onChange={(e) => setCurrentFunds(Number(e.target.value))}
                  step="10000"
                  placeholder="e.g., 500000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyBurn">Monthly Burn Rate</Label>
                <Input
                  id="monthlyBurn"
                  type="number"
                  value={monthlyBurn}
                  onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                  step="1000"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>
          </div>
          
          <ReportHeader name={name} company={company} />

          <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
            <Label className="text-md md:text-lg text-muted-foreground">Estimated Runway</Label>
            {runwayMonths === Infinity ? (
              <div className="text-4xl md:text-5xl font-bold text-accent">Infinite</div>
            ) : (
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {runwayMonths.toFixed(1)} <span className="text-2xl md:text-3xl">months</span>
              </div>
            )}
            <p className="text-sm md:text-base text-muted-foreground">
              Your remaining runway is based on a burn rate of {formatCurrency(monthlyBurn)}/month.
            </p>
          </div>

          {isLowRunway && runwayMonths !== Infinity && (
            <Alert variant={isVeryLowRunway ? "destructive" : "default"} className={!isVeryLowRunway ? 'border-yellow-500/50 text-yellow-600 dark:border-yellow-500/50 dark:text-yellow-400' : ''}>
              <AlertTriangle className={`h-4 w-4 ${isVeryLowRunway ? '' : 'text-yellow-600 dark:text-yellow-400'}`} />
              <AlertTitle>{isVeryLowRunway ? 'Critical Alert!' : 'Low Runway Warning'}</AlertTitle>
              <AlertDescription>
                {isVeryLowRunway 
                  ? "Your runway is critically low. It's time to take immediate action to either raise funds or drastically cut costs." 
                  : "Your runway is less than 6 months. It's recommended to start your next fundraising round now."}
              </AlertDescription>
            </Alert>
          )}

           <SocialShare 
            shareUrl={shareUrl}
            text={`We have ${runwayMonths.toFixed(1)} months of runway! Calculated with TheASKT's free startup toolkit.`}
          />

        </CardContent>
      </Card>
    </div>
  );
}
