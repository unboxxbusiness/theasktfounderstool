import { z } from 'zod';

export const validationSchema = z.object({
  marketNeed: z.string().min(10, { message: 'Please describe the market need in at least 10 characters.' }),
  solutionDifferentiation: z.string().min(10, { message: 'Please describe your solution in at least 10 characters.' }),
  targetMarket: z.string().min(10, { message: 'Please describe your target market in at least 10 characters.' }),
  businessModel: z.string().min(10, { message: 'Please describe your business model in at least 10 characters.' }),
  technicalFeasibility: z.string().min(10, { message: 'Please describe the technical feasibility in at least 10 characters.' }),
  developmentTimeline: z.string().min(10, { message: 'Please describe the development timeline in at least 10 characters.' }),
  teamExpertise: z.string().min(10, { message: 'Please describe your team\'s expertise in at least 10 characters.' }),
  fundingSources: z.string().min(10, { message: 'Please describe potential funding sources in at least 10 characters.' }),
  financialProjections: z.string().min(10, { message: 'Please describe your financial projections in at least 10 characters.' }),
  investorInterest: z.string().min(10, { message: 'Please describe the level of investor interest in at least 10 characters.' }),
});

export const fundingEligibilitySchema = z.object({
  ventureStage: z.string().min(1, { message: 'Please select your venture stage.' }),
  domain: z.string().min(1, { message: 'Please select your domain.' }),
  ideaDescription: z.string().min(20, { message: 'Please provide a description of at least 20 characters.' }),
});
