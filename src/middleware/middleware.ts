import { Request, Response, NextFunction } from 'express';
import User from '../modules/User_Authentication/user-model';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const Protect = (
  allowedRoles: string[]
) => async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] || req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.AUTH_SECRET_KEY);

    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied. Not authorized.' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Attach the user to the request
    (req as any).user = user;
    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token.' });
    } else if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired.' });
    } else {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
