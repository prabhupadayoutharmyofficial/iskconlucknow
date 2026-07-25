import crypto from 'crypto';

const RAZORPAY_BASE_URL = 'https://api.razorpay.com/v1';
const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
const RAZORPAY_API_SECRET = process.env.RAZORPAY_API_SECRET || '';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

if (!RAZORPAY_API_KEY || !RAZORPAY_API_SECRET) {
  console.warn('Razorpay API credentials are not fully configured.');
}

async function razorpayRequest<T>(path: string, options: {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT';
  body?: Record<string, unknown>;
  params?: Record<string, string | number | undefined>;
} = {}) {
  const url = new URL(`${RAZORPAY_BASE_URL}${path}`);

  Object.entries(options.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const headers: Record<string, string> = {
    Authorization: `Basic ${Buffer.from(`${RAZORPAY_API_KEY}:${RAZORPAY_API_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url.toString(), {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let data: any = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!response.ok) {
    throw new Error(data.error?.description || data.message || `Razorpay API request failed with status ${response.status}`);
  }

  return data as T;
}

export interface RazorpayPlanItem {
  name: string;
  amount: number;
  currency: string;
  description?: string;
}

export interface CreatePaymentPlanParams {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  item: RazorpayPlanItem;
  period_count?: number;
  notes?: Record<string, string>;
}

export const createPaymentPlan = async (planData: CreatePaymentPlanParams) => {
  const body: Record<string, unknown> = {
    period: planData.period,
    interval: planData.interval,
    item: planData.item,
    notes: planData.notes,
  };

  return razorpayRequest<any>('/plans', {
    method: 'POST',
    body,
  });
};

export const listPaymentPlans = async (options?: { count?: number; skip?: number }) => {
  return razorpayRequest<any>('/plans', {
    params: {
      count: options?.count ?? 10,
      skip: options?.skip ?? 0,
    },
  });
};

export const getPaymentPlan = async (planId: string) => {
  return razorpayRequest<any>(`/plans/${planId}`);
};

export interface CreateCustomerParams {
  name: string;
  email: string;
  contact: string;
  notes?: Record<string, string>;
}

export const createCustomer = async (customerData: CreateCustomerParams) => {
  return razorpayRequest<any>('/customers', {
    method: 'POST',
    body: {
      name: customerData.name,
      email: customerData.email,
      contact: customerData.contact,
      notes: customerData.notes,
    },
  });
};

export const getCustomer = async (customerId: string) => {
  return razorpayRequest<any>(`/customers/${customerId}`);
};

export interface CreateSubscriptionParams {
  plan_id: string;
  customer_id?: string;
  customer_notify?: 0 | 1;
  quantity?: number;
  total_count?: number;
  start_at?: number;
  addons?: Array<{ item: { name: string; amount: number; currency: string } }>;
  notes?: Record<string, string>;
}

export const createSubscription = async (subscriptionData: CreateSubscriptionParams) => {
  return razorpayRequest<any>('/subscriptions', {
    method: 'POST',
    body: {
      plan_id: subscriptionData.plan_id,
      customer_id: subscriptionData.customer_id,
      customer_notify: subscriptionData.customer_notify ?? 1,
      quantity: subscriptionData.quantity ?? 1,
      total_count: subscriptionData.total_count,
      start_at: subscriptionData.start_at,
      addons: subscriptionData.addons,
      notes: subscriptionData.notes,
    },
  });
};

export const getSubscription = async (subscriptionId: string) => {
  return razorpayRequest<any>(`/subscriptions/${subscriptionId}`);
};

export const listSubscriptions = async (options?: { count?: number; skip?: number; status?: string }) => {
  return razorpayRequest<any>('/subscriptions', {
    params: {
      count: options?.count ?? 10,
      skip: options?.skip ?? 0,
      status: options?.status,
    },
  });
};

export const pauseSubscription = async (subscriptionId: string, reason?: string) => {
  return razorpayRequest<any>(`/subscriptions/${subscriptionId}/pause`, {
    method: 'POST',
    body: {
      pause_at: 'now',
      reason: reason || 'user_requested',
    },
  });
};

export const resumeSubscription = async (subscriptionId: string) => {
  return razorpayRequest<any>(`/subscriptions/${subscriptionId}/resume`, {
    method: 'POST',
    body: {
      resume_at: 'now',
    },
  });
};

export const cancelSubscription = async (subscriptionId: string, reason?: string, notes?: Record<string, string>) => {
  return razorpayRequest<any>(`/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    body: {
      cancel_at_cycle_end: 0,
      reason: reason || 'user_requested',
      notes: notes || {},
    },
  });
};

export const capturePayment = async (paymentId: string, amount: number) => {
  return razorpayRequest<any>(`/payments/${paymentId}/capture`, {
    method: 'POST',
    body: {
      amount,
      currency: 'INR',
    },
  });
};

export const getPayment = async (paymentId: string) => {
  return razorpayRequest<any>(`/payments/${paymentId}`);
};

export const verifyWebhookSignature = (body: string, signature: string, secret = RAZORPAY_WEBHOOK_SECRET) => {
  if (!secret || !signature) {
    return false;
  }

  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
};
