import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './jwt';

export const authenticate = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;

  try {
    if (token) {
      verifyToken(token);
      return { authenticated: true };
    } else {
      return { authenticated: false };
    }
  } catch {
    return { authenticated: false };
  }
};