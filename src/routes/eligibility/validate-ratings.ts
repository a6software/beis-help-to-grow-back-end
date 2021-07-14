import express from 'express';
import validateRatingsController from '../../controllers/eligibility/ratings';

const router = express.Router();

router.post('/', validateRatingsController.post);

export default router;
