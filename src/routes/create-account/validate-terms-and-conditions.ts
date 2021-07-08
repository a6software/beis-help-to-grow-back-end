import express from 'express';
import validatetermsAndConditionsController from '../../../src/controllers/create-account/validate-terms-and-conditions';

const router = express.Router();

router.post('/', validatetermsAndConditionsController.post);

export default router;
