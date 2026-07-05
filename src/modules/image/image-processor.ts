import { Camera, CameraResultType } from '@capacitor/camera';
import { ApiClient } from '../../services/api';

export class ImageProcessor {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async captureImage(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      return image.base64String || null;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
      return null;
    }
  }

  async processInvoice(imageBase64: string): Promise<any> {
    try {
      const response = await this.apiClient.processImage(imageBase64, 'invoice');
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error);
    } catch (error) {
      console.error('Error al procesar factura:', error);
      throw error;
    }
  }

  async processPlague(imageBase64: string): Promise<any> {
    try {
      const response = await this.apiClient.processImage(imageBase64, 'plague');
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error);
    } catch (error) {
      console.error('Error al procesar imagen de plaga:', error);
      throw error;
    }
  }

  render(container: HTMLElement): void {
    container.innerHTML = `
      <div class="image-processor">
        <button id="btn-invoice" class="btn-primary">📸 Fotografiar Factura</button>
        <button id="btn-plague" class="btn-primary">🦠 Fotografiar Planta</button>
        <div id="image-results" class="image-results"></div>
      </div>
    `;

    const invoiceBtn = container.querySelector('#btn-invoice') as HTMLButtonElement;
    const plagueBtn = container.querySelector('#btn-plague') as HTMLButtonElement;

    invoiceBtn.addEventListener('click', () => this.handleInvoiceCapture());
    plagueBtn.addEventListener('click', () => this.handlePlagueCapture());
  }

  private async handleInvoiceCapture(): Promise<void> {
    const image = await this.captureImage();
    if (!image) return;

    try {
      const resultsDiv = document.getElementById('image-results');
      if (resultsDiv) {
        resultsDiv.innerHTML = '<p>Procesando factura...</p>';
      }

      const result = await this.processInvoice(image);
      this.displayResults(result, 'invoice');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async handlePlagueCapture(): Promise<void> {
    const image = await this.captureImage();
    if (!image) return;

    try {
      const resultsDiv = document.getElementById('image-results');
      if (resultsDiv) {
        resultsDiv.innerHTML = '<p>Analizando planta...</p>';
      }

      const result = await this.processPlague(image);
      this.displayResults(result, 'plague');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private displayResults(data: any, type: string): void {
    const resultsDiv = document.getElementById('image-results');
    if (!resultsDiv) return;

    if (type === 'invoice') {
      resultsDiv.innerHTML = `
        <div class="result-card">
          <h3>Factura Procesada</h3>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    } else {
      resultsDiv.innerHTML = `
        <div class="result-card">
          <h3>Análisis de Planta</h3>
          <p><strong>Estado:</strong> ${data.status}</p>
          <p><strong>Detección:</strong> ${data.detected}</p>
          <p><strong>Recomendación:</strong> ${data.recommendation}</p>
        </div>
      `;
    }
  }
}
