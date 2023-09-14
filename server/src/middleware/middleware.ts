import { NextFunction, Request, Response } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log('middleware auth');
  if (!req.session?.id)
    return res
      .status(403)
      .json({ message: 'Must be logged in for this request ' });

  next();
};
