
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: {
    default: "The Ultimate Startup Calculator Toolkit for Founders | TheASKT.org",
    template: "%s | TheASKT.org"
  },
  description: "Stop guessing. Get the data-driven answers you need to build, grow, and fund your startup with our 100% free toolkit of financial calculators for founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <main className="flex-1 py-6 md:py-10">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
