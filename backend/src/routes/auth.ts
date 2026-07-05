import { Router } from 'express';
import jwt from 'jwt-simple';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest, AuthResponse } from '@/types';
import { logger } from '@/config/logger';

const router = Router();

// Almacenamiento temporal de usuarios (en producción usar MongoDB)
const users: Map<string, any> = new Map();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, type } = req.body as AuthRequest & { name: string; type: string };

    if (!email || !password || !name || !type) {
      return res.status(400).json({ success: false, error: 'Datos incompletos' });
    }

    if (users.has(email)) {
      return res.status(409).json({ success: false, error: 'Email ya registrado' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      type,
      createdAt: new Date(),
    };

    users.set(email, user);

    logger.info(`Nuevo usuario registrado: ${email}`);

    res.status(201).json({
      success: true,
      user: { id: user.id, email, name, type },
    });
  } catch (error) {
    logger.error('Error en registro:', error);
    res.status(500).json({ success: false, error: 'Error al registrar' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as AuthRequest;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email y contraseña requeridos' });
    }

    const user = users.get(email);

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
    }

    const token = jwt.encode(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
    );

    logger.info(`Usuario logueado: ${email}`);

    res.json({
      success: true,
      token,
      user: { id: user.id, email, name: user.name, type: user.type },
    });
  } catch (error) {
    logger.error('Error en login:', error);
    res.status(500).json({ success: false, error: 'Error al iniciar sesión' });
  }
});

export default router;
