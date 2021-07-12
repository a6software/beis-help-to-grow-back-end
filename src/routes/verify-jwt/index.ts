import express from 'express';
import verifyJwtController from '../../controllers/verify-jwt';

const router = express.Router();

router.get('/', verifyJwtController.get);

export default router;
