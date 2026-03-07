'use server';
/**
 * @fileOverview A Genkit flow for generating a daily spiritual reflection.
 *
 * - getDailySpiritualReflection - A function that handles the generation of a spiritual quote.
 * - DailySpiritualReflectionInput - The input type for the getDailySpiritualReflection function.
 * - DailySpiritualReflectionOutput - The return type for the getDailySpiritualReflection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailySpiritualReflectionInputSchema = z.object({});
export type DailySpiritualReflectionInput = z.infer<typeof DailySpiritualReflectionInputSchema>;

const DailySpiritualReflectionOutputSchema = z.object({
  quote: z.string().describe('An uplifting spiritual quote or message relevant to Vaishnava philosophy and temple teachings.'),
});
export type DailySpiritualReflectionOutput = z.infer<typeof DailySpiritualReflectionOutputSchema>;

export async function getDailySpiritualReflection(
  input: DailySpiritualReflectionInput
): Promise<DailySpiritualReflectionOutput> {
  return dailySpiritualReflectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailySpiritualReflectionPrompt',
  input: {schema: DailySpiritualReflectionInputSchema},
  output: {schema: DailySpiritualReflectionOutputSchema},
  prompt: `Generate a short, uplifting spiritual quote or message.

The quote should be relevant to Vaishnava philosophy and temple teachings. It should inspire and provide daily guidance to visitors, connecting them with the temple's spiritual essence.

Ensure the message is concise, profound, and offers a positive reflection.`,
});

const dailySpiritualReflectionFlow = ai.defineFlow(
  {
    name: 'dailySpiritualReflectionFlow',
    inputSchema: DailySpiritualReflectionInputSchema,
    outputSchema: DailySpiritualReflectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
