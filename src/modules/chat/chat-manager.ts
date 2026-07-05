import { ApiClient } from '../../services/api';

export class ChatManager {
  private apiClient: ApiClient;
  private messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async sendMessage(userMessage: string): Promise<string> {
    this.messages.push({ role: 'user', content: userMessage });

    try {
      const response = await this.apiClient.chat(userMessage, {
        conversationHistory: this.messages,
      });

      if (response.success && response.data) {
        this.messages.push({ role: 'assistant', content: response.data });
        return response.data;
      }
      throw new Error(response.error || 'Error en la respuesta del chat');
    } catch (error) {
      console.error('Error en chat:', error);
      throw error;
    }
  }

  render(container: HTMLElement): void {
    container.innerHTML = `
      <div class="chat-container">
        <div id="chat-messages" class="chat-messages"></div>
        <div class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Pregunta sobre tu cultivo..." autocomplete="off">
          <button id="chat-send" class="btn-primary">Enviar</button>
        </div>
      </div>
    `;

    const sendButton = container.querySelector('#chat-send') as HTMLButtonElement;
    const input = container.querySelector('#chat-input') as HTMLInputElement;

    const handleSend = async () => {
      const message = input.value.trim();
      if (!message) return;

      try {
        input.value = '';
        const response = await this.sendMessage(message);
        this.displayMessage(message, 'user');
        this.displayMessage(response, 'assistant');
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        this.displayMessage('Error al procesar tu pregunta. Intenta de nuevo.', 'assistant');
      }
    };

    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  private displayMessage(content: string, role: 'user' | 'assistant'): void {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `message message-${role}`;
    messageEl.textContent = content;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
