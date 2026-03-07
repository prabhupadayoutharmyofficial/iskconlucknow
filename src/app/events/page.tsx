
import {Calendar as CalendarIcon, MapPin, Clock, Image as ImageIcon} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const events = [
  {
    title: 'Sunday Soul Feast',
    date: 'Every Sunday',
    time: '05:30 PM onwards',
    description: 'Weekly spiritual program including kirtan, discourse, and multi-course vegetarian feast.',
    location: 'Nityanand Hall',
    type: 'Weekly',
    image: ''
  }
];

export default function EventsPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Upcoming Celebrations</span>
          <h1 className="text-5xl font-headline font-bold text-foreground">Festivals & Events</h1>
          <p className="text-muted-foreground text-lg">
            Join us in our vibrant celebrations throughout the year. Every festival at ISKCON Lucknow is a unique journey of music, philosophy, and devotion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, idx) => (
            <Card key={idx} className="border-border bg-card overflow-hidden hover:border-primary/50 transition-all flex flex-col h-full group shadow-sm">
              <div className="relative h-64 bg-neutral-100 flex items-center justify-center overflow-hidden border-b border-border">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                   <ImageIcon className="w-16 h-16 text-neutral-300" />
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1">
                    {event.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-accent font-bold mb-3">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <CardTitle className="text-3xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-20 p-12 bg-secondary/30 rounded-3xl border border-primary/20 text-center space-y-6 shadow-inner">
          <h2 className="text-3xl font-headline font-bold">Host a Special Event?</h2>
          <p className="max-w-xl mx-auto text-muted-foreground">
            The temple premises are available for spiritual functions, Vedic weddings, and anniversary celebrations. Contact our administration for bookings.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground font-bold">Inquire Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
