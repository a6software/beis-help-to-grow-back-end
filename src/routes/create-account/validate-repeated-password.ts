import express from 'express';
import validateRepeatedPasswordController from '../../../src/controllers/create-account/validate-repeated-password';

const router = express.Router();

router.post('/', validateRepeatedPasswordController.post);

export default router;
