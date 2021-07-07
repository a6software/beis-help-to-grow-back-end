import { Request, Response } from 'express';
import connection from '../../lib/database/connection';
import { TABLE } from '../../../database/constants';

const post = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const db = connection();
  await db(TABLE.USERS).insert({ email, password });

  res.json({ email });
};

export default {
  post,
};
