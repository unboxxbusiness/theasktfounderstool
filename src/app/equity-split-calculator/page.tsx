
import { Suspense } from 'react';
import { EquitySplitCalculator } from '@/components/calculators/equity-split-calculator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function CalculatorSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <Skeleton className="h-48 w-full" />
                       <Skeleton className="h-48 w-full" />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-64 w-full rounded-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function EquitySplitCalculatorPage() {
  return (
    <Suspense fallback={<CalculatorSkeleton />}>
      <EquitySplitCalculator />
    </Suspense>
  );
}
