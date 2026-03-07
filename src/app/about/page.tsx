
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import {
  History,
  Target,
  User,
  Building2,
  Users,
  Utensils,
  Home,
  ShoppingBag,
  GraduationCap,
  Heart,
  Baby,
  Smile,
  Music,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight
} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

export const metadata: Metadata = {
  title: "About ISKCON Lucknow | Our History, Mission, and Founder",
  description: "Learn about the history of ISKCON Lucknow, our mission to spread Krishna consciousness, and the life of our founder, Srila Prabhupada. Discover our principles, activities, and what makes our temple a spiritual haven in Lucknow.",
  keywords: ['ISKCON Lucknow history', 'Srila Prabhupada', 'Aparimay Shyam Das', 'temple construction', 'Vedic architecture', 'Prabhupad Youth Army', 'Iskcon Girls Forum', 'Prahalad Sanskar Shala', 'Congregation Classes', 'Gaudiya Vaishnavism', 'Bhagavad Gita', 'Srimad Bhagavatam', 'Bhakti Yoga', 'Kirtan', 'Darshan', 'Prasadam'],
};

export default function AboutPage() {
  const exterior = PlaceHolderImages.find(img => img.id === 'temple-exterior');
  const founder = PlaceHolderImages.find(img => img.id === 'srila-prabhupada-about');
  const president = PlaceHolderImages.find(img => img.id === 'temple-president');

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Founder Acharya Spotlight */}
        <div className="mb-32">
          <Card className="rounded-[3rem] overflow-hidden border-primary/20 bg-card shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                {founder?.imageUrl ? (
                  <Image
                    src={founder.imageUrl}
                    alt="Srila Prabhupada"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <User className="w-32 h-32 text-muted-foreground/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
              </div>
              <div className="p-12 md:p-16 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                  <Star className="w-3.5 h-3.5 fill-primary" /> Founder Acharya
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-2">Srila Prabhupada</h2>
                  <p className="text-xl text-accent font-bold">His Divine Grace A.C. Bhaktivedanta Srila Prabhupada</p>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  Founder-Acharya of the International Society for Krishna Consciousness
                </p>
                <div className="pt-4">
                  <Link href="/srila-prabhupada">
                    <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-accent rounded-full px-8 flex items-center gap-2">
                      Know More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Principles and Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {/* Four Principles */}
          <Card className="rounded-3xl border-border bg-card shadow-sm">
            <CardHeader className="p-10 border-b border-border bg-primary/5">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-headline">Four Principles</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { num: "1", title: "Mercy", desc: "No meat eating" },
                  { num: "2", title: "Cleanliness", desc: "No illicit sex" },
                  { num: "3", title: "Austerity", desc: "No gambling" },
                  { num: "4", title: "Truthfulness", desc: "No intoxication" }
                ].map((p, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {p.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{p.title}</h4>
                      <p className="text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Temple Activities */}
          <Card className="rounded-3xl border-border bg-card shadow-sm">
            <CardHeader className="p-10 border-b border-border bg-accent/5">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
                <CardTitle className="text-3xl font-headline">Temple Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <ul className="space-y-4">
                {[
                  "Daily Worship & Aartis",
                  "Bhagavad Gita Classes",
                  "Sunday Feast Programs",
                  "Youth Programs & Camps",
                  "Food Distribution (Prasadam)",
                  "Festival Celebrations",
                  "Cultural Performances"
                ].map((activity, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {activity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Our History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" /> Our History
            </div>
            <h1 className="text-5xl font-headline font-bold text-foreground">A Legacy of Devotion</h1>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The International Society for Krishna Consciousness (ISKCON) was established in 1966 by His Divine Grace A.C. Bhaktivedanta Srila Prabhupada. The ISKCON Lucknow temple was established in the early 1990s and has since grown to become one of the prominent spiritual centers in the city.
              </p>
              <p>
                The temple is dedicated to Lord Krishna and Srimati Radharani, known as Sri Sri Radha Krishna. The temple follows the Vaishnava tradition, one of the major Hindu denominations, which worships Vishnu or Krishna as the Supreme Lord.
              </p>
              <p>
                Over the years, ISKCON Lucknow has expanded its services and outreach programs, serving the community through various spiritual and charitable activities.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-border bg-muted">
            {exterior?.imageUrl && (
              <Image
                src={exterior.imageUrl}
                alt="ISKCON Lucknow Temple History"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-secondary/20 rounded-[3rem] p-12 md:p-20 border border-border mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Target className="w-3.5 h-3.5" /> Our Mission
            </div>
            <h2 className="text-4xl font-headline font-bold text-foreground mb-6">Promoting Universal Well-being</h2>
            <p className="text-muted-foreground">
              ISKCON Lucknow's mission is to promote the well-being of society by teaching the science of Krishna consciousness according to Bhagavad-gita and other ancient scriptures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, text: 'Systematically propagate spiritual knowledge to society at large' },
              { icon: Heart, text: 'Bring members closer together for teaching a simpler and more natural way of life' },
              { icon: BookOpen, text: 'Educate people in spiritual techniques to check the imbalance of values' },
              { icon: Smile, text: 'Propagate consciousness of Krishna as revealed in Bhagavad-gita and Srimad Bhagavatam' }
            ].map((item, idx) => (
              <div key={idx} className="bg-background p-8 rounded-2xl border border-border flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium leading-relaxed text-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Temple President Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-md mx-auto rounded-[2rem] overflow-hidden border border-border shadow-xl bg-muted flex items-center justify-center">
            {president?.imageUrl ? (
              <Image
                src={president.imageUrl}
                alt="H.G Aparimay Shyam Das"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <User className="w-32 h-32 text-muted-foreground/20" />
            )}
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <User className="w-3.5 h-3.5" /> Temple President
            </div>
            <h2 className="text-4xl font-headline font-bold text-foreground">H.G Aparimay Shyam Das</h2>
            <p className="text-accent font-bold uppercase tracking-widest text-sm">Spiritual Leader and Temple President</p>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                H.G Aparimay Shyam Das has been guiding the ISKCON Lucknow temple since 2017, bringing decades of spiritual experience and dedication to the community. His leadership focuses on spreading the message of Krishna consciousness, promoting spiritual education, and serving the local community.
              </p>
              <p>
                Under his guidance, the temple has expanded its outreach programs, conducted numerous spiritual workshops, and maintained a vibrant cultural and spiritual environment.
              </p>
            </div>
          </div>
        </div>

        {/* Construction & Architecture */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="rounded-3xl overflow-hidden border-border bg-card">
            <CardHeader className="bg-primary/5 border-b border-border p-10">
              <div className="flex items-center gap-4">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-3xl font-headline">Temple Construction</CardTitle>
                  <p className="text-sm text-muted-foreground">Sacred Architecture (2004 - 2028)</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-widest">Design Elements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Traditional shikhara reaching 75 feet high</li>
                    <li>• Makrana marble work from Uttar Pradesh</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-widest">Construction Phases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Foundation ceremony: 2004</li>
                    <li>• Grand opening: 2027 (expected)</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                The temple stands as a testament to devotional service, built with contributions from thousands of devotees worldwide. The main prayer hall can accommodate over 500 devotees at once.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl overflow-hidden border-border bg-card">
            <CardHeader className="bg-accent/5 border-b border-border p-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-headline">Temple Architecture</CardTitle>
                  <p className="text-sm text-muted-foreground">A Bridge Between Worlds</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The ISKCON Lucknow temple is a beautiful example of traditional Vedic architecture blended with modern construction techniques. The design represents the spiritual cosmos, with its spires reaching toward the heavens.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The temple features intricate carvings, vibrant paintings depicting scenes from Krishna's pastimes, and ornate altars that house the deities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Programs for All Section */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold">Programs for All</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a variety of spiritual, educational, and social programs catering to people of all ages and backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Programs for Men */}
            <Card className="rounded-2xl border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-3 text-xl font-headline">
                  <Users className="w-6 h-6 text-primary" /> Men: Prabhupad Youth Army
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Bhagavad Gita Study Circle</h4>
                    <p className="text-xs text-muted-foreground">Weekly classes exploring profound teachings and responsibilities of men.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Kirtan Group</h4>
                    <p className="text-xs text-muted-foreground">Weekly gathering to chant and learn traditional musical instruments.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Men's Fellowship</h4>
                    <p className="text-xs text-muted-foreground">Monthly gatherings for spiritual discussions and building brotherhood.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Programs for Women */}
            <Card className="rounded-2xl border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-3 text-xl font-headline">
                  <Heart className="w-6 h-6 text-accent" /> Women: Iskcon Girls Forum
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Srimad Bhagavatam Classes</h4>
                    <p className="text-xs text-muted-foreground">Special classes focusing on exemplary women in Vedic scriptures.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Prasadam Cooking Classes</h4>
                    <p className="text-xs text-muted-foreground">Learn to prepare traditional Vaishnava cuisine offered to Lord Krishna.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Tulasi Care & Deity Worship</h4>
                    <p className="text-xs text-muted-foreground">Hands-on training in caring for sacred Tulasi plants and dress-making.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Programs for Children */}
            <Card className="rounded-2xl border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-3 text-xl font-headline">
                  <Baby className="w-6 h-6 text-primary" /> Children: Prahalad Sanskar Shala
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Bal Gopal Classes</h4>
                    <p className="text-xs text-muted-foreground">Age-appropriate spiritual education through stories and games.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Children's Kirtan</h4>
                    <p className="text-xs text-muted-foreground">Special sessions for children to learn bhajans and dancing.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Summer Camps</h4>
                    <p className="text-xs text-muted-foreground">Annual residential camps featuring spiritual activities and arts.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Programs for Couples */}
            <Card className="rounded-2xl border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-3 text-xl font-headline">
                  <Users className="w-6 h-6 text-accent" /> Couples: Congregation Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Couple's Spiritual Study Circle</h4>
                    <p className="text-xs text-muted-foreground">Exploring Vedic teachings on marriage and spiritual partnership.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Joint Kirtan & Devotional Sessions</h4>
                    <p className="text-xs text-muted-foreground">Worship together to create a harmonious spiritual atmosphere.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Couples Prasadam Preparation</h4>
                    <p className="text-xs text-muted-foreground">Strengthening bonds through joint service and spiritual practice.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="bg-secondary/10 rounded-[3rem] p-12 md:p-20 border border-border">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-4">Facilities Available</h2>
            <p className="text-muted-foreground">Amenities for a pleasant and spiritually enriching experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: 'Guest House', desc: 'Comfortable accommodation at nominal charges. Advanced booking recommended.' },
              { icon: Utensils, title: "Govinda's Restaurant", desc: 'Pure vegetarian prasadam daily. Open from 11 AM - 9 PM.' },
              { icon: ShoppingBag, title: 'Gift Shop', desc: 'Spiritual items, founders, books, devotional accessories, and clothing.' },
              { icon: Heart, title: 'Prasadam Hall', desc: 'Free prasadam distribution, especially during Sunday feasts.' }
            ].map((facility, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <facility.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">{facility.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{facility.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-12 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground italic">
              Note: All facilities are available during temple opening hours. For special assistance, please contact the temple administration office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
