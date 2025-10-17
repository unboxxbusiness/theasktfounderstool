import Link from "next/link";
import { AppLogo } from "./icons";
import { MegaMenu } from "./mega-menu";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center">
        <AppLogo className="h-6 w-6 text-primary" />
        <span className="sr-only">TheASKT Startup Toolkit</span>
      </Link>
      <div className="ml-4 flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <h1 className="font-bold text-base sm:text-lg leading-none">TheASKT Startup Toolkit</h1>
      </div>
      <nav className="ml-auto flex items-center gap-2 sm:gap-4">
        <MegaMenu />
        <Button asChild variant="default" size="sm" className="rounded-full shadow-lg shadow-primary/30">
            <a href="https://theaskt.org" target="_blank" rel="noopener noreferrer">
                <span className="hidden sm:inline">Join TheASKT Founders Group</span>
                <span className="sm:hidden">Join</span>
            </a>
        </Button>
      </nav>
    </header>
  );
}
