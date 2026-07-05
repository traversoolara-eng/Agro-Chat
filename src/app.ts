import { ApiClient } from './services/api';
import { ChatManager } from './modules/chat/chat-manager';
import { ImageProcessor } from './modules/image/image-processor';
import { StorageManager } from './services/storage';

let apiClient: ApiClient;
let chatManager: ChatManager;
let imageProcessor: ImageProcessor;

export async function initializeApp(): Promise<void> {
  try {
    // Inicializar servicios base
    apiClient = new ApiClient();
    const storageManager = new StorageManager();

    // Inicializar módulos
    chatManager = new ChatManager(apiClient);
    imageProcessor = new ImageProcessor(apiClient);

    // Renderizar UI principal
    renderMainInterface();

    console.log('✅ Agro-Chat inicializado correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar Agro-Chat:', error);
    showErrorScreen(error instanceof Error ? error.message : 'Error desconocido');
  }
}

function renderMainInterface(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="agro-chat-container">
      <header class="header">
        <h1>🌾 Agro-Chat</h1>
        <p>Asesoramiento Agropecuario con IA</p>
      </header>
      
      <main class="main-content">
        <nav class="nav-tabs">
          <button class="tab-button active" data-tab="chat">💬 Chat</button>
          <button class="tab-button" data-tab="images">📷 Facturas</button>
          <button class="tab-button" data-tab="reports">📊 Reportes</button>
          <button class="tab-button" data-tab="settings">⚙️ Configuración</button>
        </nav>
        
        <section id="chat" class="tab-content active"></section>
        <section id="images" class="tab-content"></section>
        <section id="reports" class="tab-content"></section>
        <section id="settings" class="tab-content"></section>
      </main>
    </div>
  `;

  // Renderizar contenido de cada tab
  chatManager.render(document.getElementById('chat')!);
  imageProcessor.render(document.getElementById('images')!);
  
  // Configurar navegación de tabs
  setupTabNavigation();
}

function setupTabNavigation(): void {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      document.getElementById(tabName!)?.classList.add('active');
    });
  });
}

function showErrorScreen(message: string): void {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div class="error-screen">
        <h1>⚠️ Error</h1>
        <p>${message}</p>
        <button onclick="location.reload()">Reintentar</button>
      </div>
    `;
  }
}
