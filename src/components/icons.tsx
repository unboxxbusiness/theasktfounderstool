import type { SVGProps } from "react";
import { Package } from "lucide-react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return <Package {...props} />;
}

export function PiggyBank(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2.2c-1.2.7-2.1 1.9-2.5 3.3-2.2.3-4.2 2.1-4.5 4.3-.4 2.2 1.3 4.2 3.5 4.5.3 2.2 2.1 4.2 4.3 4.5 2.2.4 4.2-1.3 4.5-3.5.3-.1.6-.2.9-.4" />
      <path d="M15.5 8.5c.3-1 .1-2.1-.6-2.9-1.2-1.2-3.1-1.2-4.2 0-1 .8-1.3 2-.9 3.1" />
      <path d="M2.3 12.1C1 13 0 14.6 0 16.2 0 18 1 19.4 2.3 20.3" />
      <path d="m14 16.9 7.1-7.1c.9-.9.9-2.3 0-3.2l-1.4-1.4c-.9-.9-2.3-.9-3.2 0L9.4 12.3" />
      <path d="m16 11.8 -9.5 9.5" />
      <path d="m11.1 16.9 7.1-7.1c.9-.9.9-2.3 0-3.2l-1.4-1.4c-.9-.9-2.3-.9-3.2 0L6.4 12.3" />
      <path d="M20 12.2c1.2-.7 2.1-1.9 2.5-3.3C24.8 8.6 25 8.3 25 8c0-2.2-1.8-4-4-4-1.2 0-2.3.5-3 1.3" />
    </svg>
  )
}

export function ShieldCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
