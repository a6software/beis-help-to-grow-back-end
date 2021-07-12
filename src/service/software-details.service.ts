import { Knex } from 'knex';
import { ErrorResponse, GetSoftwareDetailsResponse, SoftwareDetailsService } from '../types';

// export const ERROR = {
//   CREATING_USER: 'error.creating_user',
// };

export default function softwareDetailsService(db: Knex): SoftwareDetailsService {
  // const createUser = async (
  //   email: Email,
  //   plainTextPassword: string,
  // ): Promise<ErrorResponse | CreateUserSuccessResponse> => {
  //   const hashedPassword = await hashPassword(plainTextPassword);
  //
  //   try {
  //     await db(TABLE.USERS).insert({ email, password: hashedPassword });
  //   } catch (e) {
  //     logger().error({ e }, 'Create user');
  //     return {
  //       success: false,
  //       error: {
  //         msg: ERROR.CREATING_USER,
  //       },
  //     };
  //   }
  //
  //   return {
  //     success: true,
  //     data: {
  //       email,
  //     },
  //   };
  // };

  const getSoftwareDetails = async (): Promise<ErrorResponse | GetSoftwareDetailsResponse> => {
    try {
      return {
        success: true,
        data: {
          softwareDetails: 'software details',
        },
      };
    } catch (e) {
      return {
        success: false,
        data: {
          errors: [
            {
              message: 'XXXXXXXXXXXX',
              path: ['root'],
              type: 'XXXXXXXXXXXX',
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
  };

  return {
    getSoftwareDetails,
  };
}
