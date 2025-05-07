import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendChatMessage, createTherapySession } from "@/lib/huggingface";

export function useTherapyChat() {
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<string | null>(null);
  
  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => sendChatMessage(message, conversationId),
    onSuccess: (data) => {
      setConversationId(data.conversationId);
      setResponse(data.response);
    },
  });
  
  const createSessionMutation = useMutation({
    mutationFn: (therapistId: number) => createTherapySession(therapistId),
    onSuccess: (data) => {
      setConversationId(data.conversationId);
      setResponse(data.greeting);
    },
  });
  
  const sendMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };
  
  const startSession = (therapistId: number) => {
    createSessionMutation.mutate(therapistId);
  };
  
  return {
    sendMessage,
    startSession,
    response,
    conversationId,
    isLoading: sendMessageMutation.isPending,
    isStartingSession: createSessionMutation.isPending,
  };
}
