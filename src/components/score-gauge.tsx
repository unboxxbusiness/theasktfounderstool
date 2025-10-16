"use client";

import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: "md" | "lg";
}

export function ScoreGauge({ score, label, size = "md" }: ScoreGaugeProps) {
  const radius = size === "lg" ? 60 : 45;
  const strokeWidth = size === "lg" ? 12 : 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorClass =
    score < 40
      ? "text-destructive"
      : score < 70
      ? "text-yellow-500" // This will need a custom color definition if not in theme
      : "text-accent";
    
  const svgSize = size === "lg" ? 140 : 100;
  const textSize = size === "lg" ? "text-4xl" : "text-2xl";

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          height={svgSize}
          width={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="transform -rotate-90"
        >
          <circle
            stroke="hsl(var(--border))"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={svgSize/2}
            cy={svgSize/2}
          />
          <circle
            className={cn("transition-all duration-1000 ease-out", colorClass.replace('text-yellow-500', 'text-[hsl(var(--chart-4))]'))}
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={svgSize/2}
            cy={svgSize/2}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("font-bold", textSize, "text-foreground")}>{score}</span>
            {size === 'lg' && <span className="text-xs text-muted-foreground">/ 100</span>}
        </div>
      </div>
      <span className="font-medium text-center text-muted-foreground">{label}</span>
    </div>
  );
}
