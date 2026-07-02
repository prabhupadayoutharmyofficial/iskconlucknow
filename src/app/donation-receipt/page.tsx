import { Suspense } from 'react';
import DonationReceiptClient from './DonationReceiptClient';

export default function DonationReceiptPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="text-center text-muted-foreground">Loading receipt...</div></div>}>
      <DonationReceiptClient />
    </Suspense>
  );
}
