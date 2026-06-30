'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Utensils,
  Sparkles,
  Star,
  Award,
  Crown,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RecurringDonation {
  amount: number;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

export default function RecurringDonationCarousel() {
  const { toast } = useToast();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load Razorpay. Please refresh the page.",
      });
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [toast, isHydrated]);

  const recurringDonations: RecurringDonation[] = [
    { amount: 21, label: 'Daily Seva', icon: Heart },
    { amount: 51, label: 'Bhakti Support', icon: Heart },
    { amount: 101, label: 'Gita Seva', icon: Sparkles },
    { amount: 151, label: 'Annadan Support', icon: Utensils },
    { amount: 201, label: 'Temple Support', icon: Star },
    { amount: 251, label: 'Festival Support', icon: Sparkles },
    { amount: 501, label: 'Most Popular', icon: Award, badge: 'POPULAR' },
    { amount: 1001, label: 'Recommended', icon: Crown, badge: 'RECOMMENDED' },
    { amount: 5001, label: 'Patron Seva', icon: Crown, badge: 'PATRON' },
  ];

  const handleRecurringDonation = (amount: number) => {
    if (!razorpayLoaded) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Razorpay is not loaded yet. Please try again.",
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Razorpay key is not configured.",
      });
      return;
    }

    setPendingAmount(amount);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsSubmit = () => {
    if (!userDetails.name.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your name.",
      });
      return;
    }

    if (!userDetails.email.trim() || !userDetails.email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!userDetails.phone.trim() || userDetails.phone.length < 10) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid phone number.",
      });
      return;
    }

    setIsDetailsModalOpen(false);
    if (pendingAmount) {
      setIsProcessing(true);
      initiateRecurringPayment(pendingAmount);
    }
  };

  const initiateRecurringPayment = (amount: number) => {
    const amountInPaise = amount * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      name: 'ISKCON Lucknow',
      description: `Monthly Recurring Donation - ₹${amount}`,
      image: 'https://res.cloudinary.com/dguhsmyrh/image/upload/v1772872478/iskcon_lucknow_rdmlcf.png',
      recurring: 'true',
      type: 'emandate',
      expire_by: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year expiry
      max_amount: amountInPaise * 12, // Max 12 months of donations
      bank_account: {
        beneficiary_name: 'ISKCON PROJECT',
        account_number: '50278005410',
        account_type: 'savings',
        ifsc_code: 'IDIB000A532',
      },
      customer_notify: 1,
      notes: {
        recurring_donation: `Monthly - ₹${amount}`,
        donation_type: 'Monthly Recurring',
        donor_name: userDetails.name,
        donor_email: userDetails.email,
        donor_phone: userDetails.phone,
      },
      prefill: {
        email: userDetails.email,
        contact: userDetails.phone,
      },
      handler: function (response: any) {
        console.log('E-Mandate Success:', response);
        handleRecurringSuccess(response, amount);
      },
      modal: {
        ondismiss: function() {
          console.log('E-Mandate modal dismissed');
          setIsProcessing(false);
          toast({
            title: "Subscription Cancelled",
            description: "You cancelled the monthly subscription setup.",
          });
        }
      },
      theme: {
        color: '#FF6B35',
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
      });
    }
  };

  const handleRecurringSuccess = (response: any, amount: number) => {
    setIsProcessing(false);
    
    console.log('Recurring Payment Response:', response);

    toast({
      title: "Subscription Active! 🎉",
      description: `Your monthly recurring donation of ₹${amount} has been set up successfully. Thank you for your continued support!`,
    });

    // Reset state
    setSelectedAmount(null);
    setCustomAmount('');
    setUserDetails({ name: '', email: '', phone: '' });
    setPendingAmount(null);
  };

  const handleCustomRecurring = () => {
    if (!customAmount || parseInt(customAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
      });
      return;
    }

    const amount = parseInt(customAmount);
    setIsCustomModalOpen(false);
    handleRecurringDonation(amount);
  };

  return (
    <div className="py-16 bg-secondary/10 rounded-2xl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">
            Monthly Devotional Support
          </span>
          <h2 className="text-4xl font-headline font-bold text-foreground">
            Lifetime Monthly Recurring Contributions
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Choose a monthly amount to support our temple's spiritual and charitable mission. 
            Your consistent dedication fuels our service to the Divine.
          </p>
        </div>

        {/* Carousel */}
        <div className="px-4 md:px-12 mb-8 pt-6 mt-4">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 pt-6">
              {recurringDonations.map((donation, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="pt-4 pb-2">
                  <div
                    className={`relative h-full cursor-pointer transition-all transform hover:scale-105 ${
                      selectedAmount === donation.amount ? 'scale-105' : ''
                    }`}
                  >
                    <Card
                      className={`bg-card border-2 transition-all h-full flex flex-col shadow-md hover:shadow-lg ${
                        selectedAmount === donation.amount
                          ? 'border-primary shadow-lg shadow-primary/30'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {donation.badge && (
                        <div className="absolute -top-3 -right-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                          {donation.badge}
                        </div>
                      )}
                      <CardHeader className="text-center space-y-4 pt-8 pb-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                          selectedAmount === donation.amount
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-primary group-hover:scale-110'
                        }`}>
                          <donation.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-accent font-bold text-2xl mb-1">
                            ₹{donation.amount}
                          </div>
                          <CardTitle className="text-lg font-headline font-bold">
                            {donation.label}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-center flex-grow flex flex-col px-6 pb-6">
                        <p className="text-muted-foreground text-xs mb-6 flex-grow">
                          Monthly recurring donation
                        </p>
                        <Button
                          onClick={() => handleRecurringDonation(donation.amount)}
                          disabled={isProcessing}
                          className={`w-full font-bold rounded-full h-10 transition-all ${
                            selectedAmount === donation.amount
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'bg-primary text-primary-foreground hover:bg-accent'
                          }`}
                        >
                          {isProcessing ? 'Processing...' : 'Set Monthly'}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  </div>
                </CarouselItem>
              ))}

              {/* Custom Amount Card */}
              <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="pt-4 pb-2">
                  <div className="relative h-full cursor-pointer transition-all transform hover:scale-105">
                    <Card className="bg-card border-2 border-dashed border-border hover:border-primary/50 transition-all h-full flex flex-col shadow-md hover:shadow-lg">
                      <CardHeader className="text-center space-y-4 pt-8 pb-4">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                          <DollarSign className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="text-muted-foreground font-bold text-2xl mb-1">
                            Your Choice
                          </div>
                          <CardTitle className="text-lg font-headline font-bold">
                            Custom Amount
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-center flex-grow flex flex-col px-6 pb-6">
                        <p className="text-muted-foreground text-xs mb-6 flex-grow">
                          Choose your custom monthly amount
                        </p>
                        <Button
                          onClick={() => setIsCustomModalOpen(true)}
                          disabled={isProcessing}
                          className="w-full bg-primary text-primary-foreground font-bold hover:bg-accent rounded-full h-10"
                        >
                          Choose Amount
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Info Box */}
        <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">💳 Secure E-Mandate Setup:</span> Your monthly donation is secured through Razorpay's encrypted e-mandate system. 
            You can modify or cancel your subscription anytime without any hassle.
          </p>
        </div>
      </div>

      {/* Custom Amount Modal */}
      <Dialog open={isCustomModalOpen} onOpenChange={setIsCustomModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">Custom Monthly Amount</DialogTitle>
            <DialogDescription>
              Enter your desired monthly donation amount
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="custom-recurring-amount" className="text-base font-semibold">
                Monthly Amount (₹)
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">₹</span>
                <Input
                  id="custom-recurring-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1"
                  className="h-12 text-lg flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum: ₹21 | Recommended: ₹101 or more for better impact
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCustomModalOpen(false)}
                disabled={isProcessing}
                className="flex-1 h-11 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCustomRecurring}
                disabled={isProcessing || !customAmount}
                className="flex-1 h-11 bg-primary text-primary-foreground font-bold hover:bg-accent rounded-lg"
              >
                {isProcessing ? 'Processing...' : 'Continue'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">Your Details</DialogTitle>
            <DialogDescription>
              We need your information to set up your recurring donation of ₹{pendingAmount}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="donor-name" className="text-base font-semibold">
                Full Name
              </Label>
              <Input
                id="donor-name"
                placeholder="Enter your full name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="donor-email" className="text-base font-semibold">
                Email Address
              </Label>
              <Input
                id="donor-email"
                type="email"
                placeholder="Enter your email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="donor-phone" className="text-base font-semibold">
                Phone Number
              </Label>
              <Input
                id="donor-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDetailsModalOpen(false)}
                disabled={isProcessing}
                className="flex-1 h-11 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDetailsSubmit}
                disabled={isProcessing}
                className="flex-1 h-11 bg-primary text-primary-foreground font-bold hover:bg-accent rounded-lg"
              >
                {isProcessing ? 'Processing...' : 'Proceed'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
