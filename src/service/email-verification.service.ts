import { Knex } from 'knex';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import {
  CreateEmailVerificationCodeSuccessResponse,
  Email,
  EmailVerificationService,
  ErrorResponse,
  ValidateEmailVerificationCodeSuccessResponse,
} from '../types';
import { TABLE } from '../../database/constants';
import generateEmailVerificationCode from '../lib/email-verification-code-generator';
import logger from '../lib/logger';

export const ERROR = {
  CREATING_EMAIL_VERIFICATION_CODE: 'error.creating_email_verification_code',
  VALIDATING_EMAIL_VERIFICATION_CODE: 'error.validating_email_verification_code',
};

export default function emailVerificationService(db: Knex): EmailVerificationService {
  const createEmailVerificationCode = async (
    email: Email,
  ): Promise<ErrorResponse | CreateEmailVerificationCodeSuccessResponse> => {
    try {
      const { verification_code: verificationCode, sent_at: sentAt } = await db(
        TABLE.EMAIL_VERIFICATION_CODE,
      )
        .where({
          email,
        })
        .first();

      if (!verificationCode) {
        throw new Error(
          'Create email verification code - email or verification code not found, continuing...',
        );
      }

      if (differenceInSeconds(new Date(), sentAt) < 60) {
        logger().info(
          'Create email verification code - already sent within the last 60 seconds. Returning early.',
        );
        return {
          success: true,
          data: {
            email,
          },
        };
      }
    } catch (e) {
      logger().info({ e });
    }

    const verificationCode = generateEmailVerificationCode();

    try {
      await db.transaction((trx) => {
        db(TABLE.EMAIL_VERIFICATION_CODE)
          .transacting(trx)
          .insert({
            email,
            verification_code: verificationCode,
            sent_at: new Date(),
          })
          .onConflict('email')
          .merge()
          .then(() => {
            // TODO: CALL NOTIFY
          })
          .then(trx.commit)
          .catch(trx.rollback);
      });
    } catch (e) {
      logger().error({ e }, 'Create email verification code');
      return {
        success: false,
        data: {
          errors: [
            {
              message: ERROR.CREATING_EMAIL_VERIFICATION_CODE,
              path: ['root'],
              type: 'invalid.email',
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

  const validateEmailVerificationCode = async (
    email: Email,
    verificationCode: string,
  ): Promise<ErrorResponse | ValidateEmailVerificationCodeSuccessResponse> => {
    let result;

    try {
      result = await db(TABLE.EMAIL_VERIFICATION_CODE)
        .where({ email, verification_code: verificationCode })
        .first();

      if (!result) {
        throw new Error('No result found.');
      }
      console.log(`result`, result);
    } catch (e) {
      logger().error({ e }, 'Create email verification code');
      return {
        success: false,
        data: {
          errors: [
            {
              message: ERROR.VALIDATING_EMAIL_VERIFICATION_CODE,
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

  return {
    createEmailVerificationCode,
    validateEmailVerificationCode,
  };
}
