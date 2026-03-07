
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const siteUrl = 'https://iskconlucknow.in/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ISKCON Lucknow | Shri Shri Radha Raman Bihar Iskcon Temple',
  description: 'Welcome to the official portal of ISKCON Lucknow. Experience serenity, daily darshan, and spiritual wisdom.',
  keywords: [
    'ISKCON',
    'ISKCON Lucknow',
    'Hare Krishna',
    'Krishna',
    'Radha Raman',
    'Temple',
    'Hindu Temple',
    'Spiritual',
    'Religion',
    'Lucknow',
    'Gaudiya Vaishnavism',
    'Bhagavad Gita',
    'Srimad Bhagavatam',
    'Prabhupada',
    'Bhakti Yoga',
    'Kirtan',
    'Darshan',
    'Prasadam',
    'Govinda',
    'Gopal',
    'Radha',
    'Vrindavan',
    'Spiritual Events Lucknow',
    'Yoga Lucknow',
    'Meditation Lucknow',
  ],
  authors: [{ name: 'ISKCON Lucknow' }],
  creator: 'ISKCON Lucknow',
  publisher: 'ISKCON Lucknow',
  openGraph: {
    title: 'ISKCON Lucknow | Shri Shri Radha Raman Bihar Iskcon Temple',
    description: 'Welcome to the official portal of ISKCON Lucknow. Experience serenity, daily darshan, and spiritual wisdom.',
    url: siteUrl,
    siteName: 'ISKCON Lucknow',
    images: [
      {
        url: `${siteUrl}/iskcon_lucknow_logo.png`,
        width: 800,
        height: 600,
        alt: 'ISKCON Lucknow Temple',
      },
      {
        url: `${siteUrl}/iskcon_lucknow_logo.png`,
        width: 1800,
        height: 1600,
        alt: 'ISKCON Lucknow Temple',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/iskcon_lucknow_logo.png',
    shortcut: '/iskcon_lucknow_logo.png',
    apple: '/iskcon_lucknow_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
