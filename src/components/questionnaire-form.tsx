"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { validationSchema } from "@/lib/schemas";
import type { ValidationFormState } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formFields: {
  name: keyof ValidationFormState;
  label: string;
  description: string;
}[] = [
  { name: "marketNeed", label: "Market Need", description: "What problem are you solving, and for whom? How significant is this problem?" },
  { name: "solutionDifferentiation", label: "Solution & Differentiation", description: "What is your solution? How is it different from or better than existing alternatives?" },
  { name: "targetMarket", label: "Target Market", description: "Describe your ideal customer. How large is this market?" },
  { name: "businessModel", label: "Business Model", description: "How will your startup make money? (e.g., subscription, one-time sales, ads)" },
  { name: "technicalFeasibility", label: "Technical Feasibility", description: "What technology is required? Is it readily available or does it need to be developed?" },
  { name: "developmentTimeline", label: "Development Timeline", description: "What are the major milestones for developing your product (MVP, V1, etc.)?" },
  { name: "teamExpertise", label: "Team Expertise", description: "What relevant experience does your team have? Are there any skill gaps?" },
  { name: "fundingSources", label: "Funding Sources", description: "How do you plan to fund your startup initially? (e.g., bootstrapping, angel investors, VCs)" },
  { name: "financialProjections", label: "Financial Projections", description: "What are your revenue and cost projections for the first 1-3 years?" },
  { name: "investorInterest", label: "Investor Interest", description: "Have you spoken to any investors? What has been their feedback?" },
];

export function QuestionnaireForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ValidationFormState>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      marketNeed: "",
      solutionDifferentiation: "",
      targetMarket: "",
      businessModel: "",
      technicalFeasibility: "",
      developmentTimeline: "",
      teamExpertise: "",
      fundingSources: "",
      financialProjections: "",
      investorInterest: "",
    },
  });

  async function onSubmit(data: ValidationFormState) {
    setIsSubmitting(true);
    try {
      const jsonString = JSON.stringify(data);
      const encodedData = btoa(encodeURIComponent(jsonString));
      router.push(`/report/${encodedData}`);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit your idea. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {formFields.map((fieldInfo) => (
            <FormField
              key={fieldInfo.name}
              control={form.control}
              name={fieldInfo.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">{fieldInfo.label}</FormLabel>
                  <FormDescription>{fieldInfo.description}</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Be as detailed as possible..."
                      className="min-h-[100px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Get Validation Score"
          )}
        </Button>
      </form>
    </Form>
  );
}
