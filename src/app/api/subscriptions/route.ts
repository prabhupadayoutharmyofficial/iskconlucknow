import { NextRequest, NextResponse } from 'next/server';
import { listSubscriptions } from '@/lib/razorpay';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get('count') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');
    const status = searchParams.get('status') || undefined;

    const subscriptions = await listSubscriptions({ count, skip, status });

    return NextResponse.json({ success: true, subscriptions }, { status: 200 });
  } catch (error) {
    console.error('Error listing subscriptions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to list subscriptions',
      },
      { status: 500 }
    );
  }
}
