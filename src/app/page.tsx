import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Calendar, Clock, MapPin, ArrowRight} from 'lucide-react';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import {ImagePopup} from '@/components/ImagePopup';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'temple-exterior');
  const deitiesImg = PlaceHolderImages.find(img => img.id === 'deities-darshan');

  return (
    <div className="flex flex-col gap-0">
      {/* 
          Announcement Popup 
          Updated to remove visible text overlay as requested.
      */}
      <ImagePopup 
        imageUrl="https://res.cloudinary.com/dguhsmyrh/image/upload/v1776417009/%E0%A4%A8%E0%A4%B0%E0%A5%8D%E0%A4%B8%E0%A4%BF%E0%A4%82%E0%A4%97%E0%A4%B9_%E0%A4%9A%E0%A4%A4%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A4%B6%E0%A5%80_nii97f.jpg"
        altText="Temple Announcement"
      />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-end justify-center overflow-hidden bg-background">
        <div className="absolute inset-0">
          {heroImg?.imageUrl ? (
            <Image
              src={heroImg.imageUrl}
              alt={heroImg.description}
              fill
              className="object-cover"
              priority
            />
          ) : (
             <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center border-b border-border">
                <p className="text-muted-foreground/30 font-headline text-2xl">Temple Exterior Image Area</p>
             </div>
          )}
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 pb-4 pt-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight drop-shadow-lg">
            Divine Darshan of <br /> 
            <span className="text-[#E8BA30] italic">Sri Sri Radha Raman Bihari</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white font-bold leading-relaxed drop-shadow-sm">
          Sector-B, Ansal Golf City, Amar Shaheed Path, Lucknow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/darshan">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent font-bold px-8 h-14 text-lg rounded-full shadow-lg">
                View Darshan Timings
              </Button>
            </Link>
            <Link href="/visit">
              <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-full shadow-lg">
                Plan Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-md hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Daily Rituals</h3>
              <p className="text-muted-foreground mb-6">Explore our schedule for Mangala Arati, Raj Bhoga Arati, and Sandhya Arati.</p>
              <Link href="/darshan" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                See Timings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-md hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Festivals</h3>
              <p className="text-muted-foreground mb-6">Join us for Mahaprashadam and Hari Naam Sankirtan</p>
              <Link href="/events" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                Event Calendar <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-md hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Find Us</h3>
              <p className="text-muted-foreground mb-6">Located in Ansal Golf City, we are easily accessible from all parts of Lucknow.</p>
              <Link href="/visit" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                Get Directions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 overflow-hidden bg-secondary/5 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-card flex items-center justify-center">
                {deitiesImg?.imageUrl ? (
                  <Image
                    src={deitiesImg.imageUrl}
                    alt={deitiesImg.description}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground/30 font-headline text-xl">Deity Darshan Image Area</p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-sm">Divine Sanctuary</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground">Welcome to ISKCON Lucknow Temple</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The International Society for Krishna Consciousness (ISKCON) Lucknow temple is a spiritual sanctuary dedicated to the worship of Lord Krishna. Our beautiful temple serves as a center for spiritual growth, Vedic education, and cultural activities.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded on the principles taught by His Divine Grace A.C. Bhaktivedanta Srila Prabhupada, our temple offers a serene environment for meditation, prayer, and spiritual learning. We welcome everyone, regardless of background, to join us in experiencing the divine love of Lord Krishna.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="default" className="bg-primary text-primary-foreground hover:bg-accent font-bold px-8 h-12 rounded-full shadow-md">
                    Read Our Full Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-headline font-bold text-foreground">Find Us on Google Maps</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visit the sacred sanctuary of Sri Sri Radha Raman Bihari Ji Mandir in the heart of Ansal Golf City.
              </p>
            </div>
            <div className="w-full h-[500px] rounded-[3rem] overflow-hidden border border-border shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7123.268771189367!2d81.010885!3d26.787922!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be498d37028c7%3A0xdf8427c7e3c40689!2sISKCON%20Temple%2C%20Sri%20Sri%20Radha%20Raman%20Bihari%20Ji%20Mandir%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1772157152167!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
