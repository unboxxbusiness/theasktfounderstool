
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TrendingUp, Users, DollarSign, Percent } from 'lucide-react';
import { ReportHeader } from '@/components/report-header';
import { SocialShare } from '@/components/social-share';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

export default function RevenueProjectionCalculatorPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const [initialUsers, setInitialUsers] = useState(Number(searchParams.get('initialUsers')) || 100);
  const [growthRate, setGrowthRate] = useState(Number(searchParams.get('growthRate')) || 20);
  const [arpu, setArpu] = useState(Number(searchParams.get('arpu')) || 25);
  const [churnRate, setChurnRate] = useState(Number(searchParams.get('churnRate')) || 5);

  const projectionData = useMemo(() => {
    const data = [];
    let users = initialUsers;
    const monthlyGrowthRate = growthRate / 100;
    const monthlyChurnRate = churnRate / 100;

    for (let i = 1; i <= 12; i++) {
      const revenue = users * arpu;
      const newUsers = users * monthlyGrowthRate;
      const churnedUsers = users * monthlyChurnRate;
      
      data.push({
        month: `Month ${i}`,
        Revenue: revenue,
        Users: Math.round(users),
      });

      users = users + newUsers - churnedUsers;
    }
    return data;
  }, [initialUsers, growthRate, arpu, churnRate]);

  const totalRevenue = useMemo(() => {
    return projectionData.reduce((acc, month) => acc + month.Revenue, 0);
  }, [projectionData]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams();
    params.set('name', name);
    params.set('company', company);
    params.set('initialUsers', String(initialUsers));
    params.set('growthRate', String(growthRate));
    params.set('arpu', String(arpu));
    params.set('churnRate', String(churnRate));
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, [name, company, initialUsers, growthRate, arpu, churnRate]);

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Revenue Projection Calculator
          </CardTitle>
          <CardDescription>
            Visualize your startup’s next 12 months of revenue based on your key growth metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="initialUsers" className='flex items-center gap-1'><Users className='h-4 w-4' />Initial Users</Label>
                <Input
                  id="initialUsers"
                  type="number"
                  value={initialUsers}
                  onChange={(e) => setInitialUsers(Number(e.target.value))}
                  step="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growthRate" className='flex items-center gap-1'><TrendingUp className='h-4 w-4' />Monthly Growth (%)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  step="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arpu" className='flex items-center gap-1'><DollarSign className='h-4 w-4' />ARPU (Monthly)</Label>
                <Input
                  id="arpu"
                  type="number"
                  value={arpu}
                  onChange={(e) => setArpu(Number(e.target.value))}
                  step="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="churnRate" className='flex items-center gap-1'><Percent className='h-4 w-4' />Monthly Churn (%)</Label>
                <Input
                  id="churnRate"
                  type="number"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Number(e.target.value))}
                  step="1"
                />
              </div>
            </div>
          </div>
          
          <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="text-xl">12-Month Projection</CardTitle>
            </CardHeader>
            <CardContent>
                <ReportHeader name={name} company={company} />
                <div className='text-center mb-6'>
                    <p className="text-muted-foreground">Estimated Annual Revenue</p>
                    <p className="text-4xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <LineChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" tickFormatter={(value) => formatCurrency(value)} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => value.toLocaleString()} />
                        <RechartsTooltip formatter={(value, name) => name === 'Revenue' ? formatCurrency(value as number) : (value as number).toLocaleString()} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="Revenue" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="Users" stroke="hsl(var(--accent))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
          </Card>

          <SocialShare 
            shareUrl={shareUrl}
            text={`Projecting ${formatCurrency(totalRevenue)} in ARR for ${company || 'my startup'}! Modeled with TheASKT's free toolkit.`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
