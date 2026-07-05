# Arquitectura - Agro-Chat

## Descripción General

Agro-Chat es una aplicación full-stack que combina:
- **Backend**: FastAPI + Python para APIs y procesamiento de IA
- **Frontend**: React para la interfaz de usuario
- **Servicios IA**: Gemini API para chatbot y análisis
- **Procesamiento**: OCR para extracción automática de documentos

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Cliente Web (React)                     │
│  ┌─────────────────────────────────────────────────────────┐
│  │ ChatInterface | DocumentUpload | Dashboard              │
│  └─────────────────────────────────────────────────────────┘
└──────────────────────────┬──────────────────────────────────┘
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  FastAPI Backend (Python)                   │
│  ┌─────────────────────────────────────────────────────────┐
│  │ Routes                                                  │
│  │ ├── /api/chat           - Chatbot endpoints             │
│  │ ├── /api/documents      - Document management           │
│  │ ├── /api/financial      - Financial analysis            │
│  │ └── /api/health         - Health checks                 │
│  └─────────────────────────────────────────────────────────┘
│  ┌─────────────────────────────────────────────────────────┐
│  │ Services (Lógica de Negocio)                            │
│  │ ├── GeminiService       - Chatbot & IA Analysis         │
│  │ ├── OCRService          - Document Processing            │
│  │ ├── ImageRecognition    - Pest Detection                │
│  │ └── FinancialService    - Analysis & Reports            │
│  └─────────────────────────────────────────────────────────┘
│  ┌─────────────────────────────────────────────────────────┐
│  │ Database Layer                                          │
│  │ └── SQLAlchemy ORM + Models (Users, Conversations, etc) │
│  └─────────────────────────────────────────────────────────┘
└──────────────┬──────────────────┬──────────────────┬─────────┘
               │                  │                  │
               ▼                  ▼                  ▼
        ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
        │ Gemini API  │   │ OCR Service  │   │  SQLite DB  │
        │ (Chatbot)   │   │ (Tesseract)  │   │             │
        └─────────────┘   └──────────────┘   └─────────────┘
```

## Componentes Principales

### Backend

#### 1. **Models** (SQLAlchemy)
- `User`: Información del productor
- `Conversation`: Historial de chats
- `Message`: Mensajes individuales
- `Document`: Documentos subidos
- `FinancialRecord`: Registros financieros

#### 2. **Services** (Lógica de Negocio)

**GeminiService**
- Integración con Gemini API
- Respuestas contextualizadas (agricultura/ganadería)
- Análisis de imágenes para plagas
- Análisis financiero

**OCRService**
- Extracción de texto de imágenes
- Parseo de facturas
- Integración con Tesseract/OCR.space

**ImageRecognitionService**
- Detección de plagas
- Análisis de salud de cultivos
- Identificación de malezas

**FinancialService**
- Generación de reportes Excel
- Análisis de gastos por categoría
- Proyecciones presupuestarias

#### 3. **Routes** (API Endpoints)
```
POST   /api/chat/send           - Enviar mensaje al chatbot
GET    /api/chat/conversations  - Listar conversaciones
POST   /api/documents/upload    - Subir documento
GET    /api/documents/list      - Listar documentos
GET    /api/financial/summary   - Resumen financiero
GET    /api/financial/report/excel - Descargar Excel
```

### Frontend

#### 1. **Componentes React**
- `ChatInterface`: Interfaz de chat
- `DocumentUpload`: Carga de documentos
- `Dashboard`: Análisis financiero

#### 2. **Servicios HTTP**
- `api.js`: Cliente Axios para comunicación con backend

#### 3. **Estilos**
- CSS modular por componente
- Diseño responsivo
- Tema verde agrícola

## Flujo de Datos

### Ejemplo: Consulta al Chatbot

```
1. Usuario escribe pregunta en ChatInterface
   ↓
2. Se envía POST /api/chat/send con el mensaje
   ↓
3. Backend crea conversación si no existe
   ↓
4. Guarda el mensaje del usuario en BD
   ↓
5. Llama a GeminiService.get_agricultural_advice()
   ↓
6. Gemini retorna respuesta con contexto agr��cola
   ↓
7. Backend guarda respuesta IA en BD
   ↓
8. Retorna respuesta al frontend
   ↓
9. ChatInterface renderiza el mensaje IA
```

### Ejemplo: Carga de Factura

```
1. Usuario sube imagen en DocumentUpload
   ↓
2. Se envía POST /api/documents/upload (multipart)
   ↓
3. Backend guarda archivo en /uploads/
   ↓
4. OCRService.process_document() extrae texto
   ↓
5. Parsea datos (proveedor, total, fecha)
   ↓
6. Guarda en BD con datos extraídos
   ↓
7. Retorna datos al frontend
   ↓
8. DocumentUpload muestra información extraída
```

## Tecnologías Utilizadas

| Capa | Tecnología | Propósito |
|------|-----------|----------|
| Backend API | FastAPI | Framework web rápido y moderno |
| ORM | SQLAlchemy | Mapeo objeto-relacional |
| Validación | Pydantic | Validación de datos |
| IA Conversacional | Gemini API | Chatbot inteligente |
| OCR | Tesseract/OCR.space | Extracción de texto |
| BD | SQLite/PostgreSQL | Persistencia de datos |
| Frontend | React | Interfaz de usuario |
| HTTP Client | Axios | Comunicación con API |
| Build Tool | Vite | Bundler moderno |
| Estilos | CSS | Diseño responsive |

## Escalabilidad

### Para Producción:
1. **Base de Datos**: Cambiar a PostgreSQL
2. **Hosting Backend**: Heroku, AWS, Google Cloud
3. **Hosting Frontend**: Vercel, Netlify
4. **Cache**: Redis para sesiones
5. **Queue**: Celery para procesamiento asincrónico
6. **CDN**: Para archivos estáticos

### Performance:
- Lazy loading de conversaciones
- Paginación de registros financieros
- Caché de respuestas frecuentes
- Compresión de imágenes antes de OCR

## Seguridad

- Validación con Pydantic
- CORS configurado
- Hash de contraseñas (Passlib)
- Variables de entorno para secrets
- Límite de tamaño de archivo (10MB)
- Validación de tipo MIME

## Próximas Mejoras

1. **Autenticación**: JWT tokens, refresh tokens
2. **Roles**: Admin, productor, técnico
3. **Notificaciones**: Email/SMS para alertas
4. **Analytics**: Seguimiento de uso
5. **API Rate Limiting**: Protección contra abuso
6. **Webhooks**: Integraciones con terceros
