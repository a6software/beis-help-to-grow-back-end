import express from 'express';
import validateOnlinePurchaseController from '../../controllers/eligibility/online-purchase';

const router = express.Router();

router.post('/', validateOnlinePurchaseController.post);

export default router;
