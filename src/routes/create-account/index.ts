import express from 'express';
import createAccountController from '../../../src/controllers/create-account';
import validateEmailAddressRouter from '../../../src/routes/create-account/validate-email-address';
import validateRepeatedPasswordRouter from '../../../src/routes/create-account/validate-repeated-password';
import validateTermsAndConditionsRouter from '../../../src/routes/create-account/validate-terms-and-conditions';

const router = express.Router();

router.use('/validate-email-address', validateEmailAddressRouter);
router.use('/validate-repeated-password', validateRepeatedPasswordRouter);
router.use('/validate-terms-and-conditions', validateTermsAndConditionsRouter);

router.post('/', createAccountController.post);

export default router;
