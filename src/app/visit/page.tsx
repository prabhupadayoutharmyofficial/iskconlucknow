
import {MapPin, Phone, Mail, Clock, Car, Train, Shirt, ShieldCheck, Utensils, CalendarDays} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function VisitPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Plan Your Journey</span>
          <h1 className="text-5xl font-headline font-bold text-foreground">Visit ISKCON Lucknow</h1>
          <p className="text-muted-foreground text-lg">
            Experience the divine serenity of Sri Sri Radha Raman Bihari Ji Mandir. Here is all the information you need to plan your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Map Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
              <MapPin className="w-8 h-8 text-primary" /> Get Directions
            </h2>
            <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-border shadow-lg">
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
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Sector-B, Ansal Golf City, Amar Shaheed Path, Lucknow, UP 226030
            </p>
          </div>

          {/* Reach Us Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-headline font-bold">How to Reach</h2>
            <div className="space-y-6">
              <Card className="border-border bg-card shadow-sm">
                <CardContent className="p-6 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <Car className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold">By Car</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The temple is located in <strong>Sushant Golf City</strong> area. Use GPS navigation or follow signs to ISKCON Temple. Ample parking is available on the premise.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card shadow-sm">
                <CardContent className="p-6 flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <Train className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline font-bold">By Train</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      From <strong>Lucknow Railway Station</strong>, take an auto-rickshaw or taxi directly to the temple. The journey typically takes approximately 25 minutes depending on traffic.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline text-primary">
                    <Clock className="w-5 h-5" /> Visiting Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-foreground/80">
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="font-bold">Morning:</span>
                    <span>04:30 AM – 12:30 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="font-bold">Evening:</span>
                    <span>04:00 PM – 08:00 PM</span>
                  </div>
                  <p className="text-xs italic pt-2 text-muted-foreground">Note: The temple is closed between 12:30 PM to 04:00 PM daily.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Visitor Guidelines */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold">Visitor Guidelines</h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="bg-primary/5 border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <Shirt className="w-6 h-6 text-primary" /> Dress Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <p className="text-muted-foreground font-medium italic mb-2">Please dress modestly and conservatively</p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <p><span className="font-bold">Men:</span> Full pants and shirts/t-shirts</p>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <p><span className="font-bold">Women:</span> Sarees, salwar kameez, long skirts, or modest western attire</p>
                  </li>
                  <li className="flex gap-3 text-sm text-destructive font-medium p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <p>Shorts, sleeveless tops, and short skirts are not appropriate</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="bg-accent/5 border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <ShieldCheck className="w-6 h-6 text-accent" /> Temple Etiquette
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    Remove footwear before entering the temple
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    Maintain silence or speak softly inside the temple hall
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    Photography may be restricted in certain areas
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    Please respect the deities and the devotees
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    Food or drinks are not allowed inside the temple hall
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    Mobile phones should be kept on silent mode
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Programs */}
        <div className="bg-secondary/20 rounded-[3rem] p-12 md:p-16 border border-border">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold">Special Programs</h2>
            <p className="text-muted-foreground mt-2">Join us for our signature spiritual gatherings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="rounded-2xl border-border bg-card shadow-md">
              <CardHeader className="bg-primary/10 border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                  <Utensils className="w-6 h-6 text-primary" /> Sunday Feast Program
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold">
                  <Clock className="w-5 h-5" /> 5:30 PM – 8:30 PM
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Experience a soul-stirring evening of <strong>Bhajan, Kirtan, a spiritual Lecture, and grand Prasadam</strong> distribution. A perfect way to end the week in devotion.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border bg-card shadow-md">
              <CardHeader className="bg-accent/10 border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                  <CalendarDays className="w-6 h-6 text-accent" /> Sunday Bhagavad Gita Class
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold">
                  <Clock className="w-5 h-5" /> 9:00 AM – 11:30 AM
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A deep dive into the <strong>Song of God</strong>. Join our comprehensive study circle as we explore the timeless wisdom of the Bhagavad Gita and its application in modern life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info Quick Access */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border border-border rounded-2xl bg-card shadow-sm">
            <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold font-headline text-xl mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground">+91-73100-80798</p>
            <p className="text-sm text-muted-foreground">+91-73555-60450</p>
          </div>
          <div className="text-center p-6 border border-border rounded-2xl bg-card shadow-sm">
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold font-headline text-xl mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground break-all">iskconlucknow108@gmail.com</p>
          </div>
          <div className="text-center p-6 border border-border rounded-2xl bg-card shadow-sm">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-bold font-headline text-xl mb-2">Find Us</h3>
            <p className="text-xs text-muted-foreground">Sector-B, Ansal Golf City, Amar Shaheed Path, Lucknow</p>
          </div>
        </div>
      </div>
    </div>
  );
}
