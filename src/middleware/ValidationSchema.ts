import { IBook } from './../models/Book';
import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../utils/Logging';
import { IAuthor } from '../models/Author';

export const ValidationSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(400).json({ error });
    }
  };
};

export const Schema = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required().min(3),
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      title: Joi.string().required().min(3),
    }),
    update: Joi.object<IBook>({
      author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      title: Joi.string().required().min(3),
    }),
  },
};
