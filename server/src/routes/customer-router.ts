import express, { Router } from 'express';

import { register, login } from '../controllers/customer-controller';

const customerRouter = express.Router();

customerRouter.post('/register', register);
customerRouter.post('/login', login);

export default customerRouter;
