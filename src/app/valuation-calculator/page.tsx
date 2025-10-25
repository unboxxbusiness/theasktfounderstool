
import type { Metadata } from 'next';
import { ValuationCalculator } from './calculator';

export const metadata: Metadata = {
    title: "Startup Valuation Calculator | Free Tool to Estimate Your Worth",
    description: "Get a data-driven valuation estimate for your startup in 60 seconds. Our free calculator helps you negotiate with investors with confidence.",
};

export default function ValuationCalculatorPage() {
  return <ValuationCalculator />;
}
