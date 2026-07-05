# Agro-Chat Backend API

Backend seguro y escalable para la aplicación Agro-Chat con autenticación JWT, integración con Google Gemini AI, y procesamiento de imágenes.

## 🚀 Características

- ✅ **Autenticación JWT** - Login y registro seguro
- ✅ **Chatbot IA** - Integración con Google Gemini API
- ✅ **Reconocimiento de Plagas** - Análisis visual con IA
- ✅ **OCR** - Extracción de datos de facturas
- ✅ **Generación de Reportes** - Análisis financiero y agrícola
- ✅ **CORS Configurado** - Acceso seguro desde frontend
- ✅ **Logging** - Sistema de logs con Winston
- ✅ **Error Handling** - Manejo robusto de errores

## 📋 Requisitos Previos

- Node.js 16+
- npm 8+
- Google Gemini API Key (gratis en ai.google.dev)
- MongoDB (opcional para persistencia)

## 🔧 Instalación

### 1. Clonar y acceder

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env`:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=tu_secreto_super_seguro
GEMINI_API_KEY=tu_api_key_aqui
CORS_ORIGIN=http://localhost:3000,https://agro-chat.com
```

### 3. Obtener Google Gemini API Key

1. Ir a [ai.google.dev](https://ai.google.dev/)
2. Click en "Get API Key"
3. Copiar la clave en `.env`

## 🏃 Ejecutar

### Desarrollo

```bash
npm run dev
```

El servidor estará en `http://localhost:3000`

### Producción

```bash
npm run build
npm start
```

## 📚 Endpoints

### Salud del servidor

```bash
GET /api/health
```

Respuesta:
```json
{
  "success": true,
  "status": "ok",
  "timestamp": "2026-07-05T...",
  "version": "1.0.0"
}
```

### Autenticación

#### Registro

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "productor@example.com",
  "password": "contraseña123",
  "name": "Juan Pérez",
  "type": "agricultor"  # o "ganadero"
}
```

Respuesta:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "productor@example.com",
    "name": "Juan Pérez",
    "type": "agricultor"
  }
}
```

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "productor@example.com",
  "password": "contraseña123"
}
```

Respuesta:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "productor@example.com",
    "name": "Juan Pérez",
    "type": "agricultor"
  }
}
```

### Chat (requiere autenticación)

```bash
POST /api/chat
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "message": "¿Cómo combato el mildiu en mis viñas?",
  "context": {
    "cultivo": "viña",
    "región": "Mendoza"
  }
}
```

Respuesta:
```json
{
  "success": true,
  "data": "El mildiu es un hongo que se combate con..."
}
```

### Procesamiento de Imágenes (requiere autenticación)

#### Analizar Factura

```bash
POST /api/image/process
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "image": "base64_image_string",
  "type": "invoice"
}
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "amount": "1500.00",
    "date": "05/07/2026",
    "invoice": "FAC-001",
    "provider": "Agrícola del Sur",
    "extractedText": "..."
  }
}
```

#### Analizar Planta (Plagas)

```bash
POST /api/image/process
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "image": "base64_image_string",
  "type": "plague"
}
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "status": "enfermo",
    "detected": "Mildiu",
    "recommendation": "Aplicar fungicida..."
  }
}
```

### Reportes (requiere autenticación)

#### Obtener reportes

```bash
GET /api/reports
Authorization: Bearer TOKEN
```

Respuesta:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "type": "financial",
      "title": "Reporte Financiero - Julio 2026",
      "data": {
        "ingresos": 15000,
        "egresos": 8000,
        "ganancia": 7000
      }
    }
  ]
}
```

#### Generar reporte en Excel

```bash
POST /api/reports/generate
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "type": "financial",
  "data": { ... }
}
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcryptjs
- ✅ JWT para autenticación
- ✅ CORS configurado
- ✅ Helmet para headers seguros
- ✅ Validación de entrada
- ✅ Logging de eventos

## 📝 Estructura del Proyecto

```
backend/
├── src/
│   ├── index.ts              # Punto de entrada
│   ├── config/
│   │   ├── logger.ts         # Winston logger
│   │   ├── cors.ts           # CORS config
│   │   └── gemini.ts         # Google Gemini API
│   ├── middleware/
│   │   ├── auth.ts           # JWT auth
│   │   └── error-handler.ts  # Error handling
│   ├── services/
│   │   ├── ai-service.ts     # Chatbot & image analysis
│   │   └── ocr-service.ts    # OCR para facturas
│   ├── routes/
│   │   ├── auth.ts           # Auth endpoints
│   │   ├── chat.ts           # Chat endpoint
│   │   ├── image.ts          # Image processing
│   │   ├── reports.ts        # Reports endpoints
│   │   └── health.ts         # Health check
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── dist/                     # Build output
├── logs/                     # Log files
├── package.json
├── tsconfig.json
└── .env.example
```

## 🧪 Testing

```bash
npm run test
```

## 🚀 Deployment

### Heroku

```bash
heroku create agro-chat-api
git push heroku main
```

### AWS Lambda

Ver documentación de Serverless Framework.

### Docker

```bash
docker build -t agro-chat-backend .
docker run -p 3000:3000 agro-chat-backend
```

## 📞 Support

Para problemas o preguntas:
- Abre un [Issue](https://github.com/traversoolara-eng/Agro-Chat/issues)
- Email: support@agro-chat.com

## 📄 Licencia

MIT
