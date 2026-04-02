import { apiClient } from './apiClient';

/**
 * This is a boilerplate/template for building specific API services.
 * Each feature (like Salons, Users, Appointments) should have its own service file
 * that imports the shared `apiClient` instance.
 */

// Example definition of a data interface
export interface HelloResponse {
  message: string;
}

export const ExampleService = {
  /**
   * Example GET Request
   */
  getHealthStatus: async (): Promise<HelloResponse> => {
    const response = await apiClient.get<HelloResponse>('/api/health');
    return response.data;
  },
  
  /**
   * Example POST Request
   */
  createData: async (data: Record<string, unknown>) => {
    const response = await apiClient.post('/api/endpoint', data);
    return response.data;
  }
};
