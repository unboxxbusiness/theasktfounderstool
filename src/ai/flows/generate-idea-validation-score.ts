'use server';

/**
 * @fileOverview Generates a validation score for a startup idea based on questionnaire responses.
 *
 * - generateIdeaValidationScore - A function that generates the validation score.
 * - IdeaValidationScoreInput - The input type for the generateIdeaValidationScore function.
 * - IdeaValidationScoreOutput - The return type for the generateIdeaValidationScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdeaValidationScoreInputSchema = z.object({
  marketNeed: z.string().describe('How big is the market need for this startup idea?'),
  solutionDifferentiation: z
    .string()
    .describe('How differentiated is the solution from existing solutions?'),
  targetMarket: z.string().describe('Who is the target market?'),
  businessModel: z.string().describe('How will the business generate revenue?'),
  technicalFeasibility: z
    .string()
    .describe('How technically feasible is it to build the solution?'),
  developmentTimeline: z.string().describe('How long will it take to develop the solution?'),
  teamExpertise: z.string().describe('Does the team have the expertise to build the solution?'),
  fundingSources: z.string().describe('What are the potential funding sources?'),
  financialProjections: z.string().describe('What are the financial projections?'),
  investorInterest: z.string().describe('What is the level of investor interest?'),
});
export type IdeaValidationScoreInput = z.infer<typeof IdeaValidationScoreInputSchema>;

const IdeaValidationScoreOutputSchema = z.object({
  compositeScore: z
    .number()
    .describe('The composite validation score, from 0 to 100, considering all factors.'),
  marketViabilityScore: z
    .number()
    .describe('The market viability score, from 0 to 100, based on market need, differentiation, and target market.'),
  technicalFeasibilityScore: z
    .number()
    .describe(
      'The technical feasibility score, from 0 to 100, based on technical feasibility, development timeline, and team expertise.'
    ),
  fundingReadinessScore: z
    .number()
    .describe(
      'The funding readiness score, from 0 to 100, based on funding sources, financial projections, and investor interest.'
    ),
  reasoning: z.string().describe('Explanation of how the AI arrived at the score.'),
});
export type IdeaValidationScoreOutput = z.infer<typeof IdeaValidationScoreOutputSchema>;

export async function generateIdeaValidationScore(
  input: IdeaValidationScoreInput
): Promise<IdeaValidationScoreOutput> {
  return ideaValidationScoreFlow(input);
}

const ideaValidationScorePrompt = ai.definePrompt({
  name: 'ideaValidationScorePrompt',
  input: {schema: IdeaValidationScoreInputSchema},
  output: {schema: IdeaValidationScoreOutputSchema},
  prompt: `You are an AI startup idea validator. You will analyze the provided questionnaire responses and generate a validation score for the startup idea.

  Provide a composite validation score, with sub-scores for market viability, technical feasibility, and funding readiness, so that the user can quickly assess the overall potential of their idea.

  For each score, consider the following factors:

  Market Viability:
  - Market Need: {{{marketNeed}}}
  - Solution Differentiation: {{{solutionDifferentiation}}}
  - Target Market: {{{targetMarket}}}

  Technical Feasibility:
  - Technical Feasibility: {{{technicalFeasibility}}}
  - Development Timeline: {{{developmentTimeline}}}
  - Team Expertise: {{{teamExpertise}}}

  Funding Readiness:
  - Funding Sources: {{{fundingSources}}}
  - Financial Projections: {{{financialProjections}}}
  - Investor Interest: {{{investorInterest}}}

  The output should be a JSON object with the following keys:
  - compositeScore: A number between 0 and 100 representing the overall validation score.
  - marketViabilityScore: A number between 0 and 100 representing the market viability score.
  - technicalFeasibilityScore: A number between 0 and 100 representing the technical feasibility score.
  - fundingReadinessScore: A number between 0 and 100 representing the funding readiness score.
  - reasoning: Explanation of how the AI arrived at the score. Be concise.
`,
});

const ideaValidationScoreFlow = ai.defineFlow(
  {
    name: 'ideaValidationScoreFlow',
    inputSchema: IdeaValidationScoreInputSchema,
    outputSchema: IdeaValidationScoreOutputSchema,
  },
  async input => {
    const {output} = await ideaValidationScorePrompt(input);
    return output!;
  }
);
