import { model, visionModel } from '@/config/gemini';
import { logger } from '@/config/logger';

export class AIService {
  async chat(message: string, context?: Record<string, any>): Promise<string> {
    try {
      logger.info(`Procesando mensaje de chat: ${message.substring(0, 50)}...`);

      const systemPrompt = `Eres un asistente agrícola experto. Proporcionas asesoramiento técnico sobre:
- Cultivos y plagas
- Ganadería y cuidado animal
- Gestión de recursos
- Recomendaciones de siembra
- Pronósticos climáticos

Responde en español de forma clara y concisa.`;

      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: 'Eres un asistente agrícola experto.',
          },
          {
            role: 'model',
            parts: 'Entendido. Soy un asistente especializado en asesoramiento agrícola.',
          },
        ],
      });

      const result = await chat.sendMessage(message);
      const response = result.response.text();

      logger.info('Respuesta de IA generada correctamente');
      return response;
    } catch (error) {
      logger.error('Error en servicio de IA:', error);
      throw error;
    }
  }

  async analyzeImage(base64Image: string, type: 'invoice' | 'plague'): Promise<Record<string, any>> {
    try {
      logger.info(`Analizando imagen de tipo: ${type}`);

      const imageBuffer = Buffer.from(base64Image, 'base64');
      const mimeType = 'image/jpeg';

      const prompt =
        type === 'invoice'
          ? `Analiza esta factura/comprobante agrícola y extrae:
- Monto total
- Concepto/producto
- Fecha
- Proveedor
- Cantidad (si aplica)
Devuelve un JSON estructurado.`
          : `Analiza esta imagen de cultivo/planta y:
- Identifica si hay plagas o enfermedades
- Describe el estado de la planta
- Proporciona recomendaciones de tratamiento
Devuelve un JSON con: status, detected, recommendation`;

      const result = await visionModel.generateContent([
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType as any,
          },
        },
        prompt,
      ]);

      const responseText = result.response.text();
      logger.info('Imagen analizada correctamente');

      try {
        return JSON.parse(responseText);
      } catch {
        return { text: responseText };
      }
    } catch (error) {
      logger.error('Error al analizar imagen:', error);
      throw error;
    }
  }
}

export default new AIService();
