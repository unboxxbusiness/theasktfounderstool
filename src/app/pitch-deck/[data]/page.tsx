"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { getPitchDeck, getValidationScore } from "@/lib/actions";
import type { ValidationFormState, IdeaValidationScores, PitchDeck } from "@/lib/types";
import { Loader2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://rsms.me/inter/font-files/Inter-Regular.woff', fontWeight: 400 },
    { src: 'https://rsms.me/inter/font-files/Inter-Bold.woff', fontWeight: 700 },
  ],
});


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: '40px',
    fontFamily: 'Inter',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E40AF', // primary color
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'center',
    color: '#6B7280', // muted-foreground
  },
  content: {
    fontSize: 12,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: '15%',
    marginRight: '15%',
    lineHeight: 1.5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    right: 40,
    color: '#9CA3AF',
  }
});

const MyDocument = ({ deck }: { deck: PitchDeck }) => {
  const slides = [
    deck.titleSlide,
    deck.problemSlide,
    deck.solutionSlide,
    deck.marketSlide,
    deck.productSlide,
    deck.teamSlide,
    deck.askSlide,
    deck.contactSlide,
  ];

  return (
    <Document>
      {slides.map((slide, index) => (
        <Page key={index} size="A4" style={styles.page} orientation="landscape">
          <View style={styles.slide}>
            <Text style={styles.title}>{slide.title}</Text>
            {index === 0 && <Text style={styles.subtitle}>{slide.content[1]}</Text>}
             <View style={styles.content}>
               {(index > 0 ? slide.content : [slide.content[0]]).map((point, i) => (
                <View key={i} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.footer}>ValidateAI Pitch Deck</Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      ))}
    </Document>
  );
};


export default function PitchDeckPage() {
  const params = useParams();
  const [formData, setFormData] = useState<ValidationFormState | null>(null);
  const [scores, setScores] = useState<IdeaValidationScores | null>(null);
  const [deck, setDeck] = useState<PitchDeck | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (params.data && typeof params.data === 'string') {
      try {
        const decodedString = decodeURIComponent(atob(params.data));
        const parsedData = JSON.parse(decodedString);
        setFormData(parsedData);
      } catch (e) {
        setError('Failed to parse data from URL.');
        setLoading(false);
      }
    }
  }, [params.data]);

  useEffect(() => {
    if (formData) {
      const fetchScoresAndDeck = async () => {
        setLoading(true);
        setError(null);
        try {
          const scoreResult = await getValidationScore(formData);
          setScores(scoreResult);

          const deckResult = await getPitchDeck(formData, {
            marketViability: scoreResult.marketViabilityScore,
            technicalFeasibility: scoreResult.technicalFeasibilityScore,
            fundingReadiness: scoreResult.fundingReadinessScore,
          });
          setDeck(deckResult);

        } catch (e) {
          setError("An error occurred while generating your pitch deck. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchScoresAndDeck();
    }
  }, [formData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Generating your pitch deck...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!deck || !isClient) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading viewer...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
       <header className="flex items-center justify-between p-4 border-b bg-card">
        <h1 className="text-xl font-bold">Your Pitch Deck</h1>
        <PDFDownloadLink document={<MyDocument deck={deck} />} fileName="ValidateAI_Pitch_Deck.pdf">
          {({ blob, url, loading, error }) =>
            <Button disabled={loading}>
              <FileDown className="mr-2 h-4 w-4" />
              {loading ? 'Loading...' : 'Download PDF'}
            </Button>
          }
        </PDFDownloadLink>
      </header>
      <div className="flex-1">
        <PDFViewer width="100%" height="100%">
          <MyDocument deck={deck} />
        </PDFViewer>
      </div>
    </div>
  );
}
