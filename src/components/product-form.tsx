'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProductSchema, type ProductFormData } from '@/lib/types';

interface ProductFormProps {
  isLoading: boolean;
  onGenerate: (data: ProductFormData) => Promise<void>;
}

export default function ProductForm({ isLoading, onGenerate }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: '',
      condition: '',
      notes: '',
    },
  });

  const productConditions = [
    'New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'For Parts or Not Working'
  ];

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold font-headline">Product Details</h2>
        <p className="text-muted-foreground">Fill in the form to get started.</p>
       </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-6">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Vintage Leather Jacket" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productConditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any extra details, e.g., 'Small scuff on the left sleeve'"
                    className="resize-none"
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate with AI'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
