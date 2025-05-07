import { Therapist, TherapistMatchingForm } from "@/types";
import { apiRequest } from "@/lib/queryClient";

export async function searchTherapists(query: string, limit: number = 10): Promise<Therapist[]> {
  try {
    const response = await apiRequest('POST', '/api/faiss/search', {
      query,
      limit
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error searching therapists:', error);
    throw error;
  }
}

export async function findSimilarTherapists(therapistId: number, limit: number = 5): Promise<Therapist[]> {
  try {
    const response = await apiRequest('POST', `/api/faiss/similar/${therapistId}`, {
      limit
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error finding similar therapists:', error);
    throw error;
  }
}

export async function matchTherapists(formData: TherapistMatchingForm): Promise<Therapist[]> {
  try {
    const response = await apiRequest('POST', '/api/faiss/match', formData);
    
    return await response.json();
  } catch (error) {
    console.error('Error matching therapists:', error);
    throw error;
  }
}
