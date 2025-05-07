import { apiRequest } from "@/lib/queryClient";
import { ChatMessage } from "@/types";

export async function sendChatMessage(message: string, conversationId?: string): Promise<{
  response: string;
  conversationId: string;
}> {
  try {
    const response = await apiRequest('POST', '/api/huggingface/chat', {
      message,
      conversationId
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

export async function getChatHistory(conversationId: string): Promise<ChatMessage[]> {
  try {
    const response = await apiRequest('GET', `/api/huggingface/conversations/${conversationId}`);
    
    return await response.json();
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
}

export async function createTherapySession(therapistId: number): Promise<{
  conversationId: string;
  greeting: string;
}> {
  try {
    const response = await apiRequest('POST', '/api/huggingface/session', {
      therapistId
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error creating therapy session:', error);
    throw error;
  }
}
