import express from 'express';
import validateCyberSecurityRouter from './validate-cyber-security';

const router = express.Router();

router.use('/validate-cyber-security', validateCyberSecurityRouter);

export default router;
