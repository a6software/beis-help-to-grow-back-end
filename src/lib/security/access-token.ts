import jwt from 'jsonwebtoken';
import config from '../../config';

export const generateAccessToken = (username: string) =>
  jwt.sign({ username }, config.security.jwt.token.secret, {
    expiresIn: config.security.jwt.token.expires,
  });

export const verifyAccessToken = (accessToken: string) =>
  jwt.verify(accessToken, config.security.jwt.token.secret);

export default {
  generateAccessToken,
  verifyAccessToken,
};
