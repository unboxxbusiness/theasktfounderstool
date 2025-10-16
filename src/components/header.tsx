import Link from "next/link";
import { AppLogo } from "./icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card border-b">
      <Link href="/" className="flex items-center justify-center">
        <AppLogo className="h-6 w-6 text-primary" />
        <span className="sr-only">ValidateAI</span>
      </Link>
      <div className="ml-4 flex items-center">
        <h1 className="font-bold text-lg">ValidateAI</h1>
      </div>
      <nav className="ml-auto flex gap-2 sm:gap-4">
        <Button variant="ghost" asChild>
          <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/branding" className="text-sm font-medium hover:underline underline-offset-4">
            Branding
          </Link>
        </Button>
        <Button variant="ghost" asChild>
            <Link href="/funding-eligibility" className="text-sm font-medium hover:underline underline-offset-4">
                Funding
            </Link>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              Calculators
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/valuation-calculator">Valuation Calculator</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/equity-split-calculator">Equity Split Calculator</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/runway-calculator">Runway Calculator</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/validate" className="text-sm font-medium">
            Validate Idea
          </Link>
        </Button>
      </nav>
    </header>
  );
}
