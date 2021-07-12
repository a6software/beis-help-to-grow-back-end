import express, { Router } from 'express';
import initCreateAccountRouter from './create-account';
import { SoftwareDetailsService, UserService } from '../types';
import initSoftwareDetailsRouter from './software-details';
import initSignInRouter from './sign-in';
import { authenticateJwtToken } from '../middleware/authenticate-jwt-token';

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

  return router;
};

export default initRootRouter;
