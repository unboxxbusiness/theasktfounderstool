
import { Suspense } from 'react';
import { CacLtvCalculator } from '@/components/calculators/cac-ltv-calculator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function CalculatorSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                         <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </CardContent>
                </Card>
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    )
}


export default function CacLtvCalculatorPage() {
  return (
    <Suspense fallback={<CalculatorSkeleton />}>
      <CacLtvCalculator />
    </Suspense>
  );
}
