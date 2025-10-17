import Link from "next/link";
import { AppLogo } from "./icons";
import { MegaMenu } from "./mega-menu";

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
        <MegaMenu />
      </nav>
    </header>
  );
}
