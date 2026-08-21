import { apiClient } from './apiClient';

export interface CreateLeadRequest {
  firstName: string;
  lastName: string;
  phone: string;
}

export const LeadsService = {
  createLead: async (data: CreateLeadRequest): Promise<void> => {
    await apiClient.post('/api/public/leads', data);
  },
};
