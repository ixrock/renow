'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating marketing text for a product.
 *
 * The flow takes product details as input and returns a compelling marketing text suitable for marketplace listings.
 *   - generateMarketingText - A function that handles the generation of marketing texts.
 *   - GenerateMarketingTextInput - The input type for the generateMarketingText function.
 *   - GenerateMarketingTextOutput - The return type for the generateMarketingText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingTextInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  condition: z.string().describe('The condition of the product (e.g., new, used, like new).'),
  notes: z.string().describe('Additional notes or details about the product.'),
});
export type GenerateMarketingTextInput = z.infer<typeof GenerateMarketingTextInputSchema>;

const GenerateMarketingTextOutputSchema = z.object({
  marketingText: z.string().describe('A compelling marketing text for the product.'),
});
export type GenerateMarketingTextOutput = z.infer<typeof GenerateMarketingTextOutputSchema>;

export async function generateMarketingText(input: GenerateMarketingTextInput): Promise<GenerateMarketingTextOutput> {
  return generateMarketingTextFlow(input);
}

const generateMarketingTextPrompt = ai.definePrompt({
  name: 'generateMarketingTextPrompt',
  input: {schema: GenerateMarketingTextInputSchema},
  output: {schema: GenerateMarketingTextOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing compelling product descriptions for online marketplaces.

  Given the following product details, generate a short, engaging, and persuasive marketing text that will attract potential buyers.

  Product Name: {{{productName}}}
  Condition: {{{condition}}}
  Notes: {{{notes}}}
  `,
});

const generateMarketingTextFlow = ai.defineFlow(
  {
    name: 'generateMarketingTextFlow',
    inputSchema: GenerateMarketingTextInputSchema,
    outputSchema: GenerateMarketingTextOutputSchema,
  },
  async input => {
    const {output} = await generateMarketingTextPrompt(input);
    return output!;
  }
);
