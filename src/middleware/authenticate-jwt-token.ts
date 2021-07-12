import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../lib/security/access-token';

export const authenticateJwtToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  req.user = undefined;

  try {
    req.user = verifyAccessToken(token);
  } catch (e) {
    req.log.error(e);
    return res.sendStatus(403);
  }

  next();
};

export default {
  authenticateJwtToken,
};
