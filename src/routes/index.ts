import express, { Router } from 'express';
import initCreateAccountRouter from './create-account';
import { UserService } from '../types';

const initRootRouter = (userService: UserService): Router => {
  const router = express.Router();

  router.use('/create-account', initCreateAccountRouter(userService));

  return router;
};

export default initRootRouter;
