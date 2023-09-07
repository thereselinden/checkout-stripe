import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';
//import Stripe from 'stripe';
import cookieSession from 'cookie-session';

import customerRouter from './routes/customer-router';
import path from 'path';

//const STRIPE_SECRET_KEY: string | undefined = process.env.STRIPE_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;
const PORT: string = process.env.port || '3000';
export const rootPath = path.dirname(__dirname);
const app: Express = express();

// let stripe: Stripe;
// if (STRIPE_SECRET_KEY) {
//   stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });
// }

// Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    //origin: '*',
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
  })
);

app.use(express.json());
app.use('/api', customerRouter);

// app.post('/test', async (req: Request, res: Response) => {
//   console.log(req.body);
//   try {
//     const session = await stripe.checkout.sessions.create({
//       success_url: 'http://localhost:5173',
//       line_items: req.body.map(item => {
//         return {
//           price: item.product,
//           quantity: item.quantity,
//         };
//       }),
//       mode: 'payment',
//       cancel_url: 'http://localhost:5173',
//     });
//     res.status(200).json(session);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(PORT, () => console.log(`server is up and running on ${PORT}`));
