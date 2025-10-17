
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
    <div className="mb-8 rounded-lg border bg-card p-4 text-card-foreground">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">{company || 'Your Company'}</p>
          <p className="text-sm text-muted-foreground">Prepared for {name || 'Your Name'}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AppLogo className="h-5 w-5" />
            <span>Powered by TheASKT.org</span>
        </div>
      </div>
    </div>
  );
}
