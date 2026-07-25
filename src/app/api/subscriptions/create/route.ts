import { NextRequest, NextResponse } from 'next/server';
import { createSubscription, createPaymentPlan } from '@/lib/razorpay';

const intervalMap = {
  monthly: { period: 'monthly', interval: 1, period_count: 12, total_count: 12 },
  quarterly: { period: 'monthly', interval: 3, period_count: 4, total_count: 4 },
  yearly: { period: 'yearly', interval: 1, period_count: 1, total_count: 1 },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan_id, amount, duration = 'monthly', notes, total_count, start_at, email, contact } = body;

    if (!plan_id && (!amount || Number(amount) <= 0)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: plan_id or valid amount' },
        { status: 400 }
      );
    }

    let selectedPlanId = plan_id;

    if (!selectedPlanId) {
      const intervalConfig = intervalMap[duration as keyof typeof intervalMap] || intervalMap.monthly;
      const plan = await createPaymentPlan({
        period: intervalConfig.period as 'daily' | 'weekly' | 'monthly' | 'yearly',
        interval: intervalConfig.interval,
        item: {
          name: `Recurring Donation (${duration})`,
          amount: Number(amount) * 100,
          currency: 'INR',
          description: `Recurring ${duration} donation`,
        },
        notes: {
          source: 'website',
          donation_type: duration,
          ...(notes || {}),
        },
      });
      selectedPlanId = plan.id;
    }

    const subscriptionPayload: Record<string, unknown> = {
      plan_id: selectedPlanId,
      customer_notify: 1,
      total_count: typeof total_count === 'number' && total_count > 0 ? total_count : intervalMap[duration as keyof typeof intervalMap]?.total_count ?? 12,
      notes: {
        source: 'website',
        donation_type: duration,
        amount: String(amount || 0),
        ...(notes || {}),
      },
    };

    if (start_at && typeof start_at === 'number') {
      subscriptionPayload.start_at = start_at;
    }

    if (email || contact) {
      const customer = await createCustomer({
        name: email ? email.split('@')[0] : 'Donor',
        email: email || '',
        contact: contact || '',
        notes: {
          source: 'website',
          ...(notes || {}),
        },
      });
      subscriptionPayload.customer_id = customer.id;
    }

    const subscription = await createSubscription(subscriptionPayload);

    return NextResponse.json({ success: true, subscription }, { status: 200 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create subscription',
      },
      { status: 500 }
    );
  }
}
