import { NextRequest, NextResponse } from 'next/server';
import { getPaymentPlan } from '@/lib/razorpay';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const plan = await getPaymentPlan(id);

    return NextResponse.json({ success: true, plan }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}
