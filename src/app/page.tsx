import RecommerceAssistant from "@/components/recommerce-assistant";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
          ReCommerce AI Assist
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Enter your product details below to generate compelling marketing text and get a category suggestion, powered by AI.
        </p>
      </div>
      <RecommerceAssistant />
    </main>
  );
}
