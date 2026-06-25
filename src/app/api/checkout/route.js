import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

function normalizeUrl(value, baseUrl) {
  if (!value || typeof value !== 'string') return undefined;
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  if (value.startsWith('/')) {
    return `${baseUrl.replace(/\/$/, '')}${value}`;
  }
  return undefined;
}

export async function POST(request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured on the server. Set STRIPE_SECRET_KEY.' },
      { status: 500 }
    );
  }

  const originHeader = request.headers.get('origin');
  const baseUrl = originHeader || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  const body = await request.json();
  const { items, successUrl, cancelUrl } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items provided' }, { status: 400 });
  }

  const validSuccessUrl = typeof successUrl === 'string' && successUrl.trim().length > 0
    ? successUrl
    : `${baseUrl.replace(/\/$/, '')}/?success=true`;
  const validCancelUrl = typeof cancelUrl === 'string' && cancelUrl.trim().length > 0
    ? cancelUrl
    : `${baseUrl.replace(/\/$/, '')}/cart`;

  const line_items = items.map((item) => {
    const productData = {
      name: item.name || 'Product',
    };
    const imageUrl = normalizeUrl(item.image, baseUrl);
    if (imageUrl) {
      productData.images = [imageUrl];
    }

    return {
      price_data: {
        currency: 'usd',
        product_data: productData,
        unit_amount: Math.round((Number(item.price) || 0) * 100),
      },
      quantity: item.quantity || 1,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: validSuccessUrl,
      cancel_url: validCancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create checkout session' }, { status: 500 });
  }
}
