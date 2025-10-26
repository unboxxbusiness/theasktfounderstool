
import { Suspense } from 'react';
import { RevenueProjectionCalculator } from '@/components/calculators/revenue-projection-calculator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function CalculatorSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="grid gap-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
                <Card className="bg-muted/50">
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className='text-center mb-6'>
                            <Skeleton className="h-4 w-1/3 mx-auto" />
                            <Skeleton className="h-10 w-1/2 mx-auto mt-2" />
                        </div>
                        <Skeleton className="w-full h-80" />
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}

export default function RevenueProjectionCalculatorPage() {
  return (
    <Suspense fallback={<CalculatorSkeleton />}>
      <RevenueProjectionCalculator />
    </Suspense>
  );
}
