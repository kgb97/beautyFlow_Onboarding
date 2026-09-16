import { apiClient } from './apiClient';

export interface PublicTestimonialDto {
  authorName: string;
  authorRole: string;
  content: string;
  rating: number;
}

export const TestimonialsService = {
  getTestimonials: async (): Promise<PublicTestimonialDto[]> => {
    const response = await apiClient.get('/api/public/testimonials');
    return response.data;
  },
};
