import express, { Router } from 'express';
import signInController from '../../controllers/sign-in';
import { UserService } from '../../types';

const initSignInRouter = (userService: UserService): Router => {
  const router = express.Router();

  router.post('/', signInController.post(userService));

  return router;
};

export default initSignInRouter;
