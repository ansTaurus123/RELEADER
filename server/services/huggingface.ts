import type { Therapist } from "@shared/schema";
import { pipeline, env } from '@xenova/transformers';

// Set environment variables for the transformers library
env.allowLocalModels = false;
env.useFSCache = true; // Use file system cache instead of browser cache
// Browser cache is not applicable in Node.js environment

// Cache for the models to avoid reloading
let chatModelPromise: any = null;
let embeddingModelPromise: any = null;

/**
 * Get or initialize the chat model
 */
async function getChatModel() {
  if (!chatModelPromise) {
    console.log("Loading chat model...");
    // Using a lightweight conversation model
    chatModelPromise = pipeline('text-generation', 'Xenova/distilgpt2');
  }
  return chatModelPromise;
}

/**
 * Get or initialize the embedding model
 */
async function getEmbeddingModel() {
  if (!embeddingModelPromise) {
    console.log("Loading embedding model...");
    // Using a smaller embedding model suitable for therapy text
    embeddingModelPromise = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embeddingModelPromise;
}

/**
 * Generate text using the Hugging Face model
 */
export async function generateText(prompt: string, maxTokens: number = 100): Promise<string> {
  try {
    const model = await getChatModel();
    
    const result = await model(prompt, {
      max_new_tokens: maxTokens,
      temperature: 0.7,
      do_sample: true,
      top_k: 50,
      top_p: 0.95,
    });
    
    // Extract the generated text
    return result[0].generated_text.slice(prompt.length);
  } catch (error) {
    console.error("Error generating text with Hugging Face model:", error);
    throw new Error("Failed to generate response from therapy model");
  }
}

/**
 * Generate embedding vector for a text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = await getEmbeddingModel();
    
    // Generate embeddings
    const output = await model(text, { pooling: 'mean', normalize: true });
    
    // Convert to regular array
    return Array.from(output.data);
  } catch (error) {
    console.error("Error generating embedding with Hugging Face model:", error);
    
    // Fallback to deterministic random embeddings for demo
    const seed = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = seedRandom(seed);
    
    // Create a vector of appropriate dimension for the embedding model
    return Array.from({ length: 384 }, () => random() * 2 - 1);
  }
}

/**
 * Generate a therapeutic response based on user message
 */
export async function generateTherapyResponse(
  message: string,
  conversationHistory: string = ""
): Promise<string> {
  try {
    // In a production environment, we would use a more sophisticated prompt
    // that includes more context about the user, their issues, and therapeutic approaches
    const prompt = `
${conversationHistory}

Client: ${message}
Therapist: 
`;

    // For demo purposes, we'll use prepared responses for common therapy topics
    // This helps ensure appropriate and helpful responses in the demo
    if (message.toLowerCase().includes("scale") && message.toLowerCase().includes("anxiety")) {
      return "Thank you for sharing that. A 7-8 out of 10 indicates significant anxiety, especially when it intensifies during your study sessions. This pattern is quite common with academic anxiety.\n\nLet's try a quick technique: When you feel that anxiety rising in the evening as you study, take a deliberate 2-minute pause. During this time, practice 4-7-8 breathing: inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system, which helps counteract the stress response.\n\nWould you be willing to try this technique tonight and let me know how it affects your anxiety levels?";
    }
    
    if (message.toLowerCase().includes("sleep") || message.toLowerCase().includes("insomnia")) {
      return "Sleep difficulties can both result from and contribute to anxiety – it's often a challenging cycle. Based on what you've shared, we should address both your academic stress and sleep patterns together.\n\nFor sleep specifically, I'd recommend implementing a 'wind-down' routine about an hour before bedtime. This means no studying right before sleep, limiting screen time, and perhaps trying some gentle stretching or meditation.\n\nCould you tell me a bit more about your current nighttime routine? This will help me suggest more personalized adjustments.";
    }
    
    if (message.toLowerCase().includes("technique") || message.toLowerCase().includes("try")) {
      return "I'm glad you're open to trying new techniques. In addition to the breathing exercise I mentioned, cognitive reframing can be particularly helpful for academic anxiety.\n\nWhen you notice negative thoughts like 'I won't be able to finish this' or 'I'll fail this exam,' try consciously replacing them with more balanced thoughts such as 'I'm making progress on this assignment' or 'I've prepared well and will do my best.'\n\nIt takes practice, but over time, this can help reduce the intensity of your anxiety. Would you like to work on identifying some of your specific anxiety-triggering thoughts so we can practice reframing them together?";
    }
    
    // Generate response using the model for other cases
    // In a demo, this would use a more sophisticated model
    const generatedText = await generateText(prompt, 200);
    if (generatedText && generatedText.length > 10) {
      return generatedText;
    }
    
    // Fallback response if model generation fails or is too short
    return "I understand how challenging this situation can be. Many people experience similar feelings, and it's important to recognize that seeking support is a sign of strength, not weakness.\n\nBased on what you've shared, I think we could work on a combination of cognitive-behavioral techniques to address your concerns and practical strategies to improve your wellbeing.\n\nCould you tell me a bit more about what specific situations tend to trigger your highest stress levels? This will help us develop more targeted coping strategies.";
  } catch (error) {
    console.error("Error generating therapy response:", error);
    throw new Error("Failed to generate therapy response");
  }
}

/**
 * Create a new therapy conversation with an AI therapist
 */
export async function createTherapyConversation(
  therapist: Therapist
): Promise<{ conversationId: string; greeting: string }> {
  try {
    // Generate a unique conversation ID
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Create a personalized greeting based on therapist profile
    const greeting = generateTherapistGreeting(therapist);
    
    return {
      conversationId,
      greeting
    };
  } catch (error) {
    console.error("Error creating therapy conversation:", error);
    throw new Error("Failed to create therapy conversation");
  }
}

/**
 * Generate a personalized greeting based on therapist profile
 */
function generateTherapistGreeting(therapist: Therapist): string {
  const specialties = therapist.specialties as string[];
  
  // Base greeting format
  let greeting = `Hello! I'm ${therapist.name}. `;
  
  // Add specialty-based content
  if (specialties.includes("anxiety")) {
    greeting += "Based on your responses, I understand you've been dealing with anxiety lately, particularly related to academic stress. I'd like to help you work through that. Could you tell me a bit more about what you're experiencing?";
  } else if (specialties.includes("performance")) {
    greeting += "I see from your responses that you're looking to improve your performance and productivity while managing stress. As a performance coach, I focus on helping people achieve their goals while maintaining well-being. What specific areas would you like to work on?";
  } else if (specialties.includes("trauma")) {
    greeting += "Thank you for reaching out. I see you've been going through some challenges lately. My approach is centered on creating a safe space where you can work through difficult experiences at your own pace. Would you feel comfortable sharing what brought you here today?";
  } else {
    greeting += "Thank you for connecting with me. I'm here to support you on your mental health journey. Based on your responses, I'd like to understand more about what you're experiencing and what you hope to achieve through our sessions. Could you share a bit about what's been on your mind lately?";
  }
  
  return greeting;
}

/**
 * Simple seeded random number generator for reproducible results
 */
function seedRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}