'use server';

/**
 * @fileOverview Product category suggestion flow using Genkit.
 *
 * - suggestProductCategory - A function that suggests a product category based on a product description.
 * - SuggestProductCategoryInput - The input type for the suggestProductCategory function.
 * - SuggestProductCategoryOutput - The return type for the suggestProductCategory function.
 */

import {ai} from '@/ai/genkit-api';
import {z} from 'genkit';

const SuggestProductCategoryInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
});
export type SuggestProductCategoryInput = z.infer<typeof SuggestProductCategoryInputSchema>;

const SuggestProductCategoryOutputSchema = z.object({
  suggestedCategory: z.string().describe('The suggested product category.'),
  confidenceScore: z.number().describe('The confidence score for the suggested category (0-1).'),
});
export type SuggestProductCategoryOutput = z.infer<typeof SuggestProductCategoryOutputSchema>;

export async function suggestProductCategory(input: SuggestProductCategoryInput): Promise<SuggestProductCategoryOutput> {
  return suggestProductCategoryFlow(input);
}

const productCategoryPrompt = ai.definePrompt({
  name: 'productCategoryPrompt',
  input: {schema: SuggestProductCategoryInputSchema},
  output: {schema: SuggestProductCategoryOutputSchema},
  prompt: `You are an expert in product categorization. Based on the product name and description provided, suggest the most appropriate product category from the list below. Also, provide a confidence score (0-1) indicating how certain you are about the suggested category. Use reasoning to decide when or if to incorporate some piece of information in its output.

Available Categories:
- Electronics
- Home & Garden
- Clothing, Shoes & Accessories
- Toys & Hobbies
- Sports & Outdoors
- Health & Beauty
- Books & Media
- Automotive
- Pet Supplies
- Jewelry & Watches

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}

Ensure that the suggested category is from the list above. Return a confidence score between 0 and 1.
`,
});

const suggestProductCategoryFlow = ai.defineFlow(
  {
    name: 'suggestProductCategoryFlow',
    inputSchema: SuggestProductCategoryInputSchema,
    outputSchema: SuggestProductCategoryOutputSchema,
  },
  async input => {
    const {output} = await productCategoryPrompt(input);
    return output!;
  }
);
