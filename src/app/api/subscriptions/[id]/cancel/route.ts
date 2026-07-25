import { NextRequest, NextResponse } from 'next/server';
import { cancelSubscription } from '@/lib/razorpay';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const subscription = await cancelSubscription(id, body.reason, body.notes);

    return NextResponse.json({ success: true, subscription }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
