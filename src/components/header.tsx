
import Link from "next/link";
import { AppLogo } from "./icons";
import { MegaMenu } from "./mega-menu";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center mr-4">
        <AppLogo className="h-8 w-8 text-primary" />
        <span className="sr-only">TheASKT Startup Toolkit</span>
      </Link>
      <nav className="hidden md:flex items-center gap-2 sm:gap-4">
        <MegaMenu />
      </nav>
      <div className="ml-auto flex items-center gap-2">
         <Button asChild variant="default" size="sm" className="hidden sm:inline-flex rounded-full shadow-lg shadow-primary/30 font-bold">
            <a href="https://theaskt.org" target="_blank" rel="noopener noreferrer">
                <span>Join TheASKT Founders Group</span>
            </a>
        </Button>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-8">
                        <MegaMenu />
                         <Button asChild variant="default" size="sm" className="rounded-full shadow-lg shadow-primary/30 font-bold">
                            <a href="https://theaskt.org" target="_blank" rel="noopener noreferrer">
                                <span>Join TheASKT Founders Group</span>
                            </a>
                        </Button>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
