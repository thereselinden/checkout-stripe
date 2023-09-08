import express from 'express';

import { getProducts } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.get('/products', getProducts);

export default productRouter;
