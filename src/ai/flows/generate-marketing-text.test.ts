import { jest } from '@jest/globals';
import { generateMarketingText, GenerateMarketingTextInput } from './generate-marketing-text';

jest.mock('@/ai/genkit-api', () => ({
  ai: {
    definePrompt: jest.fn().mockReturnValue(
      jest.fn().mockImplementation(async (input) => {
        const { productName } = input as GenerateMarketingTextInput;
        if (!productName) {
          throw new Error('productName is required');
        }
        return {
          output: { marketingText: `Mocked text for ${productName}` }
        };
      })
    ),
    defineFlow: jest.fn((config, handler) => handler),
  },
}));

describe('generateMarketingText', () => {
  it('should return an object with a marketingText property', async () => {
    const mockInput = {
      productName: 'Test Product',
      condition: 'Used - Like New',
      notes: 'Comes with original box.',
    };
    const result = await generateMarketingText(mockInput);
    expect(result).toHaveProperty('marketingText');
    expect(typeof result.marketingText).toBe('string');
    expect(result.marketingText).toContain('Test Product');
  });

  it('should throw if productName is missing', async () => {
    const badInput = {
      condition: 'New',
      notes: 'No notes',
    };
    // @ts-expect-error purposely missing productName
    await expect(generateMarketingText(badInput)).rejects.toThrow();
  });

  it('should generate different text for different products', async () => {
    const input1 = { productName: 'A', condition: 'New', notes: '' };
    const input2 = { productName: 'B', condition: 'Used', notes: '' };
    const result1 = await generateMarketingText(input1);
    const result2 = await generateMarketingText(input2);
    expect(result1.marketingText).not.toEqual(result2.marketingText);
  });
});