import { NextFunction, Request, Response } from 'express';
import { ValidationSchemaType } from '../schema/registerSchema';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.id) {
    return res
      .status(403)
      .json({ message: 'Must be logged in for this request ' });
  }

  return next();
};

export const validateResource =
  <T>(resourceSchema: ValidationSchemaType<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      // throws an error if not valid
      await resourceSchema.validate(body);
      next();
    } catch (e: any) {
      res.status(400).json({ message: (e as Error).message });
    }
  };
