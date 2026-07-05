import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import 'express-async-errors';

import { logger } from '@/config/logger';
import { errorHandler } from '@/middleware/error-handler';
import { corsOptions } from '@/config/cors';

// Importar rutas
import chatRoutes from '@/routes/chat';
import imageRoutes from '@/routes/image';
import authRoutes from '@/routes/auth';
import reportsRoutes from '@/routes/reports';
import healthRoutes from '@/routes/health';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Rutas públicas
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/reports', reportsRoutes);

// Manejo de errores global
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`✅ Servidor iniciado en puerto ${PORT}`);
  logger.info(`Ambiente: ${process.env.NODE_ENV}`);
});

export default app;
