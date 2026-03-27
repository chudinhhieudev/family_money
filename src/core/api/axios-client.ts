import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';

// API Response interface
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  code: number;
}

// Request interceptor configuration
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
}

class AxiosClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL || '/api') {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        // Add authentication token if available
        if (!config.skipAuth && typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        // Add request timestamp for debugging
        config.metadata = { startTime: new Date() };

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Calculate request duration
        const endTime = new Date();
        const duration = endTime.getTime() - response.config.metadata?.startTime?.getTime();
        
        console.log(`API Request completed in ${duration}ms:`, {
          url: response.config.url,
          method: response.config.method?.toUpperCase(),
          status: response.status,
        });

        return response;
      },
      (error: AxiosError) => {
        const originalRequest = error.config as RequestConfig;

        // Skip error handling if explicitly requested
        if (originalRequest?.skipErrorHandler) {
          return Promise.reject(error);
        }

        // Handle different error scenarios
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 401:
              // Unauthorized - token expired or invalid
              this.handleUnauthorized();
              break;
            
            case 403:
              // Forbidden - insufficient permissions
              message.error('You do not have permission to perform this action');
              break;
            
            case 404:
              // Not found
              message.error('The requested resource was not found');
              break;
            
            case 422:
              // Validation error
              const validationErrors = data as any;
              if (validationErrors?.errors) {
                const errorMessages = Object.values(validationErrors.errors).flat();
                message.error(errorMessages.join(', '));
              } else {
                message.error(validationErrors?.message || 'Validation failed');
              }
              break;
            
            case 429:
              // Rate limit exceeded
              message.error('Too many requests. Please try again later');
              break;
            
            case 500:
            case 502:
            case 503:
            case 504:
              // Server errors
              message.error('Server error. Please try again later');
              break;
            
            default:
              // Other errors
              const errorMessage = (data as any)?.message || error.message || 'An error occurred';
              message.error(errorMessage);
          }
        } else if (error.request) {
          // Network error
          message.error('Network error. Please check your connection');
        } else {
          // Other errors
          message.error(error.message || 'An unexpected error occurred');
        }

        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized() {
    // Clear authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    }

    // Show error message
    message.error('Your session has expired. Please log in again');

    // Redirect to login page (if not already there)
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  // HTTP Methods
  async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload
  async upload<T = any>(url: string, file: File, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig: RequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await this.instance.post<ApiResponse<T>>(url, formData, uploadConfig);
    return response.data;
  }

  // Download file
  async download(url: string, filename?: string, config?: RequestConfig): Promise<void> {
    const response = await this.instance.get(url, {
      ...config,
      responseType: 'blob',
    });

    // Create download link
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

// Create and export singleton instance
export const axiosClient = new AxiosClient();

// Export types
export type { RequestConfig };
export default axiosClient;
