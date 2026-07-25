import { NextRequest, NextResponse } from 'next/server';
import { pauseSubscription } from '@/lib/razorpay';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const subscription = await pauseSubscription(id, body.reason);

    return NextResponse.json({ success: true, subscription }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to pause subscription' },
      { status: 500 }
    );
  }
}
