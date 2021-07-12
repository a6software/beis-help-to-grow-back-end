import express, { Router } from 'express';
import softwareDetailsController from '../../controllers/software-details';
import { SoftwareDetailsService } from '../../types';

const initSoftwareDetailsRouter = (softwareDetailsService: SoftwareDetailsService): Router => {
  const router = express.Router();

  router.get('/', softwareDetailsController.get(softwareDetailsService));

  return router;
};

export default initSoftwareDetailsRouter;
