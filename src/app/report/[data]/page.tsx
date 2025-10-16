"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, FileText, Loader2, Share2, Sparkles, Presentation } from "lucide-react";

import { getDetailedReport, getValidationScore } from "@/lib/actions";
import type { IdeaValidationScores, ValidationFormState, DetailedReport } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScoreGauge } from "@/components/score-gauge";
import { SocialShare } from "@/components/social-share";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownReport } from "@/components/markdown-report";

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<ValidationFormState | null>(null);
  const [scores, setScores] = useState<IdeaValidationScores | null>(null);
  const [report, setReport] = useState<DetailedReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingScores, setLoadingScores] = useState(true);
  const [loadingReport, setLoadingReport] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }

    if (params.data && typeof params.data === "string") {
      try {
        const decodedString = decodeURIComponent(atob(params.data));
        const parsedData = JSON.parse(decodedString);
        setFormData(parsedData);
      } catch (e) {
        console.error("Failed to parse data from URL", e);
        setError("The report link is invalid or corrupted.");
        setLoadingScores(false);
      }
    }
  }, [params.data]);

  useEffect(() => {
    if (formData) {
      const fetchScores = async () => {
        setLoadingScores(true);
        setError(null);
        try {
          const result = await getValidationScore(formData);
          setScores(result);
        } catch (e) {
          setError("An error occurred while generating your validation score. Please try again later.");
        } finally {
          setLoadingScores(false);
        }
      };
      fetchScores();
    }
  }, [formData]);
  
  const handleGenerateReport = async () => {
    if (!formData || !scores) return;
    setLoadingReport(true);
    setError(null);
    try {
      const result = await getDetailedReport(formData, {
        marketViability: scores.marketViabilityScore,
        technicalFeasibility: scores.technicalFeasibilityScore,
        fundingReadiness: scores.fundingReadinessScore,
      });
      setReport(result);
    } catch (e) {
       setError("An error occurred while generating the detailed report. Please try again later.");
    } finally {
      setLoadingReport(false);
    }
  };

  const handleGeneratePitchDeck = () => {
    if (params.data) {
      router.push(`/pitch-deck/${params.data}`);
    }
  };

  const scoreGauges = useMemo(() => scores && (
    <>
      <ScoreGauge score={scores.marketViabilityScore} label="Market Viability" />
      <ScoreGauge score={scores.technicalFeasibilityScore} label="Technical Feasibility" />
      <ScoreGauge score={scores.fundingReadinessScore} label="Funding Readiness" />
    </>
  ), [scores]);

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-headline">
            <CheckCircle className="h-8 w-8 text-accent" />
            Validation Score
          </CardTitle>
          <CardDescription>
            Your startup idea has been analyzed. Here's your validation score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingScores ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="flex flex-col items-center gap-4 md:col-span-1">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:col-span-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>
          ) : scores && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="flex flex-col items-center gap-4 md:col-span-1 p-4 bg-secondary rounded-lg">
                <ScoreGauge score={scores.compositeScore} label="Composite Score" size="lg" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:col-span-3">
                {scoreGauges}
              </div>
              <div className="md:col-span-4 mt-4">
                 <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>AI Reasoning</AlertTitle>
                    <AlertDescription>{scores.reasoning}</AlertDescription>
                </Alert>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!report && scores && (
        <div className="text-center my-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button onClick={handleGenerateReport} disabled={loadingReport || !scores} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {loadingReport ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Report...
                    </>
                ) : (
                    <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Detailed Report
                    </>
                )}
            </Button>
            <Button onClick={handleGeneratePitchDeck} disabled={!scores} size="lg">
                <Presentation className="mr-2 h-4 w-4" />
                Generate Pitch Deck
            </Button>
        </div>
      )}

      {(loadingReport && !report) && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-6 w-1/3 mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}
      
      {report && (
        <Card>
          <CardHeader>
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                 <div>
                    <CardTitle className="flex items-center gap-2 text-3xl font-headline">
                    <FileText className="h-8 w-8 text-primary" />
                    Detailed Report
                    </CardTitle>
                    <CardDescription>
                    In-depth analysis and actionable insights to strengthen your startup idea.
                    </CardDescription>
                </div>
                 <Button onClick={handleGeneratePitchDeck} disabled={!scores} size="lg" className="mt-4 sm:mt-0">
                    <Presentation className="mr-2 h-4 w-4" />
                    Generate Pitch Deck
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MarkdownReport content={report.report} />
          </CardContent>
        </Card>
      )}

      {scores && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-6 w-6 text-primary"/>
                    Share Your Results
                </CardTitle>
                <CardDescription>Share your validation score with your team, mentors, or potential investors.</CardDescription>
            </CardHeader>
            <CardContent>
                <SocialShare shareUrl={shareUrl} text={`I just validated my startup idea with TheASKT Startup Toolkit and got a score of ${scores.compositeScore}/100! Check out my report.`} />
            </CardContent>
        </Card>
      )}
    </div>
  );
}
