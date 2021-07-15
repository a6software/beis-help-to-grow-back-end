import express from 'express';
import validateGdprController from '../../controllers/eligibility/gdpr';

const router = express.Router();

router.post('/', validateGdprController.post);

export default router;
