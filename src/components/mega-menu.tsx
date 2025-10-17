
"use client";

import Link from "next/link";
import {
  Lightbulb,
  Banknote,
  Users,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const menuItems = [
  {
    category: "Financial Tools",
    icon: <Banknote className="h-5 w-5 text-primary" />,
    links: [
      { href: "/valuation-calculator", label: "Valuation Calculator" },
      { href: "/fundraising-goal-calculator", label: "Fundraising Goal" },
      { href: "/runway-calculator", label: "Runway Calculator" },
      { href: "/break-even-calculator", label: "Break-Even Point" },
      { href: "/cac-ltv-calculator", label: "CAC vs LTV" },
      { href: "/pricing-strategy-calculator", label: "Pricing Strategy" },
      { href: "/investor-roi-calculator", label: "Investor ROI" },
    ],
  },
  {
    category: "Team & Equity",
    icon: <Users className="h-5 w-5 text-primary" />,
    links: [
      { href: "/equity-split-calculator", label: "Equity Split" },
      { href: "/dilution-calculator", label: "Dilution Calculator" },
      { href: "/safe-calculator", label: "SAFE Calculator" },
    ],
  },
  {
    category: "Growth Tools",
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    links: [
      { href: "/revenue-projection-calculator", label: "Revenue Projection" },
      {
        href: "/marketing-budget-allocator",
        label: "Marketing Budget",
      },
    ],
  },
];

export function MegaMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          Calculators
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen max-w-md p-4" align="end">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center gap-2">
                {item.icon}
                <h3 className="font-semibold text-sm">{item.category}</h3>
              </div>
              <ul className="space-y-1">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <DropdownMenuItem asChild>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground w-full justify-start"
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
