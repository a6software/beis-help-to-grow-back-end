import { Email } from '../types';
import connection from '../lib/database/connection';
import { TABLE } from '../../database/constants';
import { hashPassword } from '../lib/security/authentication';
import logger from '../lib/logger';

const db = connection();

export const ERROR = {
  CREATING_USER: 'error.creating_user',
};

type ErrorResponse = {
  success: false;
  error: {
    msg: string;
  };
};

type SuccessResponse = {
  success: true;
};

type CreateUserSuccessResponse = SuccessResponse & {
  data: {
    email: Email;
  };
};

export const createUser = async (
  email: Email,
  plainTextPassword: string,
): Promise<ErrorResponse | CreateUserSuccessResponse> => {
  const hashedPassword = await hashPassword(plainTextPassword);

  try {
    await db(TABLE.USERS).insert({ email, password: hashedPassword });
  } catch (e) {
    logger().error({ e }, 'Create user');
    return {
      success: false,
      error: {
        msg: ERROR.CREATING_USER,
      },
    };
  }

  return {
    success: true,
    data: {
      email,
    },
  };
};
