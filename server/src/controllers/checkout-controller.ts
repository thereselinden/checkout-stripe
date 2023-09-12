import { Request, Response } from 'express';
import { initStripe } from '../stripe/stripe';

const stripe = initStripe();
const CLIENT_URL = process.env.CLIENT_URL;

export const checkoutSession = async (req: Request, res: Response) => {
  try {
    const { cartItems, user } = req.body;
    if (!stripe)
      return res.status(500).json({ message: 'Could not connect to stripe' });

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map(item => {
        return {
          price: item.product.default_price.id,
          quantity: item.quantity,
        };
      }),
      customer: user,
      mode: 'payment',
      success_url: `${CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: CLIENT_URL,
    });

    if (!session)
      return res
        .status(400)
        .json({ message: 'Could not create checkout session' });

    res.status(200).json(session);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Could not create checkout session' });
  }
};
