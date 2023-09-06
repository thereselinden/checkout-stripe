"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const customer_router_1 = __importDefault(require("./src/routes/customer-router"));
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.port || '3000';
const app = (0, express_1.default)();
let stripe;
if (STRIPE_SECRET_KEY) {
    stripe = new stripe_1.default(STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });
}
// Middlewares
app.use((0, cors_1.default)({
    origin: CLIENT_URL,
    //origin: '*',
    credentials: true,
}));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['aVeryS3cr3tK3y'],
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
}));
app.use(express_1.default.json());
app.use('/api', customer_router_1.default);
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
