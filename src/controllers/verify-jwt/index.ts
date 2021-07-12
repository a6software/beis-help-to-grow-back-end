import { Request, Response } from 'express';

const get = (req: Request, res: Response) => res.sendStatus(200);

export default {
  get,
};
