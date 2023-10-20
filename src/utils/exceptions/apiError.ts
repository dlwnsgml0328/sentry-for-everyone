import { AxiosError } from 'axios';

export class ApiError extends Error {
  public name: string;
  public statusCode: number;
  public responseData: any;
  public url?: string;
  public method?: string;
  public params?: any;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.getErrorName(this.statusCode);
  }

  private errorMap: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    408: 'Request Timeout',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  private getErrorName(status: number): string {
    return this.errorMap[status] || `[${status}] Api Error - Unhandled Status Code`;
  }

  /**
   * @description
   * AxiosError에서 필요한 정보를 추출하여 ApiError로 변환합니다.
   */
  public static abstractAxiosError(axiosError: AxiosError): ApiError {
    const errorMessage = (axiosError.response?.data as any)?.message || axiosError.message;
    const statusCode = axiosError.response?.status || 999;

    const apiError = new ApiError(errorMessage, statusCode);
    apiError.responseData = axiosError.response?.data || null;
    apiError.url = axiosError.config?.url || '';
    apiError.method = axiosError.config?.method || '';
    apiError.params = axiosError.config?.params || {};

    return apiError;
  }
}
