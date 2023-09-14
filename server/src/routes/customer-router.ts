import express from 'express';

import {
  register,
  login,
  authorize,
  logout,
} from '../controllers/customer-controller';
import { validateResource } from '../middleware/middleware';
import { registerSchema } from '../schema/registerSchema';

const customerRouter = express.Router();

customerRouter.post('/register', validateResource(registerSchema), register);
customerRouter.post('/login', login);
customerRouter.post('/logout', logout);
customerRouter.get('/authorize', authorize);

export default customerRouter;
