import express from 'express';
import validateEmailAddressController from '../../../src/controllers/create-account/validate-email-address';

const router = express.Router();

router.post('/', validateEmailAddressController.post);

export default router;
