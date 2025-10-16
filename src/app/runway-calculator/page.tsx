'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Hourglass, AlertTriangle, TrendingDown } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function RunwayCalculatorPage() {
  const [currentFunds, setCurrentFunds] = useState(500000);
  const [monthlyBurn, setMonthlyBurn] = useState(50000);
  const [teamSize, setTeamSize] = useState(5);

  const runwayMonths = useMemo(() => {
    if (monthlyBurn <= 0) return Infinity;
    const runway = currentFunds / monthlyBurn;
    return isNaN(runway) ? 0 : runway;
  }, [currentFunds, monthlyBurn]);

  const isLowRunway = runwayMonths <= 6;
  const isVeryLowRunway = runwayMonths <= 3;

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-2">
            <Hourglass className="h-8 w-8 text-primary" />
            Startup Runway Calculator
          </CardTitle>
          <CardDescription>
            See how long your startup can survive with your current cash and burn rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                step="1"
                placeholder="e.g., 5"
              />
            </div>
          </div>
          
          <div className="space-y-4 text-center bg-muted/50 p-6 rounded-lg">
            <Label className="text-lg text-muted-foreground">Estimated Runway</Label>
            {runwayMonths === Infinity ? (
              <div className="text-5xl font-bold text-accent">Infinite</div>
            ) : (
              <div className="text-5xl font-bold text-primary">
                {runwayMonths.toFixed(1)} <span className="text-3xl">months</span>
              </div>
            )}
            <p className="text-muted-foreground">
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

        </CardContent>
      </Card>
    </div>
  );
}
