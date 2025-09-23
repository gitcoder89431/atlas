'use client';

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { personas } from "@/data/personas";
import { useMemo } from "react";

// Extract quotes from personas data
function getQuotesFromPersonas() {
  const quotes: { quote: string; name: string; title: string }[] = []

  personas.forEach(persona => {
    if (persona.famousQuotes && persona.famousQuotes.length > 0) {
      // Get 1-2 best quotes per persona to avoid overwhelming
      const quotesToUse = persona.famousQuotes.slice(0, 2)
      quotesToUse.forEach(quote => {
        quotes.push({
          quote,
          name: persona.name,
          title: persona.title
        })
      })
    }
  })

  // Return quotes as-is (no randomization to avoid SSR mismatch)
  return quotes
}

export function QuotesCarousel() {
  // Deterministic data, safe for SSR; no randomization applied
  const quotes = useMemo(() => getQuotesFromPersonas(), []);

  return (
    <div className="w-full max-w-none overflow-hidden">
      <InfiniteMovingCards
        items={quotes}
        direction="right"
        speed="slow"
        className="w-full"
      />
    </div>
  );
}
