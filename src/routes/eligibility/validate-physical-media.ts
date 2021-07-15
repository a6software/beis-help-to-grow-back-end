import express from 'express';
import validatePhysicalMediaController from '../../controllers/eligibility/physical-media';

const router = express.Router();

router.post('/', validatePhysicalMediaController.post);

export default router;
