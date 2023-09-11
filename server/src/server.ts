import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import path from 'path';

import customerRouter from './routes/customer-router';
import productRouter from './routes/product-router';

const CLIENT_URL = process.env.CLIENT_URL;
const PORT: string = process.env.port || '3000';
const app: Express = express();
export const rootPath = path.dirname(__dirname);

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
    //secure: false,
  })
);

app.use(express.json());
app.use('/api/customer', customerRouter);
app.use('/api', productRouter);

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
