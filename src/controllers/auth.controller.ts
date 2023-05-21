import { NextFunction, Request, Response } from 'express';
import { authService } from '../services';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.createUser(req.body);
    const { refreshToken, accessToken, username } =
      await authService.generateTokens(user);

    res.status(200).json({ refreshToken, accessToken, username });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.login(req.body);
    const { refreshToken, accessToken, username } =
      await authService.generateTokens(user);

    res.status(200).json({ refreshToken, accessToken, username });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, username } = await authService.refreshToken(req.body);

    res.status(200).json({ accessToken, username });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.logout(req.body);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
