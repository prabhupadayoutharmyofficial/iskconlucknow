
'use client';

import React, {useEffect, useState} from 'react';
import {getDailySpiritualReflection} from '@/ai/flows/daily-spiritual-reflection-flow';
import {Quote, Sparkles} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';

export function DailyReflection() {
  const [reflection, setReflection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReflection() {
      try {
        const result = await getDailySpiritualReflection({});
        setReflection(result.quote);
      } catch (error) {
        console.error('Failed to fetch reflection', error);
        setReflection("Chant Hare Krishna and be happy.");
      } finally {
        setLoading(false);
      }
    }
    fetchReflection();
  }, []);

  return (
    <div className="bg-secondary/30 border border-primary/20 rounded-2xl p-8 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-700">
        <Sparkles className="w-32 h-32 text-primary" />
      </div>
      
      <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto relative z-10">
        <Quote className="w-10 h-10 text-primary opacity-50 mb-2" />
        
        {loading ? (
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        ) : (
          <p className="text-2xl font-headline italic text-foreground/90 leading-relaxed">
            "{reflection}"
          </p>
        )}
        
        <div className="pt-4 flex flex-col items-center">
          <div className="h-1 w-12 bg-primary/40 rounded-full mb-2"></div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">Daily Wisdom</span>
        </div>
      </div>
    </div>
  );
}
