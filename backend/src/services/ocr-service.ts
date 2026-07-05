import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import { logger } from '@/config/logger';

export class OCRService {
  async extractTextFromImage(base64Image: string): Promise<string> {
    try {
      logger.info('Iniciando extracción de texto con OCR');

      const imageBuffer = Buffer.from(base64Image, 'base64');

      // Optimizar imagen para OCR
      const optimizedImage = await sharp(imageBuffer)
        .greyscale()
        .normalize()
        .toBuffer();

      const result = await Tesseract.recognize(optimizedImage, 'spa', {
        logger: (m) => logger.debug(`OCR: ${m.status}`),
      });

      logger.info('Extracción de texto completada');
      return result.data.text;
    } catch (error) {
      logger.error('Error en OCR:', error);
      throw error;
    }
  }

  async structureInvoiceData(text: string): Promise<Record<string, any>> {
    try {
      // Patrones regex para extraer información común de facturas
      const patterns = {
        amount: /\$(\d+[.,]\d{2})|total[:\s]*(\d+[.,]\d{2})/i,
        date: /(\d{1,2})[/-](\d{1,2})[/-](\d{4})/,
        invoice: /factura[:\s]*(\w+\d+)/i,
        provider: /proveedor[:\s]*([^\n]+)|empresa[:\s]*([^\n]+)/i,
      };

      const data: Record<string, any> = {};

      for (const [key, pattern] of Object.entries(patterns)) {
        const match = text.match(pattern);
        if (match) {
          data[key] = match[1] || match[2];
        }
      }

      logger.info('Datos de factura estructurados');
      return data;
    } catch (error) {
      logger.error('Error al estructurar datos de factura:', error);
      throw error;
    }
  }
}

export default new OCRService();
