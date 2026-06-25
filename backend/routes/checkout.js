const express = require('express');
const router = express.Router();
require('dotenv').config();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  console.warn('Stripe secret key not set. Set STRIPE_SECRET_KEY in .env');
}

const Stripe = require('stripe');
let stripe = null;
if (stripeSecret) {
  stripe = Stripe(stripeSecret);
}

// Create a Checkout Session
router.post('/create-session', async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured on the server. Set STRIPE_SECRET_KEY.' });
  }
  try {
    const { items, successUrl, cancelUrl } = req.body;
    const publicUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    const normalizeImageUrl = (imagePath) => {
      if (!imagePath) return undefined;
      if (typeof imagePath !== 'string') return undefined;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      if (imagePath.startsWith('/')) {
        return `${publicUrl.replace(/\/$/, '')}${imagePath}`;
      }
      return undefined;
    };

    const success_url = successUrl && typeof successUrl === 'string' && successUrl.trim().length > 0
      ? successUrl
      : `${publicUrl.replace(/\/$/, '')}/?success=true`;
    const cancel_url = cancelUrl && typeof cancelUrl === 'string' && cancelUrl.trim().length > 0
      ? cancelUrl
      : `${publicUrl.replace(/\/$/, '')}/cart`;

    const line_items = items.map((it) => {
      const imageUrl = normalizeImageUrl(it.image);
      const product_data = {
        name: it.name || 'Product',
      };

      if (imageUrl) {
        product_data.images = [imageUrl];
      }

      return {
        price_data: {
          currency: 'usd',
          product_data,
          unit_amount: Math.round((Number(it.price) || 0) * 100),
        },
        quantity: it.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url,
      cancel_url,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe create-session error:', error);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
});

module.exports = router;

// Health/config helper: returns whether Stripe is configured (boolean only)
router.get('/config', (req, res) => {
  try {
    return res.json({ configured: !!stripe });
  } catch (err) {
    return res.status(500).json({ configured: false });
  }
});
