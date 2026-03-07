'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Menu, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import { ModeToggle } from './mode-toggle';

const navLinks = [
  {name: 'Home', href: '/'},
  {name: 'About Us', href: '/about'},
  {name: 'Schedule', href: '/darshan'},
  {name: 'Events', href: '/events'},
  {name: 'Gallery', href: '/gallery'},
  {name: 'Visit Us', href: '/visit'},
  {name: 'FAQ', href: '/faq'},
  {name: 'Contact Us', href: '/contact'},
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
              <Image 
                src="https://res.cloudinary.com/dguhsmyrh/image/upload/v1772872478/iskcon_lucknow_rdmlcf.png" 
                alt="ISKCON Lucknow Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-headline font-bold text-primary tracking-tight leading-none">ISKCON Lucknow</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">International Society For Krishna Consciousness</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary text-foreground/80"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/donate">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-accent font-bold">
                Donate
              </Button>
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <ModeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "xl:hidden absolute w-full bg-background border-b border-border transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium p-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/donate" onClick={() => setIsOpen(false)}>
            <Button variant="default" className="w-full bg-primary text-primary-foreground">
              Donate Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
