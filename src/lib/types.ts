import type { z } from 'zod';
import type { validationSchema } from './schemas';
import type { IdeaValidationScoreOutput } from '@/ai/flows/generate-idea-validation-score';

export type ValidationFormState = z.infer<typeof validationSchema>;

export type IdeaValidationScores = IdeaValidationScoreOutput;

export type DetailedReport = {
  report: string;
};
