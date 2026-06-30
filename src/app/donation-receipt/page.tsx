'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Download,
  Home,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ReceiptData {
  paymentId: string;
  title: string;
  amount: string;
  date: string;
}

export default function DonationReceiptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentId = searchParams.get('paymentId');
    const title = searchParams.get('title');
    const amount = searchParams.get('amount');
    const date = searchParams.get('date');

    if (paymentId && title && amount && date) {
      setReceiptData({
        paymentId,
        title,
        amount,
        date,
      });
    } else {
      // Try to get from localStorage if URL params are not available
      const savedData = localStorage.getItem('donationReceiptData');
      if (savedData) {
        try {
          setReceiptData(JSON.parse(savedData));
        } catch (error) {
          console.error('Failed to parse saved receipt data', error);
        }
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  const handleDownload = () => {
    const element = document.getElementById('receipt-content');
    if (!element) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Donation Receipt - ISKCON Lucknow</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                margin: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 20px;
              }
              .header h1 {
                margin: 10px 0;
                font-size: 24px;
              }
              .header p {
                margin: 5px 0;
                font-size: 12px;
                color: #666;
              }
              .content {
                max-width: 600px;
                margin: 0 auto;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .detail-row span:first-child {
                font-weight: 600;
                color: #374151;
              }
              .detail-row span:last-child {
                text-align: right;
                word-break: break-all;
              }
              .status {
                display: inline-block;
                background-color: #dcfce7;
                color: #15803d;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 15px;
                margin-bottom: 15px;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                text-align: center;
                font-size: 12px;
                color: #666;
              }
              .footer p {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Donation Receipt</h1>
              <p>International Society for Krishna Consciousness</p>
              <p>ISKCON Lucknow</p>
            </div>
            <div class="content">
              <div class="status">✓ Payment Received</div>
              <div class="detail-row">
                <span>Donation Type:</span>
                <span>${receiptData?.title || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span>Amount:</span>
                <span>${receiptData?.amount || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span>Payment ID:</span>
                <span>${receiptData?.paymentId || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span>Date & Time:</span>
                <span>${receiptData?.date || 'N/A'}</span>
              </div>
              <div class="footer">
                <p>Thank you for your generous donation!</p>
                <p>Your contribution helps us serve the community better.</p>
                <p>For inquiries, contact us at iskconlucknow108@gmail.com</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!receiptData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-headline font-bold mb-4 text-foreground">Receipt Not Found</h1>
          <p className="text-muted-foreground mb-8">
            No donation receipt data available. Please complete a donation to view your receipt.
          </p>
          <Button
            onClick={() => router.push('/donate')}
            className="bg-primary text-primary-foreground font-bold hover:bg-accent rounded-xl"
          >
            Go to Donate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
            <Image
              src="https://res.cloudinary.com/dguhsmyrh/image/upload/v1772872478/iskcon_lucknow_rdmlcf.png"
              alt="ISKCON Lucknow Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-2">
            Donation Receipt
          </h1>
          <p className="text-muted-foreground">
            International Society for Krishna Consciousness
          </p>
        </div>

        {/* Receipt Card */}
        <Card id="receipt-content" className="border-2 border-border bg-background shadow-lg mb-8">
          <CardContent className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Receipt for
                </p>
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground mt-1">
                  {receiptData.title}
                </h2>
              </div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <div className="text-2xl">✓</div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mb-8 inline-block">
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                ✓ Payment Received
              </span>
            </div>

            {/* Receipt Details */}
            <div className="space-y-4 mb-8 border-t border-border pt-6">
              <div className="flex justify-between items-start">
                <span className="font-medium text-foreground">Donation Amount</span>
                <span className="text-lg font-bold text-primary text-right">{receiptData.amount}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-foreground">Payment ID</span>
                <span className="font-mono text-sm text-muted-foreground text-right max-w-xs break-all">
                  {receiptData.paymentId}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-foreground">Date & Time</span>
                <span className="text-muted-foreground text-right">{receiptData.date}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-foreground">Organization</span>
                <span className="text-muted-foreground text-right">ISKCON Lucknow</span>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-center">
              <p className="text-blue-900 dark:text-blue-100 font-medium">
                Thank you for your generous contribution to ISKCON Lucknow!
              </p>
              <p className="text-blue-700 dark:text-blue-200 text-sm mt-2">
                Your donation helps us serve the community and spread the message of Krishna consciousness.
              </p>
            </div>

            {/* Action Button */}
            <div className="mb-8">
              <Button
                onClick={handleDownload}
                className="w-full bg-primary text-primary-foreground font-bold hover:bg-accent rounded-lg h-11 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>

            <Button
              onClick={() => router.push('/donate')}
              variant="outline"
              className="w-full font-bold rounded-lg h-11"
            >
              Back to Donate
            </Button>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-secondary/20 border-border">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-lg font-headline font-bold text-foreground mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground">iskconlucknow108@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Call / WhatsApp</p>
                  <p className="text-muted-foreground">+91-73100-80798</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Available</p>
                  <p className="text-muted-foreground">Monday to Saturday, 9:00 AM to 6:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
