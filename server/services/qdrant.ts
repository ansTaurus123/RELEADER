import type { Therapist, TherapistMatchingPayload } from "@shared/schema";
import { cosineSimilarity } from "./utils";

// In a real implementation, this would use the Qdrant client and OpenAI/Cohere APIs for embeddings
// For this demo, we'll simulate the vector search with cosine similarity

/**
 * Generate embedding vector for a text query
 * 
 * In a real implementation, this would call OpenAI/Cohere API
 * For the demo, we'll simulate it with random vectors
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // This would normally call the embedding API
  // For demo purposes, we'll create a pseudo-random embedding based on the text
  const seed = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = seedRandom(seed);
  
  // Create a 384-dimension vector (common for text embeddings)
  return Array.from({ length: 384 }, () => random() * 2 - 1);
}

/**
 * Find therapists similar to a given embedding
 */
export async function findSimilarTherapists(
  therapists: Therapist[],
  embedding: number[],
  limit: number = 10
): Promise<Therapist[]> {
  // Calculate similarity scores for each therapist
  const scoredTherapists = therapists.map(therapist => {
    const similarity = cosineSimilarity(
      embedding,
      therapist.vectorEmbedding as number[]
    );
    
    return {
      therapist,
      similarity
    };
  });
  
  // Sort by similarity (highest first)
  scoredTherapists.sort((a, b) => b.similarity - a.similarity);
  
  // Add match percentage to each therapist
  const results = scoredTherapists.slice(0, limit).map(({ therapist, similarity }) => {
    // Convert similarity score to a percentage (0.85 -> 85%)
    const match = Math.round(similarity * 100);
    return {
      ...therapist,
      match
    };
  });
  
  return results;
}

/**
 * Match therapists to a query with additional form data
 */
export async function matchTherapistsToQuery(
  therapists: Therapist[],
  queryEmbedding: number[],
  formData: TherapistMatchingPayload
): Promise<Therapist[]> {
  // First, find similar therapists based on vector similarity
  const similarTherapists = await findSimilarTherapists(therapists, queryEmbedding, 10);
  
  // Then refine the results based on form data
  // This is a simplified version - a real implementation would use more sophisticated matching
  const refinedResults = similarTherapists.map(therapist => {
    let matchBoost = 0;
    
    // Boost match score if therapist specialties match user goals
    const specialties = therapist.specialties as string[];
    formData.goals.forEach(goal => {
      if (specialties.some(specialty => specialty.includes(goal))) {
        matchBoost += 5;
      }
    });
    
    // If user has preferences, check if they match therapist's bio
    if (formData.preferences) {
      const preferencesLower = formData.preferences.toLowerCase();
      const bioLower = therapist.bio.toLowerCase();
      
      if (bioLower.includes(preferencesLower)) {
        matchBoost += 10;
      }
    }
    
    // Clamp the final match score between 0 and 100
    const finalMatch = Math.min(100, Math.max(0, therapist.match + matchBoost));
    
    return {
      ...therapist,
      match: finalMatch
    };
  });
  
  // Sort by final match score
  refinedResults.sort((a, b) => b.match - a.match);
  
  return refinedResults;
}

/**
 * Simple seeded random number generator for demo
 */
function seedRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Utils are imported from a separate file in a real implementation
// Including it here for completeness
export const utils = {
  cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("Vectors must have the same length");
    }
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
};

export { utils as cosineSimilarity };
