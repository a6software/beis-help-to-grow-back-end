import express from 'express';
import validateEligibilityCompleteController from '../../controllers/eligibility/eligibility-complete';

const router = express.Router();

router.post('/', validateEligibilityCompleteController.post);

export default router;
