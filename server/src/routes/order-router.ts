import express from 'express';
import { verifyOrder } from '../controllers/order-controller';

const orderRouter = express.Router();

orderRouter.post('/order/verify-order', verifyOrder);

export default orderRouter;
