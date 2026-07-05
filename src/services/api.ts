import axios, { AxiosInstance, AxiosError } from 'axios';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.agro-chat.com';
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      response => response,
      error => this.handleError(error)
    );
  }

  private handleError(error: AxiosError): never {
    const message = error.response?.data?.message || error.message || 'Error desconocido';
    console.error('API Error:', message);
    throw new Error(message);
  }

  async chat(message: string, context?: Record<string, any>): Promise<ApiResponse<string>> {
    return this.client.post('/chat', { message, context });
  }

  async processImage(imageBase64: string, type: 'invoice' | 'plague'): Promise<ApiResponse<any>> {
    return this.client.post('/image/process', { image: imageBase64, type });
  }

  async getReports(): Promise<ApiResponse<any[]>> {
    return this.client.get('/reports');
  }

  async health(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
