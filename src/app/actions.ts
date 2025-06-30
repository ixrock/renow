'use server';

import { generateMarketingText } from "@/ai/flows/generate-marketing-text";
import { suggestProductCategory } from "@/ai/flows/suggest-product-category";
import { ProductSchema, type GenerationResult } from "@/lib/types";

type ActionState = 
  | { success: true; data: GenerationResult }
  | { success: false; error: string };

export async function generateProductInfo(
  formData: unknown
): Promise<ActionState> {
  const validation = ProductSchema.safeParse(formData);

  if (!validation.success) {
    const errorMessage = validation.error.errors.map(e => e.message).join(', ');
    return { success: false, error: `Invalid form data: ${errorMessage}` };
  }
  
  const { productName, condition, notes } = validation.data;

  try {
    const [marketingResult, categoryResult] = await Promise.all([
      generateMarketingText({
        productName,
        condition,
        notes: notes || 'N/A',
      }),
      suggestProductCategory({
        productName,
        productDescription: `Product: ${productName}. Condition: ${condition}. Notes: ${notes || 'N/A'}`,
      }),
    ]);
    
    if (!marketingResult?.marketingText || !categoryResult?.suggestedCategory) {
        throw new Error("AI failed to return complete data.");
    }
    
    return {
      success: true,
      data: {
        marketingText: marketingResult.marketingText,
        suggestedCategory: categoryResult.suggestedCategory,
        confidenceScore: categoryResult.confidenceScore,
      },
    };
  } catch (error) {
    console.error("AI generation failed:", error);
    return { success: false, error: "Failed to generate AI content. Please try again later." };
  }
}
