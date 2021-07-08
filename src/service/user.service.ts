import { CreateUserSuccessResponse, Email, ErrorResponse, UserService } from '../types';
import { TABLE } from '../../database/constants';
import { hashPassword } from '../lib/security/authentication';
import logger from '../lib/logger';
import { Knex } from 'knex';

export const ERROR = {
  CREATING_USER: 'error.creating_user',
};

export default function userService(db: Knex): UserService {
  const createUser = async (
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

  return {
    createUser,
  };
}
