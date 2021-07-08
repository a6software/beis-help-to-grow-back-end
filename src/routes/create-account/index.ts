import express from 'express';
import createAccountController from '../../controllers/create-account';
import validateEmailAddressRouter from './validate-email-address';
import validateRepeatedPasswordRouter from './validate-repeated-password';
import validateTermsAndConditionsRouter from './validate-terms-and-conditions';

const router = express.Router();

router.use('/validate-email-address', validateEmailAddressRouter);
router.use('/validate-repeated-password', validateRepeatedPasswordRouter);
router.use('/validate-terms-and-conditions', validateTermsAndConditionsRouter);

router.post('/', createAccountController.post);

export default router;
