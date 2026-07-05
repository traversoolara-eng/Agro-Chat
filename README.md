# Agro-Chat — Aplicación Nativa iOS y Android

## 📱 Descripción

Agro-Chat es una aplicación móvil nativa que proporciona asesoramiento agropecuario automatizado mediante IA, reconocimiento de imágenes y gestión de gastos financieros para productores agrícolas y ganaderos.

### Características Principales

✅ **Chatbot IA** - Consultas técnicas en tiempo real sobre cultivos y ganadería  
✅ **Reconocimiento de Plagas** - Análisis de imágenes con IA para detectar problemas fitosanitarios  
✅ **OCR de Facturas** - Escanea automáticamente comprobantes y genera reportes en Excel  
✅ **Gestión Contable** - Registro integrado de gastos e ingresos  
✅ **Reportes Financieros** - Análisis de rentabilidad y toma de decisiones  
✅ **Offline Ready** - Funciona con conectividad limitada  

## 🛠️ Stack Tecnológico

- **Frontend**: TypeScript, Vite, CSS3
- **Mobile**: Capacitor 6.0+ (iOS & Android)
- **Backend**: Node.js/Express (implementación separada)
- **IA**: Google Gemini API, OCR.space, Teachable Machine
- **Almacenamiento**: Capacitor Preferences, Capacitor Filesystem

## 📋 Requisitos Previos

- **Node.js** 16+ (nodejs.org)
- **npm** 8+
- **Para Android**: Android Studio + SDK
- **Para iOS**: Xcode 14+ (solo en Mac)
- **Cuenta de desarrollador**: Google Play Console o Apple Developer Program

## 🚀 Instalación Rápida

### 1. Clonar y configurar

```bash
git clone https://github.com/traversoolara-eng/Agro-Chat.git
cd Agro-Chat
npm install
```

### 2. Variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tu URL de API:

```env
VITE_API_BASE_URL=https://api.agro-chat.com
```

> **⚠️ IMPORTANTE**: Nunca expongas claves de API en el cliente. Todas las llamadas a IA deben procesarse en el backend.

### 3. Build y sincronización

```bash
npm run build
npm run sync
```

### 4. Abrir en plataformas nativas

#### Android

```bash
npm run open:android
```

En Android Studio:
- Click en `Run ▶` o presiona `Shift + F10`
- Selecciona emulador o dispositivo conectado

#### iOS (solo Mac)

```bash
npm run open:ios
```

En Xcode:
- Select scheme `App`
- Click en `Run ▶` o presiona `Cmd + R`

## 📂 Estructura del Proyecto

```
Agro-Chat/
├── src/
│   ├── index.html              # Punto de entrada
│   ├── main.ts                 # Inicialización
│   ├── app.ts                  # Lógica principal
│   ├── services/
│   │   ├── api.ts              # Cliente HTTP
│   │   └── storage.ts          # Almacenamiento local
│   ├── modules/
│   │   ├── chat/               # Chatbot
│   │   └── image/              # Procesamiento de imágenes
│   └── styles/
│       └── main.css            # Estilos globales
├── dist/                       # Build compilado
├── android/                    # Proyecto Android nativo
├── ios/                        # Proyecto iOS nativo
├── capacitor.config.json       # Config de Capacitor
├── tsconfig.json               # Config de TypeScript
├── vite.config.ts              # Config de Vite
└── package.json                # Dependencias
```

## 🔧 Desarrollo

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# Sincronizar cambios con Capacitor
npm run sync

# Build de producción
npm run build
```

### Linting y Formato

```bash
# Verificar código
npm run lint

# Formatear código
npm run format
```

## 🎨 Personalización

### Ícono y Splash Screen

Reemplaza los archivos en `assets/` e ejecuta:

```bash
npm install -D @capacitor/assets
npx capacitor-assets generate
```

### Tema de Color

Modifica las variables en `src/styles/main.css`:

```css
--primary-color: #10b981;      /* Verde principal */
--secondary-color: #059669;    /* Verde oscuro */
--danger-color: #ef4444;       /* Rojo para alertas */
```

## 📦 Publicación

### Google Play Console

1. **Crear cuenta de desarrollador**: $25 USD (pago único)
2. **Generar APK/AAB firmado**:
   ```bash
   # En Android Studio
   Build > Generate Signed Bundle / APK
   ```
3. **Subir a Play Console**:
   - Crear nueva app
   - Subir AAB (Android App Bundle)
   - Completar ficha con capturas, descripción y política de privacidad
   - Enviar a revisión

### Apple App Store

1. **Cuenta Apple Developer**: $99 USD/año
2. **Generar archivo para envío**:
   ```bash
   # En Xcode
   Product > Archive
   ```
3. **Enviar con Transporter**:
   - Descargar Transporter de App Store
   - Ingresar credenciales de Apple ID
   - Subir archivo .ipa
   - Completar información en App Store Connect
   - Enviar a revisión

## 🔐 Seguridad

✅ **Buenas prácticas implementadas**:
- Claves de API en backend, nunca en cliente
- HTTPS obligatorio para todas las comunicaciones
- Validación de datos en cliente y servidor
- Almacenamiento local seguro con Preferences de Capacitor
- Manejo seguro de imágenes (limpieza después de procesar)

⚠️ **Para producción**:
- Implementar autenticación (OAuth 2.0)
- Encriptación de datos sensibles
- Rate limiting en API
- CORS configurado correctamente
- Política de privacidad clara

## 🐛 Troubleshooting

### ❌ "Error: No se puede conectar a la API"

```bash
# Verificar VITE_API_BASE_URL en .env
cat .env

# Probar conectividad
curl https://api.agro-chat.com/health
```

### ❌ "Android Build Error"

```bash
# Limpiar gradle
cd android
./gradlew clean
cd ..

# Reconstruir
npm run build:android
```

### ❌ "iOS Build Error"

```bash
# Borrar build caches
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Reconstruir pods
cd ios
pod install
cd ..

# Reconstruir en Xcode
Product > Clean Build Folder (Cmd + Shift + K)
```

## 📚 Documentación Adicional

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Google Gemini API](https://ai.google.dev/)

## 📄 Licencia

MIT - Libre para uso personal y comercial

## 👥 Contribución

Las contribuciones son bienvenidas. Para cambios grandes:
1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features:
- Abre un [Issue](https://github.com/traversoolara-eng/Agro-Chat/issues)
- Email: support@agro-chat.com

---

**Hecho con ❤️ por el equipo de Agro-Chat**
