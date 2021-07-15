import express from 'express';
import validateMakingTaxDigitalController from '../../controllers/eligibility/making-tax-digital';

const router = express.Router();

router.post('/', validateMakingTaxDigitalController.post);

export default router;
