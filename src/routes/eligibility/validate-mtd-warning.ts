import express from 'express';
import validateMtdWarningController from '../../controllers/eligibility/mtd-warning';

const router = express.Router();

router.post('/', validateMtdWarningController.post);

export default router;
