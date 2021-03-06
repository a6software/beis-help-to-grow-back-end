import bcrypt from 'bcrypt';
import config from '../../config';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, config.security.authentication.saltRounds);

export const hasAccess = async (
  givenPassword: string,
  knownPasswordHash: string,
): Promise<boolean> => bcrypt.compare(givenPassword, knownPasswordHash);
