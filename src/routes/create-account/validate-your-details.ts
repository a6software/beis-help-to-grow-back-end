import express from 'express';
import validateYourDetailsController from '../../controllers/create-account/validate-your-details';

const router = express.Router();

router.post('/', validateYourDetailsController.post);

export default router;
