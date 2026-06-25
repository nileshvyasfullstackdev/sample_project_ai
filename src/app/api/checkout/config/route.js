import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    checkoutApi: '/api/checkout/create-session',
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    publicUrl: process.env.NEXT_PUBLIC_URL || null,
    apiUrlOverride: process.env.NEXT_PUBLIC_API_URL || null,
  });
}
