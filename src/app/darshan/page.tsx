import { Clock, Info, Star, ShieldCheck, Utensils, Ban, CameraOff, PhoneOff, Shirt, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const timings = [
  { event: 'Mangala Arati', time: '04:30 AM', description: 'The first arati of the day, highly auspicious.' },
  { event: 'Tulsi Arati', time: '05:15 AM', description: 'Worship of the sacred Tulsi plant.' },
  { event: 'Guru Puja', time: '07:30 AM', description: 'Offering worship to Srila Prabhupada.' },
  { event: 'Darshan Arati & Greeting', time: '08:00 AM', description: 'Deities appear in their beautiful morning outfits.' },
  { event: 'Srimad Bhagavatam Class', time: '08:30 AM', description: 'Daily discourse on spiritual scriptures.' },
  { event: 'Raj Bhoga Arati', time: '12:00 PM', description: 'Mid-day offering to the Deities.' },
  { event: 'Temple Closes', time: '12:30 PM', description: 'Deities rest until the afternoon.' },
  { event: 'Temple Re-opens', time: '04:00 PM', description: 'Afternoon/Evening darshan begins.' },
  { event: 'Tulsi Arati', time: '06:45 PM', description: 'Evening Tulsi worship.' },
  { event: 'Sandhya Arati (Gaura Arati)', time: '07:00 PM', description: 'Main evening ceremony with kirtan.' },
  { event: 'Bhagavad Gita Class', time: '08:00 PM', description: 'Evening lecture on the song of God.' },
  { event: 'Shayana Arati', time: '08:15 PM', description: 'Last arati before the Deities rest for the night.' },
  { event: 'Temple Closes', time: '08:30 PM', description: 'The temple grounds close.' },
];

const specialPrograms = [
  { day: 'Daily Evening', program: 'Special Feast Program', detail: 'Join us for prasadam distribution and special evening discourses.' },
  { day: 'Sunday', program: 'Bhagavad Gita Class', detail: 'Comprehensive study of the Gita followed by a grand Sunday Feast.' }
];

export default function DarshanPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Divine Schedule</span>
          <h1 className="text-5xl font-headline font-bold text-foreground">Daily Arati & Darshan</h1>
          <p className="text-muted-foreground text-lg">
            Experience the divine presence throughout the day. We welcome all visitors to participate in our daily rituals and ceremonies.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/20 bg-card overflow-hidden shadow-sm">
              <CardHeader className="bg-primary/5 border-b border-border">
                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                  <Clock className="w-6 h-6 text-primary" /> Full Daily Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="font-bold text-primary w-[250px] py-4">Event</TableHead>
                      <TableHead className="font-bold text-primary py-4">Time</TableHead>
                      <TableHead className="font-bold text-primary py-4">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timings.map((t, idx) => (
                      <TableRow key={idx} className="border-border hover:bg-secondary/20 transition-colors">
                        <TableCell className="font-bold py-4">{t.event}</TableCell>
                        <TableCell className="text-accent font-semibold py-4">{t.time}</TableCell>
                        <TableCell className="text-muted-foreground text-sm py-4">{t.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-foreground flex items-center gap-2">
                <Star className="w-6 h-6 text-primary fill-primary" /> Special Program Days
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialPrograms.map((p, idx) => (
                  <Card key={idx} className="border-border bg-card shadow-sm hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl font-headline text-primary">{p.day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-bold text-foreground mb-2">{p.program}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-accent/30 bg-secondary/10">
              <CardHeader>
                <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
                  <Info className="w-5 h-5" /> Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  The temple hall remains <strong>closed between 12:30 PM and 4:00 PM</strong> daily for the rest of the Deities.
                </p>
                <p>
                  Timings may slightly vary during special festivals and important astronomical events.
                </p>
                <p>
                  We request all visitors to maintain silence in the temple hall and follow the dress code guidelines.
                </p>
              </CardContent>
            </Card>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                <Shirt className="w-5 h-5" /> Quick Dress Code
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To maintain the spiritual sanctity of the temple, we kindly request visitors to dress modestly. Avoid shorts, short skirts, or sleeveless tops.
              </p>
            </div>
          </div>
        </div>

        {/* Visitor Guidelines Section */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-headline font-bold text-foreground">Visitor Guidelines</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To ensure a respectful and spiritually uplifting environment for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dress Code Details */}
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-primary/5 border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <Shirt className="w-6 h-6 text-primary" /> Dress Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <p className="text-muted-foreground font-medium italic">Please dress modestly and conservatively</p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <p className="text-sm"><span className="font-bold">Men:</span> Full pants and shirts/t-shirts</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <p className="text-sm"><span className="font-bold">Women:</span> Sarees, salwar kameez, long skirts, or modest western attire</p>
                  </div>
                  <div className="flex gap-4 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                    <Ban className="w-5 h-5 text-destructive shrink-0 mt-1" />
                    <p className="text-sm text-destructive font-medium">Shorts, sleeveless tops, and short skirts are not appropriate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Temple Etiquette */}
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-accent/5 border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <ShieldCheck className="w-6 h-6 text-accent" /> Temple Etiquette
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {[
                    "Remove footwear before entering the temple",
                    "Maintain silence or speak softly inside the temple hall",
                    "Photography may be restricted in certain areas",
                    "Please respect the deities and the devotees",
                    "Food or drinks are not allowed inside the temple hall",
                    "Mobile phones should be kept on silent mode"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      {idx === 2 ? <CameraOff className="w-4 h-4 text-accent shrink-0 mt-0.5" /> : 
                       idx === 5 ? <PhoneOff className="w-4 h-4 text-accent shrink-0 mt-0.5" /> :
                       <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />}
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prasadam */}
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-secondary border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <Utensils className="w-6 h-6 text-primary" /> Prasadam (Sacred Food)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The temple serves prasadam (sanctified vegetarian food) to all visitors. Donations for prasadam are welcome but not mandatory.
                </p>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Serving Love</p>
                  <p className="text-sm italic">"Food for the soul, offered with devotion."</p>
                </div>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted border-b border-border">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <CalendarDays className="w-6 h-6 text-foreground" /> Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm">Ekadashi Observations</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ekadashi (11th day of lunar cycle) is observed with fasting from grains and beans. Temple kitchen serves special Ekadashi prasadam on these days.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-sm">Major Festivals</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    During major festivals, special schedules are followed. Please check the temple notice board or contact the temple office for festival details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
