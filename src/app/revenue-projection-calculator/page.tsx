
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TrendingUp, Users, DollarSign, Percent } from 'lucide-react';
import { SocialShare } from '@/components/social-share';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

const fullCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

export default function RevenueProjectionCalculatorPage() {
  const searchParams = useSearchParams();
  const [initialUsers, setInitialUsers] = useState(Number(searchParams.get('initialUsers')) || 100);
  const [growthRate, setGrowthRate] = useState(Number(searchParams.get('growthRate')) || 20);
  const [arpu, setArpu] = useState(Number(searchParams.get('arpu')) || 25);
  const [churnRate, setChurnRate] = useState(Number(searchParams.get('churnRate')) || 5);
  const [shareUrl, setShareUrl] = useState('');

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

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('initialUsers', String(initialUsers));
    params.set('growthRate', String(growthRate));
    params.set('arpu', String(arpu));
    params.set('churnRate', String(churnRate));
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (newUrl !== shareUrl) {
      setShareUrl(newUrl);
    }
  }, [initialUsers, growthRate, arpu, churnRate, shareUrl]);

  return (
    <div className="container mx-auto max-w-5xl py-8 md:py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline flex items-center gap-2">
            <TrendingUp className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            How Fast Could You Grow? (Revenue Projection)
          </CardTitle>
          <CardDescription>
            See what the next 12 months could look like for your startup. Model your revenue and user growth based on your key metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="initialUsers" className='flex items-center gap-1 text-sm'><Users className='h-4 w-4' />Current Users</Label>
                <Input
                  id="initialUsers"
                  type="number"
                  value={initialUsers}
                  onChange={(e) => setInitialUsers(Number(e.target.value))}
                  step="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growthRate" className='flex items-center gap-1 text-sm'><TrendingUp className='h-4 w-4' />Monthly Growth (%)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  step="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arpu" className='flex items-center gap-1 text-sm'><DollarSign className='h-4 w-4' />Monthly Revenue/User</Label>
                <Input
                  id="arpu"
                  type="number"
                  value={arpu}
                  onChange={(e) => setArpu(Number(e.target.value))}
                  step="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="churnRate" className='flex items-center gap-1 text-sm'><Percent className='h-4 w-4' />Monthly Churn (%)</Label>
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
                <CardTitle className="text-lg md:text-xl">Your 12-Month Growth Projection</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className='text-center mb-6'>
                    <p className="text-md text-zinc-400">Projected Annual Recurring Revenue (ARR)</p>
                    <p className="text-3xl md:text-4xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="w-full h-72 md:h-80">
                    <ResponsiveContainer>
                        <LineChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" tickFormatter={(value) => formatCurrency(value)} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => value.toLocaleString()} fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip formatter={(value, name) => name === 'Revenue' ? fullCurrency(value as number) : (value as number).toLocaleString()} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="Revenue" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
                        <Line yAxisId="right" type="monotone" dataKey="Users" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
          </Card>

          <SocialShare 
            shareUrl={shareUrl}
            text={`I'm projecting ${formatCurrency(totalRevenue)} in ARR for my startup! I used TheASKT's free toolkit to model it.`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
