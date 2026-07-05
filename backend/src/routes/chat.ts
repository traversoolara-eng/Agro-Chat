import { Router, Request, Response } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { ChatRequest } from '@/types';
import aiService from '@/services/ai-service';
import { logger } from '@/config/logger';

const router = Router();

// Middleware de autenticación
router.use(authMiddleware);

// POST /api/chat - Enviar mensaje al chatbot
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body as ChatRequest;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Mensaje vacío' });
    }

    logger.info(`Chat recibido: ${message.substring(0, 50)}...`);

    const response = await aiService.chat(message, context);

    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    logger.error('Error en chat:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar el mensaje',
    });
  }
});

export default router;
