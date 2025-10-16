
'use server';

/**
 * @fileOverview Generates branding assets (names, slogans, logo) for a startup idea.
 *
 * - generateBranding - A function that generates branding assets.
 * - GenerateBrandingInput - The input type for the generateBranding function.
 * - GenerateBrandingOutput - The return type for the generateBranding function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBrandingInputSchema = z.object({
  ideaDescription: z.string().describe('A description of the startup idea.'),
});
export type GenerateBrandingInput = z.infer<typeof GenerateBrandingInputSchema>;

const GenerateBrandingOutputSchema = z.object({
    names: z.array(z.string()).describe('A list of 5 creative and catchy startup names.'),
    slogans: z.array(z.string()).describe('A list of 5 memorable slogans for the startup.'),
    logoDataUri: z.string().describe('A data URI for a generated logo image.'),
});
export type GenerateBrandingOutput = z.infer<typeof GenerateBrandingOutputSchema>;


export async function generateBranding(input: GenerateBrandingInput): Promise<GenerateBrandingOutput> {
  return generateBrandingFlow(input);
}


const brandingIdeasPrompt = ai.definePrompt({
    name: 'brandingIdeasPrompt',
    input: { schema: GenerateBrandingInputSchema },
    output: { schema: z.object({
        names: z.array(z.string()).describe('A list of 5 creative and catchy startup names.'),
        slogans: z.array(z.string()).describe('A list of 5 memorable slogans for the startup.'),
        logoPrompt: z.string().describe('A short, descriptive prompt for an AI image generator to create a simple, modern, and iconic logo. The prompt should be about a logo, not a general image.'),
    })},
    prompt: `You are a branding expert. Generate 5 startup names, 5 slogans, and a logo generation prompt for the following idea:

    {{ideaDescription}}
    
    The names should be modern, memorable, and available as a .com domain if possible.
    The slogans should be short and impactful.
    The logo prompt should describe a simple, iconic, and modern logo suitable for a startup.`
});


const generateBrandingFlow = ai.defineFlow(
  {
    name: 'generateBrandingFlow',
    inputSchema: GenerateBrandingInputSchema,
    outputSchema: GenerateBrandingOutputSchema,
  },
  async (input) => {
    const { output: brandingIdeas } = await brandingIdeasPrompt(input);

    if (!brandingIdeas) {
        throw new Error('Could not generate branding ideas.');
    }

    const { media } = await ai.generate({
        model: 'googleai/imagen-2',
        prompt: `Logo design: ${brandingIdeas.logoPrompt}`,
        config: {
          aspectRatio: '1:1',
        },
      });
    
    if (!media?.url) {
      throw new Error('Could not generate logo');
    }

    return {
        names: brandingIdeas.names,
        slogans: brandingIdeas.slogans,
        logoDataUri: media.url,
    };
  }
);
