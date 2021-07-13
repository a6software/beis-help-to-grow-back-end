import express from 'express';
import validateAccessibilityController from '../../controllers/eligibility/accessibility';

const router = express.Router();

router.post('/', validateAccessibilityController.post);

export default router;
