import express from 'express';

import {
  register,
  login,
  authorize,
  logout,
} from '../controllers/customer-controller';

const customerRouter = express.Router();

customerRouter.post('/register', register);
customerRouter.post('/login', login);
customerRouter.post('/logout', logout);
customerRouter.get('/authorize', authorize);

export default customerRouter;
