import express, { Router } from 'express';
import initCreateAccountRouter from './create-account';
import { EmailVerificationService, SoftwareDetailsService, UserService } from '../types';
import initSoftwareDetailsRouter from './software-details';
import initSignInRouter from './sign-in';
import { authenticateJwtToken } from '../middleware/authenticate-jwt-token';
import verifyJwtRouter from './verify-jwt';
import initEmailVerificationCodeRouter from './email-verification-code';
import eligibilityRouter from './eligibility';

const initRootRouter = (
  emailVerificationService: EmailVerificationService,
  userService: UserService,
  softwareDetailsService: SoftwareDetailsService,
): Router => {
  const router = express.Router();

  router.use('/create-account', initCreateAccountRouter(userService));
  router.use('/email-verification-code', initEmailVerificationCodeRouter(emailVerificationService));
  router.use('/sign-in', initSignInRouter(userService));
  router.use(
    '/software-details',
    authenticateJwtToken,
    initSoftwareDetailsRouter(softwareDetailsService),
  );
  router.use('/verify-jwt', authenticateJwtToken, verifyJwtRouter);
  router.use('/eligibility', eligibilityRouter);

  return router;
};

export default initRootRouter;
