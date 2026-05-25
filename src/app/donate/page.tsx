'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Heart,
  Utensils,
  Home,
  Clock,
  Sparkles,
  Star,
  Award,
  Crown,
  DollarSign,
  QrCode,
  Copy,
  Check,
  Building2,
  Wallet,
  Mail,
  Phone,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonatePage() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [isAnyAmountModalOpen, setIsAnyAmountModalOpen] = useState(false);
  const [selectedSevaType, setSelectedSevaType] = useState('');
  const [anyAmountValue, setAnyAmountValue] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleDonate = (amount: string, title: string) => {
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

    // Parse amount: remove ₹ and commas, convert to number, then to paise
    const cleanAmount = amount.replace('₹', '').replace(/,/g, '').trim();
    let numericAmount: number;
    if (cleanAmount === 'Any Amount') {
      // Open modal for any amount selection
      setIsAnyAmountModalOpen(true);
      setSelectedSevaType('');
      setAnyAmountValue('');
      return;
    } else if (cleanAmount.includes('-')) {
      // For ranges like 11L - 21L, use minimum
      const min = cleanAmount.split('-')[0].replace('L', '00000').trim();
      numericAmount = parseInt(min);
    } else {
      numericAmount = parseInt(cleanAmount);
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "The donation amount is invalid.",
      });
      return;
    }

    const amountInPaise = numericAmount * 100;

    console.log('Amount:', amount, 'Clean:', cleanAmount, 'Numeric:', numericAmount, 'Paise:', amountInPaise);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      name: 'ISKCON Lucknow',
      description: `Donation for ${title}`,
      image: 'https://res.cloudinary.com/dguhsmyrh/image/upload/v1772872478/iskcon_lucknow_rdmlcf.png',
      handler: function (response: any) {
        console.log('Payment success:', response);
        toast({
          title: "Payment Successful!",
          description: `Thank you for your donation. Payment ID: ${response.razorpay_payment_id}`,
        });
        // Here you can send the payment details to your server for verification
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment.",
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
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "Something went wrong with the payment. Please try again.",
      });
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: `UPI ID ${text} copied to clipboard.`,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAnyAmountSubmit = () => {
    if (!selectedSevaType) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a donation type.",
      });
      return;
    }

    if (!anyAmountValue || parseInt(anyAmountValue) <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid amount.",
      });
      return;
    }

    setIsAnyAmountModalOpen(false);
    handleDonate(anyAmountValue, selectedSevaType);
  };

  async function handleReceiptSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    formData.append("subject", "New 80G Receipt Request");

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
          title: "Request Submitted!",
          description: "Your 80G receipt request has been received. We will process it and send it to your email.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || "Failed to submit request");
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

  const sevaOptions = [
    {
      title: 'Gau Seva',
      desc: 'Contribute to the service and protection of cows in our Goshala.',
      icon: Heart,
      amount: '₹ 3,100',
    },
    {
      title: 'Gau Daan',
      desc: 'Perform the sacred act of donating a cow to the temple.',
      icon: Heart,
      amount: '₹ 1,00,000',
    },
    {
      title: 'Rajbhog',
      desc: 'Sponsor the royal mid-day offering for the Deities.',
      icon: Utensils,
      amount: '₹ 51,000',
    },
    {
      title: 'Devotee Prasadam',
      desc: 'Support the distribution of sanctified meals to devotees.',
      icon: Utensils,
      amount: '₹ 11,000',
    },
    {
      title: 'Deity Bhog',
      desc: 'Contribute towards the daily food offerings to the Deities.',
      icon: Utensils,
      amount: '₹ 11,000',
    },
    {
      title: '56 Bhog Sewa',
      desc: 'Sponsor the grand offering of 56 varieties to the Lord.',
      icon: Utensils,
      amount: '₹ 56,000',
    },
    {
      title: 'Whole Day Temple Sewa',
      desc: 'Sponsor all the sewas and offerings in the temple for a full day.',
      icon: Clock,
      amount: '₹ 31,000',
    },
    {
      title: 'Jewellery',
      desc: 'Contribute towards the beautiful ornaments of Sri Sri Radha Raman Bihari.',
      icon: Sparkles,
      amount: '₹ 21,000',
    },
    {
      title: 'Room Donation',
      desc: 'Contribute towards the construction of rooms for pilgrims and devotees.',
      icon: Home,
      amount: '₹ 11L - 21L',
    },
    {
      title: 'Dharm Stamb',
      desc: 'Founder Membership level 1. Support the temple foundation.',
      icon: Star,
      amount: '₹ 5,00,000',
    },
    {
      title: 'Dharm Adhikari',
      desc: 'Premium Founder Membership with significant spiritual contribution.',
      icon: Award,
      amount: '₹ 11,00,000',
    },
    {
      title: 'Shiromani',
      desc: 'Highest level of Founder Membership for elite patrons.',
      icon: Crown,
      amount: '₹ 21,00,000',
    },
    {
      title: 'General Donation',
      desc: 'Support the overall operations and maintenance of the temple.',
      icon: DollarSign,
      amount: 'Any Amount',
    },
  ];

  const upiOptions = [
    {
      id: 'upi-projects',
      title: 'Iskcon Projects',
      label: 'ISKCON PROJECTS QR Code',
      upiId: 'iskconprojects@indianbk',
      desc: 'Support general temple construction and infrastructure projects.',
      qrUrl: 'https://res.cloudinary.com/dguhsmyrh/image/upload/v1772896104/Iskcon_Projects_fvtheo.png'
    },
    {
      id: 'upi-ffl',
      title: 'Food For Life',
      label: 'Prasadam Seva QR Code',
      upiId: 'internationalsocietyforkrishnaconsciousness@icici',
      desc: 'Support our massive food distribution program for the needy.',
      qrUrl: 'https://res.cloudinary.com/dguhsmyrh/image/upload/v1772895765/Food_For_Life_xxovqs.jpg'
    },
    {
      id: 'upi-festivals',
      title: 'Festival Donations',
      label: 'Festival Donations QR Code',
      upiId: 'iskconfestival@indianbk',
      desc: 'Support grand celebrations like Janmashtami, Radhashtami, etc.',
      qrUrl: 'https://res.cloudinary.com/dguhsmyrh/image/upload/v1772896317/Iskcon_Festivals_tbcqzg.png'
    },
    {
      id: 'upi-goshala',
      title: 'Goshala Seva',
      label: 'Goshala Seva QR Code',
      upiId: 'iskcongaushala@indianbk',
      desc: 'Support the care, feeding and protection of cows in our goshala.',
      qrUrl: 'https://res.cloudinary.com/dguhsmyrh/image/upload/v1772896511/Iskcon_Gaushala_gji9t8.png'
    }
  ];

  const bankDetails = [
    {
      title: 'Iskcon Projects',
      accName: 'ISKCON PROJECT',
      accNumber: '50278005410',
      ifsc: 'IDIB000A532',
      branch: 'Indian Bank, Ahimamau',
      desc: 'General temple fund'
    },
    {
      title: 'Food For Life',
      accName: 'INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS (ISKCON)',
      accNumber: '740701000482',
      ifsc: 'ICIC0007407',
      branch: 'ICICI BANK, SUSHANT GOLF CITY',
      desc: 'Support our food distribution program'
    },
    {
      title: 'Festival Donations',
      accName: 'ISKCON FESTIVAL',
      accNumber: '50278006139',
      ifsc: 'IDIB000A532',
      branch: 'Indian Bank, Ahimamau',
      desc: 'Support temple festivals and celebrations'
    },
    {
      title: 'Goshala Seva',
      accName: 'ISKCON GAUSHALA',
      accNumber: '50278006571',
      ifsc: 'IDIB000A532',
      branch: 'Indian Bank, Ahimamau',
      desc: 'Support our cow protection program'
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-accent font-bold uppercase tracking-widest text-sm">
            Support Our Mission
          </span>
          <h1 className="text-5xl font-headline font-bold text-foreground">
            Contribute with Devotion
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your generous contributions help us continue our spiritual and
            charitable activities. Every drop counts in the ocean of service.
          </p>
        </div>

        {/* Seva Carousel */}
        <div className="px-12 mb-32">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {sevaOptions.map((opt, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-all group h-full flex flex-col shadow-sm">
                    <CardHeader className="text-center space-y-4 pt-10">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
                        <opt.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl font-headline font-bold">
                        {opt.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center flex-grow flex flex-col px-8 pb-10">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {opt.desc}
                      </p>
                      <div className="space-y-4">
                        <div className="text-accent font-bold text-xl">
                          {opt.amount}
                        </div>
                       <Button 
                        className="w-full bg-primary text-primary-foreground font-bold hover:bg-accent rounded-full"
                        onClick={() => handleDonate(opt.amount, opt.title)}
                       >
                        Donate Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Custom Donation Section */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-headline font-bold">Custom Donation</CardTitle>
              <p className="text-muted-foreground text-sm">Enter any amount of your choice</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Amount (₹)</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1"
                />
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground font-bold hover:bg-accent rounded-full"
                onClick={() => handleDonate(customAmount, 'Custom Donation')}
                disabled={!customAmount || parseInt(customAmount) <= 0}
              >
                Donate Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold mb-4">Donation Options</h2>
            <p className="text-muted-foreground">Choose your preferred method of contribution</p>
          </div>

          <Tabs defaultValue="upi" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-secondary/40 border border-border p-1 h-14 w-full max-md">
                <TabsTrigger value="upi" className="flex-1 rounded-md text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Wallet className="w-5 h-5 mr-2" /> UPI
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex-1 rounded-md text-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Building2 className="w-5 h-5 mr-2" /> Bank Details
                </TabsTrigger>
              </TabsList>
            </div>

            {/* UPI Tab Content */}
            <TabsContent value="upi">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {upiOptions.map((upi) => (
                  <Card key={upi.id} className="border-border bg-card shadow-sm overflow-hidden flex flex-col">
                    <div className="aspect-square bg-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden border-b border-border">
                      {upi.qrUrl ? (
                        <Image 
                          src={upi.qrUrl} 
                          alt={upi.label} 
                          fill 
                          className="object-contain p-4"
                        />
                      ) : (
                        <>
                          <QrCode className="w-32 h-32 text-muted-foreground/30 mb-4" />
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{upi.label}</p>
                        </>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
                      <div>
                        <h3 className="font-headline font-bold text-lg mb-1">{upi.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{upi.desc}</p>
                      </div>
                      <div className="pt-4 mt-auto">
                        <label className="text-[10px] uppercase font-bold text-accent tracking-widest mb-1 block">UPI ID</label>
                        <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg border border-border group">
                          <span className="text-xs font-mono truncate flex-1">{upi.upiId}</span>
                          <button 
                            onClick={() => copyToClipboard(upi.upiId, upi.id)}
                            className="p-1.5 hover:bg-primary/20 rounded-md transition-colors shrink-0"
                            title="Copy UPI ID"
                          >
                            {copiedId === upi.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-primary" />}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bank Details Tab Content */}
            <TabsContent value="bank">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bankDetails.map((bank, idx) => (
                  <Card key={idx} className="border-border bg-card shadow-sm overflow-hidden border-l-4 border-l-primary">
                    <CardHeader className="bg-primary/5 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl font-headline font-bold text-foreground">{bank.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1 italic">{bank.desc}</p>
                        </div>
                        <div className="relative w-10 h-10 opacity-30">
                          <Image 
                            src="https://res.cloudinary.com/dguhsmyrh/image/upload/v1772872478/iskcon_lucknow_rdmlcf.png" 
                            alt="ISKCON Lucknow Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border pb-2">
                          <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Account Name</span>
                          <span className="font-medium text-foreground">{bank.accName}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border pb-2">
                          <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Account Number</span>
                          <span className="font-mono font-bold text-foreground text-lg tracking-wider">{bank.accNumber}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border pb-2">
                          <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">IFSC Code</span>
                          <span className="font-mono font-bold text-accent text-lg">{bank.ifsc}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Bank & Branch</span>
                          <span className="font-medium text-foreground">{bank.branch}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Request 80G Receipt Section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-secondary/20 p-8 md:p-12 rounded-[2rem] border border-border">
            {/* Information Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-headline font-bold mb-4 text-foreground">Request 80G Receipt</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The receipt can only be requested if the payment has been made. 
                  Please ensure you fill in the transaction ID and the amount paid.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-headline font-bold text-primary">Receipt Information</h3>
                <p className="text-sm text-muted-foreground">
                  To get the receipt of donation made through NEFT, RTGS, IMPS, PayTm, UPI as mentioned above, please share your:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Legal name
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Postal address with pincode
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    PAN (if you need 80G receipt)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Transaction details
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-border/50 space-y-4">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-accent mb-2">For More Information</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="font-medium">Email:</span> 
                      <span className="text-muted-foreground">iskconlucknow108@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="font-medium">Call / WhatsApp:</span> 
                      <span className="text-muted-foreground">+91-73100-80798</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium">Available:</span> 
                      <span className="text-muted-foreground">Monday to Saturday, 9:00 AM to 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <Card className="border-border shadow-lg">
              <CardContent className="p-8 space-y-6">
                <form onSubmit={handleReceiptSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt-name">Full Name</Label>
                    <Input id="receipt-name" name="full_name" required placeholder="Enter your full name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="receipt-email">Email Address</Label>
                      <Input id="receipt-email" name="email" type="email" required placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receipt-phone">Phone Number</Label>
                      <Input id="receipt-phone" name="phone" required placeholder="Enter your phone number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receipt-pan">PAN Number (Optional)</Label>
                    <Input id="receipt-pan" name="pan_number" placeholder="Enter your PAN number" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="receipt-tid">Transaction ID</Label>
                      <Input id="receipt-tid" name="transaction_id" required placeholder="Enter your transaction ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receipt-amount">Amount Paid</Label>
                      <Input id="receipt-amount" name="amount_paid" required placeholder="Enter the amount paid" />
                    </div>
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-bold hover:bg-accent h-12 rounded-xl mt-4"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Any Amount Donation Modal */}
        <Dialog open={isAnyAmountModalOpen} onOpenChange={setIsAnyAmountModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline font-bold">Custom Donation Amount</DialogTitle>
              <DialogDescription>
                Select a donation type and enter your desired amount
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="seva-type" className="text-base font-semibold">Donation Type</Label>
                <Textarea
                  id="seva-type"
                  placeholder="Enter the type of donation or seva"
                  value={selectedSevaType}
                  onChange={(e) => setSelectedSevaType(e.target.value)}
                  className="h-20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="any-amount-input" className="text-base font-semibold">Enter Amount (₹)</Label>
                <Input
                  id="any-amount-input"
                  type="number"
                  placeholder="Enter your donation amount"
                  value={anyAmountValue}
                  onChange={(e) => setAnyAmountValue(e.target.value)}
                  min="1"
                  className="h-12 text-lg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAnyAmountModalOpen(false)}
                  className="flex-1 h-11 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAnyAmountSubmit}
                  className="flex-1 h-11 bg-primary text-primary-foreground font-bold hover:bg-accent rounded-lg"
                >
                  Donate Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
