import { jest } from '@jest/globals';
import { suggestProductCategory, SuggestProductCategoryInput } from './suggest-product-category';

jest.mock('@/ai/genkit-api', () => ({
  ai: {
    definePrompt: jest.fn().mockReturnValue(
      jest.fn().mockImplementation(async (input: unknown) => {
        const { productName, productDescription } = input as SuggestProductCategoryInput;
        if (!productName) {
          throw new Error('productName is required');
        }
        if (!productDescription) {
          throw new Error('productDescription is required');
        }
        return {
          output: {
            suggestedCategory: 'Electronics',
            confidenceScore: 0.85
          }
        };
      })
    ),
    defineFlow: jest.fn((config, handler) => handler),
  },
}));

describe('suggestProductCategory', () => {
  it('should return an object with suggestedCategory and confidenceScore', async () => {
    const mockInput = {
      productName: 'iPhone 13',
      productDescription: 'Latest Apple smartphone, 128GB, black.',
    };
    const result = await suggestProductCategory(mockInput);
    expect(result).toHaveProperty('suggestedCategory', 'Electronics');
    expect(result).toHaveProperty('confidenceScore');
    expect(typeof result.confidenceScore).toBe('number');
    expect(result.confidenceScore).toBeGreaterThanOrEqual(0);
    expect(result.confidenceScore).toBeLessThanOrEqual(1);
  });

  it('should throw if productName is missing', async () => {
    const badInput = {
      productDescription: 'Some description',
    };
    // @ts-expect-error purposely missing productName
    await expect(suggestProductCategory(badInput)).rejects.toThrow('productName is required');
  });

  it('should throw if productDescription is missing', async () => {
    const badInput = {
      productName: 'Test',
    };
    // @ts-expect-error purposely missing productDescription
    await expect(suggestProductCategory(badInput)).rejects.toThrow('productDescription is required');
  });
});
