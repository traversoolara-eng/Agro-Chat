export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: 'agricultor' | 'ganadero';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Partial<User>;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  context?: Record<string, any>;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface ImageProcessRequest {
  image: string; // Base64
  type: 'invoice' | 'plague';
}

export interface ImageProcessResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
}

export interface Report {
  id: string;
  userId: string;
  type: 'financial' | 'agricultural';
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
