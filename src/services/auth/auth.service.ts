import { compare, hash } from 'bcryptjs';
import * as validate from './auth.validate';
import { hashConfig, tokenConfig } from '../../config';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UnauthenticatedError, prisma } from '../../utils';

export const createUser = async (payload: any) => {
  const userData = await validate.user(payload);

  userData.password = await hash(userData.password, hashConfig.saltRounds);

  const user = await prisma.user.create({ data: userData });

  return user;
};

export const login = async (payload: any) => {
  const { username, password } = await validate.user(payload);

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  if (!(await compare(password, user.password))) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  return user;
};

export const generateTokens = async (user: User) => {
  const refreshToken = sign(
    { username: user.username },
    tokenConfig.refreshTokenSecret
  );
  const accessToken = sign(
    { username: user.username },
    tokenConfig.accessTokenSecret,
    { expiresIn: tokenConfig.accessTokenExpiresIn }
  );

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiration: new Date(
        Date.now() + tokenConfig.refreshTokenExpiresIn * 1000
      ),
      username: user.username
    }
  });

  return { refreshToken, accessToken, username: user.username };
};

export const refreshToken = async (payload: any) => {
  const { refreshToken } = await validate.refreshToken(payload);

  const tokenData = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    select: { expiration: true, username: true }
  });

  if (!tokenData) {
    throw new UnauthenticatedError('Invalid refresh token');
  }

  if (tokenData.expiration < new Date()) {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    throw new UnauthenticatedError('Refresh token expired');
  }

  const accessToken = sign(
    { username: tokenData.username },
    tokenConfig.accessTokenSecret,
    { expiresIn: tokenConfig.accessTokenExpiresIn }
  );

  return { accessToken, username: tokenData.username };
};

export const logout = async (payload: any) => {
  const { refreshToken } = await validate.refreshToken(payload);

  const existingToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  });

  if (existingToken) {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
  }
};
