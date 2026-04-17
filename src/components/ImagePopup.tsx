'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImagePopupProps {
  imageUrl: string;
  altText: string;
  title?: string;
  description?: string;
}

export function ImagePopup({ imageUrl, altText, title, description }: ImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay for a better user experience
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!imageUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[1200px] p-0 overflow-hidden border-none bg-transparent shadow-none">
        {/* Accessibility Requirements: DialogTitle and DialogDescription are required for screen readers */}
        <DialogTitle className="sr-only">{title || "Announcement"}</DialogTitle>
        <DialogDescription className="sr-only">
          {description || altText || "An important announcement from ISKCON Lucknow temple."}
        </DialogDescription>

        <div className="relative group outline-none">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-cover"
              priority
            />
            
            {/* Optional Overlay Content */}
            {(title || description) && (
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                {title && <h3 className="text-2xl font-headline font-bold mb-2">{title}</h3>}
                {description && <p className="text-sm opacity-90 font-medium leading-relaxed">{description}</p>}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
