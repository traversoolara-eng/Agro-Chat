import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';
import { logger } from '@/config/logger';

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, error: 'Token no proporcionado' });
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded as { id: string; email: string };
    next();
  } catch (error) {
    logger.warn('Token inválido o expirado');
    res.status(401).json({ success: false, error: 'Token inválido' });
  }
};
