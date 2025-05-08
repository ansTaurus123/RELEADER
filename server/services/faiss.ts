// Alternative approach using a JS-based vector search
import { euclideanDistance } from "../services/utils";

// In-memory storage for vector search
let therapistEmbeddings: number[][] = [];
let therapistIds: number[] = [];

export async function initializeTherapistIndex(therapists: Therapist[]): Promise<void> {
  // Reset storage
  therapistEmbeddings = [];
  therapistIds = [];
  
  // Collect all therapist embeddings
  for (const therapist of therapists) {
    if (therapist.vectorEmbedding) {
      therapistEmbeddings.push(therapist.vectorEmbedding as number[]);
      therapistIds.push(therapist.id);
    }
  }
  
  console.log(`Vector index initialized with ${therapistEmbeddings.length} therapists`);
}

export async function findSimilarTherapists(
  therapists: Therapist[],
  embedding: number[],
  limit: number = 10
): Promise<Array<Therapist & { match: number }>> {
  // Calculate distances manually
  const scoredTherapists = therapistEmbeddings.map((therapistEmbedding, index) => {
    const distance = euclideanDistance(embedding, therapistEmbedding);
    return {
      id: therapistIds[index],
      distance
    };
  });
  
  // Sort by distance (closest first)
  scoredTherapists.sort((a, b) => a.distance - b.distance);
  
  // Map IDs back to therapists and calculate match percentage
  const results = scoredTherapists.slice(0, limit).map((item, index) => {
    const therapist = therapists.find(t => t.id === item.id);
    if (!therapist) return null;
    
    // Calculate match percentage based on position
    const match = Math.max(50, Math.round(100 - (index * (50 / limit))));
    
    return {
      ...therapist,
      match
    } as Therapist & { match: number };
  }).filter(Boolean) as Array<Therapist & { match: number }>;
  
  return results;
}
