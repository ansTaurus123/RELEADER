import type { Therapist, TherapistMatchingPayload } from "@shared/schema";
import { cosineSimilarity } from "./utils";
import { generateEmbedding } from "./huggingface";
// Import faiss-node with ES Modules syntax - use the default export
import faissModule from 'faiss-node';

// In-memory storage for FAISS indexes
let therapistIndex: any = null;
let therapistEmbeddings: number[][] = [];
let therapistIds: number[] = [];

/**
 * Initialize a FAISS index with therapist data
 * This would normally be called once during service start
 */
export async function initializeTherapistIndex(therapists: Therapist[]): Promise<void> {
  try {
    // If we already have an index, clear it
    if (therapistIndex) {
      therapistIndex = null;
      therapistEmbeddings = [];
      therapistIds = [];
    }
    
    // Collect all therapist embeddings
    for (const therapist of therapists) {
      if (therapist.vectorEmbedding) {
        therapistEmbeddings.push(therapist.vectorEmbedding as number[]);
        therapistIds.push(therapist.id);
      }
    }
    
    // If we have embeddings, create an index
    if (therapistEmbeddings.length > 0) {
      const dimension = therapistEmbeddings[0].length;
      therapistIndex = new faissModule.IndexFlatL2(dimension);
      
      // Add all embeddings to the index - we need to convert from 2D to flat array
      // First, we convert our 2D array of embeddings to a flat array
      const flatArray: number[] = [];
      for (const embedding of therapistEmbeddings) {
        flatArray.push(...embedding);
      }
      
      // Then add the flat array to our index
      therapistIndex.add(flatArray);
      console.log(`FAISS index initialized with ${therapistEmbeddings.length} therapists`);
    } else {
      console.log('No therapist embeddings available for FAISS index');
    }
  } catch (error) {
    console.error('Error initializing FAISS index:', error);
    
    // For demo fallback, we'll use the embeddings array without an index
    console.log('Using fallback similarity search without FAISS index');
  }
}

/**
 * Find therapists similar to a given embedding
 */
export async function findSimilarTherapists(
  therapists: Therapist[],
  embedding: number[],
  limit: number = 10
): Promise<Array<Therapist & { match: number }>> {
  try {
    let similarTherapistIds: number[] = [];
    
    // Try to use FAISS index if available
    if (therapistIndex && therapistEmbeddings.length > 0) {
      // Search the index using regular array
      const searchResults = therapistIndex.search(embedding, limit);
      similarTherapistIds = searchResults.labels.map((idx: number) => therapistIds[idx]);
    } else {
      // Fallback to manual similarity calculation
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
      
      // Extract therapist IDs
      similarTherapistIds = scoredTherapists.slice(0, limit).map(item => item.therapist.id);
    }
    
    // Map IDs back to therapists and add match score
    const results = similarTherapistIds.map((id, index) => {
      const therapist = therapists.find(t => t.id === id);
      if (!therapist) return null;
      
      // Calculate match percentage based on position
      // First result = 100%, gradually decreasing
      const match = Math.max(50, Math.round(100 - (index * (50 / limit))));
      
      // Add match score to therapist using type assertion for demo purposes
      return {
        ...therapist,
        match
      } as Therapist & { match: number };
    }).filter(Boolean) as Array<Therapist & { match: number }>;
    
    return results;
  } catch (error) {
    console.error('Error in FAISS search:', error);
    
    // Fallback to basic filtering
    return therapists
      .slice(0, limit)
      .map((therapist, index) => ({
        ...therapist,
        match: Math.max(50, Math.round(100 - (index * (50 / limit))))
      }));
  }
}

/**
 * Match therapists to a query with additional form data
 */
export async function matchTherapistsToQuery(
  therapists: Therapist[],
  queryEmbedding: number[],
  formData: TherapistMatchingPayload
): Promise<Array<Therapist & { match: number }>> {
  // First, find similar therapists based on vector similarity
  const similarTherapists = await findSimilarTherapists(therapists, queryEmbedding, 10);
  
  // Then refine the results based on form data
  const refinedResults = similarTherapists.map(therapist => {
    // TypeScript doesn't know the extended type from findSimilarTherapists
    // so we need to use a type assertion
    const therapistWithMatch = therapist as Therapist & { match: number };
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
    const finalMatch = Math.min(100, Math.max(0, therapistWithMatch.match + matchBoost));
    
    return {
      ...therapist,
      match: finalMatch
    } as Therapist & { match: number };
  });
  
  // Sort by final match score
  refinedResults.sort((a, b) => b.match - a.match);
  
  return refinedResults;
}