import express from 'express';
import validateCyberSecurityController from '../../controllers/eligibility/cyber-security';

const router = express.Router();

router.post('/', validateCyberSecurityController.post);

export default router;
