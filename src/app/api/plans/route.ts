import { NextRequest, NextResponse } from 'next/server';
import { listPaymentPlans, createPaymentPlan } from '@/lib/razorpay';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get('count') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');

    const plans = await listPaymentPlans({ count, skip });

    return NextResponse.json({ success: true, plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to list plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const plan = await createPaymentPlan({
      period: body.period || 'monthly',
      interval: body.interval || 1,
      period_count: body.period_count || 12,
      item: {
        name: body.name || 'Monthly Donation',
        amount: body.amount || 10000,
        currency: body.currency || 'INR',
        description: body.description || 'Recurring donation plan',
      },
      notes: body.notes || {},
    });

    return NextResponse.json({ success: true, plan }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create plan' },
      { status: 500 }
    );
  }
}
