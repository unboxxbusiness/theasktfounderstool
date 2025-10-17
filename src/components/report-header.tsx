
'use client';

import { AppLogo } from "./icons";

interface ReportHeaderProps {
  name: string;
  company: string;
}

export function ReportHeader({ name, company }: ReportHeaderProps) {
  if (!name && !company) {
    return null;
  }

  return (
    <div className="mb-6 md:mb-8 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <p className="font-bold text-md md:text-lg">{company || 'Your Company'}</p>
          <p className="text-sm text-muted-foreground">Prepared for {name || 'Your Name'}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground self-end sm:self-center">
            <AppLogo className="h-4 w-4" />
            <span>Powered by TheASKT.org</span>
        </div>
      </div>
    </div>
  );
}
