'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Facebook, Instagram, Youtube, MapPin, Phone, Mail} from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState<number | string>(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image 
                  src="https://res.cloudinary.com/dguhsmyrh/image/upload/v1772872478/iskcon_lucknow_rdmlcf.png" 
                  alt="ISKCON Lucknow Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-headline font-bold text-primary">ISKCON Lucknow</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Serving humanity through Krishna Consciousness. Join us in our journey of devotion, service, and spiritual discovery in the heart of Lucknow.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/iskcontemplelucknow/" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://www.instagram.com/iskconlucknow/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://www.youtube.com/channel/UCf2q6nojT14SwMZc9O--alA" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">History & Mission</Link></li>
              <li><Link href="/darshan" className="hover:text-primary transition-colors">Arati Timings</Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors">Upcoming Festivals</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
              <li><Link href="/donate" className="hover:text-primary transition-colors">Contribute</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-4 text-accent">Visit Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Sector-B, Ansal Golf City, Amar Shaheed Path, Lucknow, Uttar Pradesh 226030</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="space-y-2">
                  <p><span className="font-bold text-foreground">TPO:</span> +91-73100-80798</p>
                  <p><span className="font-bold text-foreground">Admin:</span> +91-73555-60450, +91-96620-29320, +91-90262-96062</p>
                  <p><span className="font-bold text-foreground">Govinda:</span> +91-95175-55471, +91-75180-22202</p>
                  <p><span className="font-bold text-foreground">Guest House:</span> +91-75180-22202</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="break-all">iskconlucknow108@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-headline font-bold text-lg mb-4 text-accent">Darshan Hours</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Morning:</span>
                  <span className="text-foreground">04:30 AM - 12:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Evening:</span>
                  <span className="text-foreground">04:00 PM - 08:30 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg mb-2 text-accent">Special Programs</h3>
              <ul className="space-y-1 text-xs text-muted-foreground italic">
                <li>Daily Evening - Special Feast Program</li>
                <li>Sunday - Bhagavad Gita Class</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {year} ISKCON Lucknow. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
