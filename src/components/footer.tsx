
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} A non-profit project from{" "}
        <a
          href="https://theaskt.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 text-primary"
        >
          TheASKT.org
        </a>
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs text-muted-foreground hover:text-primary underline-offset-4" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-xs text-muted-foreground hover:text-primary underline-offset-4" prefetch={false}>
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
