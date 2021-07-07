import express from 'express';
import createAccountController from '../../../src/controllers/create-account';

const router = express.Router();

router.post('/', createAccountController.post);

export default router;
