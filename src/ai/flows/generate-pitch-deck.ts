
'use server';

/**
 * @fileOverview Generates content for a pitch deck.
 *
 * - generatePitchDeck - A function that generates the pitch deck content.
 * - GeneratePitchDeckInput - The input type for the generatePitchDeck function.
 * - GeneratePitchDeckOutput - The return type for the generatePitchDeck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SlideSchema = z.object({
  title: z.string().describe('The title of the slide.'),
  content: z.array(z.string()).describe('An array of bullet points for the slide content. Each string is a bullet point.'),
});

const GeneratePitchDeckInputSchema = z.object({
  marketViability: z.number().describe('The market viability score.'),
  technicalFeasibility: z.number().describe('The technical feasibility score.'),
  fundingReadiness: z.number().describe('The funding readiness score.'),
  ideaDetails: z.string().describe('Detailed description of the startup idea from the questionnaire.'),
});
export type GeneratePitchDeckInput = z.infer<typeof GeneratePitchDeckInputSchema>;

const GeneratePitchDeckOutputSchema = z.object({
  titleSlide: SlideSchema,
  problemSlide: SlideSchema,
  solutionSlide: SlideSchema,
  marketSlide: SlideSchema,
  productSlide: SlideSchema,
  teamSlide: SlideSchema,
  askSlide: SlideSchema,
  contactSlide: SlideSchema,
});
export type GeneratePitchDeckOutput = z.infer<typeof GeneratePitchDeckOutputSchema>;

export async function generatePitchDeck(input: GeneratePitchDeckInput): Promise<GeneratePitchDeckOutput> {
  return generatePitchDeckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePitchDeckPrompt',
  input: {schema: GeneratePitchDeckInputSchema},
  output: {schema: GeneratePitchDeckOutputSchema},
  prompt: `You are an expert pitch deck creator for startups. Based on the idea details and validation scores, generate the content for an 8-slide pitch deck. The slides should be: Title, Problem, Solution, Market, Product, Team, The Ask, and Contact.

Idea Details:
{{ideaDetails}}

Validation Scores:
- Market Viability: {{marketViability}}/100
- Technical Feasibility: {{technicalFeasibility}}/100
- Funding Readiness: {{fundingReadiness}}/100

For each slide, provide a title and a few concise bullet points. The content should be optimistic and persuasive, aimed at seed-stage investors.
- Title Slide: Create a compelling title and a one-sentence tagline.
- Problem Slide: Clearly state the problem the startup is solving.
- Solution Slide: Describe the solution and its key benefits.
- Market Slide: Describe the target market and its size.
- Product Slide: Briefly explain how the product works.
- Team Slide: Highlight the team's expertise (if mentioned in details). If not, create plausible but generic roles.
- The Ask Slide: Formulate a clear "ask" for funding, mentioning a plausible amount for a seed round and what it will be used for.
- Contact Slide: Provide placeholder contact information.
`,
});

const generatePitchDeckFlow = ai.defineFlow(
  {
    name: 'generatePitchDeckFlow',
    inputSchema: GeneratePitchDeckInputSchema,
    outputSchema: GeneratePitchDeckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
