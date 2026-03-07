
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

const faqSections = [
  {
    title: 'About the Temple',
    items: [
      {
        q: 'What is ISKCON?',
        a: 'ISKCON (International Society for Krishna Consciousness) is a spiritual organization founded by His Divine Grace A.C. Bhaktivedanta Srila Prabhupada in 1966. It is commonly known as the Hare Krishna movement and is based on ancient Vedic scriptures, particularly the Bhagavad-gita and Srimad-Bhagavatam.'
      },
      {
        q: 'When was the Lucknow temple established?',
        a: 'The ISKCON Lucknow temple was established in 1982 and has since been serving the spiritual needs of devotees and visitors in Lucknow and surrounding areas.'
      },
      {
        q: 'Who are the deities in the temple?',
        a: 'The main deities in the temple are Sri Sri Radha Krishna. The temple also has deities of Lord Jagannath, Baladeva, and Subhadra, as well as Gaura-Nitai (Lord Chaitanya and Lord Nityananda).'
      }
    ]
  },
  {
    title: 'Visiting the Temple',
    items: [
      {
        q: 'What are the temple visiting hours?',
        a: 'The temple is open daily from 4:30 AM to 12:30 PM and 4:00 PM to 9:00 PM. The temple is closed in the afternoon from 12:30 PM to 4:00 PM.'
      },
      {
        q: 'Is there a dress code for visiting the temple?',
        a: 'Yes, modest dress is required. Men should wear pants (no shorts) and shirts that cover the shoulders. Women should wear sarees, salwar kameez, long skirts, or modest western attire that covers shoulders and legs.'
      },
      {
        q: 'Can I take photographs inside the temple?',
        a: 'Photography is generally allowed in most areas of the temple, but flash photography is prohibited in front of the deities. In some special ceremonies, photography may be restricted. Please check with the temple authorities when you visit.'
      },
      {
        q: 'Can I bring outside food to the temple?',
        a: 'Outside food is generally not allowed inside the temple hall. The temple offers prasadam (sanctified food) to all visitors, especially during special programs and on Sundays.'
      }
    ]
  },
  {
    title: 'Programs & Services',
    items: [
      {
        q: 'What is the Sunday Feast program?',
        a: 'The Sunday Feast is a special program held every Sunday from 5:30 PM to 8:30 PM. It includes kirtan (devotional singing), a spiritual discourse, and a free vegetarian feast (prasadam). Everyone is welcome to attend.'
      },
      {
        q: 'Does the temple offer accommodations for visitors?',
        a: 'The temple has limited guest accommodations for devotees and spiritual seekers. Please contact the temple administration in advance to check availability and make a reservation.'
      },
      {
        q: 'Are there any yoga classes at the temple?',
        a: 'Yes, the temple offers Bhakti Yoga classes regularly. These classes focus on spiritual practices, mantra meditation, and the philosophy of Bhagavad-gita. Check the temple schedule for timings.'
      }
    ]
  },
  {
    title: 'Donations & Volunteering',
    items: [
      {
        q: 'How can I donate to the temple?',
        a: 'You can donate to the temple through our website\'s donation page, by direct bank transfer, or in person at the temple. All donations are used for temple maintenance, deity worship, prasadam distribution, and community services.'
      },
      {
        q: 'Are donations tax-deductible?',
        a: 'Yes, donations to ISKCON Lucknow are eligible for tax benefits under Section 80G of the Income Tax Act. We provide receipts for all donations.'
      },
      {
        q: 'How can I volunteer at the temple?',
        a: 'We welcome volunteers for various services. You can help with cooking, cleaning, gardening, book distribution, festival organization, and more. Please visit our temple office or contact us through the website to sign up as a volunteer.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">Common Queries</span>
          <h1 className="text-5xl font-headline font-bold text-foreground">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're Here to Help. Browse through these frequently asked questions. If you don't find what you're looking for, please feel free to contact us.
          </p>
        </div>

        <div className="space-y-16">
          {faqSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-primary border-b border-primary/10 pb-2">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {section.items.map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${sectionIdx}-${idx}`}
                    className="border border-border bg-card rounded-xl px-6 py-1 data-[state=open]:border-primary/50 transition-colors shadow-sm"
                  >
                    <AccordionTrigger className="text-lg font-headline font-bold text-left hover:text-primary transition-colors hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-primary/5 border border-primary/10 rounded-[2rem] text-center shadow-inner">
          <p className="text-muted-foreground text-lg">
            Still have questions? Feel free to <a href="/contact" className="text-primary font-bold hover:underline">contact us</a> directly or call our helpdesk.
          </p>
        </div>
      </div>
    </div>
  );
}
