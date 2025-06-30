'use client';

import { useState } from 'react';
import ProductForm from './product-form';
import SuggestionDisplay from './suggestion-display';
import type { GenerationResult, ProductFormData } from '@/lib/types';
import { generateProductInfo } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';

export default function RecommerceAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (data: ProductFormData) => {
    setIsLoading(true);
    setResult(null);
    const response = await generateProductInfo(data);
    setIsLoading(false);

    if (response.success) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    }
  };

  return (
    <Card className="shadow-2xl shadow-primary/10">
      <CardContent className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <ProductForm isLoading={isLoading} onGenerate={handleGenerate} />
          <SuggestionDisplay isLoading={isLoading} result={result} />
        </div>
      </CardContent>
    </Card>
  );
}
