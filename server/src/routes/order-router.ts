import express from 'express';
import { verifyOrder, getOrders } from '../controllers/order-controller';
import { auth } from '../middleware/middleware';

const orderRouter = express.Router();

orderRouter.post('/order/verify-order', verifyOrder);
orderRouter.get('/orders', auth, getOrders);

export default orderRouter;
