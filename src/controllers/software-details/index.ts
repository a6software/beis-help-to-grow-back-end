import { Request, Response } from 'express';
import { SoftwareDetailsService } from '../../types';

const get =
  (softwareDetailsService: SoftwareDetailsService) => async (req: Request, res: Response) => {
    console.log(`softwareDetailsService`, softwareDetailsService);
    res.json({ success: true, data: { some: 'data' } });
  };

export default {
  get,
};
