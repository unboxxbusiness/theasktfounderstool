'use server';

/**
 * @fileOverview Generates a detailed report with actionable insights based on the validation score.
 *
 * - generateDetailedReport - A function that generates the detailed report.
 * - GenerateDetailedReportInput - The input type for the generateDetailedReport function.
 * - GenerateDetailedReportOutput - The return type for the generateDetailedReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDetailedReportInputSchema = z.object({
  marketViability: z.number().describe('The market viability score.'),
  technicalFeasibility: z.number().describe('The technical feasibility score.'),
  fundingReadiness: z.number().describe('The funding readiness score.'),
  ideaDetails: z.string().describe('Detailed description of the startup idea from the questionnaire.'),
});
export type GenerateDetailedReportInput = z.infer<typeof GenerateDetailedReportInputSchema>;

const GenerateDetailedReportOutputSchema = z.object({
  report: z.string().describe('The detailed report with actionable insights.'),
});
export type GenerateDetailedReportOutput = z.infer<typeof GenerateDetailedReportOutputSchema>;

export async function generateDetailedReport(input: GenerateDetailedReportInput): Promise<GenerateDetailedReportOutput> {
  return generateDetailedReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDetailedReportPrompt',
  input: {schema: GenerateDetailedReportInputSchema},
  output: {schema: GenerateDetailedReportOutputSchema},
  prompt: `You are an expert startup advisor. Generate a detailed report with actionable insights based on the following validation scores and idea details. Highlight both strengths and weaknesses.

Market Viability Score: {{marketViability}}
Technical Feasibility Score: {{technicalFeasibility}}
Funding Readiness Score: {{fundingReadiness}}
Idea Details: {{ideaDetails}}

Report Format: Provide a comprehensive analysis, including key strengths, weaknesses, and actionable recommendations for improvement in each area (market viability, technical feasibility, and funding readiness). The report must be in markdown format.
`,
});

const generateDetailedReportFlow = ai.defineFlow(
  {
    name: 'generateDetailedReportFlow',
    inputSchema: GenerateDetailedReportInputSchema,
    outputSchema: GenerateDetailedReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
