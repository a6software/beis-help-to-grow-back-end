import express from 'express';
import validateCyberSecurityRouter from './validate-cyber-security';
import validateAccessibilityRouter from './validate-accessibility';
const router = express.Router();

router.use('/validate-cyber-security', validateCyberSecurityRouter);
router.use('/validate-accessibility', validateAccessibilityRouter);

export default router;
