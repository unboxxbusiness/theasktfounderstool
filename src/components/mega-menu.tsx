
"use client";

import Link from "next/link";
import {
  Banknote,
  Users,
  TrendingUp,
  ChevronDown,
  Lightbulb,
  Newspaper,
  Building,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "./ui/button";

const menuItems = [
  {
    category: "Insights & News",
    icon: <Newspaper className="h-5 w-5 text-primary" />,
    links: [
      { href: "/news", label: "Top Startup News" },
      { href: "/indian-startup-schemes", label: "Indian Startup Schemes" },
    ],
  },
  {
    category: "Financial Planning",
    icon: <Banknote className="h-5 w-5 text-primary" />,
    links: [
      { href: "/valuation-calculator", label: "Valuation" },
      { href: "/fundraising-goal-calculator", label: "Fundraising Goal" },
      { href: "/runway-calculator", label: "Runway" },
      { href: "/break-even-calculator", label: "Break-Even Point" },
      { href: "/cac-ltv-calculator", label: "CAC & LTV" },
      { href: "/pricing-strategy-calculator", label: "Pricing Strategy" },
      { href: "/investor-roi-calculator", label: "Investor ROI" },
    ],
  },
  {
    category: "Ownership & Equity",
    icon: <Users className="h-5 w-5 text-primary" />,
    links: [
      { href: "/equity-split-calculator", label: "Co-Founder Equity" },
      { href: "/dilution-calculator", label: "Dilution" },
      { href: "/safe-calculator", label: "SAFE Conversion" },
    ],
  },
  {
    category: "Growth & Marketing",
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

interface MegaMenuProps {
  setMobileMenuOpen?: (isOpen: boolean) => void;
}

export function MegaMenu({ setMobileMenuOpen }: MegaMenuProps) {
  const handleLinkClick = () => {
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
    {/* Desktop Mega Menu */}
    <div className="hidden md:block">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                All Calculators
                <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-screen max-w-xl p-4" align="start">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                    <DropdownMenuGroup key={item.category}>
                    <DropdownMenuLabel className="flex items-center gap-2">
                        {item.icon}
                        <h3 className="font-semibold text-sm">{item.category}</h3>
                    </DropdownMenuLabel>
                    <div className="ml-2 mt-1 flex flex-col space-y-1">
                        {item.links.map((link) => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link
                            href={link.href}
                            className="text-sm text-zinc-400 hover:text-foreground w-full justify-start cursor-pointer"
                            >
                            {link.label}
                            </Link>
                        </DropdownMenuItem>
                        ))}
                    </div>
                    </DropdownMenuGroup>
                ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    {/* Mobile Accordion Menu */}
    <div className="md:hidden w-full">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="calculators">
                <AccordionTrigger className="text-lg font-semibold">
                    All Calculators
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-4">
                        {menuItems.map((item) => (
                            <div key={item.category}>
                                <h3 className="flex items-center gap-2 font-semibold text-md mb-2">
                                {item.icon}
                                {item.category}
                                </h3>
                                <ul className="space-y-2 pl-7">
                                {item.links.map((link) => (
                                    <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-md text-zinc-400 hover:text-foreground"
                                        onClick={handleLinkClick}
                                    >
                                        {link.label}
                                    </Link>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
    </>
  );
}
