'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Home, Utensils, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Web3Forms access key is missing in .env file.",
      });
      setIsSubmitting(false);
      return;
    }

    formData.append("access_key", accessKey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We will get back to you shortly.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-accent font-bold uppercase tracking-widest text-sm">Reach Out</span>
              <h1 className="text-5xl font-headline font-bold text-foreground">Get in Touch</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Have a question about our programs, or want to volunteer? We'd love to hear from you. Reach out to our specific departments for better assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 bg-card border border-border rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl">Temple President Office</h3>
                <p className="text-muted-foreground text-sm font-medium">+91-73100-80798</p>
              </div>

              <div className="space-y-4 p-6 bg-card border border-border rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl">General Admin</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  +91-73555-60450<br />
                  +91-96620-29320<br />
                  +91-90262-96062
                </p>
              </div>

              <div className="space-y-4 p-6 bg-card border border-border rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl">Govinda Restaurant</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  +91-95175-55471<br />
                  +91-75180-22202
                </p>
              </div>

              <div className="space-y-4 p-6 bg-card border border-border rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl">Guest House</h3>
                <p className="text-muted-foreground text-sm font-medium">+91-75180-22202</p>
              </div>

              <div className="space-y-4 p-6 bg-card border border-border rounded-2xl md:col-span-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl">Email Us</h3>
                <p className="text-muted-foreground text-sm font-medium break-all">iskconlucknow108@gmail.com</p>
              </div>

              <div className="space-y-4 p-6 bg-card border border-border rounded-2xl md:col-span-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-xl">Temple Address</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Sector-B, Ansal Golf City, Amar Shaheed Path, Lucknow 226030</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-headline font-bold mb-6">Send a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" name="first_name" required placeholder="Your Name" className="bg-secondary/20 border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" name="last_name" required placeholder="Your Surname" className="bg-secondary/20 border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" required placeholder="email@example.com" className="bg-secondary/20 border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required placeholder="What is this regarding?" className="bg-secondary/20 border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required placeholder="How can we help you?" className="min-h-[150px] bg-secondary/20 border-border" />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-bold hover:bg-accent h-14 rounded-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
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
    </div>
  );
}