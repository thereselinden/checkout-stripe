import express from 'express';
import { checkoutSession } from '../controllers/checkout-controller';

const checkoutRouter = express.Router();

checkoutRouter.post('/checkout/create-checkout-session', checkoutSession);

export default checkoutRouter;
