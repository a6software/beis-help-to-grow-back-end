import express from 'express';
import validateTermsAndConditionsController from '../../controllers/create-account/validate-terms-and-conditions';

const router = express.Router();

router.post('/', validateTermsAndConditionsController.post);

export default router;
