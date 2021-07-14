import express from 'express';
import validateCategoryController from '../../controllers/eligibility/category';

const router = express.Router();

router.post('/', validateCategoryController.post);

export default router;
