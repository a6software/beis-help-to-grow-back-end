import express, { Router } from 'express';
import initCreateAccountRouter from './create-account';
import { SoftwareDetailsService, UserService } from '../types';
import initSoftwareDetailsRouter from './software-details';
import initSignInRouter from './sign-in';
import { authenticateJwtToken } from '../middleware/authenticate-jwt-token';
import verifyJwtRouter from './verify-jwt';

console.log(`verifyJwtRouter`, verifyJwtRouter);

const initRootRouter = (
  userService: UserService,
  softwareDetailsService: SoftwareDetailsService,
): Router => {
  const router = express.Router();

  router.use('/create-account', initCreateAccountRouter(userService));
  router.use('/sign-in', initSignInRouter(userService));
  router.use(
    '/software-details',
    authenticateJwtToken,
    initSoftwareDetailsRouter(softwareDetailsService),
  );
  router.use('/verify-jwt', authenticateJwtToken, verifyJwtRouter);

  return router;
};

export default initRootRouter;
