"use server";

import { generateDetailedReport, GenerateDetailedReportInput } from "@/ai/flows/generate-detailed-report";
import { generateIdeaValidationScore, IdeaValidationScoreInput } from "@/ai/flows/generate-idea-validation-score";
import { ValidationFormState } from "./types";

export async function getValidationScore(formData: IdeaValidationScoreInput) {
  try {
    const result = await generateIdeaValidationScore(formData);
    return result;
  } catch (error) {
    console.error("Error generating validation score:", error);
    throw new Error("Failed to generate validation score.");
  }
}

export async function getDetailedReport(formData: ValidationFormState, scores: {marketViability: number, technicalFeasibility: number, fundingReadiness: number}) {
  try {
    const ideaDetails = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    
    const input: GenerateDetailedReportInput = {
      ...scores,
      ideaDetails,
    };
    
    const result = await generateDetailedReport(input);
    return result;
  } catch (error) {
    console.error("Error generating detailed report:", error);
    throw new Error("Failed to generate detailed report.");
  }
}
