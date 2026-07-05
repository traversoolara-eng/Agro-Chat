import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from './logger';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY no está configurada');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const visionModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

logger.info('✅ Google Gemini AI inicializado');

export { model, visionModel };
