import Joi from 'joi';
import { User } from '@prisma/client';

const noWhiteSpaces = /^\S+$/;

export const user = (payload: any): Promise<User> => {
  const schema = Joi.object({
    username: Joi.string().regex(noWhiteSpaces).min(4).max(20).required(),
    password: Joi.string().regex(noWhiteSpaces).min(4).max(20).required()
  });

  return schema.validateAsync(payload);
};

export const refreshToken = (
  payload: any
): Promise<{ refreshToken: string }> => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  });

  return schema.validateAsync(payload);
};
