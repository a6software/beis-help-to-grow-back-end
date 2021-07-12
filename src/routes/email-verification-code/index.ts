import express, { Router } from 'express';
import CreateEmailVerificationCodeController from '../../controllers/email-verification-code/create-email-verification-code';
import ValidateEmailVerificationCodeController from '../../controllers/email-verification-code/validate-email-verification-code';
import { EmailVerificationService } from '../../types';

const initEmailVerificationCodeRouter = (
  emailVerificationService: EmailVerificationService,
): Router => {
  const router = express.Router();

  router.post('/create', CreateEmailVerificationCodeController.post(emailVerificationService));
  router.post('/validate', ValidateEmailVerificationCodeController.post(emailVerificationService));

  return router;
};

export default initEmailVerificationCodeRouter;
