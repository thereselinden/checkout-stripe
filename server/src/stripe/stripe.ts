import Stripe from 'stripe';

const STRIPE_SECRET_KEY: string | undefined = process.env.STRIPE_SECRET_KEY;

export const initStripe = () => {
  let stripe: Stripe;
  if (STRIPE_SECRET_KEY)
    return (stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    }));
};
