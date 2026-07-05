import { Router, Request, Response } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { ImageProcessRequest } from '@/types';
import aiService from '@/services/ai-service';
import ocrService from '@/services/ocr-service';
import { logger } from '@/config/logger';

const router = Router();

// Middleware de autenticación
router.use(authMiddleware);

// POST /api/image/process - Procesar imagen
router.post('/process', async (req: Request, res: Response) => {
  try {
    const { image, type } = req.body as ImageProcessRequest;

    if (!image || !type) {
      return res.status(400).json({
        success: false,
        error: 'Imagen y tipo requeridos',
      });
    }

    if (type !== 'invoice' && type !== 'plague') {
      return res.status(400).json({
        success: false,
        error: 'Tipo de imagen inválido (invoice o plague)',
      });
    }

    logger.info(`Procesando imagen: ${type}`);

    let result: Record<string, any> = {};

    if (type === 'invoice') {
      // Extrae texto con OCR y estructura datos
      const text = await ocrService.extractTextFromImage(image);
      result = await ocrService.structureInvoiceData(text);
      result.extractedText = text;
    } else if (type === 'plague') {
      // Analiza la planta con IA
      result = await aiService.analyzeImage(image, type);
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Error al procesar imagen:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar la imagen',
    });
  }
});

export default router;
