import express, { Router } from 'express';
import createAccountController from '../../controllers/create-account';
import validateRepeatedPasswordRouter from './validate-repeated-password';
import validateTermsAndConditionsRouter from './validate-terms-and-conditions';
import validateYourDetailsRouter from './validate-your-details';
import { UserService } from '../../types';

const initCreateAccountRouter = (userService: UserService): Router => {
  const router = express.Router();

  router.use('/validate-repeated-password', validateRepeatedPasswordRouter);
  router.use('/validate-terms-and-conditions', validateTermsAndConditionsRouter);
  router.use('/validate-your-details', validateYourDetailsRouter);

  router.post('/', createAccountController.post(userService));

  return router;
};

export default initCreateAccountRouter;
