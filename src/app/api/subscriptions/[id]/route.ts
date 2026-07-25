import { NextRequest, NextResponse } from 'next/server';
import { getSubscription } from '@/lib/razorpay';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subscription = await getSubscription(id);

    return NextResponse.json({ success: true, subscription }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch subscription',
      },
      { status: 500 }
    );
  }
}
