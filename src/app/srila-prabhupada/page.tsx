
import {BookOpen, Star, Heart, Anchor, MapPin, GraduationCap, Globe, Quote, PenTool, Ship} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';

export default function SrilaPrabhupadaPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-primary" /> Founder Acharya
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground">Srila Prabhupada</h1>
          <p className="text-2xl text-accent font-bold">His Divine Grace A.C. Bhaktivedanta Srila Prabhupada</p>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Lead Quote/Intro */}
        <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-8 mb-20">
          <div className="bg-secondary/30 p-10 rounded-3xl border-l-8 border-primary italic relative">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10" />
            <p className="text-xl font-medium text-foreground mb-4">
              "A.C. Bhaktivedanta Srila Prabhupada, a glorious spiritual master, at the age of 69, changed people’s minds with Love, reverence, and unfathomable dedication, setting a new record in the world and showcasing Indian civilization in front of everyone in every corner of the world."
            </p>
          </div>
        </div>

        {/* The Journey Section */}
        <section className="mb-20 space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Journey from Devotion to Establishing ISKCON</h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              India has been the land of sages for millions of years. Thousands of saints have irrigated this land with their knowledge. This Vedic culture is considered to be the biggest heritage in the world. But in the period under the rule of the invaders, this precious culture has declined.
            </p>
            <p>
              Due to this decline, there has also been a violation of the ethics of the saints and the faith in the religion among the common people has also reduced. At such a time, a saint was born in the world to disseminate the message of Supreme Lord Sri Krishna to the people. A saint who in his last stage of life spread the knowledge of Sanatan Dharma to the entire world while facing difficulties at the personal level.
            </p>
          </div>
        </section>

        {/* Global Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="rounded-2xl border-border bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline font-bold">Global Fame</h3>
              <p className="text-muted-foreground leading-relaxed">
                Several saints of India became famous across the globe. But Srila Prabhupada has become such a sage who made Bhakti, spirituality accessible and easy for all beings.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-headline font-bold">Worldwide Devotion</h3>
              <p className="text-muted-foreground leading-relaxed">
                Today, there is no corner left in the world where there is no Lord Krishna devotee. Whether it is America, Europe, Arab countries, China, or Japan, Lord Jagannath Rath Yatra is organized.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Meeting the Spiritual Master */}
        <section className="mb-20 space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Meeting His Spiritual Master</h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Born in 1896 in Calcutta, HDG Prabhupada met his spiritual master Srila Bhaktisiddhanta Sarasvati Goswami Prabhupada in 1922. Srila Bhaktisiddhanta liked this newly educated young man and convinced him to dedicate his life to teaching Vedic knowledge to the western world.
            </p>
            <p>
              In their first meeting, Srila Bhakti Siddhanta Sarasvati Thakur requested Srila Prabhupada to propagate Vedic knowledge in the English language. In 1944 he started the English magazine "Back to Godhead" without any help.
            </p>
          </div>
        </section>

        {/* Vrindavan Years */}
        <section className="mb-20 space-y-8 bg-secondary/20 p-10 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-6">
            <PenTool className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-headline font-bold">The Vrindavan Years</h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Srila Prabhupada resided at the historic medieval temple of Sri Sri Radha-Damodar. There, he spent most of his time in deep studies and writings. He accepted sannyasa in 1959.
            </p>
            <p>
              He began his life's masterpiece—the English translation of the 18,000-verse Srimad Bhagavata Purana—and authored "Easy Journey to Other Planets."
            </p>
          </div>
        </section>

        {/* Journey to the USA */}
        <section className="mb-20 space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <Ship className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Journey to the USA</h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              At the age of 69, in 1965, he traveled to the United States on a cargo ship named Jaladuta. He endured two heart attacks during the 37-day arduous journey, yet his determination remained firm.
            </p>
            <div className="bg-white border border-border p-8 rounded-2xl italic shadow-sm">
              <p>
                "Oh Krishna, I do not know what is in your mind... but I am so sure that if you have sent me there must be a plan and I am ready to fulfill your every objective like a puppet. Make me dance the way you want me to dance."
              </p>
            </div>
          </div>
        </section>

        {/* Foundation & Academics */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Anchor className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-headline font-bold">Foundation of ISKCON</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In July 1966, he founded ISKCON. Over the next decade, it expanded into a worldwide association of 108 temples, ashrams, schools, and agricultural communities.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-headline font-bold">Academic Contribution</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              He established the Bhaktivedanta Book Trust (BBT) in 1972, which became the world’s largest publisher of Vedic literature, with translations in over 80 languages.
            </p>
          </div>
        </section>

        {/* Global Travel Summary */}
        <section className="mb-20 text-center space-y-6 border-t border-border pt-16">
          <h2 className="text-3xl font-headline font-bold">Imparting Vedic Philosophy Across the Globe</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            In just one decade, despite his old age, Srila Prabhupada traveled around the world 14 times, meeting world leaders and imparting Vedic knowledge. He left behind a literal library of spiritual philosophy that continues to guide millions today.
          </p>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-8"></div>
        </section>
      </div>
    </div>
  );
}
