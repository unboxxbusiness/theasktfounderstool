'use server';

/**
 * @fileOverview Checks funding eligibility for a startup idea.
 *
 * - checkFundingEligibility - A function that checks funding eligibility.
 * - FundingEligibilityCheckInput - The input type for the checkFundingEligibility function.
 * - FundingEligibilityCheckOutput - The return type for the checkFundingEligibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FundingEligibilityCheckInputSchema = z.object({
  ventureStage: z.string().describe('The current stage of the venture (e.g., Idea, MVP, Seed, Series A).'),
  domain: z.string().describe('The industry or domain the venture operates in (e.g., HealthTech, FinTech, SaaS).'),
  ideaDescription: z.string().describe('A brief description of the startup idea.'),
});
export type FundingEligibilityCheckInput = z.infer<typeof FundingEligibilityCheckInputSchema>;

const FundingOpportunitySchema = z.object({
  type: z.string().describe('Type of funding (e.g., Grant, Angel Investment, VC).'),
  name: z.string().describe('Name of the funding program or investor group.'),
  description: z.string().describe('Brief description of the opportunity or investor focus.'),
  suitability: z.string().describe('Why this opportunity is suitable for the user\'s venture.'),
});

const FundingEligibilityCheckOutputSchema = z.object({
  opportunities: z.array(FundingOpportunitySchema).describe('A list of potential funding opportunities.'),
  recommendations: z.string().describe('General recommendations and next steps for seeking funding.'),
});
export type FundingEligibilityCheckOutput = z.infer<typeof FundingEligibilityCheckOutputSchema>;

export async function checkFundingEligibility(input: FundingEligibilityCheckInput): Promise<FundingEligibilityCheckOutput> {
  return checkFundingEligibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkFundingEligibilityPrompt',
  input: {schema: FundingEligibilityCheckInputSchema},
  output: {schema: FundingEligibilityCheckOutputSchema},
  prompt: `You are an AI assistant specialized in startup funding. Analyze the user's venture and provide a list of potential funding opportunities and investors.

Venture Stage: {{ventureStage}}
Domain: {{domain}}
Idea Description: {{ideaDescription}}

Based on this information, identify 3-5 relevant funding opportunities. These can include grants, angel investor networks, and venture capital firms that align with the venture's stage and domain.

For each opportunity, provide:
- Type (Grant, Angel Investment, VC)
- Name of the program or firm
- A brief description of their focus
- A short explanation of why it's a good fit.

Finally, provide a summary of general recommendations and next steps for the user to take in their funding journey. Frame this in an encouraging tone.
`,
});

const checkFundingEligibilityFlow = ai.defineFlow(
  {
    name: 'checkFundingEligibilityFlow',
    inputSchema: FundingEligibilityCheckInputSchema,
    outputSchema: FundingEligibilityCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
