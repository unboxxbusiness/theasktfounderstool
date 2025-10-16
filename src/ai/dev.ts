import { config } from 'dotenv';
config();

import '@/ai/flows/generate-idea-validation-score.ts';
import '@/ai/flows/generate-detailed-report.ts';
import '@/ai/flows/generate-pitch-deck.ts';
import '@/ai/flows/check-funding-eligibility.ts';
import '@/ai/flows/generate-branding.ts';
