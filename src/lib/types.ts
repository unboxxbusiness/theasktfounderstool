import type { z } from 'zod';
import type { validationSchema, fundingEligibilitySchema } from './schemas';
import type { IdeaValidationScoreOutput } from '@/ai/flows/generate-idea-validation-score';
import { GeneratePitchDeckOutput } from '@/ai/flows/generate-pitch-deck';
import { FundingEligibilityCheckOutput } from '@/ai/flows/check-funding-eligibility';
import { GenerateBrandingOutput } from '@/ai/flows/generate-branding';


export type ValidationFormState = z.infer<typeof validationSchema>;

export type IdeaValidationScores = IdeaValidationScoreOutput;

export type DetailedReport = {
  report: string;
};

export type PitchDeck = GeneratePitchDeckOutput;

export type FundingEligibilityFormState = z.infer<typeof fundingEligibilitySchema>;

export type FundingEligibilityResult = FundingEligibilityCheckOutput;

export type BrandingResult = GenerateBrandingOutput;
