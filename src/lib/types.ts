import type { z } from 'zod';
import type { validationSchema } from './schemas';
import type { IdeaValidationScoreOutput } from '@/ai/flows/generate-idea-validation-score';
import { GeneratePitchDeckOutput } from '@/ai/flows/generate-pitch-deck';

export type ValidationFormState = z.infer<typeof validationSchema>;

export type IdeaValidationScores = IdeaValidationScoreOutput;

export type DetailedReport = {
  report: string;
};

export type PitchDeck = GeneratePitchDeckOutput;
