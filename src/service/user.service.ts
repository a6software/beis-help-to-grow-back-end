import { Knex } from 'knex';
import {
  CreateUserSuccessResponse,
  Email,
  ErrorResponse,
  FindUserByEmailAddressSuccessResponse,
  UserDetailsFromApi,
  UserService,
} from '../types';
import { TABLE } from '../../database/constants';
import { hashPassword } from '../lib/security/authentication';
import logger from '../lib/logger';

export const ERROR = {
  CREATING_USER: 'error.creating_user',
  FIND_USER_BY_EMAIL_ADDRESS: 'error.find_user_by_email_address',
};

export default function userService(db: Knex): UserService {
  const createUser = async (
    email: Email,
    plainTextPassword: string,
  ): Promise<ErrorResponse | CreateUserSuccessResponse> => {
    const hashedPassword = await hashPassword(plainTextPassword);

    try {
      await db(TABLE.VENDOR_COMPANY_USER).insert({ email, password: hashedPassword });
    } catch (e) {
      logger().error({ e }, 'Create user');
      return {
        success: false,
        data: {
          errors: [
            {
              message: ERROR.CREATING_USER,
              path: ['root'],
              type: 'invalid.credentials',
              context: {
                value: '',
                label: 'root',
                key: 'root',
              },
            },
          ],
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

  const findUserByEmailAddress = async (
    email: Email,
  ): Promise<ErrorResponse | FindUserByEmailAddressSuccessResponse> => {
    let user: UserDetailsFromApi;
    try {
      user = (await db(TABLE.VENDOR_COMPANY_USER).where({ email }).first()) as UserDetailsFromApi;
    } catch (e) {
      logger().error({ e }, 'Find user by email address');
      return {
        success: false,
        data: {
          errors: [
            {
              message: ERROR.FIND_USER_BY_EMAIL_ADDRESS,
              path: ['root'],
              type: 'unrecognised.email_address',
              context: {
                value: '',
                label: 'root',
                key: 'root',
              },
            },
          ],
        },
      };
    }

    return {
      success: true,
      data: {
        user: {
          email: user.email,
          password: user.password,
        },
      },
    };
  };

  return {
    createUser,
    findUserByEmailAddress,
  };
}
