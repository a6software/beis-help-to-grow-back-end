import express from 'express';
import createAccountRouter from './create-account';

const router = express.Router();

router.use('/create-account', createAccountRouter);

export default router;
