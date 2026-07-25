import { NextRequest, NextResponse } from 'next/server';
import { resumeSubscription } from '@/lib/razorpay';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subscription = await resumeSubscription(id);

    return NextResponse.json({ success: true, subscription }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to resume subscription' },
      { status: 500 }
    );
  }
}
