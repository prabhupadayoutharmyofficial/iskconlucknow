
'use client';

import React from 'react';
import Image from 'next/image';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ImageIcon} from 'lucide-react';

export default function GalleryPage() {
  const categories = [
    {id: 'all', label: 'All Photos'},
    {id: 'temple', label: 'Temple Views'},
    {id: 'deities', label: 'Deities'},
    {id: 'festivals', label: 'Festivals'},
    {id: 'devotees', label: 'Devotee Activities'}
  ];

  const hasImages = PlaceHolderImages.length > 0;

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Visual Journey</span>
          <h1 className="text-5xl font-headline font-bold text-foreground">Photo Gallery</h1>
          <p className="text-muted-foreground text-lg">
            Experience the divine beauty of ISKCON Lucknow through these captured moments of devotion and serenity.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-secondary/40 border border-border p-1">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            {hasImages ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {PlaceHolderImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden group shadow-md border border-border bg-muted">
                    {img.imageUrl && (
                      <Image
                        src={img.imageUrl}
                        alt={img.description}
                        width={800}
                        height={600}
                        className="w-full transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={img.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-medium text-sm">{img.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center border-2 border-dashed border-border rounded-3xl bg-muted flex flex-col items-center justify-center space-y-4">
                 <ImageIcon className="w-16 h-16 text-muted-foreground" />
                 <div className="space-y-1">
                    <h3 className="text-xl font-headline font-bold text-foreground">No Photos Yet</h3>
                    <p className="text-muted-foreground">The gallery is currently being curated. Please check back later.</p>
                 </div>
              </div>
            )}
          </TabsContent>

          {categories.slice(1).map(cat => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="py-32 text-center border-2 border-dashed border-border rounded-3xl bg-muted flex flex-col items-center justify-center space-y-4">
                 <ImageIcon className="w-16 h-16 text-muted-foreground" />
                 <p className="text-muted-foreground font-medium">Photos for {cat.label} will appear here.</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
