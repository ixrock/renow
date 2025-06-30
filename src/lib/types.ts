import { z } from 'zod';

export const ProductSchema = z.object({
  productName: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  condition: z.string().nonempty({ message: "Please select a condition." }),
  notes: z.string().max(500, { message: "Notes must not exceed 500 characters." }).optional(),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

export type GenerationResult = {
  marketingText: string;
  suggestedCategory: string;
  confidenceScore: number;
};
