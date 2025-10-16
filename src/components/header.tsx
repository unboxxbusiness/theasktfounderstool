import Link from "next/link";
import { AppLogo } from "./icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Lightbulb, Banknote, Users, TrendingUp } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card border-b">
      <Link href="/" className="flex items-center justify-center">
        <AppLogo className="h-6 w-6 text-primary" />
        <span className="sr-only">TheASKT Startup Toolkit</span>
      </Link>
      <div className="ml-4 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <h1 className="font-bold text-lg leading-none">TheASKT Startup Toolkit</h1>
        <span className="text-sm text-muted-foreground hidden sm:block">— Plan. Build. Grow.</span>
      </div>
      <nav className="ml-auto flex flex-wrap justify-end gap-1 sm:gap-2">
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Lightbulb className="mr-1" />
              Idea & Validation
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/validate">Idea Validator</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/branding">Branding Generator</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href="/funding-eligibility">Funding Eligibility</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Banknote className="mr-1" />
              Financial Tools
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/valuation-calculator">Valuation Calculator</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/fundraising-goal-calculator">Fundraising Goal Calculator</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/runway-calculator">Runway Calculator</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/break-even-calculator">Break-Even Calculator</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/cac-ltv-calculator">CAC vs LTV Calculator</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/pricing-strategy-calculator">Pricing Strategy Calculator</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/investor-roi-calculator">Investor ROI Calculator</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Users className="mr-1" />
              Team & Equity
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/equity-split-calculator">Equity Split Calculator</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dilution-calculator">Dilution Calculator</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <TrendingUp className="mr-1" />
              Growth Tools
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
             <DropdownMenuItem asChild>
              <Link href="/revenue-projection-calculator">Revenue Projection</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/marketing-budget-allocator">Marketing Budget Allocator</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </nav>
    </header>
  );
}
