'use client';

import { Lightbulb, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import type { GenerationResult } from '@/lib/types';
import { Badge } from './ui/badge';

interface SuggestionDisplayProps {
  isLoading: boolean;
  result: GenerationResult | null;
}

export default function SuggestionDisplay({ isLoading, result }: SuggestionDisplayProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!result) {
    return <InitialState />;
  }

  const getProgressColor = (score: number) => {
    if (score > 0.8) return 'bg-green-500';
    if (score > 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-secondary/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-accent"/>
            <span>Generated Marketing Copy</span>
          </CardTitle>
          <CardDescription>
            This text is optimized to attract buyers on marketplaces.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-foreground/90">{result.marketingText}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-secondary/50 border-dashed">
        <CardHeader>
          <CardTitle>Suggested Category</CardTitle>
          <CardDescription>
            Our AI's best guess for your product category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Badge variant="outline" className="text-lg font-semibold py-1 px-3 border-primary text-primary">
                {result.suggestedCategory}
            </Badge>
          <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                <p className="text-sm font-bold text-primary">{(result.confidenceScore * 100).toFixed(0)}%</p>
            </div>
            <Progress value={result.confidenceScore * 100} indicatorClassName={getProgressColor(result.confidenceScore)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
         <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  </div>
);

const InitialState = () => (
  <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary/50 p-8">
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Lightbulb className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold font-headline">AI Suggestions Await</h3>
      <p className="mt-2 text-muted-foreground">
        Your generated marketing text and category will appear here once you fill out the form.
      </p>
    </div>
  </div>
);
