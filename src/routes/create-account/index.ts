import express, { Router } from 'express';
import createAccountController from '../../controllers/create-account';
import validateEmailAddressRouter from './validate-email-address';
import validateRepeatedPasswordRouter from './validate-repeated-password';
import validateTermsAndConditionsRouter from './validate-terms-and-conditions';
import { UserService } from '../../types';

const initCreateAccountRouter = (userService: UserService): Router => {
  const router = express.Router();

  router.use('/validate-email-address', validateEmailAddressRouter);
  router.use('/validate-repeated-password', validateRepeatedPasswordRouter);
  router.use('/validate-terms-and-conditions', validateTermsAndConditionsRouter);

  router.post('/', createAccountController.post(userService));

  return router;
};

export default initCreateAccountRouter;
